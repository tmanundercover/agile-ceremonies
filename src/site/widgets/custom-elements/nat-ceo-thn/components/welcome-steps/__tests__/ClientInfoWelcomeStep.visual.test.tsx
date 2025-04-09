import React from 'react';
import { setupVisualTest, injectStyles, takeScreenshot } from '../../../../../../../test/helpers/visualTestHelpers';
import { ClientInfoWelcomeStep } from '../ClientInfoWelcomeStep';
import fs from 'fs';
import path from 'path';

describe('ClientInfoWelcomeStep Visual Regression', () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    ({ browser, page } = await setupVisualTest());
  });

  afterAll(async () => {
    await browser.close();
  });

  it('matches visual snapshot', async () => {
    // Inject the component into the page
    await injectStyles(page, <ClientInfoWelcomeStep onNextStep={() => {}} />);

    // Take a screenshot of the rendered component
    const screenshot = await takeScreenshot(page);

    // Compare screenshot with mockup
    expect(screenshot).toMatchVisualSnapshot({
      customSnapshotIdentifier: 'client-info-welcome-step'
    });

    // Verify the mockup exists
    const mockupPath = path.join(__dirname, 'mockups', 'ClientInfoWelcomeStep.svg');
    expect(fs.existsSync(mockupPath)).toBeTruthy();
  });
});
