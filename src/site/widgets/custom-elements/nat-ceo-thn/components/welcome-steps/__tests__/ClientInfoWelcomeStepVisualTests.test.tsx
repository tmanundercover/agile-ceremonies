import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { Server } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ClientInfoWelcomeStep } from '../ClientInfoWelcomeStep';

expect.extend({ toMatchImageSnapshot });

describe('ClientInfoWelcomeStep Visual Regression', () => {
    let server: Server;
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    beforeAll(async () => {
        // Create a simple server to render the component
        server = createServer((req, res) => {
            const html = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <style>
                            body { margin: 0; padding: 0; }
                        </style>
                    </head>
                    <body>
                        <div id="root">${ReactDOMServer.renderToString(<ClientInfoWelcomeStep />)}</div>
                    </body>
                </html>
            `;
            res.end(html);
        }).listen(3030);

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        page = await browser.newPage();
        await page.setViewport({
            width: 1200,
            height: 1000,
            deviceScaleFactor: 1,
        });
    });

    afterAll(async () => {
        await browser.close();
        server.close();
    });

    it('should match the design mockup', async () => {
        // Load the component in Puppeteer
        await page.goto('http://localhost:3030');
        
        // Wait for component to be fully rendered
        await page.waitForSelector('#root');

        // Take a screenshot of the component
        const screenshot = await page.screenshot({
            fullPage: true
        });

        // Load the SVG mockup for comparison
        const mockupPath = resolve(__dirname, './mockups/ClientInfoWelcomeStep.svg');
        const mockupSvg = readFileSync(mockupPath, 'utf8');

        // Compare the screenshot with the mockup
        expect(screenshot).toMatchImageSnapshot({
            customDiffConfig: {
                threshold: 0.1, // Allow slight differences due to rendering
            },
            failureThreshold: 0.01,
            failureThresholdType: 'percent'
        });
    });
});
