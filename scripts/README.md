# UUID Generator Script

## Overview

A simple script to generate a UUID using Node.js and run it as an npm script.

## Steps to Set Up

### 1️⃣ Create the Script File

Inside your project, create a `scripts` folder (if it doesn't already exist), and then create a file named `new-uuid.js` inside it:

```bash
mkdir -p scripts
touch scripts/generate-uuid.js
```

### 2️⃣ Add This Code to `scripts/generate-uuid.js`

```javascript
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();
console.log(`Generated UUID: ${uuid}`);
```

### 3️⃣ Install the UUID Package

Since the script uses the `uuid` library, install it with:

```bash
npm install uuid
```

### 4️⃣ Add a Script Entry in `package.json`

Modify your `package.json` to include this in the `"scripts"` section:

```json
"scripts": {
  "get-new-uuid": "node scripts/generate-uuid.js"
}
```

### 5️⃣ Run the Script

Now, you can generate a UUID by running:

```bash
npm run get-new-uuid
```

This will generate a UUID and log it to the console.

## 🎉 Done!

Now you can copy this to the element.json file in your widget directory if you ever run into the duplicate widget ID error that you usually get from copying widget files and folders to other locations. Search your code for the duplicate ID just in case it's lurking elsewhere 🚀

