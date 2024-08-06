import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.context().clearCookies();
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('username').click();
  await page.getByTestId('username').fill('IAmCass');
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill(process.env.TEST_USER_PW || '');
  await page.getByTestId('login').click();
});

test('has a title', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'IllustrationThis pathway is' }).getByTestId('view-pathway').click();
  await expect(page.getByTestId('pathway-title')).toContainText('Illustration');
});

test('has a description', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'IllustrationThis pathway is' }).getByTestId('view-pathway').click();

});

test('shows competency progress', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'IllustrationThis pathway is' }).getByTestId('view-pathway').click();
  await page.locator('.text-4xl').first().click();
  await expect(page.getByTestId('competency-progress')).toContainText('0 / 57 competencies met');
});
