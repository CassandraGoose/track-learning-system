import { chromium} from '@playwright/test';

async function globalTeardown() {
  // const browser = await chromium.launch();
  // const page = await browser.newPage();
  // page.context().clearCookies();
}

export default globalTeardown;