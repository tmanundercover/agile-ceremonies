export const saveSvgFile = (svgContent: string, filename: string = 'component.svg') => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const saveMultipleSvgFiles = (svgContents: string[]) => {
    svgContents.forEach((content, index) => {
        setTimeout(() => {
            saveSvgFile(content, `component-${index + 1}.svg`);
        }, index * 100); // Small delay between downloads
    });
};
