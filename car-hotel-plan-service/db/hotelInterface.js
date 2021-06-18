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
  img: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  pirce: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  star: {
    type: Sequelize.STRING,
    allowNull: Sequelize.NUMBER,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  content: {
    type: Sequelize.TEXT,
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
};
