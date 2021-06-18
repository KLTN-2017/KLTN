const sequelize = require("../postrogesql");
const interfaceUserDataPrivate = require("../interface/private_data_user");
const UserPrivateData = sequelize.define(
  "user_data_private",
  interfaceUserDataPrivate
);

const createUserPrivateData = async (userPrivateData) => {
  await UserPrivateData.create(userPrivateData);
};

const createArrayUserPrivateData = async (listUserPrivateDatas) => {
  await sequelize.transaction(async (t) => {
    await UserPrivateData.bulkCreate(listUserPrivateDatas, { transaction: t });
  });
};

const getAllUserPrivateData = async () => {
  const listUserPrivateData = await UserPrivateData.findAll()
  return listUserPrivateData
};

const getPageUserPrivateData = async (page) => {
  const listUserPrivateData = await UserPrivateData.findAll({
    offset: (page - 1) * 15,
    limit: 15,
  });
  return listUserPrivateData;
};
const getUserPrivateDataById = async (id) => {
  const userPrivateData = await UserPrivateData.findByPk(id);
  return userPrivateData;
};

const updateUserPrivateData = async ({ data, id }) => {
  const userPrivateDataUpdate = await UserPrivateData.update(
    { data },
    {
      where: {
        id,
      },
    }
  );
  return userPrivateDataUpdate;
};

const deleteUserPrivateData = async (id) => {
  const userPrivateDataDelete = await UserPrivateData.destroy({
    where: {
      id,
    },
  });
  return userPrivateDataDelete;
};

module.exports = {
  createUserPrivateData,
  createArrayUserPrivateData,
  getAllUserPrivateData,
  getPageUserPrivateData,
  getUserPrivateDataById,
  updateUserPrivateData,
  deleteUserPrivateData,
  UserPrivateData,
};
// sequelize
//   .getQueryInterface()
//   .createTable("user_data_private", interfaceUserDataPrivate);
