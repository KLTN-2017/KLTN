const Sequelize = require("sequelize");
module.exports = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  src: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
};
