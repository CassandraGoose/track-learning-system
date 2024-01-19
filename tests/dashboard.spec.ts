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

  await expect(page.getByTestId('pathway-card').locator('nth=0')).toHaveText('Learn to LearnUtilize a growth mindset and grit to learn anythingView Pathway70%');
  await expect(page.getByTestId('pathway-card').locator('nth=-1')).toHaveText('Use TrackLearn to use the tool so you can leverage it to your advantage.View Pathway70%');
});
