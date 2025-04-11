const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const potrace = require('potrace');

async function convertJpegToSvg(directoryPath) {
    try {
        // Read all files in the directory
        const files = fs.readdirSync(directoryPath);
        
        // Filter for JPEG files
        const jpegFiles = files.filter(file => 
            /\.(jpg|jpeg)$/i.test(file)
        );

        console.log(`Found ${jpegFiles.length} JPEG files`);

        // Process each JPEG file
        for (const file of jpegFiles) {
            const inputPath = path.join(directoryPath, file);
            const outputPath = path.join(
                directoryPath, 
                `${path.parse(file).name}.svg`
            );

            console.log(`Converting ${file} to SVG...`);
            
            // Convert JPEG to PNG buffer using sharp
            const pngBuffer = await sharp(inputPath)
                .png()
                .toBuffer();

            // Convert PNG buffer to SVG using potrace
            await new Promise((resolve, reject) => {
                potrace.trace(pngBuffer, (err, svg) => {
                    if (err) reject(err);
                    fs.writeFileSync(outputPath, svg);
                    resolve();
                });
            });
        }

        console.log('Conversion completed successfully!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Check if directory path is provided as command line argument
const directoryPath = process.argv[2];
if (!directoryPath) {
    console.error('Please provide a directory path');
    process.exit(1);
}

// Run the conversion
convertJpegToSvg(directoryPath);
