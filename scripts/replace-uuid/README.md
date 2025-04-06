# Widget UUID Manager

## Overview

This script now allows you to select one or more widgets to update their UUIDs. It lists all widget directories under the custom-elements folder, lets you choose via a comma separated list of indices, generates a new UUID for each selected widget, and then replaces the UUID in each widget’s element.json file.

## Common Error This Solves

```
✖ Found multiple extensions with the same uuid, this might happen if you copy paste folders.
Duplicate UUID: 2915ffaa-5cbf-4821-9f83-593d19cef477
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
npm run replace-uuid
```

The script will:
1. List available widgets in the `custom-elements` directory.
2. Prompt you to select widgets to update.
3. Generate a new UUID for each selected widget.
4. Replace the UUID in each widget’s `element.json` file.
5. Display a summary of the updated widgets with their old and new UUIDs.

## Example Output

```
Available widgets:
✔ Select widgets to update UUIDs … 
❯◯ widgetOne
 ◯ widgetTwo
 ◯ widgetThree
Updated widget "widgetOne": 2915ffaa-5cbf-4821-9f83-593d19cef477 -> 1cdcba04-63cc-4188-a3ef-56da351472b0
Updated widget "widgetThree": 7f8d9a0e-6e83-4e19-b1fa-99e7c7707c9e -> 7d2c443a-702e-4fc8-921d-3f5ad89513fa

Status Summary:
Widget: widgetOne, Old UUID: 2915ffaa-5cbf-4821-9f83-593d19cef477, New UUID: 1cdcba04-63cc-4188-a3ef-56da351472b0
Widget: widgetThree, Old UUID: 7f8d9a0e-6e83-4e19-b1fa-99e7c7707c9e, New UUID: 7d2c443a-702e-4fc8-921d-3f5ad89513fa
```

## When to Use

Run this script when one or more widget folders have been copied and you need to ensure each widget has a unique UUID.

