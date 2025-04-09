import React from 'react';
import { setupVisualTest, injectStyles, takeScreenshot } from '../../../../../../../test/helpers/visualTestHelpers';
import { ProjectInfoWelcomeStep } from '../ProjectInfoWelcomeStep';
import fs from 'fs';
import path from 'path';

describe('ProjectInfoWelcomeStep Visual Regression', () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    ({ browser, page } = await setupVisualTest());
  });

  afterAll(async () => {
    await browser.close();
  });

  it('matches mockup', async () => {
    // Inject the component into the page
    await injectStyles(page, <ProjectInfoWelcomeStep onNextStep={() => {}} />);

    // Take a screenshot of the rendered component
    const screenshot = await takeScreenshot(page);

    // Compare screenshot with mockup
    expect(screenshot).toMatchVisualSnapshot({
      customSnapshotIdentifier: 'project-info-welcome-step'
    });

    // Verify the mockup exists
    const mockupPath = path.join(__dirname, 'mockups', 'ProjectInfoWelcomeStep.svg');
    expect(fs.existsSync(mockupPath)).toBeTruthy();
  });
});
