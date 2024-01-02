require('dotenv').config();
const {Sequelize} = require('sequelize');

// var connection = ({
//     host: `${process.env.DB_HOST}`,
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PASSWORD}`,
//     database: `${process.env.DB_DATABASE}`,
//     port: 3306
// });

const sequelize = new Sequelize('vcp', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = sequelize;