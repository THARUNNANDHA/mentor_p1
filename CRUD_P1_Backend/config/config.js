const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('practice_db', 'postgres', 'Ntharun123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Authentication successful')
    })
    .catch(err => {
        console.log('Error')
    })
module.exports = { sequelize }