import { expect, test } from '@playwright/test';

test('renders AuroraDataScreen dashboard', async ({ page }) => {
  const browserErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      browserErrors.push(message.text());
    }
  });
  page.on('pageerror', (error) => {
    browserErrors.push(error.message);
  });

  await page.goto('/');

  await expect(page.getByRole('heading', { name: '极光数据大屏' })).toBeVisible();
  await expect(page.getByText('AuroraDataScreen')).toBeVisible();
  await expect(page.getByText('极光智造中枢')).toBeVisible();
  await expect(page.getByTestId('overview-metrics')).toBeVisible();
  await expect(page.getByTestId('metric-card')).toHaveCount(4);
  await expect(page.getByTestId('aurora-hub-chart')).toBeVisible();
  await expect(page.getByTestId('echarts-chart').first()).toBeVisible();
  await expect(page.locator('canvas').first()).toBeVisible();
  await page.waitForTimeout(2500);
  await expect(page.getByTestId('overview-metrics')).toBeVisible();
  expect(browserErrors).toEqual([]);
});
