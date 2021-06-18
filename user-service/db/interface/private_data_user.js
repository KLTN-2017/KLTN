const Sequelize = require("sequelize");
module.exports = {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  sercert_key: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  private_key: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  public_key: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
};
