// import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   // Go to the starting url before each test.
//   await page.goto('http://localhost:3000/');
// });

// test('has a title', async ({ page }) => {
//   await expect(page.getByTestId('splash-title')).toHaveText('TRACK');
// });

// test('has a tagline', async ({ page }) => {
//   await expect(page.getByText('Learn it. Prove it.')).toBeVisible();
// });

// test('navigates to the dashboard from the get started link', async ({ page }) => {
//   await page.getByText('Try as Cass').click();
//   await page.waitForURL('http://localhost:3000/dashboard');
//   await expect(page).toHaveURL('http://localhost:3000/dashboard');
// });

// test('renders expected information', async ({ page }) => {
//   await expect(page.getByTestId('splash-info1')).toHaveText('Track is a learning tool built for you, not for some corporate entity.Community-driven learning paths provide learning opportunities that can mimic college education, work training, and personal fulfillment.Find pathways created by educators, curriculum designers, professionals, and hobbyists.');
//   await expect(page.getByTestId('splash-info2')).toHaveText('Track was designed to put you in the driver\'s seat of your learning, while also allowing you to proove your understaning and share your accomplishments with the world.As you complete your learning, you can add artifacts to back up your understanding and skills. Once you\'re ready, send the link to your portofolio for any given pathway. Potential employers, colleagues, and friends can verify you\'re learning by reveiwing your portfolio.More Coming Soon!');
// });
// //