'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Card } from '@/components/ui/Card.jsx';
import { StatCard } from '@/components/ui/StatCard.jsx';
import { Badge } from '@/components/ui/Badge.jsx';
import { Alert } from '@/components/ui/Alert.jsx';
import { usePhotoAnalysis } from '@/hooks/usePhotoAnalysis';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Valores atuais dos controles da câmera.
  const [iso, setIso] = useState('200');
  const [compositionGuide, setCompositionGuide] = useState(true);
  const [autoLevel, setAutoLevel] = useState(true);
  const [activeMode, setActiveMode] = useState('portrait');

  // Consulta os resultados da análise da foto.
  const {
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
  } = usePhotoAnalysis();

  const [selectedSample, setSelectedSample] = useState('portrait-ideal');

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handleRunAnalysis = () => {
    const sampleNames = {
      'portrait-ideal': 'Retrato com Iluminação Áurea (Ideal)',
      'portrait-tilt': 'Retrato com Inclinação Excessiva (Torto)',
      'landscape-urban': 'Paisagem Urbana e Linhas Guia',
      empty: 'Amostra Vazia (Empty State)',
      error: 'Simulação de Erro de Conexão (Error State)',
    };
    analyzePhoto(selectedSample, sampleNames[selectedSample] || 'Amostra Personalizada');
  };

  return (
    <div className="page min-h-screen flex flex-col">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>

      
      <header
        role="banner"
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'rgba(5, 6, 10, 0.95)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          className="container mx-auto w-full px-4 sm:px-6 lg:px-8"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '68px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" className="brand" aria-label="Ir para a página inicial">
              <img src="/img/logo.png" alt="Logo" className="brand-mark" />
              <span className="brand-text">
                OPTIC <span>STUDIO</span>
              </span>
            </Link>
            <Badge variant="cyan">Área Privada</Badge>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{user?.name}</p>
              <p className="muted" style={{ margin: 0, fontSize: '11px' }}>{user?.email}</p>
            </div>
            <Button variant="ghost" size="sm" asLink href="/">
              Landing Page
            </Button>
            <Button variant="danger" size="sm" onClick={handleLogout} type="button">
              Sair
            </Button>
          </div>
        </div>
      </header>

      
      <main id="conteudo-principal" role="main" className="container mx-auto w-full flex-1 px-4 py-9">

        
        <div style={{ marginBottom: '28px' }}>
          <p className="kicker">Painel de Controle</p>
          <h1 style={{ fontSize: '28px', marginTop: '4px', marginBottom: '8px' }}>
            Optic Fusion Studio — Telemetria de IA & Consumo de API
          </h1>
          <p className="muted" style={{ maxWidth: '680px' }}>
            Supervisione os algoritmos de detecção visual, calibração de lentes e execute inferências fotográficas via API Route.
          </p>
        </div>

        
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard value="98.4" unit="%" label="Precisão de Enquadramento" />
          <StatCard value="18" unit="ms" label="Latência de Inferência" />
          <StatCard value={history.length} label="Análises na Sessão" />
          <StatCard value={averageHistoryScore || '92.5'} unit=" pts" label="Média de Qualidade Geral" />
        </div>

        
        <section
          aria-labelledby="api-station-title"
          className="glass-panel mb-8 rounded-2xl border border-cyan-400/25 p-5 sm:p-7"
          style={{ background: 'linear-gradient(180deg, rgba(10, 13, 20, 0.9), rgba(5, 6, 10, 0.95))' }}
        >
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="kicker" style={{ color: 'var(--cyan)' }}>Consumo de API em Tempo Real</p>
              <h2 id="api-station-title" style={{ fontSize: '22px', margin: '4px 0 8px' }}>
                Estação de Inferência Neural Fotográfica
              </h2>
              <p className="muted" style={{ fontSize: '13px', margin: 0 }}>
                Selecione uma fotografia para disparar a requisição assíncrona ao endpoint <code>GET /api/analysis</code>.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {result && (
                <Button variant="ghost" size="sm" onClick={resetAnalysis} type="button">
                  Limpar Resultado
                </Button>
              )}
            </div>
          </div>

          
          <div className="mb-6 flex flex-col items-stretch gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center">
            <label htmlFor="sample-selector" style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Amostra para teste:
            </label>
            <select
              id="sample-selector"
              className="input"
              value={selectedSample}
              onChange={(e) => setSelectedSample(e.target.value)}
              style={{ minWidth: '280px', flex: 1, background: '#0a0d14', color: '#fff' }}
            >
              <option value="portrait-ideal">📸 Retrato 1 — Luz Natural & Composição Áurea (Sucesso A+)</option>
              <option value="portrait-tilt">📐 Retrato 2 — Horizonte Desnivelado / Torto (Necessita Correção)</option>
              <option value="landscape-urban">🏙️ Paisagem 3 — Urbano e Linhas Guia</option>
              <option value="empty">📭 Amostra Inexistente (Demonstrar Empty State)</option>
              <option value="error">⚠️ Falha no Servidor (Demonstrar Error State)</option>
            </select>

            <Button
              variant="primary"
              onClick={handleRunAnalysis}
              disabled={isLoading}
              type="button"
            >
              {isLoading ? 'Consultando API...' : 'Analisar Fotografia'}
            </Button>
          </div>

          
          {isLoading && (
            <div
              role="status"
              aria-live="polite"
              style={{
                padding: '48px 24px',
                textAlign: 'center',
                borderRadius: '12px',
                border: '1px dashed rgba(0, 229, 255, 0.3)',
                background: 'rgba(0, 229, 255, 0.02)',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  border: '3px solid rgba(0, 229, 255, 0.2)',
                  borderTopColor: '#00e5ff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  margin: '0 auto 16px',
                }}
              />
              <p style={{ fontWeight: 'bold', fontSize: '15px', color: 'var(--cyan)' }}>
                Requisitando endpoint /api/analysis...
              </p>
              <p className="muted" style={{ fontSize: '13px' }}>
                Processando mapa de profundidade, detecção de rostos e grade dos terços no servidor mockado.
              </p>
            </div>
          )}

          
          {!isLoading && error && (
            <div
              role="alert"
              style={{
                padding: '24px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span style={{ fontSize: '28px' }}>⚠️</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', color: '#ef4444', margin: '0 0 6px' }}>
                    Falha na Comunicação com a API
                  </h3>
                  <p className="muted" style={{ fontSize: '13px', margin: '0 0 14px' }}>
                    {error}
                  </p>
                  <Button variant="danger" size="sm" onClick={handleRunAnalysis} type="button">
                    Tentar Novamente (Retry)
                  </Button>
                </div>
              </div>
            </div>
          )}

          
          {!isLoading && !error && isEmpty && (
            <div
              role="status"
              style={{
                padding: '40px 24px',
                textAlign: 'center',
                borderRadius: '12px',
                border: '1px dashed var(--border)',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '10px' }}>📭</span>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>Nenhum Dado Encontrado</h3>
              <p className="muted" style={{ fontSize: '13px', maxWidth: '480px', margin: '0 auto 16px' }}>
                A API retornou uma resposta válida, mas sem telemetria associada para a amostra selecionada.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedSample('portrait-ideal');
                  analyzePhoto('portrait-ideal', 'Retrato Ideal');
                }}
                type="button"
              >
                Carregar Amostra Padrão
              </Button>
            </div>
          )}

          
          {!isLoading && !error && result && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              
              <div
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="muted" style={{ fontSize: '12px' }}>Diagnóstico Geral</span>
                  <Badge variant={result.score >= 80 ? 'success' : 'purple'}>{grade}</Badge>
                </div>

                <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>{result.sampleName}</h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--cyan)' }}>
                    {result.score}
                  </span>
                  <span className="muted" style={{ fontSize: '14px' }}>/ 100 pontos</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="muted">Inclinação Detectada:</span>
                    <strong style={{ color: Math.abs(result.tiltAngle) > 1.5 ? '#ef4444' : '#00e676' }}>
                      {result.tiltAngle > 0 ? `+${result.tiltAngle}°` : `${result.tiltAngle}°`}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="muted">Regra dos Terços:</span>
                    <strong>{result.ruleOfThirdsScore}%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="muted">ISO Recomendado:</span>
                    <strong>ISO {result.suggestedIso}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="muted">Nível de Luminosidade:</span>
                    <strong style={{ textTransform: 'capitalize' }}>{result.brightnessLevel}</strong>
                  </div>
                </div>

                {result.model && (
                  <p className="muted" style={{ fontSize: '11px', marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                    🤖 Modelo: {result.model} • Latência: {result.latencyMs || 22}ms
                  </p>
                )}
              </div>

              
              <div
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  💡 Recomendações em Tempo Real
                </h3>

                <ul style={{ paddingLeft: '18px', margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {result.recommendations?.map((tip, idx) => (
                    <li key={idx} style={{ fontSize: '13px', lineHeight: 1.5 }}>
                      {tip}
                    </li>
                  ))}
                </ul>

                {result.technicalMetrics && (
                  <div
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'rgba(0, 229, 255, 0.05)',
                      border: '1px solid rgba(0, 229, 255, 0.15)',
                    }}
                  >
                    <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 'bold', color: 'var(--cyan)' }}>
                      PARÂMETROS DO SENSOR VIRTUAL:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '12px' }}>
                      <span>Velocidade: {result.technicalMetrics.shutterSpeed}</span>
                      <span>Abertura: {result.technicalMetrics.aperture}</span>
                      <span>Focal: {result.technicalMetrics.focalLength}</span>
                      <span>Ruído: {result.technicalMetrics.noiseIndex}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          
          {history.length > 0 && (
            <div style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="muted" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  Histórico Recente na Sessão ({history.length} análises)
                </span>
                <button
                  type="button"
                  onClick={clearHistory}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--cyan)',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  Limpar histórico
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {history.map((h, idx) => (
                  <span
                    key={`${h.id || idx}`}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border)',
                      fontSize: '12px',
                    }}
                  >
                    {h.sampleName}: <strong>{h.score} pts</strong>
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          
          <Card className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚙️ Parâmetros de Aquisição IA
            </h2>

            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="mode-select" style={{ display: 'block', fontSize: '13px', marginBottom: '6px', fontWeight: 'bold' }}>
                Modo Contextual de Cena
              </label>
              <select
                id="mode-select"
                className="input"
                value={activeMode}
                onChange={(e) => setActiveMode(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              >
                <option value="portrait" style={{ background: '#111' }}>Retrato com Detecção Facial</option>
                <option value="landscape" style={{ background: '#111' }}>Paisagem com Nivelamento de Horizonte</option>
                <option value="document" style={{ background: '#111' }}>Documento com Correção de Perspectiva</option>
                <option value="macro" style={{ background: '#111' }}>Macro com Profundidade Inteligente</option>
              </select>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="iso-select" style={{ display: 'block', fontSize: '13px', marginBottom: '6px', fontWeight: 'bold' }}>
                Sensibilidade ISO Sugerida
              </label>
              <select
                id="iso-select"
                className="input"
                value={iso}
                onChange={(e) => setIso(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              >
                <option value="100" style={{ background: '#111' }}>ISO 100 — Luz Intensa (Sol direto)</option>
                <option value="200" style={{ background: '#111' }}>ISO 200 — Iluminação de Estúdio</option>
                <option value="400" style={{ background: '#111' }}>ISO 400 — Ambiente Interno</option>
                <option value="800" style={{ background: '#111' }}>ISO 800 — Baixa Luminosidade</option>
                <option value="1600" style={{ background: '#111' }}>ISO 1600 — Noturno com Redução de Ruído</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={compositionGuide}
                  onChange={(e) => setCompositionGuide(e.target.checked)}
                />
                Exibir grade de Regra dos Terços dinâmica na tela
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={autoLevel}
                  onChange={(e) => setAutoLevel(e.target.checked)}
                />
                Ativar autocorreção de horizonte (giroscópio + IA)
              </label>
            </div>
          </Card>

          
          <Card className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>
              📷 Visor de Telemetria (Live Preview)
            </h2>

            <div
              style={{
                position: 'relative',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#0a0d14',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/img/after.png"
                alt="Simulação do sensor de câmera com IA ativa"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />

              {compositionGuide && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridTemplateRows: '1fr 1fr 1fr',
                  }}
                >
                  <div style={{ borderRight: '1px dashed rgba(0, 229, 255, 0.4)', borderBottom: '1px dashed rgba(0, 229, 255, 0.4)' }} />
                  <div style={{ borderRight: '1px dashed rgba(0, 229, 255, 0.4)', borderBottom: '1px dashed rgba(0, 229, 255, 0.4)' }} />
                  <div style={{ borderBottom: '1px dashed rgba(0, 229, 255, 0.4)' }} />
                  <div style={{ borderRight: '1px dashed rgba(0, 229, 255, 0.4)', borderBottom: '1px dashed rgba(0, 229, 255, 0.4)' }} />
                  <div style={{ borderRight: '1px dashed rgba(0, 229, 255, 0.4)', borderBottom: '1px dashed rgba(0, 229, 255, 0.4)' }} />
                  <div style={{ borderBottom: '1px dashed rgba(0, 229, 255, 0.4)' }} />
                  <div style={{ borderRight: '1px dashed rgba(0, 229, 255, 0.4)' }} />
                  <div style={{ borderRight: '1px dashed rgba(0, 229, 255, 0.4)' }} />
                  <div />
                </div>
              )}

              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: 'rgba(0,0,0,0.6)',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#00e5ff',
                }}
              >
                MODE: {activeMode.toUpperCase()} | ISO {iso}
              </div>

              {autoLevel && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(0, 230, 118, 0.2)',
                    border: '1px solid #00e676',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: '#00e676',
                  }}
                >
                  ✓ LEVEL 0.0°
                </div>
              )}
            </div>

            <p className="muted" style={{ fontSize: '12px', marginTop: '12px' }}>
              O assistente calcula dinamicamente os eixos de inclinação e ajusta as linhas de composição com base na geometria da cena.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
