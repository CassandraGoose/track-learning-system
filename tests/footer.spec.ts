import { test, expect } from '@playwright/test';

test('renders footer on dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await expect(page.getByTestId('footer1')).toHaveText('TRACKTrack SystemYour personal LMS and learning portfolio');
  await expect(page.getByTestId('footer2')).toHaveText('Icons made by Karyative from www.flaticon.comCopyright © 2023 - All right reserved by Track');
});

test('renders footer on individual pathway page', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await expect(page.getByTestId('footer1')).toHaveText('TRACKTrack SystemYour personal LMS and learning portfolio');
  await expect(page.getByTestId('footer2')).toHaveText('Icons made by Karyative from www.flaticon.comCopyright © 2023 - All right reserved by Track');
});

test('renders footer on the splash page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.getByTestId('footer1')).toHaveText('TRACKTrack SystemYour personal LMS and learning portfolio');
  await expect(page.getByTestId('footer2')).toHaveText('Icons made by Karyative from www.flaticon.comCopyright © 2023 - All right reserved by Track');
});