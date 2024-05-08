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

test('shows appropriate content areas and competency details', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'IllustrationThis pathway is' }).getByTestId('view-pathway').click();
  await page.locator('.text-4xl').first().click();
  await expect(page.locator('section')).toContainText('2D Design Fundamentals');
  await expect(page.locator('section')).toContainText('Drawing');
  await expect(page.locator('section')).toContainText('Painting');
  await expect(page.getByRole('cell', { name: 'Completed' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Competency' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Description' })).toBeVisible();
  await expect(page.getByRole('table')).toContainText('Define line, shape, form, proportion, and value');
  await expect(page.getByRole('table')).toContainText('Define line, shape, form, proportion, and value, and explain how these elements are used in 2D design');
  await expect(page.getByRole('row', { name: 'Define line, shape, form,' }).getByTestId('view-proofs')).toBeVisible();
});

