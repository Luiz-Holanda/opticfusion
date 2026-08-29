import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { storage } from '../utils/storage.js';
import { MathUtils } from '../utils/math.js';
import { TargetAudienceSection } from '../components/sections/TargetAudienceSection.jsx';
import { FeaturesSection } from '../components/sections/FeaturesSection.jsx';
import { TeamSection } from '../components/sections/TeamSection.jsx';
import { ExperienceSteps } from '../components/sections/ExperienceSteps.jsx';

describe('Integração: useLocalStorage hook ↔ storage utilitário', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('useLocalStorage lê valor inicial do storage utilitário', () => {
    storage.setItem('optic:test-hook', { name: 'Integração', value: 42 });

    const { result } = renderHook(() => useLocalStorage('optic:test-hook', null));
    expect(result.current.value).toEqual({ name: 'Integração', value: 42 });
    expect(result.current.available).toBe(true);
  });

  it('useLocalStorage setValue persiste via storage utilitário', () => {
    const { result } = renderHook(() => useLocalStorage('optic:save-teste', 'default'));

    act(() => {
      result.current.setValue('valor-salvo');
    });

    expect(result.current.value).toBe('valor-salvo');
    expect(storage.getItem('optic:save-teste')).toBe('valor-salvo');
    expect(window.localStorage.getItem('optic:save-teste')).toBe(JSON.stringify('valor-salvo'));
  });

  it('useLocalStorage removeValue limpa via storage utilitário', () => {
    storage.setItem('optic:remove', { a: 1 });

    const { result } = renderHook(() => useLocalStorage('optic:remove', null));
    expect(result.current.value).toEqual({ a: 1 });

    act(() => {
      result.current.removeValue();
    });

    expect(result.current.value).toBeNull();
    expect(storage.hasKey('optic:remove')).toBe(false);
    expect(window.localStorage.getItem('optic:remove')).toBeNull();
  });

  it('useLocalStorage setValue aceita função updater tipo React.useState', () => {
    const { result } = renderHook(() => useLocalStorage('optic:counter', 0));

    act(() => result.current.setValue((prev) => MathUtils.round(Number(prev), 0) + 1));
    act(() => result.current.setValue((prev) => MathUtils.round(Number(prev), 0) + 10));

    expect(result.current.value).toBe(11);
    expect(storage.getItem('optic:counter')).toBe(11);
  });

  it('useLocalStorage fallback permanece em storage indisponível (simulado)', () => {
    const originalLS = Object.getOwnPropertyDescriptor(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: () => { throw new Error('fail'); },
        getItem: () => { throw new Error('fail'); },
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useLocalStorage('optic:fallback', 'padrao'));
    expect(result.current.available).toBe(false);
    expect(result.current.value).toBe('padrao');

    Object.defineProperty(window, 'localStorage', originalLS);
  });
});

describe('Integração: MathUtils sendo utilizado como nos componentes', () => {
  it('Cenário de Hero: randomInt → clamp → lerp → easeOutCubic (animação contador)', () => {
    const target = MathUtils.randomInt(65, 88);
    expect(target).toBeGreaterThanOrEqual(65);
    expect(target).toBeLessThanOrEqual(88);

    const steps = 28;
    const progressSamples = [];
    for (let s = 0; s <= steps; s++) {
      const p = MathUtils.clamp(s / steps, 0, 1);
      const eased = MathUtils.easeOutCubic(p);
      const value = MathUtils.round(MathUtils.lerp(0, target, eased), 0);
      progressSamples.push(value);
    }

    expect(progressSamples[0]).toBe(0);
    expect(progressSamples[progressSamples.length - 1]).toBe(target);
    for (let i = 1; i < progressSamples.length; i++) {
      expect(progressSamples[i]).toBeGreaterThanOrEqual(progressSamples[i - 1]);
    }
  });

  it('Cenário de Nav: percentage → clamp para progress bar de scroll', () => {
    const docHeight = 5000;
    for (let scrollY = 0; scrollY <= docHeight; scrollY += 500) {
      const pct = MathUtils.clamp(MathUtils.percentage(scrollY, docHeight), 0, 100);
      expect(pct).toBeGreaterThanOrEqual(0);
      expect(pct).toBeLessThanOrEqual(100);
    }
  });

  it('Cenário de TeamSection: average → min → max → GCD de RM', () => {
    const rms = [573818, 574234, 575691, 576244];
    const avg = MathUtils.average(...rms);
    expect(avg).toBeCloseTo(574996.75, 2);
    expect(MathUtils.min(...rms)).toBe(573818);
    expect(MathUtils.max(...rms)).toBe(576244);
    expect(MathUtils.GCD(rms[0], rms[1])).toBeGreaterThanOrEqual(1);
  });

  it('Cenário de TargetAudience: normalize → map → percentage para barras visuais', () => {
    const weights = [1, 2, 3, 4, 5];
    const min = MathUtils.min(...weights);
    const max = MathUtils.max(...weights);

    const bars = weights.map((w) => {
      const n = MathUtils.normalize(w, min, max);
      return MathUtils.round(MathUtils.clamp(MathUtils.map(n, 0, 1, 30, 100), 0, 100), 0);
    });

    expect(bars[0]).toBe(30);
    expect(bars[bars.length - 1]).toBe(100);
    expect(MathUtils.percentage(weights[2], weights.reduce((a, b) => a + b, 0))).toBeGreaterThan(15);
  });

  it('Cenário de FeaturesSection: sqrt → ceil → clamp para grid ideal', () => {
    const total = 6;
    const colsLower = MathUtils.floor(MathUtils.sqrt(total));
    const colsUpper = MathUtils.ceil(MathUtils.sqrt(total));
    const bestCols = MathUtils.clamp(colsLower * colsUpper >= total ? colsLower : colsUpper, 2, 3);

    expect(colsLower).toBe(2);
    expect(colsUpper).toBe(3);
    expect(bestCols).toBe(2);
    expect(MathUtils.ceil(total / bestCols)).toBe(3);
  });

  it('Cenário de LoginModal: round + percentage para barra de progresso', () => {
    const loginCount = 37;
    const progress = MathUtils.min(MathUtils.percentage(loginCount, 100), 100);
    expect(MathUtils.round(progress, 0)).toBe(37);
    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThanOrEqual(100);
  });
});

describe('Integração: múltiplas chaves de storage simultâneas', () => {
  it('Armazena 8+ chaves independentes (como o projeto usa) e leitura idempotente', () => {
    const keys = {
      'opticfusion:rm-history': ['573818', '574234'],
      'opticfusion:remembered-email': 'jovi@opticfusion.com',
      'opticfusion:login-count': 4,
      'opticfusion:last-visit': new Date().toISOString(),
      'opticfusion:visit-count': 11,
      'opticfusion:favorite-member': 2,
      'opticfusion:audience-profile': 1,
      'opticfusion:pinned-features': [0, 2],
      'opticfusion:last-experience-step': 3,
      'opticfusion:contact-form-draft': { name: 'Felipe', email: 'f@a.com' },
    };

    Object.entries(keys).forEach(([k, v]) => {
      const ok = storage.setItem(k, v);
      expect(ok).toBe(true);
    });

    expect(storage.length()).toBe(Object.keys(keys).length);

    Object.entries(keys).forEach(([k, v]) => {
      expect(storage.getItem(k)).toEqual(v);
    });

    const removed = storage.clearAll('opticfusion:');
    expect(removed).toBe(Object.keys(keys).length);
    expect(storage.length()).toBe(0);
  });
});

describe('Integração: Seleção de Cards e Manutenção de Visibilidade na Interface', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('TargetAudienceSection: ao clicar num card ele é selecionado e mantém visibilidade', async () => {
    const { container } = render(<TargetAudienceSection />);
    const cards = container.querySelectorAll('.audience-card');
    expect(cards.length).toBeGreaterThan(0);

    const firstCard = cards[0];
    fireEvent.click(firstCard);

    expect(firstCard.classList.contains('is-selected')).toBe(true);
    expect(storage.getItem('opticfusion:audience-profile')).toBe(0);

    await waitFor(() => {
      expect(firstCard.classList.contains('visible')).toBe(true);
    });
  });

  it('FeaturesSection: ao clicar num card de feature ele é fixado e mantém visibilidade', async () => {
    const { container } = render(<FeaturesSection />);
    const cards = container.querySelectorAll('.feature-card');
    expect(cards.length).toBeGreaterThan(0);

    const firstCard = cards[0];
    fireEvent.click(firstCard);

    expect(firstCard.classList.contains('is-pinned')).toBe(true);
    expect(storage.getItem('opticfusion:pinned-features')).toEqual([0]);

    await waitFor(() => {
      expect(firstCard.classList.contains('visible')).toBe(true);
    });
  });

  it('TeamSection: ao clicar no integrante ele vira destaque e mantém visibilidade', async () => {
    const { container } = render(<TeamSection />);
    const memberWraps = container.querySelectorAll('.team-wrap');
    expect(memberWraps.length).toBeGreaterThan(0);

    const firstWrap = memberWraps[0];
    fireEvent.click(firstWrap);

    expect(firstWrap.classList.contains('is-favorite')).toBe(true);
    expect(storage.getItem('opticfusion:favorite-member')).toBe(0);

    await waitFor(() => {
      expect(firstWrap.classList.contains('visible')).toBe(true);
    });
  });

  it('ExperienceSteps: ao clicar no passo da jornada ele é marcado como visto e mantém visibilidade', async () => {
    const { container } = render(<ExperienceSteps />);
    const stepCards = container.querySelectorAll('.step-card');
    expect(stepCards.length).toBeGreaterThan(0);

    const firstStep = stepCards[0];
    fireEvent.click(firstStep);

    expect(firstStep.classList.contains('is-last')).toBe(true);
    expect(storage.getItem('opticfusion:last-experience-step')).toBe(0);

    await waitFor(() => {
      expect(firstStep.classList.contains('visible')).toBe(true);
    });
  });
});
