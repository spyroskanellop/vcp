
const sequelize = require('../config/db');
const Sequelize = require("sequelize");
const {DataTypes} = Sequelize;
const bcrypt = require('bcrypt');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true, 
        },
        unique: {
            args: true,
            msg: "Another user with this email already exists, maybe its your evil twin?"
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    paranoid: true
});

User.beforeCreate((user) => {
    if(user.password){
        const salt = bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
    }
});

User.beforeUpdate((user) => {
    if(user.password){
        const salt = bcrypt.getSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
    }
});


module.exports = User;