'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button.jsx';
import { Alert } from '@/components/ui/Alert.jsx';
import { VALID_USERS } from '@/data/constants';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: 'info', message: '' });

  // Leva usuários autenticados diretamente ao painel.
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setAlert({ type: 'error', message: 'Por favor, preencha todos os campos.' });
      return;
    }

    setSubmitting(true);
    setAlert({ type: 'info', message: 'Validando credenciais...' });

    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      setAlert({ type: 'success', message: 'Login realizado com sucesso! Redirecionando...' });
      setTimeout(() => {
        router.push('/dashboard');
      }, 600);
    } else {
      setAlert({ type: 'error', message: result.error || 'Credenciais inválidas.' });
    }
  };

  const handleQuickFill = (user) => {
    setEmail(user.email);
    setPassword(user.password);
    setAlert({
      type: 'info',
      message: `Credenciais de teste preenchidas para ${user.email}`,
    });
  };

  return (
    <div className="page min-h-screen flex flex-col">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <header role="banner" style={{ borderBottom: '1px solid var(--border)', background: 'var(--panel-bg)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <Link href="/" className="brand" aria-label="Voltar para a página inicial">
            <img src="/img/logo.png" alt="Logo" className="brand-mark" />
            <span className="brand-text">
              OPTIC <span>FUSION</span>
            </span>
          </Link>
          <Button variant="ghost" asLink href="/">
            ← Voltar ao site
          </Button>
        </div>
      </header>

      <main id="conteudo-principal" role="main" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
        <div className="glass-panel mx-auto w-full max-w-md rounded-2xl border border-white/10 p-6 sm:p-9">
          <p className="kicker" style={{ textAlign: 'center' }}>Área Restrita</p>
          <h1 style={{ fontSize: '24px', textAlign: 'center', marginTop: '6px', marginBottom: '8px' }}>
            Acesso Interno
          </h1>
          <p className="muted" style={{ fontSize: '13px', textAlign: 'center', marginBottom: '24px' }}>
            Entre com suas credenciais para acessar o painel de telemetria fotográfica e assistente IA.
          </p>

          {alert.message && (
            <div style={{ marginBottom: '18px' }}>
              <Alert type={alert.type} message={alert.message} />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="login-email" className="form-label" style={{ display: 'block', marginBottom: '6px', fontSize: '13px' }}>
                E-mail institucional
              </label>
              <input
                id="login-email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@opticfusion.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label htmlFor="login-password" className="form-label" style={{ display: 'block', marginBottom: '6px', fontSize: '13px' }}>
                Senha de acesso
              </label>
              <input
                id="login-password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={submitting}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {submitting ? 'Entrando...' : 'Entrar no Studio'}
            </Button>
          </form>

          
          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--cyan)', marginBottom: '8px' }}>
              🔑 Credenciais de Teste (Escopo Acadêmico):
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {VALID_USERS.map((u) => (
                <div
                  key={u.email}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                >
                  <div>
                    <code>{u.email}</code>
                    <br />
                    <span className="muted">senha: <code>{u.password}</code></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickFill(u)}
                    style={{
                      background: 'rgba(0, 229, 255, 0.1)',
                      border: '1px solid rgba(0, 229, 255, 0.25)',
                      color: 'var(--cyan)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '11px',
                    }}
                  >
                    Preencher
                  </button>
                </div>
              ))}
            </div>

            <p className="muted" style={{ fontSize: '11px', marginTop: '12px', lineHeight: 1.4 }}>
              * Esta autenticação tem finalidade estritamente avaliativa e acadêmica, sem armazenamento de segredos reais.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
