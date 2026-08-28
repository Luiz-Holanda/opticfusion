'use client';

import { Alert } from '@/components/ui/Alert.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { useRevealAll } from '@/hooks/useReveal';
import { useState } from 'react';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const FIELDS_DEFAULTS = { name: '', email: '', subject: '', msg: '' };
const SUBJECT_OPTIONS = [
  { value: '', label: 'Selecione...' },
  { value: 'early', label: 'Quero early access' },
  { value: 'demo', label: 'Quero demo' },
  { value: 'parceria', label: 'Parceria' },
];

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
  kicker = 'Early access',
  title = 'Teste a Optic Fusion assistent antes de todo mundo.',
  description = 'Receba acesso antecipado ao preview. Sem spam — apenas novidades do lançamento.',
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const validate = () => {
    const { name, email, subject, msg } = formData;
    const newErrors = {};
    let ok = true;

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Informe seu nome.';
      ok = false;
    }
    if (!validateEmail(email.trim())) {
      newErrors.email = 'Informe um e-mail válido.';
      ok = false;
    }
    if (!subject) {
      newErrors.subject = 'Selecione uma opção.';
      ok = false;
    }
    if (!msg.trim() || msg.trim().length < 8) {
      newErrors.msg = 'Escreva uma mensagem curtinha (mín. 8 caracteres).';
      ok = false;
    }

    setErrors(newErrors);
    return ok;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setAlert({ type: 'error', message: 'Revise os campos destacados.' });
      return;
    }

    window.alert('Formulário enviado com sucesso! Verifique seu e-mail.');
    setAlert({ type: 'success', message: 'Pedido enviado! Em breve você recebe o acesso no e-mail.' });
    setFormData({ ...FIELDS_DEFAULTS });
    onSubmitSuccess({ ...formData });
  };

  return (
    <section id="early" className="section" ref={revealRef}>
      <div className="container">
        <div className="cta">
          <div className="cta-copy">
            <p className="kicker reveal">{kicker}</p>
            <h2 className="reveal">{title}</h2>
            <p className="muted reveal">{description}</p>
            <div className="cta-actions reveal">
              <Button variant="ghost" onClick={onOpenLogin}>{loginBtnLabel}</Button>
              <Button variant="ghost" onClick={onOpenRMLookup}>{rmBtnLabel}</Button>
            </div>
          </div>

          <div className="cta-form reveal">
            <Alert type={alert.type} message={alert.message} id="contactAlert" role="status" aria-live="polite" />
            <form id="contactForm" onSubmit={handleSubmit} noValidate>
              {[
                { id: 'contactName', name: 'name', label: 'Nome', type: 'text', placeholder: 'Seu nome' },
                { id: 'contactEmail', name: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
              ].map(({ id, name, label, type, placeholder }) => (
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
                  />
                  <small className="error" id={`${id}Error`}>{errors[name] || ''}</small>
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
                >
                  {SUBJECT_OPTIONS.map(({ value, label }) => (
                    <option key={value || 'empty'} value={value}>{label}</option>
                  ))}
                </select>
                <small className="error" id="contactSubjectError">{errors.subject || ''}</small>
              </div>

              <div>
                <label className="label" htmlFor="contactMsg">Mensagem</label>
                <textarea
                  id="contactMsg"
                  name="msg"
                  rows="4"
                  placeholder="Conte em 1 frase como você usaria o Optic Fusion assistent."
                  className={`input ${errors.msg ? 'invalid' : ''}`}
                  value={formData.msg}
                  onChange={handleChange}
                />
                <small className="error" id="contactMsgError">{errors.msg || ''}</small>
              </div>

              <Button variant="primary" size="lg" type="submit" style={{ marginTop: '10px' }}>
                Quero acesso
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { EarlyAccessCTA };
