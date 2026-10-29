import { ProtectedRoute } from '@/components/auth/ProtectedRoute.jsx';
import { Button } from '@/components/ui/Button.jsx';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main id="conteudo-principal" className="container" style={{ minHeight: '70vh', padding: '48px 20px' }}>
        <section className="glass-panel" style={{ maxWidth: '720px', margin: '0 auto', padding: '32px' }}>
          <p className="kicker">Área privada</p>
          <h1 style={{ fontSize: '28px' }}>Optic Fusion Studio</h1>
          <p className="muted">A sessão foi validada. O painel de análise será desenvolvido na próxima etapa.</p>
          <Button variant="ghost" asLink href="/">Voltar à página inicial</Button>
        </section>
      </main>
    </ProtectedRoute>
  );
}
