const isBrowser = typeof window !== 'undefined';

const isStorageAvailable = () => {
  if (!isBrowser) return false;
  try {
    const testKey = '__opticfusion_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const getAvailable = () => {
  return isStorageAvailable();
};

const safeStringify = (value) => {
  try {
    return JSON.stringify(value);
  } catch (err) {
    throw new Error(`[localStorage] Falha ao serializar valor: ${err.message}`);
  }
};

const safeParse = (raw) => {
  if (raw === null || raw === undefined) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

export const storage = {
  get available() {
    return getAvailable();
  },

  setItem(key, value) {
    if (!getAvailable()) {
      if (isBrowser) console.warn('[localStorage] Storage indisponível no ambiente atual.');
      return false;
    }
    try {
      const serialized = safeStringify(value);
      window.localStorage.setItem(key, serialized);
      return true;
    } catch (err) {
      if (err.name === 'QuotaExceededError' || err.code === 22) {
        console.error('[localStorage] Cota excedida. Não foi possível salvar.');
      } else {
        console.error(`[localStorage] Erro ao escrever chave "${key}": ${err.message}`);
      }
      return false;
    }
  },

  getItem(key, fallback = null) {
    if (!getAvailable()) {
      if (isBrowser) console.warn('[localStorage] Storage indisponível no ambiente atual.');
      return fallback;
    }
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      return safeParse(raw);
    } catch (err) {
      console.error(`[localStorage] Erro ao ler chave "${key}": ${err.message}`);
      return fallback;
    }
  },

  removeItem(key) {
    if (!getAvailable()) {
      if (isBrowser) console.warn('[localStorage] Storage indisponível no ambiente atual.');
      return false;
    }
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error(`[localStorage] Erro ao remover chave "${key}": ${err.message}`);
      return false;
    }
  },

  hasKey(key) {
    if (!getAvailable()) return false;
    try {
      return window.localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  },

  clearAll(prefix) {
    if (!getAvailable()) return 0;
    try {
      let removed = 0;
      const keys = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k !== null) keys.push(k);
      }
      const toRemove = prefix
        ? keys.filter((k) => k.startsWith(prefix))
        : keys;
      for (const k of toRemove) {
        window.localStorage.removeItem(k);
        removed++;
      }
      return removed;
    } catch (err) {
      console.error(`[localStorage] Erro ao limpar storage: ${err.message}`);
      return 0;
    }
  },

  length() {
    if (!getAvailable()) return 0;
    try {
      return window.localStorage.length;
    } catch {
      return 0;
    }
  },
};
