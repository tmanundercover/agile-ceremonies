#!/usr/bin/env node
const rimraf = require('rimraf');
const path = require('path');

// Define the path to the logs directory
const logsDir = path.join(__dirname, '../logs');

rimraf(logsDir, (err) => {
  if (err) {
    console.error("Error clearing logs:", err);
    process.exit(1);
  }
  console.log("Logs cleared successfully.");
});
