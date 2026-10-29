'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { storage } from '@/utils/storage';

export function useLocalStorage(key, initialValue) {
  // Keep the server render and the browser's first render identical. Read
  // localStorage only after hydration so saved values cannot cause a mismatch.
  const [storedValue, setStoredValue] = useState(initialValue);
  const [available, setAvailable] = useState(false);
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  useEffect(() => {
    setAvailable(storage.available);
    try {
      setStoredValue(storage.getItem(key, initialValueRef.current));
    } catch {
      setStoredValue(initialValueRef.current);
    }
  }, [key]);

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
