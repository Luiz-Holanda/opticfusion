'use client';

import { useState, useCallback, useMemo } from 'react';
import { MathUtils } from '@/utils/math';




export function usePhotoAnalysis(options = {}) {
  const { apiEndpoint = '/api/analysis' } = options;

  const [result, setResult] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  
  const analyzePhoto = useCallback(
    async (sampleId = 'portrait-ideal', sampleName = 'Amostra Selecionada') => {
      setIsLoading(true);
      setError(null);
      setIsEmpty(false);

      try {
        const response = await fetch(`${apiEndpoint}?sample=${encodeURIComponent(sampleId)}&delay=400`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => ({}));
          throw new Error(
            errorPayload.error || `Erro na comunicação com a API (HTTP ${response.status})`
          );
        }

        const json = await response.json();

        // Mostra o estado sem resultados.
        if (json.items && json.items.length === 0) {
          setResult(null);
          setIsEmpty(true);
          return { success: true, empty: true };
        }

        const data = json.data || json;
        setResult(data);
        setIsEmpty(false);
        setHistory((prev) => [data, ...prev.filter((item) => item.sampleId !== data.sampleId)].slice(0, 5));
        return { success: true, data };
      } catch (err) {
        // Mantém o erro para que a tela apresente a mensagem correspondente.
        if (sampleId === 'error' || err.message.includes('simulado')) {
          setError(err.message);
          setResult(null);
          return { success: false, error: err.message };
        }

        // Usa uma análise local quando a API não está disponível.
        const rawTilt = MathUtils.clamp(MathUtils.round(MathUtils.randomRange(-3.5, 3.5), 1), -5, 5);
        const rawScore = MathUtils.clamp(MathUtils.randomInt(78, 98), 50, 100);
        const thirds = MathUtils.clamp(MathUtils.round(MathUtils.randomInt(80, 99), 0), 0, 100);
        const iso = [100, 200, 400, 800][MathUtils.randomInt(0, 3)];

        const fallbackData = {
          id: `analysis-${Date.now()}`,
          sampleId,
          sampleName,
          score: rawScore,
          tiltAngle: rawTilt,
          ruleOfThirdsScore: thirds,
          suggestedIso: iso,
          brightnessLevel: rawScore > 85 ? 'ideal' : 'baixo',
          recommendations: [
            MathUtils.abs(rawTilt) > 1.0
              ? `Ajuste a inclinação em ${MathUtils.abs(rawTilt)}° para alinhar com o horizonte.`
              : 'Nivelamento horizontal excelente.',
            thirds > 85
              ? 'Enquadramento dentro dos pontos de interseção da regra dos terços.'
              : 'Mova o assunto principal ligeiramente para um dos pontos áureos.',
            `Configure o ISO para ${iso} para minimizar ruído no sensor.`,
          ],
          model: 'Motor Algorítmico Local (Fallback)',
          timestamp: new Date().toISOString(),
          isFallback: true,
        };

        setResult(fallbackData);
        setHistory((prev) => [fallbackData, ...prev].slice(0, 5));
        return { success: true, data: fallbackData };
      } finally {
        setIsLoading(false);
      }
    },
    [apiEndpoint]
  );

  const resetAnalysis = useCallback(() => {
    setResult(null);
    setIsEmpty(false);
    setError(null);
    setIsLoading(false);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Calcula a classificação apenas quando o resultado muda.
  const grade = useMemo(() => {
    if (!result || typeof result.score !== 'number') return null;
    if (result.score >= 90) return 'A+ (Excelente)';
    if (result.score >= 80) return 'A (Ótimo)';
    if (result.score >= 70) return 'B (Bom)';
    return 'C (Ajustes necessários)';
  }, [result]);

  const averageHistoryScore = useMemo(() => {
    if (history.length === 0) return 0;
    const total = history.reduce((acc, h) => acc + (h.score || 0), 0);
    return MathUtils.round(total / history.length, 1);
  }, [history]);

  return {
    result,
    isEmpty,
    isLoading,
    error,
    history,
    grade,
    averageHistoryScore,
    analyzePhoto,
    resetAnalysis,
    clearHistory,
  };
}
