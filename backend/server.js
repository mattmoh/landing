/*const fs = require('fs');
const path = require('path');

function getFilesFromDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return reject('Unable to scan directory: ' + err);
            }
            const filePaths = files.map(file => path.join(directoryPath, file));
            
            // full file paths
            resolve(filePaths);
            // just the file names
            //resolve(files);
        });
    });
}

const directoryPath = path.join(__dirname, '../frontend/public/markdown/style-guide');

getFilesFromDirectory(directoryPath)
    .then(files => {
        console.log('Files:', files);
    })
    .catch(err => {
        console.error(err);
    });

*/

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow cross-origin requests

// Route to get the list of markdown files
app.get('/files', (req, res) => {
    const directoryPath = path.join(__dirname, '../app/frontend/public/markdown'); // Ensure this points correctly

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        res.json(files); // Send file names as JSON
    });
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

