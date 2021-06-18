const sequelize = require("../postrogesql");
const interfaceUser = require("../interface/user");
const User = sequelize.define("users", interfaceUser);
const interfaceUserDataPrivate = require("../interface/private_data_user");
const { Op } = require("sequelize");
const UserPrivateData = sequelize.define(
  "user_data_private",
  interfaceUserDataPrivate
);
UserPrivateData.belongsTo(User, { foreignKey: "id" });
User.belongsTo(UserPrivateData, { foreignKey: "id" });

const createUser = async (user) => {
  const employee = await User.create(user);
  return { id: employee.id };
};

const createArrayUser = async (listUsers) => {
  await sequelize.transaction(async (t) => {
    await User.bulkCreate(listUsers, { transaction: t });
  });
};

const getAllUser = async () => {
  const listUser = await User.findAndCountAll({
    attributes: [
      "id",
      "username",
      "name",
      "email",
      "date_of_birth",
      "join_date",
      "phone",
      "role",
      "sex",
    ],
    include: UserPrivateData,
  });
  listUser.rows = listUser.rows.map((user) => ({
    id: user.id,
    username: user.username || '',
    name: user.name ? user.name.slice(0, 30): '',
    email: user.email.slice(0, 30),
    date_of_birth: user.date_of_birth,
    join_date: user.join_date,
    phone: user.phone ? user.phone.slice(0, 30) : '',
    role: user.role,
    sex: user.sex,
  }));
  return listUser;
};


const getPageUser = async (page, role) => {
  const listUser = await User.findAndCountAll({
    attributes: [
      "id",
      "username",
      "name",
      "email",
      "date_of_birth",
      "join_date",
      "phone",
      "role",
      "sex",
    ],
    where: {
      role,
    },
    offset: (page - 1) * 15,
    limit: 15,
  });
  return listUser;
};

const getPageEmployee = async (page) => {
  const listUser = await User.findAndCountAll({
    attributes: [
      "id",
      "username",
      "name",
      "email",
      "date_of_birth",
      "join_date",
      "phone",
      "role",
      "sex",
    ],
    where: {
      role: {
        [Op.ne]: "CUSTOMER",
      },
      status: true,
    },
    offset: (page - 1) * 15,
    limit: 15,
  });
  return listUser;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};


const updateUser = async ({ data, id }) => {
  const UserUpdate = await User.update(
    { data },
    {
      where: {
        id,
      },
    }
  );
  return UserUpdate;
};

const updateStatusUser = async (id) => {
  await User.update(
    { status: true },
    {
      where: {
        id,
      },
    }
  );
};

const updateRoleEmployee = async (id, role) => {
  await User.update(
    { role },
    {
      where: {
        id,
      },
    }
  );
};

const deleteEmployee = async (id) => {
  await await User.update(
    { status: false },
    {
      where: {
        id,
      },
    }
  );
};
const deleteUser = async (id) => {
  await sequelize.transaction(async (t) => {
    const userDelete = await User.destroy(
      {
        where: {
          id,
        },
      },
      { transaction: t }
    );
    const userPrivateDataDelete = await UserPrivateData.destroy(
      {
        where: {
          id,
        },
      },
      { transaction: t }
    );
  });
};

const getAllIdUser = async () => {
  const listIdUser = await User.findAll({
    attributes: ["id"],
  });
  return listIdUser;
};

const getUserByEmail = async (email) => {
  const listIdUser = await User.findAll({
    where: {
      email,
    },
  });
  return listIdUser;
};

const getAllIdEmail = async () => {
  const listIdUser = await User.findAll({
    attributes: ["id", "email"],
  });
  return listIdUser;
};

module.exports = {
  createUser,
  createArrayUser,
  getAllUser,
  getPageUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllIdUser,
  User,
  getUserByEmail,
  getPageEmployee,
  updateRoleEmployee,
  deleteEmployee,
  getAllIdEmail,
  updateStatusUser
};
// sequelize.getQueryInterface().createTable("user", interfaceUser);





