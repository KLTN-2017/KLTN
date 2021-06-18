const sequelize = require("../postrogesql");
const interfacePermission = require("../interface/permission");
const Permission = sequelize.define("permission", interfacePermission);
const { RolePermission } = require('./role_permission')
const createPermission = async (data) => {
  await Permission.create(data);
};

const createArrayData = async (data) => {
  await sequelize.transaction(async (t) => {
    await Permission.bulkCreate(data, { transaction: t });
  });
};

const getAllPermission = async () => {
  const listPermission = await Permission.findAndCountAll();
  return listPermission;
};

const getPagePermission = async (page) => {
  const listPermission = await Permission.findAll({
    offset: (page - 1) * 15,
    limit: 15,
  });
  return listPermission;
};

const updatePermission = async ({ name, id }) => {
  const permission = await Permission.update(
    { name},
    {
      where: {
        id,
      },
    }
  );
  return permission;
};

const deletePermission = async (name) => {
  await sequelize.transaction(async (t) => {
    await Permission.destroy({ where: { name } }, { transaction: t });
    await RolePermission.destroy({where: { permission: name }}, {transaction: t})
  });
};

module.exports = {
  createPermission,
  createArrayData,
  getAllPermission,
  getPagePermission,
  updatePermission,
  deletePermission,

};
