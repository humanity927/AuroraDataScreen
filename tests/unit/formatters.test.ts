import { describe, expect, it } from 'vitest';

import { formatChange, formatNumber, formatPercent } from '@/utils/formatters';

describe('formatters', () => {
  it('formats numbers for zh-CN display', () => {
    expect(formatNumber(12860)).toBe('12,860');
  });

  it('formats percent values with one decimal', () => {
    expect(formatPercent(96.82)).toBe('96.8%');
  });

  it('adds a plus sign for positive changes', () => {
    expect(formatChange(8.4)).toBe('+8.4%');
    expect(formatChange(-2.5)).toBe('-2.5%');
  });
});
