const sequelize = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Rescuer = require('../models/Rescuer');

Rescuer.belongsToMany(Product, { through: 'RescuerProducts', foreignKey: 'rescuerId' });
// Product.belongsToMany(Rescuer, { through: 'RescuerProducts', foreignKey: 'productId' });
// A.belongsToMany(B, { through: 'C', /* options */ });
sequelize
  .sync({alter: true})
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch(() => {
    console.log("Error Connecting to DB");
  });