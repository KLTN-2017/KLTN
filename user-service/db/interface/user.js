const Sequelize = require("sequelize");
module.exports = {
  username: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true,
  },
  passwd: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  passwdhash: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  email: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
  },
  date_of_birth: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  join_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date()
  },
  phone: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'CUSTOMER'
  },
  sex: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
};
