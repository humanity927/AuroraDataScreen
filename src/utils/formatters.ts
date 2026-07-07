export const formatNumber = (value: number) =>
  new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits: 0,
  }).format(value);

export const formatPercent = (value: number) => `${value.toFixed(1)}%`;

export const formatChange = (value: number) => {
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
};
