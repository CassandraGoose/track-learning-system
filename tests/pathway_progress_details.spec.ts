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

test('renders competency progress', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();
  await expect(page.getByTestId('competency-progress')).toHaveText('0 / 13 competencies met');
});


test('updates competency progress when proof is added and removed', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();
  await page.getByTestId('toggle-competency-details').nth(1).click();
  await expect(page.getByRole('row', { name: 'Add proof of your learning' }).getByRole('cell').first()).toBeEmpty();
  await page.getByRole('row', { name: 'Add proof of your learning' }).getByTestId('view-proofs').click();
  await page.getByTestId('proof-title-input').click();
  await page.getByTestId('proof-title-input').fill('test');
  await page.getByTestId('proof-title-input').press('Tab');
  await page.getByTestId('proof-description-textarea').fill('test');
  await page.getByTestId('proof-description-textarea').press('Tab');
  await page.getByTestId('proof-justification-textarea').fill('test');
  await page.getByTestId('new-proof-submit').click();
  await page.getByTestId('navbar-dashboard-link').click();
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();
  await expect(page.getByTestId('competency-progress')).toContainText('1 / 13 competencies met');
  await page.getByTestId('toggle-competency-details').nth(1).click();
  await expect(page.getByRole('table')).toContainText('✓');
  await page.getByRole('row', { name: '✓ Add proof of your learning' }).getByTestId('view-proofs').click();
  await page.getByTestId('delete-proof').click();

  // I know, I know...but because we have to use a DB and can't mock anything reasonably, I have to wait for the db deletion to actually complete before asserting that anything has updated.
  await page.waitForTimeout(1000); 
});

