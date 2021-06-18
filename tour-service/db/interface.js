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
    unique: true,
  },
  img: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  date_start: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  date_range: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  map_maker: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  number_sit: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  note_attack: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
  },
  type: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  zone: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  is_delete: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  rate: {
    type: Sequelize.STRING(200),
    allowNull: false,
    defaultValue: '5-0'
  },
  city: {
    type: Sequelize.STRING(200),
    allowNull: true,
    defaultValue: ''
  },
};
