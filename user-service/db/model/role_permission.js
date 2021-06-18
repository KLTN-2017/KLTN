const sequelize = require("../postrogesql");
const interfaceRolePermission = require("../interface/rolePermission");
const RolePermission = sequelize.define("role_permission", interfaceRolePermission);

const createRolePermission = async (data) => {
  await RolePermission.create(data);
};

const createArrayData = async (data) => {
  await sequelize.transaction(async (t) => {
    await RolePermission.destroy({where: {role: data[0].role}}, {transaction: t})
    await RolePermission.bulkCreate(data, { transaction: t });
  });
};

const deleteRole = async (role) => {
  const delete_permission = await RolePermission.destroy({
    where: {
      role
    }
  });
  return delete_permission;
};

const getAllRole = async () => {
  const allRole = await RolePermission.findAll({
    attributes: ["role"],
    group: "role",
  });
  return allRole;
};

const getAllAcitonOfRole = async (role) => {
  const allRole = await RolePermission.findAll({
    attributes: ["permission"],
    where: {
      role
    }
  });
  return allRole;
};

module.exports = {
  createRolePermission,
  createArrayData,
  getAllRole,
  RolePermission,
  deleteRole,
  getAllAcitonOfRole
};
