const sequelize = require("./postrogesql");
const { Op } = require("sequelize");
const interfaceHotel = require("./hotelInterface");
const Hotel = sequelize.define("hotel", interfaceHotel);
const getDataHotel = require('../service/suggestHotel')

const createData = async (data) => {
  await Hotel.create(data);
};

const createArrayData = async (data) => {
  await sequelize.transaction(async (t) => {
    await Hotel.bulkCreate(data, { transaction: t });
  });
};

const getAllHotel = async () => {
  const listHotel = await Hotel.findAndCountAll();
  return listHotel;
};

const getPageHotel = async (page) => {
  const data = await Hotel.findAndCountAll({
    offset: (page - 1) * 15,
    limit: 15,
  });
  
  return data
};
const getHotelById = async (id) => {
  const hotel = await Hotel.findByPk(id);
  return hotel
  
};

const getRelationById = async (id) => {
  const hotel = await Hotel.findByPk(id);
  const relation1 = await Hotel.findAll({
    where: {
      id: {
        [Op.ne]: hotel.id,
      },
      location: hotel.location,
      pirce: hotel.pirce,
      star: hotel.star
    },
    limit: 5
  });
  const relation2 = await Hotel.findAll({
    where: {
      id: {
        [Op.notIn]: [hotel.id, ...relation1.map((value) => value.id)],
      },
      location: hotel.location,
      pirce: {
        [Op.ne]: hotel.pirce,
      },
      star:hotel.star
    },
    limit: 5,
  });
  const relation3 = await Hotel.findAll({
    where: {
      id: {
        [Op.notIn]: [hotel.id, ...relation1.map((value) => value.id), ...relation2.map((value) => value.id)],
      },
      location: hotel.location,
      pirce: {
        [Op.ne]:  hotel.pirce,
      },
      star: {
        [Op.ne]: hotel.star,
      },
    },
    limit: 5,
  });
  const result = getDataHotel(relation1.length, relation2.length, relation3.length);
  const c1 = relation1.length - result.x1 + result.n1;
  const c2 = relation2.length - result.x2 + result.n2;
  const c3 = relation3.length - result.x3 + result.n3;
  const data = [
    ...relation1.slice(0, c1),
    ...relation2.slice(0, c2),
    ...relation3.slice(0, c3),
  ];
  if (data.length === 5) return data;
  else {
    const relation4 = await Hotel.findAll({
      where: {
        id: {
          [Op.notIn]: [
            hotel.id,
            ...relation1.map((value) => value.id),
            ...relation2.map((value) => value.id),
            ...relation3.map((value) => value.id),
          ],
        },
      },
      limit: 5 - data.length,
    });
    return [...data, ...relation4]
  }
};

const updateHotel = async (id, content) => {
  const HotelUpdate = await Hotel.update(
    { ...content },
    {
      where: {
        id,
      },
    }
  );
  return HotelUpdate;
};
const getStarHotel = async () => {
  const data = await Hotel.findAll({
    attributes: ["star"],
    group: "star",
  });
  return data;
};

const getZoneHotel = async () => {
  const data = await Hotel.findAll({
    attributes: ["location"],
    group: "location",
  });
  return data;
};

const filterHotel = async (filter, page) => {
  const data = await Hotel.findAndCountAll({
    offset: (page - 1) * 15,
    limit: 15,
    where: {
      ...filter,
    },
  });
  return data;
};

const getHotelByListId = async (listId) => {
  const listHotel = await Hotel.findAll({
    where: {
      id: listId,
      is_delete: 0,
    },
  });
  return listHotel;
};
const getAllIdTitle = async () => {
  const data = await Hotel.findAll({
    attributes: ["id", "title"]
  });
  return data;
};

module.exports = {
  createData,
  createArrayData,
  getAllHotel,
  getPageHotel,
  getHotelById,
  updateHotel,
  getStarHotel,
  getZoneHotel,
  filterHotel,
  getRelationById,
  getHotelByListId,
  getAllIdTitle
};