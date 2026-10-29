'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button.jsx';


export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div
        className="container"
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '16px',
        }}
        role="status"
        aria-live="polite"
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(0, 229, 255, 0.2)',
            borderTopColor: '#00e5ff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p className="muted">Verificando credenciais e integridade da sessão...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main
        id="conteudo-principal"
        role="main"
        className="container"
        style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
        }}
      >
        <div
          className="glass-panel"
          style={{
            maxWidth: '560px',
            width: '100%',
            padding: '36px',
            textAlign: 'center',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            boxShadow: '0 0 32px rgba(239, 68, 68, 0.08)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 18px',
            }}
          >
            🔒
          </div>

          <p className="kicker" style={{ color: '#ef4444' }}>Acesso Restrito</p>
          <h1 style={{ fontSize: '24px', marginTop: '6px', marginBottom: '12px' }}>
            Área Privada — Optic Fusion Studio
          </h1>

          <p className="muted" style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
            Esta rota é privada e requer autenticação prévia. Usuários não autenticados não possuem permissão para acessar as ferramentas de telemetria fotográfica com IA.
          </p>

          <div
            style={{
              padding: '12px 14px',
              background: 'rgba(234, 179, 8, 0.08)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              borderRadius: '8px',
              textAlign: 'left',
              fontSize: '12px',
              lineHeight: 1.5,
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '24px',
            }}
          >
            <strong>⚠️ Nota Acadêmica (Escopo Demonstrativo):</strong>
            <br />
            Esta proteção de rotas opera em camada de cliente (React App Router + Context API), atendendo aos requisitos acadêmicos da Sprint 4. Em produção comercial, requer autenticação via backend seguro com tokens HTTP-only e middleware no servidor.
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" asLink href="/login?redirect=/dashboard">
              Ir para Tela de Login
            </Button>
            <Button variant="ghost" asLink href="/">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
