const Sequelize = require("sequelize");
module.exports = {
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  permission: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};
