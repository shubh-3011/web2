import JSZip from 'jszip';

const files = {
    'index.html': await fetch('index.html').then(res => res.text()),
    'style.css': await fetch('style.css').then(res => res.text()),
    'stock-in.html': await fetch('stock-in.html').then(res => res.text()),
    'stock-out.html': await fetch('stock-out.html').then(res => res.text())
};

document.getElementById('downloadBtn').addEventListener('click', async () => {
    const zip = new JSZip();
    
    // Add files to zip
    Object.entries(files).forEach(([filename, content]) => {
        zip.file(filename, content);
    });
    
    // Generate and download zip
    const blob = await zip.generateAsync({ type: 'blob' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'inventory-management.zip';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});