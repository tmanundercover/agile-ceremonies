import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ClientInfoWelcomeStep from '../ClientInfoWelcomeStep';
import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { setupVisualTest, injectStyles, takeScreenshot } from '../../../../../../../test/helpers/visualTestHelpers';

expect.extend({ toMatchImageSnapshot });

describe('ClientInfoWelcomeStep Visual Tests', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    const setup = await setupVisualTest();
    browser = setup.browser;
    page = setup.page;
    await page.setViewport({ width: 1200, height: 1000 });
  });

  afterAll(async () => {
    await browser.close();
  });

  afterEach(() => {
    cleanup();
  });

  it('should match visual snapshot', async () => {
    const component = <ClientInfoWelcomeStep onNextStep={() => {}} />;

    // Visual test
    await injectStyles(page, component);
    const screenshot = await takeScreenshot(page);

    expect(screenshot).toMatchImageSnapshot({
      customSnapshotIdentifier: 'client-info-welcome-step',
      failureThreshold: 0.001,
      failureThresholdType: 'percent'
    });
  });
});
