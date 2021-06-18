const Sequelize = require("sequelize");
module.exports = {
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  item_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  order_date: {
    type: Sequelize.STRING,
    defaultValue: new Date()
  },
  pay_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  img: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  pay_method: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'cash'
  }
};
