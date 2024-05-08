import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('navbar-pathways-link').click();
});

test('searches for a pathway', async ({ page }) => {
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('comp');
  await expect(page.getByTestId('content-area-badge').first()).toContainText('Calculus');
  await expect(page.getByTestId('view-pathway')).toBeVisible();
});

test('unsearches for a pathway', async ({ page }) => {
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('');
  await expect(page.locator('section')).toContainText('Artistic Roller Skating');
});

test('paginates appropriately', async ({ page }) => {
  await page.getByRole('link', { name: '2' }).click();
  await expect(page.locator('section')).toContainText('Front End Development Fundamentals');
  await page.getByRole('link', { name: '3' }).click();
  await expect(page.locator('section')).toContainText('Outdoor Survival Fundamentals');
});

