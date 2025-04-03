const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to element.json
const elementJsonPath = path.join(__dirname, '../src/site/widgets/custom-elements/pair-programming/element.json');
let widgetId = 'default-id';

try {
  const elementData = JSON.parse(fs.readFileSync(elementJsonPath, 'utf8'));
  widgetId = elementData.id || widgetId;
} catch (err) {
  console.error('Error reading element.json:', err);
  process.exit(1);
}

const proc = spawn('wix', ['app', 'dev']);

let outputBuffer = '';

proc.stdout.on('data', (data) => {
  process.stdout.write(data);
  outputBuffer += data;
});

proc.stderr.on('data', (data) => {
  process.stderr.write(data);
  outputBuffer += data;
});

proc.on('close', (code) => {
  const ext = code === 0 ? '.log' : '.uuid-error.log';
  // Create logs directory at the project root if it doesn't exist
  const logsDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  // Enforce a maximum of 5 log files; delete the oldest if creating the 6th
  const files = fs.readdirSync(logsDir);
  if (files.length >= 5) {
    const sortedFiles = files.sort((a, b) => {
      return fs.statSync(path.join(logsDir, a)).mtime.getTime() -
             fs.statSync(path.join(logsDir, b)).mtime.getTime();
    });
    fs.unlinkSync(path.join(logsDir, sortedFiles[0]));
  }
  const fileName = path.join(logsDir, `${widgetId}${ext}`);
  fs.writeFileSync(fileName, outputBuffer);
  process.exit(code);
});
