import { describe, it, expect } from 'vitest';
import { MathUtils } from '../utils/math.js';

describe('MathUtils — métodos básicos de arredondamento', () => {
  it('round() arredonda corretamente sem casas decimais', () => {
    expect(MathUtils.round(1.4)).toBe(1);
    expect(MathUtils.round(1.5)).toBe(2);
    expect(MathUtils.round(-1.5)).toBe(-1);
  });

  it('round() com casas decimais', () => {
    expect(MathUtils.round(3.14159, 2)).toBe(3.14);
    expect(MathUtils.round(3.14159, 3)).toBe(3.142);
    expect(MathUtils.round(100.005, 2)).toBe(100.01);
  });

  it('floor() arredonda para baixo', () => {
    expect(MathUtils.floor(1.9)).toBe(1);
    expect(MathUtils.floor(-1.1)).toBe(-2);
    expect(MathUtils.floor(5.99, 1)).toBe(5.9);
  });

  it('ceil() arredonda para cima', () => {
    expect(MathUtils.ceil(1.1)).toBe(2);
    expect(MathUtils.ceil(-1.9)).toBe(-1);
    expect(MathUtils.ceil(5.01, 1)).toBe(5.1);
  });

  it('trunc() remove parte decimal', () => {
    expect(MathUtils.trunc(1.9)).toBe(1);
    expect(MathUtils.trunc(-1.9)).toBe(-1);
    expect(MathUtils.trunc(0.123)).toBe(0);
  });

  it('sign() retorna sinal correto', () => {
    expect(MathUtils.sign(5)).toBe(1);
    expect(MathUtils.sign(-5)).toBe(-1);
    expect(MathUtils.sign(0)).toBe(0);
  });

  it('abs() retorna valor absoluto', () => {
    expect(MathUtils.abs(-42)).toBe(42);
    expect(MathUtils.abs(42)).toBe(42);
    expect(MathUtils.abs(0)).toBe(0);
    expect(MathUtils.abs(-0.5)).toBe(0.5);
  });
});

describe('MathUtils — raiz, potência e hipotenusa', () => {
  it('sqrt() retorna raiz quadrada correta', () => {
    expect(MathUtils.sqrt(144)).toBe(12);
    expect(MathUtils.sqrt(2)).toBeCloseTo(1.41421356);
    expect(MathUtils.sqrt(0)).toBe(0);
    expect(Number.isNaN(MathUtils.sqrt(-1))).toBe(true);
  });

  it('cbrt() retorna raiz cúbica correta', () => {
    expect(MathUtils.cbrt(27)).toBe(3);
    expect(MathUtils.cbrt(-8)).toBe(-2);
  });

  it('pow() retorna potência correta', () => {
    expect(MathUtils.pow(2, 10)).toBe(1024);
    expect(MathUtils.pow(3, 3)).toBe(27);
    expect(MathUtils.pow(4, 0.5)).toBe(2);
  });

  it('hypotenuse() calcula hipotenusa corretamente', () => {
    expect(MathUtils.hypotenuse(3, 4)).toBe(5);
    expect(MathUtils.hypotenuse(5, 12)).toBe(13);
    expect(MathUtils.hypotenuse(0, 0)).toBe(0);
    expect(MathUtils.hypotenuse(1, 2, 2)).toBe(3);
  });
});

describe('MathUtils — aleatórios com controle', () => {
  it('randomRange() retorna valores dentro do intervalo', () => {
    for (let i = 0; i < 100; i++) {
      const v = MathUtils.randomRange(10, 20);
      expect(v).toBeGreaterThanOrEqual(10);
      expect(v).toBeLessThan(20);
    }
  });

  it('randomRange() com min > max troca automaticamente', () => {
    for (let i = 0; i < 20; i++) {
      const v = MathUtils.randomRange(20, 10);
      expect(v).toBeGreaterThanOrEqual(10);
      expect(v).toBeLessThan(20);
    }
  });

  it('randomInt() retorna inteiros inclusive nos limites', () => {
    const found = new Set();
    for (let i = 0; i < 1000; i++) {
      const v = MathUtils.randomInt(1, 5);
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(5);
      found.add(v);
    }
    expect(found.has(1)).toBe(true);
    expect(found.has(5)).toBe(true);
  });

  it('randomInt() com min > max troca automaticamente', () => {
    for (let i = 0; i < 50; i++) {
      const v = MathUtils.randomInt(5, 1);
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(5);
    }
  });
});

describe('MathUtils — clamp, lerp e interpolação', () => {
  it('clamp() limita valores dentro do intervalo', () => {
    expect(MathUtils.clamp(5, 0, 10)).toBe(5);
    expect(MathUtils.clamp(-1, 0, 10)).toBe(0);
    expect(MathUtils.clamp(15, 0, 10)).toBe(10);
  });

  it('lerp() interpola linearmente', () => {
    expect(MathUtils.lerp(0, 100, 0)).toBe(0);
    expect(MathUtils.lerp(0, 100, 0.5)).toBe(50);
    expect(MathUtils.lerp(0, 100, 1)).toBe(100);
  });

  it('lerp() clampar t fora do intervalo', () => {
    expect(MathUtils.lerp(0, 100, -1)).toBe(0);
    expect(MathUtils.lerp(0, 100, 2)).toBe(100);
  });
});

describe('MathUtils — funções de easing', () => {
  it('easeOutCubic retorna 0 em progresso 0', () => {
    expect(MathUtils.easeOutCubic(0)).toBe(0);
  });

  it('easeOutCubic retorna 1 em progresso 1', () => {
    expect(MathUtils.easeOutCubic(1)).toBe(1);
  });

  it('easeOutCubic valor intermediário', () => {
    const v = MathUtils.easeOutCubic(0.5);
    expect(v).toBeCloseTo(1 - Math.pow(0.5, 3));
  });

  it('easeInCubic retorna 0 e 1 nos limites', () => {
    expect(MathUtils.easeInCubic(0)).toBe(0);
    expect(MathUtils.easeInCubic(1)).toBe(1);
  });

  it('easeInOutQuad retorna 0 e 1 nos limites', () => {
    expect(MathUtils.easeInOutQuad(0)).toBe(0);
    expect(MathUtils.easeInOutQuad(1)).toBe(1);
    expect(MathUtils.easeInOutQuad(0.5)).toBe(0.5);
  });
});

describe('MathUtils — círculo e distâncias', () => {
  it('circleArea calcula área correta', () => {
    expect(MathUtils.circleArea(0)).toBe(0);
    expect(MathUtils.circleArea(1)).toBeCloseTo(Math.PI);
    expect(MathUtils.circleArea(2)).toBeCloseTo(4 * Math.PI);
  });

  it('circleCircumference calcula perímetro correto', () => {
    expect(MathUtils.circleCircumference(0)).toBe(0);
    expect(MathUtils.circleCircumference(1)).toBeCloseTo(2 * Math.PI);
  });

  it('distance2D calcula distância cartesiana 2D', () => {
    expect(MathUtils.distance2D(0, 0, 3, 4)).toBe(5);
    expect(MathUtils.distance2D(1, 1, 4, 5)).toBe(5);
  });

  it('distance3D calcula distância cartesiana 3D', () => {
    expect(MathUtils.distance3D(0, 0, 0, 1, 2, 2)).toBe(3);
  });
});

describe('MathUtils — média, porcentagem, normalização', () => {
  it('average calcula média corretamente', () => {
    expect(MathUtils.average(10, 20, 30)).toBe(20);
    expect(MathUtils.average(2, 4, 6, 8, 10)).toBe(6);
    expect(MathUtils.average()).toBe(0);
  });

  it('percentage calcula porcentagem correta', () => {
    expect(MathUtils.percentage(25, 100)).toBe(25);
    expect(MathUtils.percentage(50, 200)).toBe(25);
    expect(MathUtils.percentage(10, 0)).toBe(0);
  });

  it('normalize mapeia para [0,1]', () => {
    expect(MathUtils.normalize(5, 0, 10)).toBe(0.5);
    expect(MathUtils.normalize(0, 0, 10)).toBe(0);
    expect(MathUtils.normalize(10, 0, 10)).toBe(1);
  });

  it('map mapeia entre intervalos', () => {
    expect(MathUtils.map(5, 0, 10, 0, 100)).toBe(50);
    expect(MathUtils.map(0, 0, 10, 100, 200)).toBe(100);
    expect(MathUtils.map(10, 0, 10, 100, 200)).toBe(200);
  });
});

describe('MathUtils — conversão de ângulos', () => {
  it('degreesToRadians converte corretamente', () => {
    expect(MathUtils.degreesToRadians(0)).toBe(0);
    expect(MathUtils.degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
    expect(MathUtils.degreesToRadians(180)).toBeCloseTo(Math.PI);
    expect(MathUtils.degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
  });

  it('radiansToDegrees converte corretamente', () => {
    expect(MathUtils.radiansToDegrees(0)).toBe(0);
    expect(MathUtils.radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
    expect(MathUtils.radiansToDegrees(Math.PI)).toBeCloseTo(180);
    expect(MathUtils.radiansToDegrees(2 * Math.PI)).toBeCloseTo(360);
  });
});

describe('MathUtils — min, max, GCD, LCM, fatorial', () => {
  it('min e max retornam valores corretos', () => {
    expect(MathUtils.min(3, 7, 1, 9, 4)).toBe(1);
    expect(MathUtils.max(3, 7, 1, 9, 4)).toBe(9);
  });

  it('factorial calcula fatorial', () => {
    expect(MathUtils.factorial(0)).toBe(1);
    expect(MathUtils.factorial(1)).toBe(1);
    expect(MathUtils.factorial(5)).toBe(120);
    expect(MathUtils.factorial(10)).toBe(3628800);
  });

  it('GCD calcula máximo divisor comum', () => {
    expect(MathUtils.GCD(48, 18)).toBe(6);
    expect(MathUtils.GCD(54, 24)).toBe(6);
    expect(MathUtils.GCD(7, 13)).toBe(1);
  });

  it('LCM calcula mínimo múltiplo comum', () => {
    expect(MathUtils.LCM(4, 6)).toBe(12);
    expect(MathUtils.LCM(3, 5)).toBe(15);
    expect(MathUtils.LCM(0, 5)).toBe(0);
  });
});
