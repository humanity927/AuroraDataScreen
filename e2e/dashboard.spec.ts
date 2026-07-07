import { expect, test } from '@playwright/test';

test('renders AuroraDataScreen dashboard', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: '极光数据大屏' })).toBeVisible();
  await expect(page.getByText('AuroraDataScreen')).toBeVisible();
  await expect(page.getByTestId('overview-metrics')).toBeVisible();
  await expect(page.getByTestId('metric-card')).toHaveCount(4);
  await expect(page.getByTestId('echarts-chart').first()).toBeVisible();
  await expect(page.locator('canvas').first()).toBeVisible();
});
