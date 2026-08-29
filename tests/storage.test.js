import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storage } from '../utils/storage.js';

describe('storage (localStorage utilitário)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('deve estar disponível no ambiente de teste', () => {
    expect(storage.available).toBe(true);
  });

  it('deve salvar e recuperar um objeto corretamente', () => {
    const data = { name: 'Felipe', rm: '573818' };
    const saved = storage.setItem('user:1', data);
    expect(saved).toBe(true);

    const loaded = storage.getItem('user:1');
    expect(loaded).toEqual(data);
  });

  it('deve salvar e recuperar um número corretamente', () => {
    storage.setItem('count', 42);
    expect(storage.getItem('count')).toBe(42);
  });

  it('deve salvar e recuperar uma string corretamente', () => {
    storage.setItem('msg', 'hello');
    expect(storage.getItem('msg')).toBe('hello');
  });

  it('deve retornar fallback para chave inexistente', () => {
    const fb = storage.getItem('chave-que-nao-existe', { default: true });
    expect(fb).toEqual({ default: true });
  });

  it('deve retornar null para chave inexistente sem fallback', () => {
    expect(storage.getItem('nao-existe')).toBeNull();
  });

  it('deve remover uma chave corretamente', () => {
    storage.setItem('remover', 'valor');
    expect(storage.hasKey('remover')).toBe(true);

    const removed = storage.removeItem('remover');
    expect(removed).toBe(true);
    expect(storage.hasKey('remover')).toBe(false);
    expect(storage.getItem('remover')).toBeNull();
  });

  it('deve verificar existência de chave com hasKey', () => {
    expect(storage.hasKey('nova-chave')).toBe(false);
    storage.setItem('nova-chave', 123);
    expect(storage.hasKey('nova-chave')).toBe(true);
  });

  it('deve retornar o tamanho correto do storage', () => {
    expect(storage.length()).toBe(0);
    storage.setItem('a', 1);
    storage.setItem('b', 2);
    expect(storage.length()).toBe(2);
  });

  it('deve limpar todas as chaves com clearAll()', () => {
    storage.setItem('pref:1', 'a');
    storage.setItem('pref:2', 'b');
    storage.setItem('outra', 'c');
    const removed = storage.clearAll();
    expect(removed).toBe(3);
    expect(storage.length()).toBe(0);
  });

  it('deve limpar apenas chaves com prefixo', () => {
    storage.setItem('app:theme', 'dark');
    storage.setItem('app:lang', 'pt');
    storage.setItem('other', 'xyz');
    const removed = storage.clearAll('app:');
    expect(removed).toBe(2);
    expect(storage.hasKey('app:theme')).toBe(false);
    expect(storage.hasKey('other')).toBe(true);
  });

  it('deve tratar valores booleanos corretamente', () => {
    storage.setItem('ativo', true);
    expect(storage.getItem('ativo')).toBe(true);
    storage.setItem('ativo', false);
    expect(storage.getItem('ativo')).toBe(false);
  });

  it('deve tratar arrays corretamente', () => {
    const arr = [1, 2, 3, { nested: true }];
    storage.setItem('arr', arr);
    expect(storage.getItem('arr')).toEqual(arr);
  });

  it('deve retornar false ao salvar com storage indisponível', () => {
    const original = Object.getOwnPropertyDescriptor(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: () => { throw new Error('QuotaExceededError'); },
        getItem: () => null,
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      },
      writable: true,
      configurable: true,
    });

    const result = storage.setItem('teste', 123);
    expect(result).toBe(false);

    Object.defineProperty(window, 'localStorage', original);
  });

  it('deve retornar fallback ao ler com storage indisponível', () => {
    const original = Object.getOwnPropertyDescriptor(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: () => {},
        getItem: () => { throw new Error('Read error'); },
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      },
      writable: true,
      configurable: true,
    });

    expect(storage.getItem('qualquer', 'fallback')).toBe('fallback');

    Object.defineProperty(window, 'localStorage', original);
  });
});
