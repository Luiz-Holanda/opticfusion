import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePhotoAnalysis } from '@/hooks/usePhotoAnalysis';

describe('usePhotoAnalysis hook customizado', () => {
  it('deve inicializar com valores vazios', () => {
    const { result } = renderHook(() => usePhotoAnalysis());

    expect(result.current.result).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.history).toEqual([]);
    expect(result.current.grade).toBeNull();
  });

  it('deve realizar análise com fallback quando fetch não encontra o endpoint', async () => {
    // Simula uma falha na API para conferir a análise local.
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => usePhotoAnalysis());

    await act(async () => {
      await result.current.analyzePhoto('test-1', 'Foto de Teste');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.result).not.toBeNull();
    expect(result.current.result.sampleName).toBe('Foto de Teste');
    expect(result.current.history.length).toBe(1);
    expect(result.current.grade).toBeDefined();

    global.fetch = originalFetch;
  });

  it('deve resetar o resultado ao chamar resetAnalysis', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => usePhotoAnalysis());

    await act(async () => {
      await result.current.analyzePhoto('test-1', 'Foto de Teste');
    });

    expect(result.current.result).not.toBeNull();

    act(() => {
      result.current.resetAnalysis();
    });

    expect(result.current.result).toBeNull();
    expect(result.current.grade).toBeNull();

    global.fetch = originalFetch;
  });

  it('deve calcular a média histórica de pontuações via useMemo', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => usePhotoAnalysis());

    await act(async () => {
      await result.current.analyzePhoto('test-1', 'Foto 1');
    });
    await act(async () => {
      await result.current.analyzePhoto('test-2', 'Foto 2');
    });

    expect(result.current.history.length).toBe(2);
    expect(result.current.averageHistoryScore).toBeGreaterThan(0);

    global.fetch = originalFetch;
  });
});
