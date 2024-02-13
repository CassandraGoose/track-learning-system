// playwright global setup
import { execSync } from 'child_process';
import { chromium, type FullConfig } from '@playwright/test';

// why us db instead of mocks? The mocking documentation is unclear, particularly for use in next.js with prisma. Instead of spending time on that, 
// the decision is to just setup and tear down a db for testing, since it's free. 
// It's Quick. It's Easy. It's Free.

async function globalSetup(config: FullConfig) {
  // hate this. not sure what else to do at this time as no programmitic options exist from prisma.
  execSync(`npx prisma db push --force-reset && npx prisma db seed`, { stdio: 'inherit' });
}

export default globalSetup;