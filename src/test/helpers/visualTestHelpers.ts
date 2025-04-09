import puppeteer from 'puppeteer';
import ReactDOMServer from 'react-dom/server';
import { ReactElement } from 'react';
import radixUI from '@radix-ui/themes/styles.css';
import * as styled from '../../site/widgets/custom-elements/nat-ceo-thn/styledComponents';
import {ServerStyleSheet} from "styled-components";
export async function setupVisualTest() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const mockupPage = await browser.newPage();
  return { browser, page, mockupPage };
}

export async function injectStyles(page: puppeteer.Page, component: ReactElement) {
  const sheet = new ServerStyleSheet()
  const html = ReactDOMServer.renderToString(sheet.collectStyles(component));
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
       
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
  await page.addStyleTag({path: '/Users/terrelltrapperkeepersingleton/IdeaProjects/agile-ceremonies/node_modules/@radix-ui/themes/styles.css'})
  const styleTags = sheet.getStyleTags().replace(/<script[^>]*>|<\/script>/gi, '');
  console.log("styles", styleTags)


  await page.addStyleTag({content: styleTags})
}

export async function takeScreenshot(page: puppeteer.Page) {
  // Wait for any animations to complete
  await page.waitForTimeout(1000);
  
  // Wait for the content to be ready
  // await page.waitForSelector('#root');
  
  return page.screenshot({
    fullPage: true,
    captureBeyondViewport: true
  });
}
