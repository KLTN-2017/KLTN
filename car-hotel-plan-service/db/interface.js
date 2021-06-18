const Sequelize = require("sequelize");
module.exports = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  src: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  vehiclelife: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  cartype: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  rate: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.NUMBER,
    allowNull: false
  }
};
