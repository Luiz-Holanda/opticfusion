'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { storage } from '@/utils/storage';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return storage.getItem(key, initialValue);
    } catch {
      return initialValue;
    }
  });

  const [available, setAvailable] = useState(() => storage.available);
  const keyRef = useRef(key);

  useEffect(() => {
    const previousKey = keyRef.current;
    if (key !== previousKey) {
      keyRef.current = key;
      queueMicrotask(() => {
        setAvailable(storage.available);
        try {
          setStoredValue(storage.getItem(key, initialValue));
        } catch {
          setStoredValue(initialValue);
        }
      });
    }
  }, [key, initialValue]);

  const setValue = useCallback(
    (value) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      return storage.setItem(key, valueToStore);
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    return storage.removeItem(key);
  }, [key, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    available,
  };
}
