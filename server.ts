import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

// Default route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for SPA-like behavior or just ensuring all .html files are served
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, req.path);
    if (!filePath.endsWith('.html') && !filePath.includes('.')) {
        res.sendFile(path.join(__dirname, req.path + '.html'), (err) => {
            if (err) {
                res.status(404).sendFile(path.join(__dirname, 'index.html'));
            }
        });
    } else {
        res.status(404).sendFile(path.join(__dirname, 'index.html'));
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Growvix Static Server running on port ${PORT}`);
});
