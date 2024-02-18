import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto('http://localhost:3000/');
});

test('exists', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('navbar')).toBeVisible();
  await expect(page.getByTestId('navbar-dashboard-link')).toBeVisible();
  await expect(page.getByTestId('navbar-pathways-link')).toBeVisible();
  await expect(page.getByTestId('navbar-about-link')).toBeVisible();
  await expect(page.getByTestId('navbar-user-button')).toBeVisible();
  await expect(page.getByTestId('home-link')).toBeVisible();
});

test('navigates to the dashboard', async ({ page }) => {
  await page.getByTestId('navbar-dashboard-link').click();
  await page.waitForURL('http://localhost:3000/dashboard');
  await expect(page.url()).toBe('http://localhost:3000/dashboard');
});
