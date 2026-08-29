'use client';

import { Alert } from '@/components/ui/Alert.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Modal } from '@/components/layout/Modal.jsx';
import { TEAM } from '@/data/constants';
import { useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MathUtils } from '@/utils/math';

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
  const {
    value: searchHistory,
    setValue: saveHistory,
    removeValue: clearHistory,
  } = useLocalStorage('opticfusion:rm-history', []);

  const [rm, setRm] = useState('');
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState({ type: 'info', message: '' });

  const totalMembers = useMemo(() => TEAM.length, []);
  const historyCount = useMemo(() => searchHistory.length, [searchHistory]);
  const historyPercent = useMemo(
    () => MathUtils.percentage(historyCount, totalMembers),
    [historyCount, totalMembers]
  );

  const handleChange = useCallback((e) => {
    setRm(e.target.value);
    setResult(null);
    setAlert({ type: 'info', message: '' });
  }, []);

  const handleSelectFromHistory = useCallback((rmVal) => {
    setRm(String(rmVal));
    setResult(null);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = rm.trim();
      if (!trimmed) return;

      const person = TEAM.find((p) => p.rm === trimmed);
      if (person) {
        setResult({ ...person });
        setAlert({ type: 'info', message: '' });
        const updatedHistory = [
          trimmed,
          ...searchHistory.filter((h) => h !== trimmed),
        ].slice(0, MathUtils.clamp(totalMembers, 1, 10));
        saveHistory(updatedHistory);
        onMemberFound({ ...person });
      } else {
        setResult(null);
        setAlert({ type: 'error', message: 'RM não encontrado.' });
      }
    },
    [rm, searchHistory, totalMembers, saveHistory, onMemberFound]
  );

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
          onChange={handleChange}
        />
        <Button variant="primary" size="lg" type="submit" style={{ marginTop: '15px', width: '100%' }}>
          Consultar
        </Button>
      </form>

      {historyCount > 0 && (
        <div style={{ marginTop: '18px' }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="muted" style={{ margin: 0, fontSize: '13px' }}>
              Histórico ({historyCount}/{totalMembers} — {MathUtils.round(historyPercent, 0)}%)
            </p>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={clearHistory}
              style={{ padding: '4px 10px', fontSize: '12px' }}
            >
              Limpar
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '10px',
            }}
            role="list"
            aria-label="Histórico de RMs pesquisados"
          >
            {searchHistory.map((histRm) => (
              <button
                type="button"
                key={histRm}
                onClick={() => handleSelectFromHistory(histRm)}
                className="pill"
                role="listitem"
                style={{ cursor: 'pointer', border: '1px solid var(--border)' }}
              >
                RM {histRm}
              </button>
            ))}
          </div>
        </div>
      )}

      <div id="rmResult" style={{ marginTop: '20px', display: result ? 'block' : 'none' }}>
        {result && (
          <>
            <p><strong>Nome:</strong> <span id="rmResName">{result.name}</span></p>
            <p><strong>RM:</strong> <span id="rmResRM">{result.rm}</span></p>
            <p><strong>Função:</strong> <span id="rmResRole">{result.role}</span></p>
            <p className="muted" style={{ marginTop: '8px', fontSize: '13px' }}>
              RM truncado: {MathUtils.trunc(Number(result.rm))} • Soma dos dígitos: {
                result.rm.split('').reduce((acc, d) => acc + MathUtils.abs(Number(d) || 0), 0)
              }
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export { RMLookupModal };
