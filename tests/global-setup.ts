// playwright global setup
import { execSync } from 'child_process';
import { chromium, type FullConfig } from '@playwright/test';

// why us db instead of mocks? The mocking documentation is unclear, particularly for use in next.js with prisma. Instead of spending time on that, 
// the decision is to just setup and tear down a db for testing, since it's free. 
// It's Quick. It's Easy. It's Free.
// really, though, it seems like mocking a service worker would work? but next 13 isn't yet compatible for some reason, apparently. 

async function globalSetup(config: FullConfig) {
  
  // hate this. not sure what else to do at this time as no programmitic options exist from prisma.
  execSync(`npx prisma db push --force-reset && npx prisma db seed`, { stdio: 'inherit' });

  // when mocking is more reasonable in Next, then we will mock this, along with the prisma calls.
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');
  await page.getByTestId("username").fill("CassTheOG");
  await page.getByTestId("password").fill(process.env.TEST_USER_PW || '');
  await page.getByTestId("login").click();
  await page.waitForURL('http://localhost:3000/dashboard');
  await page.context().storageState({ path: storageState as string });
  await page.waitForURL('http://localhost:3000/dashboard');

  await browser.close();

}

export default globalSetup;