import React from 'react';
import renderString from 'react-dom/server'
import {injectStyles, setupVisualTest, takeScreenshot} from '../../../../../../../test/helpers/visualTestHelpers';
import {ClientInfoWelcomeStep} from '../ClientInfoWelcomeStep';
// import '@radix-ui/themes/styles.css';
import RadixThemeWrapper from "../../../../../../../test/RadixThemeWrapper";
import {Theme} from "@radix-ui/themes";

jest.mock("@radix-ui/react-portal", () => ({
  ...jest.requireActual("@radix-ui/react-portal"),
  Portal: ({ children }:{children:any}) => <>{children}</>,
}));
describe('ClientInfoWelcomeStep Mockup Visual Regression', () => {
  let browser: any;
  let page: any;
  let mockupPage: any;

  beforeAll(async () => {
    ({ browser, page, mockupPage } = await setupVisualTest());
  });

  afterAll(async () => {
    await browser.close();
  });

  it('matches SVG mockup', async () => {


    await injectStyles(page, <Theme><div style={{padding: "32px"}}><ClientInfoWelcomeStep onNextStep={() => {}} /></div></Theme>);

    // render()

    // const mockupPath = path.join(__dirname, 'mockups', 'ClientInfoWelcomeStep.styled.svg');
    // expect(fs.existsSync(mockupPath)).toBeTruthy();
    const screenshot = await takeScreenshot(page);
    expect(screenshot).toMatchScreenshot({
        customSnapshotIdentifier: 'client-info-welcome-step'
      });
    // const svgContent = fs.readFileSync(mockupPath);
    //
    // await mockupPage.setViewport({ width: 1200, height: 1000 });
    //
    // const svgString = svgContent.toString();
    //
    // // Set the content of the page to the SVG
    // await mockupPage.setContent(svgString, { waitUntil: 'networkidle0' });
    //
    // const svgMockupScreenshot = await takeScreenshot(mockupPage);

    // expect(screenshot).toMatchScreenshot({
    //   customSnapshotIdentifier: 'client-info-welcome-step'
    // });
    //
    // expect(svgMockupScreenshot).toMatchSVGMockup({
    //   customSnapshotIdentifier: 'client-info-welcome-step-mockup'
    // });
  });
});
