const { sequelize } = require('../config/config')
const DataTypes = require('sequelize')

const User = sequelize.define('user12345', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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

const Award = sequelize.define('Award', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
});

User.hasMany(Award, {
    foreignKey: 'userId',
    as: 'awards',
    onDelete: 'CASCADE'
});

Award.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = { User, Award }
