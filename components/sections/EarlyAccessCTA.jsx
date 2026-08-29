'use client';

import { Alert } from '@/components/ui/Alert.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { useRevealAll } from '@/hooks/useReveal';
import { useEffect, useState } from 'react';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const FIELDS_DEFAULTS = { name: '', email: '', subject: '', msg: '' };
const SUBJECT_OPTIONS = [
  { value: '', label: 'Selecione...' },
  { value: 'early', label: 'Quero early access' },
  { value: 'demo', label: 'Quero demo' },
  { value: 'parceria', label: 'Parceria' },
];

const STORAGE_KEY = 'opticfusion:contact-form-draft';

/**
 * @typedef {Object} EarlyAccessCTAProps
 * @property {string} [kicker]
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [loginBtnLabel]
 * @property {string} [rmBtnLabel]
 * @property {() => void} [onOpenLogin]
 * @property {() => void} [onOpenRMLookup]
 * @property {(data: FIELDS_DEFAULTS) => void} [onSubmitSuccess]
 */
const EarlyAccessCTA = ({
  kicker = 'Contato e Early Access',
  title = 'Teste a Optic Fusion assistent antes de todo mundo.',
  description = 'Receba acesso antecipado ao preview. Sem spam — apenas novidades do lançamento. Seu progresso é salvo automaticamente.',
  loginBtnLabel = 'Acesso interno',
  rmBtnLabel = 'Consultar RM',
  onOpenLogin = () => {},
  onOpenRMLookup = () => {},
  onSubmitSuccess = () => {},
}) => {
  const revealRef = useRevealAll();
  const [formData, setFormData] = useState({ ...FIELDS_DEFAULTS });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: 'info', message: '' });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIsHydrated(true);
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setFormData({ ...FIELDS_DEFAULTS, ...parsed });
          setAlert({ type: 'info', message: 'Rascunho carregado automaticamente do seu navegador.' });
        }
      } catch (err) {
        console.warn('[EarlyAccessCTA] Não foi possível carregar rascunho do formulário.');
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      const hasData = Object.values(formData).some(
        (v) => typeof v === 'string' && v.trim().length > 0
      );
      if (hasData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    } catch (err) {
      console.warn('[EarlyAccessCTA] Não foi possível salvar rascunho no localStorage.');
    }
  }, [formData, isHydrated]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id === 'contactName' ? 'name'
      : id === 'contactEmail' ? 'email'
      : id === 'contactSubject' ? 'subject'
      : id === 'contactMsg' ? 'msg'
      : id;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validate = () => {
    const { name, email, subject, msg } = formData;
    const newErrors = {};
    let ok = true;

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Informe seu nome (mín. 2 caracteres).';
      ok = false;
    }
    if (!validateEmail(email.trim())) {
      newErrors.email = 'Informe um e-mail válido.';
      ok = false;
    }
    if (!subject) {
      newErrors.subject = 'Selecione uma opção de interesse.';
      ok = false;
    }
    if (!msg.trim() || msg.trim().length < 8) {
      newErrors.msg = 'Escreva uma mensagem (mín. 8 caracteres).';
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setAlert({ type: 'error', message: 'Revise os campos destacados em vermelho.' });
      return;
    }

    window.alert('Formulário enviado com sucesso! Verifique sua caixa de entrada.');
    setAlert({
      type: 'success',
      message: 'Pedido enviado! Em breve você recebe o acesso antecipado por e-mail.',
    });
    setFormData({ ...FIELDS_DEFAULTS });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('[EarlyAccessCTA] Não foi possível limpar rascunho do localStorage.');
    }
    onSubmitSuccess({ ...formData });
  };

  return (
    <section
      id="contact"
      className="section"
      ref={revealRef}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div
          className="cta"
          role="region"
          aria-label="Formulário de contato e early access"
        >
          <div className="cta-copy">
            <p className="kicker reveal">{kicker}</p>
            <h2 id="contact-title" className="reveal">{title}</h2>
            <p className="muted reveal">{description}</p>
            <div className="cta-actions reveal">
              <Button variant="ghost" onClick={onOpenLogin} type="button">
                {loginBtnLabel}
              </Button>
              <Button variant="ghost" onClick={onOpenRMLookup} type="button">
                {rmBtnLabel}
              </Button>
            </div>
          </div>

          <div className="cta-form reveal">
            <Alert
              type={alert.type}
              message={alert.message}
              id="contactAlert"
              role="status"
              aria-live="polite"
            />
            <form
              id="contactForm"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulário de contato da Optic Fusion"
            >
              {[
                {
                  id: 'contactName',
                  name: 'name',
                  label: 'Nome completo',
                  type: 'text',
                  placeholder: 'Seu nome',
                  autocomplete: 'name',
                },
                {
                  id: 'contactEmail',
                  name: 'email',
                  label: 'E-mail',
                  type: 'email',
                  placeholder: 'seu@email.com',
                  autocomplete: 'email',
                },
              ].map(({ id, name, label, type, placeholder, autocomplete }) => (
                <div key={id}>
                  <label className="label" htmlFor={id}>{label}</label>
                  <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={`input ${errors[name] ? 'invalid' : ''}`}
                    value={formData[name]}
                    onChange={handleChange}
                    autoComplete={autocomplete}
                    aria-invalid={!!errors[name]}
                    aria-describedby={errors[name] ? `${id}Error` : undefined}
                  />
                  <small className="error" id={`${id}Error`} role={errors[name] ? 'alert' : undefined}>
                    {errors[name] || ''}
                  </small>
                </div>
              ))}

              <div>
                <label className="label" htmlFor="contactSubject">Interesse</label>
                <select
                  id="contactSubject"
                  name="subject"
                  className={`input ${errors.subject ? 'invalid' : ''}`}
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'contactSubjectError' : undefined}
                >
                  {SUBJECT_OPTIONS.map(({ value, label }) => (
                    <option key={value || 'empty'} value={value}>{label}</option>
                  ))}
                </select>
                <small className="error" id="contactSubjectError" role={errors.subject ? 'alert' : undefined}>
                  {errors.subject || ''}
                </small>
              </div>

              <div>
                <label className="label" htmlFor="contactMsg">Mensagem</label>
                <textarea
                  id="contactMsg"
                  name="msg"
                  rows="4"
                  placeholder="Conte em 1 frase como você usaria a Optic Fusion no seu dia a dia."
                  className={`input ${errors.msg ? 'invalid' : ''}`}
                  value={formData.msg}
                  onChange={handleChange}
                  aria-invalid={!!errors.msg}
                  aria-describedby={errors.msg ? 'contactMsgError' : undefined}
                />
                <small className="error" id="contactMsgError" role={errors.msg ? 'alert' : undefined}>
                  {errors.msg || ''}
                </small>
              </div>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{ marginTop: '12px', width: '100%' }}
              >
                Quero acesso antecipado
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { EarlyAccessCTA };
