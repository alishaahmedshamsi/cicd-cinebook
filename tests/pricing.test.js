const { seatPrice, calculateTotal } = require('../src/pricing');

describe('seatPrice', () => {
  test('returns the price for a known seat type', () => {
    expect(seatPrice('standard')).toBe(800);
    expect(seatPrice('premium')).toBe(1200);
    expect(seatPrice('recliner')).toBe(1800);
  });

  test('throws for an unknown seat type', () => {
    expect(() => seatPrice('vip')).toThrow('Unknown seat type');
  });
});

describe('calculateTotal', () => {
  test('multiplies price by number of seats', () => {
    expect(calculateTotal('standard', 3, false)).toBe(2400);
  });

  test('applies 20% student discount', () => {
    expect(calculateTotal('premium', 2, true)).toBe(1920);
  });

  test('rejects invalid seat counts', () => {
    expect(() => calculateTotal('standard', 0, false)).toThrow();
    expect(() => calculateTotal('standard', 11, false)).toThrow();
    expect(() => calculateTotal('standard', 1.5, false)).toThrow();
  });
});
