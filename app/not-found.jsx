import Link from 'next/link';
import { Button } from '@/components/ui/Button.jsx';

export default function NotFound() {
  return (
    <div className="page min-h-screen flex flex-col">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <header role="banner" style={{ borderBottom: '1px solid var(--border)', background: 'var(--panel-bg)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <Link href="/" className="brand" aria-label="Ir para a página inicial">
            <img src="/img/logo.png" alt="Logo" className="brand-mark" />
            <span className="brand-text">
              OPTIC <span>FUSION</span>
            </span>
          </Link>
          <Button variant="ghost" asLink href="/">
            ← Início
          </Button>
        </div>
      </header>

      <main
        id="conteudo-principal"
        role="main"
        className="container"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 16px',
        }}
      >
        <div
          className="glass-panel"
          style={{
            maxWidth: '520px',
            width: '100%',
            padding: '48px 32px',
            textAlign: 'center',
            borderRadius: '20px',
            border: '1px solid var(--border)',
          }}
        >
          <span
            style={{
              fontSize: '64px',
              fontWeight: '900',
              lineHeight: 1,
              background: 'linear-gradient(135deg, var(--cyan), #7c4dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            404
          </span>
          <p className="kicker">Erro de Localização</p>
          <h1 style={{ fontSize: '24px', margin: '8px 0 16px' }}>
            Enquadramento Não Encontrado
          </h1>
          <p className="muted" style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '28px' }}>
            A página ou rota solicitada não existe, foi removida ou está temporariamente fora de foco. Utilize os botões abaixo para retornar à navegação padrão do projeto.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" asLink href="/">
              Voltar à Página Inicial
            </Button>
            <Button variant="ghost" asLink href="/consulta-rm">
              Consultar Integrantes (RM)
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
