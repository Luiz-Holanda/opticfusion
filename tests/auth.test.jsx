import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function TestConsumer() {
  const { user, isAuthenticated, login, logout, error } = useAuth();
  return (
    <div>
      <p data-testid="auth-status">{isAuthenticated ? 'LOGADO' : 'DESLOGADO'}</p>
      {user && <p data-testid="user-email">{user.email}</p>}
      {error && <p data-testid="auth-error">{error}</p>}
      <button
        onClick={() => login('jovi@opticfusion.com', 'jovi2025')}
        data-testid="login-btn"
      >
        Entrar
      </button>
      <button
        onClick={() => login('errado@opticfusion.com', '12345')}
        data-testid="login-invalid-btn"
      >
        Entrar Invalido
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Sair
      </button>
    </div>
  );
}

describe('AuthContext e ProtectedRoute (Rotas Públicas e Privadas)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('deve inicializar deslogado', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('DESLOGADO');
  });

  it('deve logar com sucesso com credenciais válidas', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('LOGADO');
    expect(screen.getByTestId('user-email')).toHaveTextContent('jovi@opticfusion.com');
  });

  it('deve falhar ao logar com credenciais inválidas', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByTestId('login-invalid-btn').click();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('DESLOGADO');
    expect(screen.getByTestId('auth-error')).toHaveTextContent('Credenciais inválidas');
  });

  it('deve deslogar e limpar a sessão', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByTestId('login-btn').click();
    });
    expect(screen.getByTestId('auth-status')).toHaveTextContent('LOGADO');

    await act(async () => {
      screen.getByTestId('logout-btn').click();
    });
    expect(screen.getByTestId('auth-status')).toHaveTextContent('DESLOGADO');
  });

  it('ProtectedRoute deve exibir bloqueio quando não autenticado', () => {
    render(
      <AuthProvider>
        <ProtectedRoute>
          <div data-testid="protected-content">Conteúdo Privado do Studio</div>
        </ProtectedRoute>
      </AuthProvider>
    );

    expect(screen.queryByTestId('protected-content')).toBeNull();
    expect(screen.getByText(/Acesso Restrito/i)).toBeInTheDocument();
  });
});
