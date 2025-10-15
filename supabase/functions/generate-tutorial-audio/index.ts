import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, phaseIndex } = await req.json();

    if (!text || typeof phaseIndex !== 'number') {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: text and phaseIndex' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'ElevenLabs API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Voice ID: Laura (FGY2WhTYpPnrIDTdsKH5)
    const voiceId = 'FGY2WhTYpPnrIDTdsKH5';
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.7,
            similarity_boost: 0.8,
            style: 0.3,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', errorText);
      return new Response(
        JSON.stringify({ error: `ElevenLabs API error: ${response.statusText}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const audioBlob = await response.blob();
    const arrayBuffer = await audioBlob.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('Error in generate-tutorial-audio:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
