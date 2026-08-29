'use client';

import { Alert } from '@/components/ui/Alert.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Modal } from '@/components/layout/Modal.jsx';
import { VALID_USERS } from '@/data/constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MathUtils } from '@/utils/math';

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
  const {
    value: rememberedEmail,
    setValue: setRememberedEmail,
    removeValue: forgetEmail,
  } = useLocalStorage('opticfusion:remembered-email', '');

  const {
    value: loginCount,
    setValue: setLoginCount,
  } = useLocalStorage('opticfusion:login-count', 0);

  const [fields, setFields] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: 'info', message: '' });
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const handle = requestAnimationFrame(() => {
        const hasRemembered = typeof rememberedEmail === 'string' && rememberedEmail.length > 0;
        setFields((prev) => ({
          ...prev,
          email: hasRemembered ? rememberedEmail : prev.email,
        }));
        setRemember(hasRemembered);
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [isOpen, rememberedEmail]);

  const totalValidUsers = useMemo(() => VALID_USERS.length, []);

  const loginProgress = useMemo(
    () => MathUtils.min(MathUtils.percentage(Number(loginCount) || 0, 100), 100),
    [loginCount]
  );

  const togglePw = useCallback(() => setShowPw((prev) => !prev), []);

  const toggleRemember = useCallback((e) => {
    setRemember(e.target.checked);
  }, []);

  const handleChange = useCallback((e) => {
    const { id, name, value } = e.target;
    const fieldKey = name || id;
    setFields((prev) => ({ ...prev, [fieldKey]: value }));
    setErrors((prev) => (prev[fieldKey] ? { ...prev, [fieldKey]: '' } : prev));
  }, []);

  const handleForgetEmail = useCallback(() => {
    forgetEmail();
    setRemember(false);
    setFields((prev) => ({ ...prev, email: '' }));
  }, [forgetEmail]);

  const handleSubmit = useCallback(
    (e) => {
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
        if (remember) {
          setRememberedEmail(found.email);
        } else {
          forgetEmail();
        }
        const newCount = MathUtils.round(Number(loginCount) || 0, 0) + 1;
        setLoginCount(newCount);

        window.alert(`Login realizado com sucesso! (Tentativa #${newCount})`);
        setAlert({ type: 'success', message: 'Acesso liberado! Bem-vindo.' });
        setFields({ email: remember ? found.email : '', password: '' });
        onLoginSuccess({ email: found.email });
      } else {
        setAlert({ type: 'error', message: 'E-mail ou senha incorretos.' });
      }
    },
    [fields, remember, loginCount, setRememberedEmail, setLoginCount, forgetEmail, onLoginSuccess]
  );

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

        <div className="row" style={{ marginTop: '8px', gap: '6px' }}>
          <input
            id="rememberLogin"
            type="checkbox"
            checked={remember}
            onChange={toggleRemember}
          />
          <label htmlFor="rememberLogin" style={{ fontSize: '13px', color: 'var(--muted)' }}>
            Lembrar meu e-mail neste navegador
          </label>
        </div>

        {(loginCount || 0) > 0 && (
          <div style={{ marginTop: '10px', fontSize: '12px' }}>
            <p className="muted" style={{ margin: 0 }}>
              Logins nesta máquina: <strong>{Number(loginCount) || 0}</strong> (meta 100: {MathUtils.round(loginProgress, 1)}%)
            </p>
            <div
              style={{
                height: '6px',
                borderRadius: '3px',
                background: 'rgba(255,255,255,.08)',
                marginTop: '6px',
                overflow: 'hidden',
              }}
              role="progressbar"
              aria-label="Progresso de logins"
              aria-valuenow={MathUtils.round(loginProgress, 0)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                style={{
                  width: `${loginProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--cyan), var(--violet, #8b5cf6))',
                  transition: 'width .4s ease',
                }}
              />
            </div>
            {(rememberedEmail || '').length > 0 && (
              <div className="row" style={{ justifyContent: 'space-between', marginTop: '8px' }}>
                <span className="muted">Lembrado: <code style={{ fontSize: '11px' }}>{rememberedEmail}</code></span>
                <button
                  type="button"
                  onClick={handleForgetEmail}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--cyan)',
                    fontSize: '11px',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  [esquecer]
                </button>
              </div>
            )}
          </div>
        )}

        <p className="muted" style={{ marginTop: '8px' }}>
          {demoHint}
        </p>

        <p className="muted" style={{ marginTop: '4px', fontSize: '12px' }}>
          {totalValidUsers} usuário{totalValidUsers !== 1 ? 's' : ''} demo cadastrado{totalValidUsers !== 1 ? 's' : ''}.
        </p>

        <Button variant="primary" size="lg" type="submit" style={{ marginTop: '10px' }}>
          Entrar
        </Button>
      </form>
    </Modal>
  );
};

export { LoginModal };
