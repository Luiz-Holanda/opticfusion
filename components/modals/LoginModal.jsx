'use client';

import { Alert } from '@/components/ui/Alert.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Modal } from '@/components/layout/Modal.jsx';
import { VALID_USERS } from '@/data/constants';
import { useState } from 'react';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * @typedef {Object} LoginModalProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 * @property {string} [demoHint]
 * @property {(user: {email:string}) => void} [onLoginSuccess]
 */
const LoginModal = ({
  isOpen,
  onClose,
  demoHint = 'Demo: jovi@opticfusion.com / jovi2025',
  onLoginSuccess = () => {},
}) => {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: 'info', message: '' });

  const togglePw = () => setShowPw((prev) => !prev);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFields((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = fields;
    const newErrors = {};
    let ok = true;

    if (!validateEmail(email.trim())) newErrors.email = 'E-mail inválido.';
    if (!password || password.length < 4) newErrors.password = 'Senha inválida.';

    setErrors(newErrors);
    ok = !Object.keys(newErrors).length;

    if (!ok) {
      setAlert({ type: 'error', message: 'Corrija os dados e tente novamente.' });
      return;
    }

    const found = VALID_USERS.find((u) => u.email === email.trim() && u.password === password);

    if (found) {
      window.alert('Login realizado com sucesso! Bem-vindo ao painel Optic Fusion.');
      setAlert({ type: 'success', message: 'Acesso liberado! Bem-vindo.' });
      setFields({ email: '', password: '' });
      onLoginSuccess({ email: found.email });
    } else {
      setAlert({ type: 'error', message: 'E-mail ou senha incorretos.' });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Acesso interno">
      <Alert type={alert.type} message={alert.message} id="loginAlert" role="status" aria-live="polite" />
      <form id="loginForm" onSubmit={handleSubmit} noValidate>
        <label className="label" htmlFor="loginEmail">E-mail</label>
        <input
          className={`input ${errors.email ? 'invalid' : ''}`}
          id="loginEmail"
          name="email"
          type="email"
          placeholder="jovi@opticfusion.com"
          value={fields.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'loginEmailError' : undefined}
        />
        <small className="error" id="loginEmailError" role={errors.email ? 'alert' : undefined}>{errors.email || ''}</small>

        <label className="label" htmlFor="loginPassword">Senha</label>
        <div className="row">
          <input
            className={`input ${errors.password ? 'invalid' : ''}`}
            id="loginPassword"
            name="password"
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••"
            value={fields.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'loginPasswordError' : undefined}
          />
          <Button variant="ghost" size="sm" type="button" id="togglePw" onClick={togglePw}>
            {showPw ? 'Ocultar' : 'Mostrar'}
          </Button>
        </div>
        <small className="error" id="loginPasswordError">{errors.password || ''}</small>

        <p className="muted" style={{ marginTop: '8px' }}>
          {demoHint}
        </p>

        <Button variant="primary" size="lg" type="submit" style={{ marginTop: '10px' }}>
          Entrar
        </Button>
      </form>
    </Modal>
  );
};

export { LoginModal };
