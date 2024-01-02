
const sequelize = require('../config/db');
const Sequelize = require("sequelize");
const {DataTypes} = Sequelize;

const Product = sequelize.define("Product", {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true, 
        },
        unique: {
            args: true,
            msg: "Another product with this username already exists"
        }
    },
    category: {
        type: DataTypes.ENUM,
        values: ['clothing', 'health', 'consumables'],
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            notEmpty: true, 
        }
    }
}, {
    paranoid: true
});



module.exports = Product;