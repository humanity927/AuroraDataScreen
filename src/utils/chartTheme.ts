export const auroraChartColors = {
  cyan: '#67e8f9',
  ice: '#bae6fd',
  blue: '#60a5fa',
  teal: '#5eead4',
  lime: '#a7f3d0',
  violet: '#a5b4fc',
  magenta: '#c4b5fd',
  amber: '#fde68a',
  orange: '#fcd34d',
  rose: '#fbbf24',
  text: '#dff7ff',
  muted: '#8fb6d8',
  grid: 'rgba(148, 210, 255, 0.13)',
};

export const auroraPalette = [
  auroraChartColors.cyan,
  auroraChartColors.teal,
  auroraChartColors.lime,
  auroraChartColors.blue,
  auroraChartColors.violet,
  auroraChartColors.magenta,
  auroraChartColors.amber,
  auroraChartColors.orange,
  auroraChartColors.rose,
];

export const getAuroraColor = (index: number) => auroraPalette[index % auroraPalette.length];

export const getAuroraLinearGradient = (index: number) => ({
  type: 'linear',
  x: 0,
  y: 0,
  x2: 1,
  y2: 1,
  colorStops: [
    { offset: 0, color: getAuroraColor(index) },
    { offset: 0.52, color: getAuroraColor(index + 2) },
    { offset: 1, color: getAuroraColor(index + 4) },
  ],
  global: false,
});

export const getAuroraVerticalGradient = (index: number) => ({
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: getAuroraColor(index) },
    { offset: 0.56, color: getAuroraColor(index + 2) },
    { offset: 1, color: 'rgba(8, 22, 48, 0.78)' },
  ],
  global: false,
});

export const getAuroraRadialGradient = (index: number) => ({
  type: 'radial',
  x: 0.5,
  y: 0.45,
  r: 0.72,
  colorStops: [
    { offset: 0, color: '#f8feff' },
    { offset: 0.32, color: getAuroraColor(index) },
    { offset: 0.72, color: getAuroraColor(index + 2) },
    { offset: 1, color: 'rgba(8, 20, 48, 0.92)' },
  ],
  global: false,
});

export const auroraTooltip = {
  backgroundColor: 'rgba(4, 14, 30, 0.94)',
  borderColor: 'rgba(103, 232, 249, 0.52)',
  borderWidth: 1,
  textStyle: {
    color: auroraChartColors.text,
    fontSize: 12,
  },
  extraCssText:
    'box-shadow: 0 0 22px rgba(34, 211, 238, 0.24); border-radius: 8px; backdrop-filter: blur(8px);',
};
