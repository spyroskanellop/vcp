
const sequelize = require('../config/db');
const Sequelize = require("sequelize");
const {DataTypes} = Sequelize;
const Product = require('./Product');

const Rescuer = sequelize.define("Rescuer", {

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true, 
        },
        unique: {
            args: true,
            msg: "Another Rescuer with this username already exists, maybe its your evil twin?"
        }
    },
    cargo: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
        references: {
            model: Product,
            key: "id"
        }
    },
    status: {
        type: DataTypes.ENUM,
        values: ['on-going', 'inactive'],
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    activeTasks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            notEmpty: true,
            max: {
                args: 4,
                msg: "ActiveTasks must be less than or equal to 4"
            } 
        }
    },
    coorX: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            notEmpty: true, 
        }
    },
    coorY: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            notEmpty: true, 
        }
    },
    
}, {
    paranoid: true
});



module.exports = Product;