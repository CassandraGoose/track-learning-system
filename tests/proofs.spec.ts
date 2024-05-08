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


test('add proof', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();
  await page.getByTestId('toggle-competency-details').first().click();
  await page.getByRole('row', { name: 'View Pathways Explain how to' }).getByTestId('view-proofs').click();
  await page.getByTestId('proof-title-input').click();
  await page.getByTestId('proof-title-input').fill('test');
  await page.getByTestId('proof-title-input').press('Tab');
  await page.getByTestId('proof-description-textarea').fill('test');
  await page.getByTestId('proof-description-textarea').press('Tab');
  await page.getByTestId('proof-justification-textarea').fill('test');
  await page.getByTestId('new-proof-submit').click();
  await expect(page.getByTestId('proof-title')).toContainText('test');
  await expect(page.getByTestId('proof-description')).toContainText('test');
  await expect(page.getByTestId('proof-justification')).toContainText('test');
});

test('delete proof', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();
  await page.getByTestId('toggle-competency-details').first().click();
  await page.getByRole('row', { name: 'View Pathways Explain how to' }).getByTestId('view-proofs').click();
  await expect(page.getByTestId('delete-proof')).toBeVisible();
  await page.getByTestId('delete-proof').click();
});
