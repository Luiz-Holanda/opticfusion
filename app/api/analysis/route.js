import { NextResponse } from 'next/server';


const SAMPLES_DATABASE = {
  'portrait-ideal': {
    id: 'analysis-p1',
    sampleId: 'portrait-ideal',
    sampleName: 'Retrato em Luz Natural (Enquadramento Áureo)',
    thumbnail: '/img/after.png',
    score: 96,
    tiltAngle: 0.1,
    ruleOfThirdsScore: 94,
    suggestedIso: 200,
    brightnessLevel: 'ideal',
    recommendations: [
      'Alinhamento horizontal perfeito (desvio inferior a 0.2°).',
      'Olhos alinhados com o terço superior da grade de composição.',
      'Exposição equilibrada sem perda de detalhes nas altas luzes.',
    ],
    technicalMetrics: {
      shutterSpeed: '1/250s',
      aperture: 'f/2.8',
      focalLength: '50mm',
      noiseIndex: '0.04%',
    },
  },
  'portrait-tilt': {
    id: 'analysis-p2',
    sampleId: 'portrait-tilt',
    sampleName: 'Retrato com Horizonte Desnivelado',
    thumbnail: '/img/before.png',
    score: 68,
    tiltAngle: -3.8,
    ruleOfThirdsScore: 62,
    suggestedIso: 400,
    brightnessLevel: 'baixo',
    recommendations: [
      'Câmera inclinada em 3.8° para a esquerda. Gire no sentido horário.',
      'Assunto centralizado demais. Mova a câmera 15% para a direita.',
      'Aumente o tempo de exposição ou utilize luz de preenchimento.',
    ],
    technicalMetrics: {
      shutterSpeed: '1/60s',
      aperture: 'f/4.0',
      focalLength: '35mm',
      noiseIndex: '1.2%',
    },
  },
  'landscape-urban': {
    id: 'analysis-p3',
    sampleId: 'landscape-urban',
    sampleName: 'Paisagem Urbana e Linhas Guia',
    thumbnail: '/img/slide2.png',
    score: 88,
    tiltAngle: 0.6,
    ruleOfThirdsScore: 89,
    suggestedIso: 100,
    brightnessLevel: 'ideal',
    recommendations: [
      'Ponto de fuga bem posicionado nas diagonais da imagem.',
      'Leve inclinação de 0.6°; compensação automática aplicada.',
      'Céu com boa faixa dinâmica sem superexposição.',
    ],
    technicalMetrics: {
      shutterSpeed: '1/500s',
      aperture: 'f/8.0',
      focalLength: '24mm',
      noiseIndex: '0.01%',
    },
  },
};


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sample = searchParams.get('sample') || 'portrait-ideal';
  const delayParam = Number(searchParams.get('delay') || 300);

  // Imita o tempo de resposta de uma análise real.
  if (delayParam > 0) {
    await new Promise((resolve) => setTimeout(resolve, Math.min(delayParam, 1500)));
  }

  // Permite conferir como a tela apresenta uma falha na análise.
  if (sample === 'error') {
    return NextResponse.json(
      {
        success: false,
        error: 'Erro simulado no serviço de telemetria e visão computacional (Status 500).',
        code: 'INFERENCE_SERVICE_UNAVAILABLE',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }

  // Permite conferir a tela quando a análise não encontra resultados.
  if (sample === 'empty') {
    return NextResponse.json(
      {
        success: true,
        items: [],
        total: 0,
        message: 'Nenhuma telemetria disponível para a amostra solicitada.',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }

  const sampleData = SAMPLES_DATABASE[sample] || SAMPLES_DATABASE['portrait-ideal'];

  return NextResponse.json(
    {
      success: true,
      data: {
        ...sampleData,
        timestamp: new Date().toISOString(),
        model: 'OpticFusion Neural Vision v2.4 (Mock Acadêmico)',
        latencyMs: Math.floor(Math.random() * 20) + 15,
      },
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
