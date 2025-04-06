const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const prompts = require('prompts');

function generateUUID() {
    return uuidv4();
}

function listWidgets(customElementsDir) {
    // List directories in custom-elements folder
    return fs.readdirSync(customElementsDir).filter(dir => {
        const fullPath = path.join(customElementsDir, dir);
        return fs.statSync(fullPath).isDirectory();
    });
}

async function updateSelectedWidgets(customElementsDir) {
    // List widget directories
    const widgets = listWidgets(customElementsDir);
    if (widgets.length === 0) {
        console.log('No widgets found in:', customElementsDir);
        return;
    }

    const response = await prompts({
        type: 'multiselect',
        name: 'selectedWidgets',
        message: 'Select widgets to update UUIDs',
        choices: widgets.map((widget, i) => ({ title: widget, value: i })),
        min: 1
    });

    const indices = response.selectedWidgets;
    if (indices.length === 0) {
        console.log('No widgets selected. Exiting.');
        return;
    }

    const summary = [];
    for (const i of indices) {
        const widgetName = widgets[i];
        const elementJsonPath = path.join(customElementsDir, widgetName, 'element.json');
        try {
            const elementJson = JSON.parse(fs.readFileSync(elementJsonPath, 'utf8'));
            // Updated to replace uuid instead of id
            const oldUuid = elementJson.id;
            const newUUID = generateUUID();
            elementJson.id = newUUID;
            fs.writeFileSync(elementJsonPath, JSON.stringify(elementJson, null, 2));
            summary.push({ widget: widgetName, oldUuid, newUuid: newUUID });
            console.log(`Updated widget "${widgetName}": ${oldUuid} -> ${newUUID}`);
        } catch (error) {
            console.error(`Error updating widget "${widgetName}" at ${elementJsonPath}:`, error);
        }
    }

    // Print status summary
    console.log('\nStatus Summary:');
    summary.forEach(item => {
        console.log(`Widget: ${item.widget}, Old UUID: ${item.oldUuid}, New UUID: ${item.newUuid}`);
    });

    // Write summary to log file
    const logDir = path.join(__dirname, '..', '..', 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    const logFilePath = path.join(logDir, 'replaced-uuid.log');
    const logContent = summary.map(item => `Widget: ${item.widget}, Old UUID: ${item.oldUuid}, New UUID: ${item.newUuid}`).join('\n');
    fs.writeFileSync(logFilePath, logContent);
}

const customElementsDir = process.argv[2] || path.join(__dirname, '..', 'src', 'site', 'widgets', 'custom-elements');
updateSelectedWidgets(customElementsDir);
