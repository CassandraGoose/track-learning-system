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

test('has the option to follow pathways', async ({ page }) => {
  await page.locator('li').filter({ hasText: 'Pathways' }).click();
  await page.locator('article').filter({ hasText: 'Artistic Roller SkatingMaster' }).getByTestId('view-pathway').click();
  await expect(page.getByRole('button', { name: 'Follow This Pathway' })).toBeVisible();
});

test('cannot follow followed pathways', async ({ page }) => {
  await page.locator('li').filter({ hasText: 'Pathways' }).click();
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('ill');
  await page.locator('article').filter({ hasText: 'Illustration' }).getByTestId('view-pathway').click();
  await expect(page.getByRole('button', { name: 'Follow This Pathway' })).toHaveCount(0);
  await expect(page.getByTestId('pathway-title')).toContainText('Illustration');
  await expect(page.getByTestId('pathway-description')).toContainText('This pathway is similar to a college level program in illustration and visual arts. To prove competency in this pathway, deep understanding and skill mastery will be required. Completion of this pathway could easily take years. Learners should expect to practice drawing, painting, digital art, writing, research, and learn tools to get started in the art industry. Learners should also consider reaching out to peers or experts for feedback, as receiving feedback and implementing changes is one of the best ways to grow as an artist.');
  await expect(page.getByRole('main')).toContainText('What will you learn?');
  await expect(page.getByRole('main')).toContainText('Below, you can find a list of competencies that describe what skills and knowledge you will need to progress through your pathway. You can proove that you have mastered the competencies below by uploading artifacts (called \'proofs\') to act as proof of your skills and knowledge.');
  await expect(page.getByRole('main')).toContainText('2D Design Fundamentals');
  await expect(page.getByRole('main')).toContainText('Explore form and space in 2D design');
});

test('shows pathway details', async ({ page }) => {
  await page.locator('li').filter({ hasText: 'Pathways' }).click();
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('ill');
  await page.locator('article').filter({ hasText: 'Illustration' }).getByTestId('view-pathway').click();
  await expect(page.getByTestId('pathway-title')).toContainText('Illustration');
  await expect(page.getByTestId('pathway-description')).toContainText('This pathway is similar to a college level program in illustration and visual arts. To prove competency in this pathway, deep understanding and skill mastery will be required. Completion of this pathway could easily take years. Learners should expect to practice drawing, painting, digital art, writing, research, and learn tools to get started in the art industry. Learners should also consider reaching out to peers or experts for feedback, as receiving feedback and implementing changes is one of the best ways to grow as an artist.');
  await expect(page.getByRole('main')).toContainText('What will you learn?');
  await expect(page.getByRole('main')).toContainText('Below, you can find a list of competencies that describe what skills and knowledge you will need to progress through your pathway. You can proove that you have mastered the competencies below by uploading artifacts (called \'proofs\') to act as proof of your skills and knowledge.');
  await expect(page.getByRole('main')).toContainText('2D Design Fundamentals');
  await expect(page.getByRole('main')).toContainText('Explore form and space in 2D design');
});


