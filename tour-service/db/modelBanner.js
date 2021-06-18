const sequelize = require("./postrogesql");
const interfaceBanner = require("./interfaceBanner");
const Banner = sequelize.define("banner", interfaceBanner);

const createData = async (data) => {
  return await Banner.create(data);
};

const getAllImgBanner = async () => {
  const listImgBanner = await Banner.findAll();
  return listImgBanner;
};

const deleteImgBanner = async (id) => {
  await Banner.destroy({ where: { id } });
};
module.exports = {
  createData,
  getAllImgBanner,
  deleteImgBanner,
};
