import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY = 'https://connector-gateway.lovable.dev/semrush';

function normalizeDomain(input: string): string {
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
  return d;
}

async function semrush(path: string, params: Record<string, string>) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const SEMRUSH_API_KEY = Deno.env.get('SEMRUSH_API_KEY');
  if (!LOVABLE_API_KEY || !SEMRUSH_API_KEY) {
    throw new Error('Missing Semrush credentials');
  }
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${GATEWAY}${path}?${qs}`, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': SEMRUSH_API_KEY,
    },
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Semrush ${path} failed [${res.status}]: ${text}`);
    throw new Error(`[${res.status}]: ${text}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function rowsToObjects(data: any): Array<Record<string, any>> {
  const cols: string[] = data?.data?.columnNames ?? [];
  const rows: any[][] = data?.data?.rows ?? [];
  return rows.map((r) => Object.fromEntries(cols.map((c, i) => [c, r[i]])));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { domain } = await req.json();
    if (!domain || typeof domain !== 'string') {
      return new Response(JSON.stringify({ error: 'domain is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const target = normalizeDomain(domain);

    const [overviewRaw, categoriesRaw, refDomainsRaw, anchorsRaw] = await Promise.all([
      semrush('/backlinks/backlinks_overview', {
        target,
        target_type: 'root_domain',
        export_columns: 'ascore,total,domains_num,urls_num,ips_num,follows_num,nofollows_num,texts_num,images_num,forms_num,frames_num',
      }),
      semrush('/backlinks/backlinks_categories', {
        target,
        target_type: 'root_domain',
        export_columns: 'category_name,rating',
        display_limit: '25',
      }),
      semrush('/backlinks/backlinks_refdomains', {
        target,
        target_type: 'root_domain',
        export_columns: 'domain_ascore,domain,backlinks_num,ip,country,first_seen,last_seen',
        display_limit: '25',
      }),
      semrush('/backlinks/backlinks_anchors', {
        target,
        target_type: 'root_domain',
        export_columns: 'anchor,domains_num,backlinks_num,first_seen,last_seen',
        display_limit: '15',
      }),
    ]);

    const overview = rowsToObjects(overviewRaw)[0] ?? {};
    const categories = rowsToObjects(categoriesRaw);
    const refDomains = rowsToObjects(refDomainsRaw);
    const anchors = rowsToObjects(anchorsRaw);

    // Classify referring domains into "site types" using both category ratings & TLD/heuristics
    const catBuckets: Record<string, { label: string; score: number; keywords: RegExp }> = {
      blog: { label: 'Blogs & personal sites', score: 0, keywords: /blog|personal|writer|medium|substack|dev\.to/i },
      developer: { label: 'Developer & tech communities', score: 0, keywords: /develop|programm|software|comput|internet|technolog|github|stackoverflow/i },
      news: { label: 'News & media', score: 0, keywords: /news|media|magazine|journal|press/i },
      directory: { label: 'Directories & aggregators', score: 0, keywords: /director|catalog|list|aggregat|reference/i },
      education: { label: 'Educational & tutorials', score: 0, keywords: /educat|tutorial|learn|academ|school|univers|course/i },
      business: { label: 'Business & SaaS', score: 0, keywords: /business|market|finance|econom|company|enterprise|saas/i },
      forum: { label: 'Forums & social', score: 0, keywords: /forum|community|social|discuss|reddit|chat/i },
      shopping: { label: 'Shopping & deals', score: 0, keywords: /shop|deal|discount|coupon|ecommerce|store|retail/i },
      entertainment: { label: 'Entertainment & lifestyle', score: 0, keywords: /entertain|game|music|art|lifestyle|travel|food/i },
      other: { label: 'Other', score: 0, keywords: /.^/ },
    };

    for (const c of categories) {
      const name = String(c.category_name ?? '');
      const rating = Number(c.rating ?? 0);
      let matched = false;
      for (const [key, b] of Object.entries(catBuckets)) {
        if (key === 'other') continue;
        if (b.keywords.test(name)) {
          b.score += rating;
          matched = true;
          break;
        }
      }
      if (!matched) catBuckets.other.score += rating;
    }

    const total = Object.values(catBuckets).reduce((s, b) => s + b.score, 0) || 1;
    const siteTypes = Object.entries(catBuckets)
      .map(([key, b]) => ({ key, label: b.label, share: b.score / total, raw: b.score }))
      .filter((t) => t.raw > 0)
      .sort((a, b) => b.share - a.share);

    return new Response(
      JSON.stringify({ target, overview, siteTypes, categories, refDomains, anchors }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
