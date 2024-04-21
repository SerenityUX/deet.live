const express = require('express');

let fetch;

import('node-fetch').then(({ default: fetchModule }) => {
    fetch = fetchModule;
});

const app = express();
const port = 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));


// Serve the home page on the root route
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

// Endpoint to fetch RSS feed
app.get('/rss', async (req, res) => {
    try {
        const response = await fetch('https://www.spreaker.com/show/5230707/episodes/feed');
        const data = await response.text();
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching RSS feed');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
