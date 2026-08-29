# OPTIC FUSION

> Fotografia inteligente movida por IA.

Landing page do projeto **Optic Fusion** — um assistente de câmera com Inteligência Artificial que analisa o cenário em tempo real, sugere correções de enquadramento, inclinação e iluminação, e ajuda o usuário a capturar fotos melhores no primeiro clique.

Projeto acadêmico desenvolvido para as disciplinas de **Front-End** e **Desenvolvimento Web (React / Next.js)**.

---

## Tecnologias utilizadas

Lista de tecnologias **realmente utilizadas** no projeto:

- **Next.js 16** (App Router)
- **React 19** (componentes funcionais com hooks: `useState`, `useEffect`)
- **JavaScript** (sem TypeScript, conforme requisito)
- **CSS Tradicional** (sem Tailwind)
- **CSS Grid** (sistema principal de layout em TODAS as seções)
  - `grid-template-columns`
  - `grid-template-rows`
  - `grid-template-areas`
  - `grid-area`
  - `grid-column: span N`
  - `grid-row: span N`
  - `justify-content`
  - `align-content`
  - `gap`
- **Flexbox** (alinhamentos complementares internos)
- **HTML Semântico**
  - `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`
  - `<aside>`, `<figure>`, `<figcaption>`, `<footer>`
  - `<form>`, `<label>`, `<button>`, `<select>`, `<option>`
  - `<h1>` até `<h3>` em hierarquia correta
- **Atributos ARIA** (`aria-label`, `aria-labelledby`, `aria-live`, `aria-invalid`, `role`, etc.)
- **localStorage** (auto-salvar rascunho do formulário de contato — SSR-safe com `useEffect`)
- **Objeto Math** (`Math.random()`, `Math.floor()`, `Math.round()`, `Math.max()`, `Math.min()`, `Math.pow()`)
- **IntersectionObserver** (via hook `useRevealAll` para animações de scroll)
- **Next/font** (Geist Sans + Geist Mono)

---

## Instalação

Pré-requisitos:
- **Node.js** 18+ (recomendado 20 LTS)
- **npm** ou **pnpm** / **yarn**

Na raiz do projeto, instale todas as dependências listadas no `package.json`:

```bash
npm install
```

---

## Execução

### Ambiente de desenvolvimento

```bash
npm run dev
```

Abra no navegador o endereço exibido no terminal (padrão: **http://localhost:3000**).

---

## Build (produção)

### 1. Gerar versão otimizada

```bash
npm run build
```

O Next.js vai compilar as páginas, gerar assets otimizados e validar o projeto.

### 2. Iniciar servidor de produção

```bash
npm start
```

A aplicação será servida na porta **3000** (padrão).

---

## Autenticação

A landing page possui dois modais de demonstração para área interna:

### 1. Modal de Login (Acesso interno)

| E-mail                  | Senha       |
| ----------------------- | ----------- |
| `jovi@opticfusion.com`  | `jovi2025`  |
| `admin@jovi.com`        | `admin123`  |

### 2. Modal de Consulta por RM

RMs válidos (consulta na base em `data/constants.js`):

| RM       | Nome Completo   |
| -------- | --------------- |
| `573818` | Felipe Ribeiro  |
| `573843` | Luiz Alberto    |
| `572590` | Milena Kubo     |
| `571494` | Yasmim Kim      |

> **Atenção:** Autenticação e consulta de RM são **apenas demonstrações em front-end**, sem back-end real ou banco de dados. Não há persistência de sessão.

---

## Utilização de IA (Inteligência Artificial)

No desenvolvimento deste projeto acadêmico, a Inteligência Artificial foi utilizada **somente em duas situações específicas**, com supervisão e validação humana de 100% do resultado final:

1. **Elaboração do arquivo README.md**: A IA foi utilizada como auxílio na redação e formatação deste documento em Markdown, incluindo a organização das seções e a documentação técnica do projeto. Todo o conteúdo foi revisado e validado pelos integrantes.

2. **Resolução de problemas pontuais no código**: A IA foi utilizada pontualmente para identificar e corrigir bugs específicos, como por exemplo a correção do hook `useRevealAll` que causava a não renderização visual dos componentes da seção Experience Steps. Nenhuma funcionalidade ou seção completa do projeto foi criada por IA — o código foi desenvolvido integralmente pelos integrantes, com a IA atuando apenas como ferramenta de depuração em casos isolados.

Todo o restante do projeto (design, layout, arquitetura de componentes, lógica de negócio, estilos CSS, estrutura de pastas, etc.) foi desenvolvido manualmente pela equipe, sem utilização de IA.

---

## Deploy na Vercel

> Status: **Preparado para deploy** — configurações Next.js 16 padrão compatíveis com a Vercel, zero-config.

### Como publicar na Vercel (passo a passo)

1. **Crie/acesse** sua conta em [vercel.com](https://vercel.com/).
2. Clique em **Add New → Project**.
3. **Importe este repositório GitHub**.
4. Na tela **Configure Project**:
   - **Framework Preset**: `Next.js` (detectado automaticamente)
   - **Build Command**: `next build` (ou `npm run build`)
   - **Output Directory**: `.next` (padrão)
   - **Root Directory**: `./`
   - **Install Command**: `npm install`
5. Em **Environment Variables** — nenhuma variável é obrigatória para a landing page. Se usar APIs futuramente, cadastre-as aqui.
6. Clique em **Deploy**.

Link de produção após deploy:
```
https://[SEU-PROJETO].vercel.app
```

> ✅ O build `npm run build` já foi validado localmente com sucesso. O deploy na Vercel vai repetir exatamente o mesmo processo.

---

## GitHub

Link do repositório:
```
https://github.com/Luiz-Holanda/opticfusion
```

### Status do versionamento

- [x] `.gitignore` configurado (Node, Next, Vercel, IDE, archives .zip)
- [x] Nenhum segredo / credencial versionado
- [x] Estrutura organizada por responsabilidade (`app/`, `components/`, `data/`, `hooks/`, `public/`)

---

## Estrutura de pastas

```
opticfusion/
├── app/
│   ├── globals.css              # CSS global, breakpoints mobile-first, CSS Grid completo
│   ├── layout.jsx               # HTML raiz, metadata, fontes (Next App Router)
│   ├── page.jsx                 # Página inicial: monta Header → Main → Seções → Footer
│   └── page.module.css          # Estilos escopados de página
├── components/
│   ├── layout/
│   │   ├── Footer.jsx           # Rodapé semântico com 3 colunas em Grid
│   │   ├── Modal.jsx            # Modal base reutilizável (pai → filhos Login/RMLookup)
│   │   └── Nav.jsx              # Navegação fixa (também em Grid: brand / links / CTA)
│   ├── modals/
│   │   ├── LoginModal.jsx       # Login com validação e 2 usuários demo
│   │   └── RMLookupModal.jsx    # Busca de integrante por RM
│   ├── sections/                # 10 seções React funcionais independentes
│   │   ├── DemoSection.jsx      # Comparação interativa "Antes/Depois"
│   │   ├── EarlyAccessCTA.jsx   # Formulário de contato c/ localStorage SSR-safe
│   │   ├── ExperienceSteps.jsx  # Passo a passo (5 etapas em Grid)
│   │   ├── FeaturesSection.jsx  # Funcionalidades (Grid de 6 cards)
│   │   ├── GallerySection.jsx   # Galeria com <figure>/<figcaption> + <aside>
│   │   ├── Hero.jsx             # Cabeçalho c/ estatísticas (Math)
│   │   ├── HighlightsSection.jsx# Carrossel com 3 slides (botões Grid)
│   │   ├── ProblemSection.jsx   # "Dores" / pontos do problema (Grid 3 cards)
│   │   ├── TargetAudienceSection.jsx # 4 perfis de público-alvo
│   │   └── TeamSection.jsx      # Equipe com 4 TeamCards (props pai→filho)
│   └── ui/
│       ├── Alert.jsx            # Feedback visual do formulário
│       ├── Button.jsx           # Botão reutilizável com variants/sizes via props
│       └── TeamCard.jsx         # Card de integrante (props: name, role, rm, desc)
├── data/
│   └── constants.js             # Dados: TEAM, FEATURES, NAV_LINKS, GALLERY_ITEMS, etc.
├── hooks/
│   ├── useModal.js              # Hook para estado de abertura/fechamento de modais
│   └── useReveal.js             # Hook com IntersectionObserver (animações reveal)
├── public/
│   └── img/                     # Logos, telas mockadas, favicon
│       ├── TELA1-5.jpg          # Telas do fluxo de 5 passos
│       ├── slide1-3.png         # Telas do carrossel Highlights
│       ├── before.png/after.png # Comparação Antes/Depois (Demo)
│       ├── logo.png             # Logotipo horizontal
│       └── logo.ico             # Favicon
├── INTEGRANTES.TXT              # Nome completo + RM de cada integrante
├── orientações.txt              # Requisitos acadêmicos da entrega
├── README.md                    # Este arquivo
├── package.json
├── package-lock.json
├── jsconfig.json                # Alias @/ → ./
├── eslint.config.mjs
├── next.config.mjs
└── .gitignore                   # Next.js + Vercel + IDE + archives
```

---



### Entrega

- ✅ `README.md` completo (100% das seções)
- ✅ `INTEGRANTES.TXT` na raiz, com 4 integrantes reais + RM
- ✅ `npm run dev` inicia sem erros
- ✅ `npm run build` compila sem erros (validar no final)

---

**Equipe Optic Fusion • Projeto acadêmico • 2026**
