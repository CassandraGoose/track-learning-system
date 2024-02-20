import { test, expect, firefox } from '@playwright/test';

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
  await expect(page.getByTestId('pathway-card').locator('nth=-1')).toHaveText('IllustrationThis pathway is similar to a college level program in illustration and visual arts. To prove competency in this pathway, deep understanding and skill mastery will be required. Completion of this pathway could easily take years. Learners should expect to practice drawing, painting, digital art, writing, research, and learn tools to get started in the art industry. Learners should also consider reaching out to peers or experts for feedback, as receiving feedback and implementing changes is one of the best ways to grow as an artist.View Pathway0%');
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
  await expect(page.getByTestId('delete-proof')).toHaveCount(2);
  await page.goto('http://localhost:3000/dashboard');
  await expect(page.getByTestId('progress-radial').locator('nth=0')).toHaveText('100%');

  // remove proof to keep tests stand-alone
  await page.goto('http://localhost:3000/dashboard/1/1');
  await expect(page.getByTestId('delete-proof').first()).toBeVisible();
  await page.getByTestId('delete-proof').first().click();
});
