export const TEAM = [
  { name: 'Felipe Ribeiro', rm: '573818', role: 'Front-End' },
  { name: 'Luiz Alberto', rm: '573843', role: 'UX Design' },
  { name: 'Milena Kubo', rm: '572590', role: 'Pesquisa' },
  { name: 'Yasmim Kim', rm: '571494', role: 'Estratégia' },
];

export const FEATURES = [
  { icon: '⚡', title: 'Captura Inteligente', desc: 'A IA sugere o momento ideal e reduz tentativas.' },
  { icon: '📐', title: 'Correção Automática', desc: 'Ajuste de inclinação e alinhamento em tempo real.' },
  { icon: '🙂', title: 'Reconhecimento Facial', desc: 'Prioriza rostos e melhora composição com suavidade.' },
  { icon: '🖼️', title: 'Enquadramento Adaptativo', desc: 'Mantém o assunto no centro, sem cortes indesejados.' },
  { icon: '🧠', title: 'IA Contextual', desc: 'Entende cenário (documento, quadro, pessoa) e adapta o modo.' },
  { icon: '👁️', title: 'Assistente Visual', desc: 'Overlays discretos para orientar o usuário sem poluir a tela.' },
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
  { href: '#problem', label: 'Problema' },
  { href: '#demo', label: 'Demonstração' },
  { href: '#features', label: 'Funcionalidades' },
  { href: '#highlights', label: 'Highlights' },
];

export const EXPERIENCE_STEPS = [
  { number: 1, image: '/img/TELA1.jpg', text: 'Detecção inicial. Enquadramento subótimo identificado.', success: false, focus: false },
  { number: 2, image: '/img/TELA2.jpg', text: 'Instrução contextual para ajuste de distância.', success: false, focus: false },
  { number: 3, image: '/img/TELA3.jpg', text: 'Refinamento de eixo horizontal para simetria.', success: false, focus: false },
  { number: 4, image: '/img/TELA4.jpg', text: 'Convergência. O sistema confirma o alinhamento iminente.', success: false, focus: true },
  { number: 5, image: '/img/TELA5.jpg', text: 'Captura otimizada. Experiência sem atrito.', success: true, focus: false },
];

export const PAIN_POINTS = [
  { variant: 'tilt', title: 'Quadro torto', desc: 'Perde legibilidade e exige "gambiarra" depois.' },
  { variant: 'crop', title: 'Enquadramento ruim', desc: 'Assunto cortado, contexto perdido.' },
  { variant: 'light', title: 'Luz incorreta', desc: 'Sombras, reflexos e estouro de branco.' },
];

export const DEMO_BULLETS = [
  'Feedback visual imediato',
  'Correção automática de inclinação',
  'Enquadramento adaptativo',
];
