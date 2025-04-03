# Widget UUID Manager

## Overview

This script helps prevent duplicate widget ID errors that commonly occur when copying widget files or folders. It automatically updates the UUID in your widget's element.json file.

## Common Error This Solves

```
✖ Found multiple extensions with the same id, this might happen if you copy paste folders.

Duplicate ID: 2915ffaa-5cbf-4821-9f83-593d19cef477
Extensions:
[custom element] Pair Programming (src/site/widgets/custom-elements/pair-programming/element.json)
[custom element] Pair Programming (src/site/widgets/custom-elements/pair-programming/element.json)
```

## Setup

### 1️⃣ Dependencies

The script requires the `uuid` package. Install it with:

```bash
npm install uuid
```

### 2️⃣ Usage

Run the script using:

```bash
npm run update-uuid
```

This will:
1. Generate a new UUID
2. Update the ID in your widget's element.json file
3. Display both the old and new IDs for verification

### 3️⃣ Output Example

```
UUID Update Success!
-------------------
Old ID: 2915ffaa-5cbf-4821-9f83-593d19cef477
New ID: 1cdcba04-63cc-4188-a3ef-56da351472b0
Updated file: /path/to/element.json
```

## When to Use

Run this script when:
- You've copied a widget folder to create a new widget
- You're getting duplicate widget ID errors
- You need to ensure unique IDs across your widgets

## 🔍 Note

The script automatically targets the element.json file in the pair-programming widget directory. If you need to update a different widget, modify the path in the script accordingly.
