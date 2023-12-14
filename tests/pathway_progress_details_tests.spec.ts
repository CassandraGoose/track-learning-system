import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/1');
});

test('has a title', async ({ page }) => {
  await expect(page.getByTestId('content-area-title')).toHaveText('Navigating Qual');
});

test('has a description', async ({ page }) => {
  await expect(page.getByTestId('content-area-description')).toHaveText('Practice finding things in the applicaiton.');
});

test('renders competency progress', async ({ page }) => {
  await expect(page.getByTestId('competency-progress')).toHaveText('3/7 competencies met');
});

test('shows the table for competencies in the content area', async ({ page }) => {
  await page.getByRole('button').click();
  await expect(page.getByRole('table')).toHaveText('CompletedCompetencyDescription✅Find personal pathwaysYou can find all of your saved pathwaysProof');
});
