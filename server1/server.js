const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { param } = require('../CRUD_P1_Backend/routes/userRoutes');


const app = express();

app.use(bodyParser.json());

// Example endpoint
app.get('/api/hello', (req, res) => {
    res.send('Hello from port 8080');
});

app.get('/api/getallUser', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filter = req.query.filter || '';
        console.log(`Page: ${page}, Limit: ${limit}, Filter: ${filter}`);
        const response = await axios.get('http://localhost:5000/api/getallUser', {
            params: {
                page: page,
                limit: limit,
                filter: filter
            }
        })
        res.send(response.data);
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
})

app.post('/api/signup', async (req, res) => {
    try {
        data = req.body
        if (!data.userName || !data.email || !data.phNumber || !data.password) {
            return res.status(401).json({ error: 'Insufficient data' });
        }
        const response = await axios.post('http://localhost:5000/api/signup', { "data": data });

        console.log(response);

        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while fetching users', err });
    }
});

app.listen(8080, () => console.log('Server running on port 8080'));