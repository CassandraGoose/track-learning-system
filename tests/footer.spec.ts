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

test('renders footer on the splash page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  await expect(page.getByTestId('footer-home-link')).toContainText('TRACK');
  await page.getByText('Track SystemYour personal LMS').click();
  await expect(page.getByTestId('footer1').getByRole('paragraph')).toContainText('Track SystemYour personal LMS and learning portfolio');
  await expect(page.getByTestId('footer2').getByRole('complementary')).toContainText('Icons made by Karyative from www.flaticon.com');
  await expect(page.getByTestId('footer2').getByRole('complementary')).toContainText('Copyright © 2023 - All right reserved by Track');
});

test('renders footer on all pathways page', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await page.getByTestId('navbar-pathways-link').click();
  await expect(page.getByTestId('footer-home-link')).toContainText('TRACK');
  await page.getByText('Track SystemYour personal LMS').click();
  await expect(page.getByTestId('footer1').getByRole('paragraph')).toContainText('Track SystemYour personal LMS and learning portfolio');
  await expect(page.getByTestId('footer2').getByRole('complementary')).toContainText('Icons made by Karyative from www.flaticon.com');
  await expect(page.getByTestId('footer2').getByRole('complementary')).toContainText('Copyright © 2023 - All right reserved by Track');
});

test('renders footer on dashboard', async ({ page }) => {
  await page.getByTestId('navbar-dashboard-link').click();

  await page.getByText('Track SystemYour personal LMS').click();
  await expect(page.getByTestId('footer1').getByRole('paragraph')).toContainText('Track SystemYour personal LMS and learning portfolio');
  await expect(page.getByTestId('footer2').getByRole('complementary')).toContainText('Icons made by Karyative from www.flaticon.com');
  await expect(page.getByTestId('footer2').getByRole('complementary')).toContainText('Copyright © 2023 - All right reserved by Track');
});

test('renders footer on individual pathway page', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();

  await page.getByText('Track SystemYour personal LMS').click();
  await expect(page.getByTestId('footer1').getByRole('paragraph')).toContainText('Track SystemYour personal LMS and learning portfolio');
  await expect(page.getByTestId('footer2').getByRole('complementary')).toContainText('Icons made by Karyative from www.flaticon.com');
  await expect(page.getByTestId('footer2').getByRole('complementary')).toContainText('Copyright © 2023 - All right reserved by Track');
});
