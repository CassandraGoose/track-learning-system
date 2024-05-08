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

test('navigates to splash page', async ({ page}) => {
  await page.getByTestId('home-link').click();
  await expect(page.getByTestId('splash-title')).toContainText('TRACK');
  await expect(page.getByTestId('splash-tag')).toContainText('Learn it. Prove it.');
  await expect(page.locator('section')).toContainText('This application is currently under development and is not accepting new sign ups at this time. Try out Track as a sample user below:');
});

test('navigates to dashboard', async ({ page }) => {
  await page.getByTestId('navbar-dashboard-link').click();
  await expect(page.getByRole('heading')).toContainText('My Pathways');
});

test('navigates to available pathways', async ({ page }) => {
  await page.getByTestId('navbar-pathways-link').click();
  await expect(page.getByRole('heading')).toContainText('Available Pathways');
});

test('navigates to profile', async ({ page }) => {
  await page.getByTestId('navbar-user-button').click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.getByTestId('username')).toContainText('IAmCass');
});

test('logs out', async ({ page }) => {
  await page.getByTestId('navbar-user-button').click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page.getByTestId('splash-title')).toContainText('TRACK');
  await expect(page.getByTestId('navbar-dashboard-link')).toBeHidden();
  await expect(page.getByTestId('navbar-user-button')).toBeHidden();
});