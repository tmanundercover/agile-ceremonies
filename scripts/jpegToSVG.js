const fs = require('fs');
const path = require('path');
const imagemagick = require('imagemagick');
const { promisify } = require('util');
const { exec } = require('child_process');

// Promisify imagemagick convert
const convert = promisify(imagemagick.convert);
const execPromise = promisify(exec);

function checkDependencies() {
    return Promise.all([
        checkImageMagick(),
        checkPotrace()
    ]);
}

function checkImageMagick() {
    return new Promise((resolve, reject) => {
        exec('convert -version', (error) => {
            if (error) {
                console.error('ImageMagick is not installed. Please install it first:');
                console.log('\nOn macOS (using Homebrew):');
                console.log('brew install imagemagick');
                console.log('\nOn Ubuntu/Debian:');
                console.log('sudo apt-get update && sudo apt-get install imagemagick');
                console.log('\nOn Windows:');
                console.log('1. Download from https://imagemagick.org/script/download.php');
                console.log('2. Run the installer');
                console.log('3. Restart your terminal');
                reject(new Error('ImageMagick not found'));
            }
            resolve();
        });
    });
}

function checkPotrace() {
    return new Promise((resolve, reject) => {
        exec('potrace --version', (error) => {
            if (error) {
                console.error('Potrace is not installed. Please install it first:');
                console.log('\nOn macOS (using Homebrew):');
                console.log('brew install potrace');
                console.log('\nOn Ubuntu/Debian:');
                console.log('sudo apt-get update && sudo apt-get install potrace');
                console.log('\nOn Windows:');
                console.log('Download from http://potrace.sourceforge.net/');
                reject(new Error('Potrace not found'));
            }
            resolve();
        });
    });
}

async function convertJpegToSvg(directoryPath) {
    try {
        await checkDependencies();
        const files = fs.readdirSync(directoryPath);
        const jpegFiles = files.filter(file => 
            /\.(jpg|jpeg)$/i.test(file)
        );

        console.log(`Found ${jpegFiles.length} JPEG files`);

        for (const file of jpegFiles) {
            try {
                const inputPath = path.join(directoryPath, file);
                const baseName = path.parse(file).name;
                const outputPath = path.join(directoryPath, `${baseName}.svg`);
                const tempDir = path.join(directoryPath, `${baseName}_temp`);

                console.log(`Converting ${file} to color SVG...`);

                // Create temporary directory
                if (!fs.existsSync(tempDir)) {
                    fs.mkdirSync(tempDir);
                }

                // Step 1: Prepare image and extract colors
                console.log('Step 1: Preparing image...');
                await convert([
                    inputPath,
                    '-resize', '800x800>',
                    '-posterize', '5',
                    '-alpha', 'remove',
                    `${tempDir}/prepared.png`
                ]);

                // Step 2: Separate into color layers
                console.log('Step 2: Extracting colors...');
                const colors = await convert([
                    `${tempDir}/prepared.png`,
                    '-unique-colors',
                    'txt:'
                ]);

                // Extract colors from ImageMagick output and format for potrace
                const colorList = colors.split('\n')
                    .filter(line => line.includes('#'))
                    .map(line => {
                        const match = line.match(/#[0-9A-F]{6}/i);
                        return match ? match[0].toLowerCase() : null;
                    })
                    .filter(color => color);

                if (colorList.length === 0) {
                    throw new Error('No colors extracted from image');
                }

                console.log(`Found ${colorList.length} colors`);
                const layers = [];

                // Create separate layer for each color
                for (let i = 0; i < colorList.length; i++) {
                    console.log(`Processing color layer ${i + 1}/${colorList.length}`);
                    const color = colorList[i];
                    await convert([
                        `${tempDir}/prepared.png`,
                        '-fill', 'white',
                        '-fuzz', '10%',
                        '-opaque', color,
                        '-threshold', '50%',
                        `${tempDir}/layer_${i}.pbm`
                    ]);

                    // Convert layer to SVG with corrected color parameter
                    const colorWithoutHash = color.substring(1); // Remove # from color
                    await execPromise(`potrace "${tempDir}/layer_${i}.pbm" -s --color "${color}" -o "${tempDir}/layer_${i}.svg"`);
                    const svgContent = fs.readFileSync(`${tempDir}/layer_${i}.svg`, 'utf-8');
                    layers.push(svgContent);
                }

                // Combine all SVG layers
                console.log('Combining SVG layers...');
                const combinedSvg = combineSvgLayers(layers);
                fs.writeFileSync(outputPath, combinedSvg);

                // Clean up temporary directory
                fs.rmSync(tempDir, { recursive: true, force: true });
                console.log(`Successfully converted ${file} to color SVG`);
            } catch (error) {
                console.error(`Error processing ${file}:`, error.message);
                continue; // Continue with next file even if one fails
            }
        }

        console.log('All conversions completed!');
    } catch (error) {
        console.error('An error occurred:', error.message);
        process.exit(1);
    }
}

function combineSvgLayers(layers) {
    if (!layers || layers.length === 0) {
        throw new Error('No SVG layers provided');
    }

    // Extract viewBox from first layer with error handling
    let viewBox = 'viewBox="0 0 800 800"'; // default fallback
    const viewBoxMatch = layers[0].match(/viewBox="[^"]+"/);
    if (viewBoxMatch) {
        viewBox = viewBoxMatch[0];
    }
    
    // Combine all paths from all layers with error handling
    const paths = layers.map((layer, index) => {
        const pathMatch = layer.match(/<path[^>]+>/);
        if (!pathMatch) {
            console.warn(`Warning: No path found in layer ${index}`);
            return '';
        }
        return pathMatch[0];
    }).filter(path => path).join('\n');

    if (!paths) {
        throw new Error('No valid SVG paths found in any layer');
    }

    return `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg" ${viewBox}>
${paths}
</svg>`;
}

// Check if directory path is provided as command line argument
const directoryPath = process.argv[2];
if (!directoryPath) {
    console.error('Please provide a directory path');
    process.exit(1);
}

// Run the conversion
convertJpegToSvg(directoryPath);

