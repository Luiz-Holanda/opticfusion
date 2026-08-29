export const TEAM = [
  { name: 'Felipe Ribeiro', rm: '573818', role: 'Desenvolvimento Front-End', desc: 'Responsável pela construção da interface e implementação das funcionalidades web com Next.js e React.' },
  { name: 'Luiz Alberto', rm: '573843', role: 'UX Design', desc: 'Especialista em experiência do usuário, prototipagem de alta fidelidade e design de interfaces visuais.' },
  { name: 'Milena Kubo', rm: '572590', role: 'Pesquisa e Análise', desc: 'Responsável por pesquisa de campo, análise de requisitos e validação de hipóteses com usuários reais.' },
  { name: 'Yasmim Kim', rm: '571494', role: 'Estratégia e Gestão', desc: 'Planejamento estratégico, gestão de escopo e alinhamento com stakeholders da Challenge.' },
];

export const FEATURES = [
  { icon: '⚡', title: 'Captura Inteligente', desc: 'A IA sugere o momento ideal e reduz drasticamente o número de tentativas.' },
  { icon: '📐', title: 'Correção Automática', desc: 'Ajuste de inclinação e alinhamento em tempo real para fotos sempre retas.' },
  { icon: '🙂', title: 'Reconhecimento Facial', desc: 'Prioriza rostos humanos e melhora a composição com suavidade e naturalidade.' },
  { icon: '🖼️', title: 'Enquadramento Adaptativo', desc: 'Mantém o assunto no centro sem cortes indesejados nem perda de contexto.' },
  { icon: '🧠', title: 'IA Contextual', desc: 'Entende o cenário (documento, quadro, paisagem, pessoa) e adapta o modo de captura.' },
  { icon: '👁️', title: 'Assistente Visual', desc: 'Overlays discretos para orientar o usuário sem poluir a tela nem distrair.' },
];

export const SLIDES = [
  {
    badge: 'Real-time',
    title: 'Guias inteligentes na tela',
    text: 'Linhas e cantos sutis orientam o ângulo perfeito em segundos.',
    image: '/img/slide1.png'
  },
  {
    badge: 'Auto-fix',
    title: 'Correção automática de inclinação',
    text: 'Menos pós-edição. Mais fotos prontas no primeiro clique.',
    image: '/img/slide2.png'
  },
  {
    badge: 'Framing',
    title: 'Enquadramento que se adapta',
    text: 'A câmera ajusta a composição para reduzir cortes e distrações.',
    image: '/img/slide3.png'
  },
];

export const VALID_USERS = [
  { email: 'jovi@opticfusion.com', password: 'jovi2025' },
  { email: 'admin@jovi.com', password: 'admin123' },
];

export const NAV_LINKS = [
  { href: '#solution', label: 'A Solução' },
  { href: '#target-audience', label: 'Público-Alvo' },
  { href: '#highlights', label: 'Destaques' },
  { href: '#team', label: 'Nossa Equipe' },
  { href: '#contact', label: 'Contato' },
];

export const EXPERIENCE_STEPS = [
  { number: 1, image: '/img/TELA1.jpg', text: 'Detecção inicial. Enquadramento subótimo identificado.', success: false, focus: false },
  { number: 2, image: '/img/TELA2.jpg', text: 'Instrução contextual para ajuste de distância.', success: false, focus: false },
  { number: 3, image: '/img/TELA3.jpg', text: 'Refinamento de eixo horizontal para simetria.', success: false, focus: false },
  { number: 4, image: '/img/TELA4.jpg', text: 'Convergência. O sistema confirma o alinhamento iminente.', success: false, focus: true },
  { number: 5, image: '/img/TELA5.jpg', text: 'Captura otimizada. Experiência sem atrito.', success: true, focus: false },
];

export const PAIN_POINTS = [
  { variant: 'tilt', title: 'Quadro torto', desc: 'Perde legibilidade e exige "gambiarra" depois na edição.' },
  { variant: 'crop', title: 'Enquadramento ruim', desc: 'Assunto cortado, contexto perdido, foto inutilizável.' },
  { variant: 'light', title: 'Luz incorreta', desc: 'Sombras, reflexos e estouro de branco que arruínam a foto.' },
];

export const DEMO_BULLETS = [
  'Feedback visual imediato sobre a qualidade do enquadramento',
  'Correção automática de inclinação na hora da captura',
  'Enquadramento adaptativo que segue o assunto principal',
];

export const TARGET_AUDIENCE = [
  {
    icon: '📸',
    title: 'Fotógrafos Amadores',
    desc: 'Pessoas que amam registrar momentos e querem melhorar a qualidade das fotos sem gastar horas editando.'
  },
  {
    icon: '🎓',
    title: 'Estudantes e Universitários',
    desc: 'Alunos que precisam de fotos de qualidade para trabalhos, documentos e registros acadêmicos.'
  },
  {
    icon: '💼',
    title: 'Profissionais Autônomos',
    desc: 'Freelancers e empreendedores que precisam de fotos profissionais para redes sociais e portfólios.'
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Famílias e Usuários Comuns',
    desc: 'Pessoas que querem capturar memórias especiais com qualidade, sem complicação técnica.'
  },
];

export const HERO_STATS_LABELS = [
  'Tentativas reduzidas',
  'Qualidade aprimorada',
  'Tempo economizado',
];

export const SOLUTION_ASIDE_FACTS = [
  'Até 85% menos tentativas por foto',
  'Processamento em tempo real',
  'Sem necessidade de edição posterior',
  'Funciona em smartphone comum',
];
