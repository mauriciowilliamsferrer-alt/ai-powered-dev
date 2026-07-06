import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, Link2, Globe, TrendingUp } from "lucide-react";
import { toast } from "sonner";

type SiteType = { key: string; label: string; share: number; raw: number };
type RefDomain = { domain: string; domain_ascore: number; backlinks_num: number; country?: string };
type Anchor = { anchor: string; domains_num: number; backlinks_num: number };

type AnalysisResult = {
  target: string;
  overview: {
    ascore?: number;
    total?: number;
    domains_num?: number;
    follows_num?: number;
    nofollows_num?: number;
  };
  siteTypes: SiteType[];
  refDomains: RefDomain[];
  anchors: Anchor[];
};

const fmt = (n?: number) =>
  n === undefined || n === null ? "—" : new Intl.NumberFormat("pt-BR").format(Number(n));

export default function BacklinkAnalyzerPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-backlinks", {
        body: { domain },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data as AnalysisResult);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha na análise";
      console.error("analyze-backlinks error:", msg);
      toast.error("Não foi possível analisar", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  const follow = result?.overview.follows_num ?? 0;
  const nofollow = result?.overview.nofollows_num ?? 0;
  const followRatio = follow + nofollow > 0 ? (follow / (follow + nofollow)) * 100 : 0;

  return (
    <div className="min-h-screen bg-background xl:pl-52">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <header className="mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
            <Link2 className="w-3.5 h-3.5" />
            Análise de backlinks
          </div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-3">
            Quem linka para um domínio?
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Digite um domínio (ex.: <span className="text-foreground">cursor.com</span>) e veja os
            principais tipos de sites que apontam para ele — blogs, comunidades dev, diretórios,
            notícias e mais. Dados via Semrush.
          </p>
        </header>

        <form onSubmit={handleAnalyze} className="flex gap-2 mb-8">
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="cursor.com"
            className="h-12 text-base"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !domain.trim()} className="h-12 px-6">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Analisar"}
          </Button>
        </form>

        {loading && (
          <div className="text-center py-16 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3" />
            Consultando Semrush…
          </div>
        )}

        {result && (
          <div className="space-y-8 animate-fade-in">
            {/* Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Authority Score
                </div>
                <div className="text-2xl font-serif">{result.overview.ascore ?? "—"}</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Total de backlinks
                </div>
                <div className="text-2xl font-serif">{fmt(result.overview.total)}</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Domínios referentes
                </div>
                <div className="text-2xl font-serif">{fmt(result.overview.domains_num)}</div>
              </Card>
              <Card className="p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Follow / nofollow
                </div>
                <div className="text-2xl font-serif">{followRatio.toFixed(0)}%</div>
                <div className="text-xs text-muted-foreground mt-0.5">follow</div>
              </Card>
            </div>

            {/* Site types */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h2 className="font-serif text-2xl">Tipos de sites que linkam</h2>
              </div>
              {result.siteTypes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Sem categorização suficiente para este domínio.
                </p>
              ) : (
                <div className="space-y-4">
                  {result.siteTypes.map((t) => (
                    <div key={t.key}>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-sm">{t.label}</span>
                        <span className="text-sm text-muted-foreground tabular-nums">
                          {(t.share * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={t.share * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-5">
                Categorias agregadas das categorias temáticas dos domínios referentes reportadas
                pela Semrush.
              </p>
            </Card>

            {/* Top referring domains */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <Globe className="w-4 h-4 text-primary" />
                <h2 className="font-serif text-2xl">Top domínios referentes</h2>
              </div>
              <div className="divide-y divide-border">
                {result.refDomains.slice(0, 15).map((d) => (
                  <a
                    key={d.domain}
                    href={`https://${d.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 hover:bg-muted/40 -mx-2 px-2 rounded transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-sm truncate">{d.domain}</div>
                      {d.country && (
                        <div className="text-xs text-muted-foreground uppercase">{d.country}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="secondary">AS {d.domain_ascore ?? "—"}</Badge>
                      <span className="tabular-nums text-muted-foreground w-20 text-right">
                        {fmt(d.backlinks_num)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            {/* Anchors */}
            {result.anchors.length > 0 && (
              <Card className="p-6">
                <h2 className="font-serif text-2xl mb-5">Principais âncoras</h2>
                <div className="flex flex-wrap gap-2">
                  {result.anchors.slice(0, 12).map((a) => (
                    <Badge key={a.anchor} variant="outline" className="text-xs">
                      {a.anchor || "(vazia)"}
                      <span className="ml-2 text-muted-foreground">{fmt(a.backlinks_num)}</span>
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
