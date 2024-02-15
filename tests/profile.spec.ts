import { test, expect } from '@playwright/test';

test('Page component renders correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/profile');
  await page.waitForSelector('[data-testid="username"]');
  await expect(page.getByTestId('username')).toHaveText('CassTheOG');
  await expect(page.getByTestId('user-fullname')).toHaveText('Cass T');
  await expect(page.getByTestId('user-bio')).toHaveText(
    'I am the person who created this application. Hi!',
  );
  await expect(page.getByTestId('pathway-card-title').first()).toHaveText(
    'Use Track',
  );
  await expect(page.getByTestId('content-area-badge').first()).toHaveText(
    'Navigating Track',
  );
});
