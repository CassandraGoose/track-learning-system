import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/1/1');
});

// test('has a title', async ({ page }) => {
//   await expect(page.getByTestId('competency-title')).toHaveText('Competency: Find personal pathways');
// });

// test('has a form', async ({ page }) => {
//   await expect(page.getByTestId('new-proof-form-title')).toHaveText('Add New Proof');
//   await expect(page.getByTestId('new-proof-form')).toHaveText('Proof TitleProof DescriptionProofAdd');
//   await expect(page.getByTestId('proof-title-input')).toBeVisible();
//   await expect(page.getByTestId('proof-description-textarea')).toBeVisible();
//   await expect(page.getByTestId('proof-justification-textarea')).toBeVisible();
// });

test('submits a proof', async ({ page }) => {
  await page.getByTestId('proof-title-input').fill('My Proof');
  await page.getByTestId('proof-description-textarea').fill('My description');
  await page.getByTestId('proof-justification-textarea').fill('My justification');
  await page.getByTestId('new-proof-submit').click();
  await expect(page.getByTestId('proof-title').last()).toHaveText('My Proof');
  await expect(page.getByTestId('proof-description').last()).toHaveText('My description');
  await expect(page.getByTestId('proof-justification').last()).toHaveText('My justification');
  //delete to keep tests stand-alone
  // await expect(page.getByTestId('delete-proof')).toBeVisible({ timeout: 100000 });
  await page.getByTestId('delete-proof').waitFor({state: 'attached'});
  await page.getByTestId('delete-proof').click();
  await page.getByTestId('proof-table').waitFor({state: 'detached'});
  // await expect(page.getByTestId('proof-table')).toHaveCount(0);
});

// test('removes proof from list', async ({ page }) => {
//   // add proof to keep tests stand-alone
//   await page.getByTestId('proof-title-input').fill('My Proof');
//   await page.getByTestId('proof-description-textarea').fill('My description');
//   await page.getByTestId('proof-justification-textarea').fill('My justification');
//   await page.getByTestId('new-proof-submit').click();
//   await expect(page.getByTestId('proof-title').last()).toHaveText('My Proof');
//   await expect(page.getByTestId('proof-description').last()).toHaveText('My description');
//   await expect(page.getByTestId('proof-justification').last()).toHaveText('My justification');

//   // actual test
//   await expect(page.getByTestId('delete-proof')).toBeVisible();
//   await page.getByTestId('delete-proof').click();
//   await page.waitForTimeout(5000)
//   await expect(page.getByTestId('proof-table')).toBeHidden();
// });