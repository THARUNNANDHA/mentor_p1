const { sequelize } = require('../config/config')
const DataTypes = require('sequelize')

const User = sequelize.define('user12345', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    student_meta_data: {
        type: DataTypes.JSONB,
        allowNull: true,
    }
})

module.exports = User
