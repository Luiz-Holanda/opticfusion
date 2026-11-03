import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/analysis/route';

describe('API Route Handler: /api/analysis', () => {
  it('deve retornar análise com sucesso (200) para amostra padrão', async () => {
    const request = new Request('http://localhost:3000/api/analysis?sample=portrait-ideal&delay=0');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
    expect(json.data.sampleId).toBe('portrait-ideal');
    expect(json.data.score).toBeGreaterThan(50);
  });

  it('deve retornar dados específicos para a amostra portrait-tilt', async () => {
    const request = new Request('http://localhost:3000/api/analysis?sample=portrait-tilt&delay=0');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.tiltAngle).toBeLessThan(0);
    expect(json.data.brightnessLevel).toBe('baixo');
  });

  it('deve retornar estado vazio quando solicitado', async () => {
    const request = new Request('http://localhost:3000/api/analysis?sample=empty&delay=0');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.items).toEqual([]);
    expect(json.total).toBe(0);
  });

  it('deve retornar status 500 para simulação de erro', async () => {
    const request = new Request('http://localhost:3000/api/analysis?sample=error&delay=0');
    const response = await GET(request);

    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain('Erro simulado');
  });
});
