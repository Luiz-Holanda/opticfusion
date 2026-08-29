import '@testing-library/jest-dom';

const createLocalStorageMock = () => {
  const store = new Map();

  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => {
      store.set(String(key), String(value));
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    get length() {
      return store.size;
    },
    key: (i) => {
      const keys = Array.from(store.keys());
      return keys[i] !== undefined ? keys[i] : null;
    },
  };
};

Object.defineProperty(window, 'localStorage', {
  value: createLocalStorageMock(),
  writable: true,
  configurable: true,
});

if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class IntersectionObserverMock {
    constructor(callback) {
      this.callback = callback;
    }
    observe(target) {
      target.dataset.revealed = 'true';
      target.classList.add('visible');
    }
    unobserve() {}
    disconnect() {}
  }
  window.IntersectionObserver = IntersectionObserverMock;
}

beforeEach(() => {
  window.localStorage.clear();
});
