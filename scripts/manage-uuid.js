const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

function generateUUID() {
    return uuidv4();
}

function updateElementJson() {
    const elementJsonPath = path.join(__dirname, '..', 'src', 'site', 'widgets', 'custom-elements', 'pair-programming', 'element.json');

    try {
        // Read the current element.json
        const elementJson = JSON.parse(fs.readFileSync(elementJsonPath, 'utf8'));
        
        // Generate and store the old ID for logging
        const oldId = elementJson.id;
        
        // Generate new UUID
        const newUUID = generateUUID();
        
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
