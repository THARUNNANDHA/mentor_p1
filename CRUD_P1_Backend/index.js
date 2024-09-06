const express = require('express')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./config/config')


const app = express()
app.use(bodyParser.json());
app.use('/api', userRoutes);

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log('Error syncing database: ' + err));


app.get('/', (req, res) => {
    res.send('Hosted Success');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));