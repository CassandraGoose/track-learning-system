import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/1');
});

test('renders competency progress', async ({ page }) => {
  await expect(page.getByTestId('competency-progress')).toHaveText('1 / 1 competencies met');
});

test('updates competency progress when proof is added', async ({ page }) => {
  await page.getByTestId('toggle-competency-details').click();
  await page.getByTestId('view-proofs').first().click();
  await page.getByTestId('proof-title-input').fill('My Proof');
  await page.getByTestId('proof-description-textarea').fill('My description');
  await page.getByTestId('proof-justification-textarea').fill('My justification');
  await page.getByTestId('new-proof-submit').click();
  await page.getByTestId('proof-table').waitFor({state: 'attached'});
  await page.goBack();
  await page.getByTestId('toggle-competency-details').click();
  await expect(page.getByTestId('competency-progress')).toHaveText('1 / 1 competencies met');
  await expect(page.getByTestId('completed-check').first()).toHaveText('✓');

  // remove proof to keep tests stand-alone
  await page.getByTestId('view-proofs').first().click();
  await page.getByTestId('delete-proof').first().click();
});

test('updates competency progress when proof is removed', async ({ page }) => {
  // add proof to keep tests stand-alone
  await page.getByTestId('toggle-competency-details').click();
  await page.getByTestId('view-proofs').first().click();
  await page.getByTestId('proof-title-input').fill('My Proof');
  await page.getByTestId('proof-description-textarea').fill('My description');
  await page.getByTestId('proof-justification-textarea').fill('My justification');
  await page.getByTestId('new-proof-submit').click();
  await page.getByTestId('proof-table').waitFor({state: 'attached'});
  await page.goto('http://localhost:3000/dashboard/1');
  await page.getByTestId('toggle-competency-details').click();
  await expect(page.getByTestId('competency-progress')).toHaveText('1 / 1 competencies met');
  await expect(page.getByTestId('completed-check').first()).toHaveText('✓');

  await page.getByTestId('view-proofs').first().click();
  await expect(page.getByTestId('delete-proof').first()).toBeVisible();
  await page.getByTestId('delete-proof').first().click();
  // will use this in the next pr
  // await page.getByTestId('proof-table').waitFor({state: 'detached'});
});

test('shows the table for competencies in the content area', async ({ page }) => {
  await page.getByTestId('toggle-competency-details').click();
  await expect(page.getByRole('table')).toBeVisible();
});
