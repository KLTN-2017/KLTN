const Sequelize = require("sequelize");
module.exports = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  img: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  location: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  view: {
    type: Sequelize.NUMBER,
    allowNull: false,
    defaultValue: 0
  },
  rate: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '5-0'
    },
    user_id: {
        type: Sequelize.INTEGER,
      allowNull: false,
        defaultValue: 8
  }
};
