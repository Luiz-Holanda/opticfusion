# OPTIC FUSION — Fotografia Inteligente Movida por IA

> **Challenge JOVI — Sprint 4**  
> Entrega conjunta das disciplinas de **Web Development** e **Front-End Design**

Landing page e aplicação web do projeto **Optic Fusion** — um assistente de câmera com Inteligência Artificial que analisa o cenário em tempo real, sugere correções de enquadramento pela regra dos terços, ajusta inclinação do horizonte e calibra sensibilidade ISO, permitindo capturar fotografias de padrão profissional no primeiro clique.

---

## 👥 Integrantes da Equipe

Conforme registrado oficialmente em `INTEGRANTES.TXT`:

| Nome Completo | RM | Função Principal |
| :--- | :--- | :--- |
| **Felipe Ribeiro da Silva** | `573818` | Desenvolvimento Front-End & Integração React |
| **Luiz Alberto de Carvalho Holanda Junior** | `573843` | UX Design & Arquitetura de Componentes |
| **Milena Kubo de Biaggi** | `572590` | Pesquisa de Usuários & Análise de Requisitos |
| **Yasmim Eun Hae Kim** | `571494` | Estratégia de Produto & Gestão do Projeto |

---

## 🚀 Links do Projeto

- **Deploy em Produção (Vercel):** [https://opticfusion-red.vercel.app/](https://opticfusion-red.vercel.app/)
- **Repositório GitHub:** [https://github.com/Luiz-Holanda/opticfusion](https://github.com/Luiz-Holanda/opticfusion)

---

## 🛠️ Tecnologias Utilizadas

A solução foi construída utilizando ferramentas modernas de desenvolvimento web:

- **Next.js 16 (App Router com Turbopack):** Framework React para renderização híbrida, roteamento baseado em arquivos e API Routes.
- **React 19:** Biblioteca base com componentes funcionais modernos e hooks avançados:
  - Hooks nativos: `useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`, `useSyncExternalStore`.
- **Tailwind CSS + PostCSS + Autoprefixer:** Framework utilitário de estilização responsiva, harmonizado com o sistema visual cinematográfico dark theme da Sprint 3.
- **CSS Grid & Flexbox:** Sistemas estruturais para alinhamento multidimensional e responsividade em Mobile, Tablet e Desktop.
- **API Routes (Next.js Handler):** Endpoint nativo `GET /api/analysis` para fornecimento de telemetria e análise de visão computacional com IA.
- **Vitest & React Testing Library:** Suíte automatizada com 81 testes cobrindo utilitários matemáticos, persistência, autenticação demonstrativa, consumo de API e o hook customizado.
- **ESLint 9:** Validação estática de código com regras do React Compiler (`eslint-config-next`) com zero advertências e zero erros.
- **Acessibilidade (WCAG 2.1 AA):** Skip link de navegação rápida por teclado (`.skip-link`), estados de foco de alto contraste (`:focus-visible`), textos alternativos e atributos ARIA semânticos.

---

## 🧭 Estrutura de Rotas (Públicas e Privadas)

O projeto implementa uma arquitetura de rotas organizada pelo Next.js App Router:

### 1. Rotas Públicas
- **`/` (Landing Page):** Página inicial completa com as 10 seções da Sprint 3 (Hero, O Problema, A Solução, Jornada em 5 Etapas, Demonstração Antes/Depois, Funcionalidades com IA, Destaques, Público-Alvo, Equipe e Formulário de Early Access com auto-save).
- **`/login`:** Página dedicada de autenticação com formulário acessível, atalhos de preenchimento rápido de credenciais de teste e explicações sobre o escopo demonstrativo.
- **`/consulta-rm`:** Página pública para busca e validação da identificação dos 4 integrantes da equipe por RM ou nome.
- **`app/not-found.jsx` (404):** Página personalizada para rotas inexistentes com opção de retorno à navegação principal.

### 2. Rota Privada (Protegida)
- **`/dashboard` (Optic Fusion Studio):** Painel restrito de telemetria fotográfica com IA.
  - Acessível **apenas** quando o usuário possui sessão ativa no `AuthContext`.
  - Caso um usuário não autenticado tente acessar diretamente a URL `/dashboard`, o componente `ProtectedRoute` bloqueia o conteúdo e exibe o estado de acesso não autorizado, fornecendo link para autenticação.

> ⚠️ **Nota Acadêmica sobre Proteção de Rotas:**  
> A proteção da rota `/dashboard` opera em camada de cliente através de `React Context` (`context/AuthContext.jsx`) e persistência em `localStorage`. Essa abordagem atende plenamente aos requisitos de escopo acadêmico da Sprint 4 sem necessidade de backend com banco de dados. Em um ambiente corporativo de produção, deve ser substituída por tokens JWT assinados via cookies HTTP-only e middleware no servidor.

---

## 🔑 Credenciais de Teste para Avaliação

Para testar a autenticação na página `/login` ou no modal da página inicial, utilize qualquer um dos dois usuários cadastrados:

| E-mail de Teste | Senha | Perfil no Studio |
| :--- | :--- | :--- |
| `jovi@opticfusion.com` | `jovi2025` | Operador / Fotógrafo Beta Tester |
| `admin@jovi.com` | `admin123` | Administrador / Tech Lead JOVI |

*A tela de login conta ainda com botões de "Preenchimento Rápido" para agilizar a validação pelos avaliadores.*

---

## 🎣 Hooks Nativos e Hook Customizado

### 1. Hook Customizado: `usePhotoAnalysis` (`hooks/usePhotoAnalysis.js`)
Separa a lógica de requisição e telemetria da camada de apresentação:
- Realiza a comunicação assíncrona com o endpoint `/api/analysis`.
- Gerencia os estados de:
  - `isLoading`: indicador de carregamento.
  - `result`: dados de inferência fotográfica.
  - `error`: captura de falhas de rede com suporte a nova tentativa (retry).
  - `isEmpty`: tratamento de ausência de resultados.
  - `history`: armazenamento das últimas 5 análises realizadas na sessão.
- Utiliza `useMemo` para computar a nota de qualidade geral (A+, A, B, C) e a pontuação média histórica.
- Possui fallback algorítmico seguro garantindo estabilidade caso o ambiente de rede esteja offline.

### 2. Contexto de Autenticação: `AuthContext` (`context/AuthContext.jsx`)
- Provedor global com `createContext` e hook consumidor `useAuth()`.
- Utiliza `useSyncExternalStore` para sincronização SSR-safe com o armazenamento local, evitando renderizações em cascata e eliminando warnings do React 19.

### 3. Outros Hooks Auxiliares
- `useLocalStorage` (`hooks/useLocalStorage.js`): Persistência reativa SSR-safe com fallback em caso de storage desabilitado.
- `useModal` (`hooks/useModal.js`): Controle acessível de abertura/fechamento de modais.
- `useReveal` (`hooks/useReveal.js`): Animações de entrada no scroll com `IntersectionObserver`.

---

## 📡 Consumo de API: Endpoint `/api/analysis`

O projeto inclui um Route Handler nativo em Next.js (`app/api/analysis/route.js`) que simula a resposta do modelo neural de visão computacional da Optic Fusion:

- **Método:** `GET`
- **Exemplo de chamada:** `/api/analysis?sample=portrait-ideal&delay=400`
- **Parâmetros suportados:**
  - `sample=portrait-ideal`: Retorna análise com pontuação alta (96/100) e alinhamento áureo.
  - `sample=portrait-tilt`: Retorna análise com inclinação acentuada (-3.8°) e instrução de correção.
  - `sample=landscape-urban`: Retorna métricas para fotos urbanas.
  - `sample=empty`: Retorna `{ items: [], total: 0 }` para demonstrar o **Empty State**.
  - `sample=error`: Retorna status HTTP 500 para demonstrar o **Error State** com feedback de erro e botão de retry.

---

## 📦 Como Instalar e Executar Localmente

### Pré-requisitos
- **Node.js:** versão 20.9 ou superior. Next.js 16 não oferece suporte ao Node.js 18.
- **npm:** Versão 10.x ou superior.

### 1. Clonar o repositório
```bash
git clone https://github.com/Luiz-Holanda/opticfusion.git
cd opticfusion
```

### 2. Instalar dependências
```bash
npm ci
```

### 3. Executar o ambiente de desenvolvimento
```bash
npm run dev
```
Acesse no seu navegador: **[http://localhost:3000](http://localhost:3000)**. A rota `/api/analysis` é servida pelo mesmo processo Next.js; não é necessário iniciar um servidor separado.

### 4. Executar os testes automatizados
```bash
npm test
```
*Executa 81 testes com Vitest cobrindo todos os módulos do projeto.*

### 5. Executar o linter (ESLint)
```bash
npm run lint
```

### 6. Gerar build de produção e iniciar
```bash
npm run build
npm start
```

---

## 🤖 Declaração de Uso de IA (Inteligência Artificial)

Em conformidade com os critérios éticos e diretrizes acadêmicas da Sprint 4, declaramos que a Inteligência Artificial foi utilizada exclusivamente nas seguintes situações:

* Criação e formatação deste README;
* Revisão geral do projeto;
* Auxílio pontual na identificação e resolução de bugs.

A equipe revisou as alterações e mantém a responsabilidade pelo conteúdo, pelas decisões de projeto e pela validação final da entrega.

---

## ☁️ Instruções de Deploy na Vercel

O projeto está configurado no padrão zero-config da Vercel para Next.js App Router:

1. Acesse o painel da [Vercel](https://vercel.com/) e clique em **Add New → Project**.
2. Conecte sua conta do GitHub e importe o repositório `Luiz-Holanda/opticfusion`.
3. Verifique as configurações:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
4. Clique em **Deploy**. A Vercel executará o build e publicará a aplicação automaticamente.

Link ativo: **[https://opticfusion-red.vercel.app/](https://opticfusion-red.vercel.app/)**

---

## 🗜️ Instruções para Geração do Pacote ZIP de Entrega

Para preparar o pacote limpo para submissão no portal acadêmico, execute os comandos dentro da pasta `OpticFusion_Sprint4_Entrega`. O arquivo ZIP será criado na pasta pai:

1. Certifique-se de que o projeto foi validado (`npm test`, `npm run lint`, `npm run build`).
2. Garanta que pastas temporárias (`node_modules`, `.next`, `.git`, `.coverage`) **não** sejam compactadas.
3. No terminal do PowerShell, execute o comando abaixo para gerar o arquivo compactado limpo na raiz:

```powershell
$itens = Get-ChildItem -Force | Where-Object { $_.Name -notin @('node_modules', '.next', '.git', 'coverage', '.coverage') }
Compress-Archive -Path $itens.FullName -DestinationPath ..\OpticFusion_Sprint4_Entrega.zip -Force
```

---

**Equipe Optic Fusion • FIAP • Challenge JOVI 2026**
