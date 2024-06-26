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
  await expect(page.getByRole('heading')).toHaveText('My Pathways');
});

test('contains pathways', async ({ page }) => {
  await page.getByText('Use TrackLearn to use the').click();
  await page.getByText('Learn to LearnUtilize a').click();
  await page.getByText('IllustrationThis pathway is').click();
});

test('shows appropriate progress', async ({ page }) => {
  await expect(page.getByTestId('progress-radial').locator('nth=0')).toHaveText('0%');
});

test('updates radial progress', async ({ page }) => {
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();
  await page.getByTestId('toggle-competency-details').first().click();
  await page.getByRole('row', { name: 'View Pathways' }).getByTestId('view-proofs').click();
  await page.getByTestId('proof-title-input').click();
  await page.getByTestId('proof-title-input').fill('Proof Title Here');
  await page.getByTestId('proof-title-input').press('Tab');
  await page.getByTestId('proof-description-textarea').fill('Proof description here');
  await page.getByTestId('proof-description-textarea').press('Tab');
  await page.getByTestId('proof-justification-textarea').fill('text artifact to prove competency.');
  await page.getByTestId('new-proof-submit').click();
  // I know, I know...but because we have to use a DB and can't mock anything reasonably, I have to wait for the db deletion to actually complete before asserting that anything has updated.
  await page.waitForTimeout(1000); 
  await page.getByTestId('navbar-dashboard-link').click();
  await page.getByText('8%');
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();
  await page.getByTestId('toggle-competency-details').first().click();
  await page.getByRole('row', { name: '✓ View Pathways' }).getByTestId('view-proofs').click();
  await page.getByTestId('delete-proof').click();
  // I know, I know...but because we have to use a DB and can't mock anything reasonably, I have to wait for the db deletion to actually complete before asserting that anything has updated.
  await page.waitForTimeout(1000); 
});
