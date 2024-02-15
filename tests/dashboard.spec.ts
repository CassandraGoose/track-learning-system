import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto('http://localhost:3000/dashboard');
});

test('has a title', async ({ page }) => {
  await expect(page.getByRole('heading')).toHaveText('My Pathways');
});

test('contains pathways', async ({ page }) => {
  await expect(page.getByTestId('pathway-card')).toHaveCount(2)

  await expect(page.getByTestId('pathway-card').locator('nth=0')).toHaveText('Use TrackLearn to use the tool so you can leverage it to your advantage.View Pathway100%');
  await expect(page.getByTestId('pathway-card').locator('nth=-1')).toHaveText('Learn to LearnUtilize a growth mindset and grit to learn anythingView Pathway0%');
});

test('shows appropriate progress', async ({ page }) => {
  await expect(page.getByTestId('progress-radial').locator('nth=0')).toHaveText('100%');
});

test('updates radial progress', async ({ page }) => {
  // setup proofs to change radial
  await page.getByTestId('view-pathway').first().click();
  await page.getByTestId('toggle-competency-details').click();
  await page.getByTestId('view-proofs').first().click();
  await page.getByTestId('proof-title-input').fill('My Proof');
  await page.getByTestId('proof-description-textarea').fill('My description');
  await page.getByTestId('proof-justification-textarea').fill('My justification');
  await page.getByTestId('new-proof-submit').click();
  await page.getByTestId('proof-table').waitFor({state: 'attached'});
  await page.goBack();
  await page.goBack();
  await expect(page.getByTestId('progress-radial').locator('nth=0')).toHaveText('100%');

  // remove proof to keep tests stand-alone
  await page.goto('http://localhost:3000/dashboard/1/1');
  await page.getByTestId('delete-proof').first().click();
});
