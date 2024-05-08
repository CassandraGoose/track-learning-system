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

test('shows the username and details', async ({ page }) => {
  await page.getByTestId('navbar-user-button').click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.getByTestId('username')).toContainText('IAmCass');
  await expect(page.getByTestId('user-fullname')).toContainText('Cass T');
  await expect(page.getByTestId('user-bio')).toContainText('Hi, I\'m Cassandra. I\'m a JavaScript developer with a knack for weaving education and code together. I enjoy working throughout the stack and have a particular love for creating front end applications. I believe that coding is a craft and I aim to deliver thoughtful, empathetic, and elegant code. When I\'m not crafting code, you can find me indulging my creative side as an artist, musician, and writer.');
});

test('shows all user pathways', async ({ page }) => {
  await page.getByTestId('navbar-user-button').click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.locator('section')).toContainText('Pathways');
  await expect(page.locator('section')).toContainText('Use Track');
  await expect(page.locator('section')).toContainText('Learn to Learn');
  await expect(page.locator('section')).toContainText('Illustration');
});

test('shows user pathway details', async ({ page }) => {
  await page.getByTestId('navbar-user-button').click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.locator('section')).toContainText('Utilize a growth mindset and grit to learn anything. Learning is a skill, just like riding a bike or cooking. In this pathway, learners will explore the science of learning and develop strategies to deepen their understanding and master skills. This pathway will help learners develop a growth mindset, resilience, and a love for learning. Learners will also learn how to manage time, self regulate, and explore learning strategies. This pathway is a great prerequisite for all other pathways.');
  await expect(page.locator('section')).toContainText('Learning');
  await expect(page.locator('section')).toContainText('Metacognition');
  await expect(page.locator('section')).toContainText('0%');
  await expect(page.locator('section')).toContainText('Metacognition');
  await expect(page.locator('section')).toContainText('Explore Self Regulation');
  await expect(page.locator('section')).toContainText('Explain the importance of managing emotions, behavior, and motivation in learning, and identify strategies to self-regulate effectively, such as limiting applications on computers and phones, silencing phones, and practicing mindfulness techniques.');
  await expect(page.locator('section')).toContainText('Discover Learning Strategies That Work for You');
  await expect(page.locator('section')).toContainText('Identify and describe various learning strategies such as active learning, spaced repetition, mnemonic devices, collaborative learning, etc. Implement a learning strategy that works best for you.');
});

test('shows proofs after they are added', async ({ page }) => {
  await page.getByTestId('navbar-user-button').click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByTestId('navbar-dashboard-link').click();
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();
  await page.getByTestId('toggle-competency-details').first().click();
  await page.getByRole('row', { name: 'View Pathways Explain how to' }).getByTestId('view-proofs').click();
  await page.getByTestId('proof-title-input').click();
  await page.getByTestId('proof-title-input').fill('test');
  await page.getByTestId('proof-title-input').press('Tab');
  await page.getByTestId('proof-description-textarea').fill('test');
  await page.getByTestId('proof-description-textarea').press('Tab');
  await page.getByTestId('proof-justification-textarea').fill('testing');
  await page.getByTestId('new-proof-submit').click();
  await page.getByTestId('navbar-user-button').click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.locator('section')).toContainText('Proof of competency:');
  await expect(page.getByTestId('proof-title')).toContainText('test');

  await page.getByTestId('navbar-dashboard-link').click();
  await page.locator('article').filter({ hasText: 'Use TrackLearn to use the' }).getByTestId('view-pathway').click();
  await page.getByTestId('toggle-competency-details').first().click();
  await page.getByRole('row', { name: '✓ View Pathways' }).getByTestId('view-proofs').click();
  await page.getByTestId('delete-proof').click();
});