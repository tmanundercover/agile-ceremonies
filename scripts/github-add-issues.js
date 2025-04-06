require('dotenv').config();
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Function to dynamically import Octokit
async function getOctokit() {
    const {Octokit} = await import("@octokit/core");
    return Octokit;
}

// Function to prompt the user for input if not provided in config
function promptForInput(promptText) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(promptText, (input) => {
            rl.close();
            resolve(input);
        });
    });
}

// Function to read configuration from a JSON file
async function readConfig(configPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(configPath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

let successCount = 0;
let failureCount = 0;
let failureDetails = [];

// Function to create an issue
async function createIssue(issue, octokit, owner, repo) {
    try {
        const response = await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: owner,
            repo: repo,
            title: issue.title,
            body: issue.body,
            labels: issue.labels,
            milestone: issue.milestone,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        if (response.status === 201) {
            console.log(`Issue "${issue.title}" created successfully`);
            successCount++;
        } else {
            console.log(`Failed to create issue "${issue.title}". Status code: ${response.status}`);
            failureCount++;
            failureDetails.push({title: issue.title, status: response.status});
        }
    } catch (error) {
        console.error(`Error creating issue "${issue.title}":`, error);
        failureCount++;
        failureDetails.push({title: issue.title, status: error.status});
    }
}

// Function to create an issue with a delay
async function createIssueWithDelay(issue, octokit, owner, repo, delay) {
    await new Promise(resolve => setTimeout(resolve, delay));
    await createIssue(issue, octokit, owner, repo);
}

// Create each issue with throttling
async function main() {
    const username = process.env.GITHUB_USERNAME || await promptForInput('Please enter your GitHub username: ');
    const repo = process.env.GITHUB_REPOSITORY || await promptForInput('Please enter your repository name: ');
    const token = process.env.GITHUB_TOKEN || await promptForInput('Please enter your GitHub personal access token: ');
    const filename = process.env.WIX_WIDGET_JSON || await promptForInput('Please enter the filename of the issues JSON file: ');

    const Octokit = await getOctokit();
    const octokit = new Octokit({auth: token});

    fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
            console.error(`Error reading file "${filename}":`, err);
            return;
        }

        console.log(`File "${filename}" read successfully.`); // Debug message

        const issues = JSON.parse(data);
        const delay = 1000; // 1 second delay

        for (const issue of issues) {
            await createIssueWithDelay(issue, octokit, username, repo, delay);
        }

        // Print input summary
        console.log("\nInput Summary:");
        console.log(`Username: ${config.username ? 'From environment' : 'Entered manually'}`);
        console.log(`Repository: ${config.repository ? 'From environment' : 'Entered manually'}`);
        console.log(`Token: ${config.token ? 'From environment' : 'Entered manually'}`);
        console.log(`Issues JSON File: ${config.jsonFile ? 'From environment' : 'Entered manually'}`);

        // Print stats table
        console.log("\nIssue Creation Summary:");
        console.log(`Successful: ${successCount}`);
        console.log(`Failed: ${failureCount}`);
        console.log(`Total: ${successCount + failureCount}`);
        if (failureCount > 0) {
            console.log("Failure Details:");
            failureDetails.forEach(detail => {
                console.log(`- Issue "${detail.title}" failed with status code: ${detail.status}`);
            });
        }
    });
}

// Run the main function
main();
