const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

function generateUUID() {
    return uuidv4();
}

function updateElementJson() {
    const elementJsonPath = path.join(__dirname, '..', 'src', 'site', 'widgets', 'custom-elements', 'pair-programming', 'element.json');
    let newUUID = null;

    // Check for .uuid-error.log file in parent folder's logs directory
    const logsDir = path.join(__dirname, '..', 'logs');
    if (fs.existsSync(logsDir)) {
      const logFiles = fs.readdirSync(logsDir).filter(file => file.endsWith('.uuid-error.log'));
      if (logFiles.length > 0) {
         for (const file of logFiles) {
            const filePath = path.join(logsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const match = content.match(/Possible GUID:\s*(\S+)/);
            if (match) {
                newUUID = match[1];
                break;
            }
         }
      }
    }

    // Generate new UUID if none extracted from logs
    if (!newUUID) {
        newUUID = generateUUID();
        console.log('UUID generated:', newUUID);
    } else {
        console.log('UUID extracted from logs:', newUUID);
    }

    try {
        // Read the current element.json
        const elementJson = JSON.parse(fs.readFileSync(elementJsonPath, 'utf8'));
        
        // Store the old id for logging
        const oldId = elementJson.id;
        
        // Update the id field
        elementJson.id = newUUID;
        
        // Write back to file with pretty formatting
        fs.writeFileSync(elementJsonPath, JSON.stringify(elementJson, null, 2));
        
        console.log('UUID Update Success!');
        console.log('-------------------');
        console.log('Old ID:', oldId);
        console.log('New ID:', newUUID);
        console.log('Updated file:', elementJsonPath);
    } catch (error) {
        console.error('Error updating element.json:', error);
        process.exit(1);
    }
}

// Execute the update
updateElementJson();

