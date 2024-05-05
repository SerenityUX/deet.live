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

app.get('/sendInteraction', async (req, res) => {
    try {
        const response = await fetch('https://whispering-tundra-60957-a9fec9593e7f.herokuapp.com/');
        const data = await response.text();
        res.send({response: data});
    } catch (error) {
        res.status(500).send('Error fetching data from the external service');
    }
});


app.get('/sendMessage', async (req, res) => {
    try {
        const token = req.query.token; // Retrieve the message from the query string

        const message = req.query.message; // Retrieve the message from the query string
        console.log('Received message:', message);

        console.log('Received token:', token);

        const response = await fetch(`https://whispering-tundra-60957-a9fec9593e7f.herokuapp.com/newMessage?message=${encodeURIComponent(message)}&token=${encodeURIComponent(token)}`);
        const data = await response.text();
        res.send({response: data});
    } catch (error) {
        console.error('Error in /sendMessage:', error);
        res.status(500).send('Error fetching data from the external service');
    }
});

app.get('/sendCommand', async (req, res) => {
    try {
        const token = req.query.token; // Retrieve the message from the query string
        const params = req.query.params; // Retrieve the message from the query string
        const command = req.query.command; // Retrieve the message from the query string
        
        console.log('Received command:', command);
        console.log('Received params:', params);

        console.log('Received token:', token);

        const response = await fetch(`https://whispering-tundra-60957-a9fec9593e7f.herokuapp.com/newCommand?command=${encodeURIComponent(command)}&params=${encodeURIComponent(params)}&token=${encodeURIComponent(token)}`);
        const data = await response.text();
        res.send({response: data});
    } catch (error) {
        console.error('Error in /sendMessage:', error);
        res.status(500).send('Error fetching data from the external service');
    }
});

app.get('/login', async (req, res) => {
    try {
        const phone = req.query.phone; // Retrieve the message from the query string
        const password = req.query.password; // Retrieve the message from the query string

        console.log('Received phone:', phone);

        const response = await fetch(`https://whispering-tundra-60957-a9fec9593e7f.herokuapp.com/login?phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error in /sendMessage:', error);
        res.status(500).send('Error fetching data from the external service');
    }
});

app.get('/signup', async (req, res) => {
    try {

        const username = req.query.username;
        const phone = req.query.phone; // Retrieve the message from the query string
        const password = req.query.password; // Retrieve the message from the query string

        console.log('Received phone:', phone);

        const response = await fetch(`https://whispering-tundra-60957-a9fec9593e7f.herokuapp.com/newUser?username=${encodeURIComponent(username)}&phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error in /sendMessage:', error);
        res.status(500).send('Error fetching data from the external service');
    }
});


app.get('/getMessages', async (req, res) => {
    try {
        const response = await fetch('https://whispering-tundra-60957-a9fec9593e7f.herokuapp.com/getMessages');
        const data = await response.text();
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching data from the external service');
    }
});






app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
