export const saveSvgFile = (svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.endsWith('.svg') ? filename : `${filename}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const saveMultipleSvgFiles = (svgContents: string[], baseFilename: string) => {
    const timestamp = new Date().getTime();
    svgContents.forEach((content, index) => {
        const filename = `${baseFilename}-${timestamp}-${index + 1}.svg`;
        saveSvgFile(content, filename);
    });
};
