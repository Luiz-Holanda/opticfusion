'use client';

import { Alert } from '@/components/ui/Alert.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Modal } from '@/components/layout/Modal.jsx';
import { TEAM } from '@/data/constants';
import { useState } from 'react';

/**
 * @typedef {Object} RMLookupModalProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 * @property {(member: typeof TEAM[number]) => void} [onMemberFound]
 */
const RMLookupModal = ({
  isOpen,
  onClose,
  onMemberFound = () => {},
}) => {
  const [rm, setRm] = useState('');
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState({ type: 'info', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = rm.trim();
    if (!trimmed) return;

    const person = TEAM.find((p) => p.rm === trimmed);
    if (person) {
      setResult({ ...person });
      setAlert({ type: 'info', message: '' });
      onMemberFound({ ...person });
    } else {
      setResult(null);
      setAlert({ type: 'error', message: 'RM não encontrado.' });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Consultar Integrante">
      <Alert type={alert.type} message={alert.message} id="rmAlert" role="status" aria-live="polite" />
      <form id="rmForm" onSubmit={handleSubmit} noValidate>
        <label className="label" htmlFor="rmInput">RM do integrante</label>
        <input
          className="input"
          id="rmInput"
          type="text"
          placeholder="Ex: 573818"
          value={rm}
          onChange={(e) => setRm(e.target.value)}
        />
        <Button variant="primary" size="lg" type="submit" style={{ marginTop: '15px', width: '100%' }}>
          Consultar
        </Button>
      </form>
      <div id="rmResult" style={{ marginTop: '20px', display: result ? 'block' : 'none' }}>
        {result && (
          <>
            <p><strong>Nome:</strong> <span id="rmResName">{result.name}</span></p>
            <p><strong>RM:</strong> <span id="rmResRM">{result.rm}</span></p>
            <p><strong>Função:</strong> <span id="rmResRole">{result.role}</span></p>
          </>
        )}
      </div>
    </Modal>
  );
};

export { RMLookupModal };
