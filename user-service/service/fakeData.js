const sequelize = require('../db/postrogesql')
const { UserPrivateData } = require('../db/model/data_user_private')
const { User } = require('../db/model/user')

async function bulkFakeData(listUser, listPrivateData) {
    const t = await sequelize.transaction();

    try {
      await User.bulkCreate(listUser, { transaction: t });
      await UserPrivateData.bulkCreate(listPrivateData, { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.log(error.message);
    }
}

module.exports = bulkFakeData