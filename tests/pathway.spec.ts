import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto('http://localhost:3000/dashboard/1');
});

test('has a title', async ({ page }) => {
  await expect(page.getByTestId('pathway-title')).toHaveText('Use Qual');
});

test('has a description', async ({ page }) => {
  await expect(page.getByTestId('pathway-description')).toHaveText('Learn to use the tool so you can leverage it to your advantage.');
});
