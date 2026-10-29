'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button.jsx';
import { TeamCard } from '@/components/ui/TeamCard.jsx';
import { TEAM } from '@/data/constants';

export default function ConsultaRmPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const cleanTerm = searchTerm.trim().toLowerCase();
  const filtered = TEAM.filter(
    (m) =>
      m.rm.includes(cleanTerm) ||
      m.name.toLowerCase().includes(cleanTerm) ||
      m.role.toLowerCase().includes(cleanTerm)
  );

  return (
    <div className="page min-h-screen flex flex-col">
      <header role="banner" style={{ borderBottom: '1px solid var(--border)', background: 'var(--panel-bg)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <Link href="/" className="brand" aria-label="Voltar para a página inicial">
            <img src="/img/logo.png" alt="Logo" className="brand-mark" />
            <span className="brand-text">
              OPTIC <span>FUSION</span>
            </span>
          </Link>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="ghost" asLink href="/">
              ← Voltar ao site
            </Button>
            <Button variant="primary" asLink href="/login">
              Acesso interno
            </Button>
          </div>
        </div>
      </header>

      <main id="conteudo-principal" role="main" className="container mx-auto w-full flex-1 px-4 py-12">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header className="section-head" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <p className="kicker">Consulta de Integrantes</p>
            <h1>Pesquisa por RM ou Nome da Equipe</h1>
            <p className="muted">
              Consulte a identificação oficial dos estudantes autores do projeto Optic Fusion na Challenge JOVI.
            </p>
          </header>

          <div
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              marginBottom: '32px',
            }}
          >
            <label htmlFor="search-rm" className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
              Digite o número do RM ou o Nome do integrante:
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                id="search-rm"
                type="search"
                className="input"
                placeholder="Ex: 573843 ou Luiz Alberto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1 }}
              />
              {searchTerm && (
                <Button variant="ghost" onClick={() => setSearchTerm('')} type="button">
                  Limpar
                </Button>
              )}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="muted" style={{ fontSize: '12px' }}>Atalhos de busca rápida:</span>
              {TEAM.map((m) => (
                <button
                  key={m.rm}
                  type="button"
                  onClick={() => setSearchTerm(m.rm)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-dim)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  RM {m.rm} ({m.name.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {filtered.length > 0 ? (
              filtered.map((member, idx) => (
                <div
                  key={member.rm}
                  onClick={() => setSelectedMember(member)}
                  style={{ cursor: 'pointer' }}
                >
                  <TeamCard
                    name={member.name}
                    role={member.role}
                    rm={member.rm}
                    desc={member.desc}
                    highlighted={selectedMember?.rm === member.rm}
                    order={idx + 1}
                  />
                </div>
              ))
            ) : (
              <div
                className="glass-panel"
                style={{
                  gridColumn: '1 / -1',
                  padding: '36px',
                  textAlign: 'center',
                  border: '1px dashed var(--border)',
                }}
              >
                <p style={{ fontSize: '24px', margin: 0 }}>🔍</p>
                <p style={{ fontWeight: 'bold', marginTop: '8px' }}>Nenhum integrante encontrado</p>
                <p className="muted" style={{ fontSize: '13px' }}>
                  Não foi encontrado nenhum integrante com o termo &quot;{searchTerm}&quot;. Tente buscar por um dos RMs válidos: 573818, 573843, 572590 ou 571494.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
