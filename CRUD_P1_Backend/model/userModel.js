const { sequelize } = require('../config/config')
const DataTypes = require('sequelize')

const User = sequelize.define('user12345', {
    email: {
        type: DataTypes.STRING,
    },
    userName: {
        type: DataTypes.STRING,
    }
})

module.exports = User
