const sequelize = require('sequelize');
const database = new sequelize('DATABASE_NAME', 'USER_NAME', 'PASSWORD', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: 0,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = database;