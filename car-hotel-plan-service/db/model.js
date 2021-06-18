const sequelize = require("./postrogesql");
const { Op } = require("sequelize");
const interfaceCar = require("./interface");
const Car = sequelize.define("car", interfaceCar);
const getData = require('../service/suggestCar')
const createData = async (data) => {
  await Car.create(data);
};

const createArrayData = async (data) => {
  await sequelize.transaction(async (t) => {
    await Car.bulkCreate(data, { transaction: t });
  });
};

const getAllCar = async () => {
  const listCar = await Car.findAndCountAll();
  return listCar;
};

const getTuorType = async (type, page) => {
  const listCarType = await Car.findAll({
    where: {
      type,
    },
    offset: (page - 1) * 15,
    limit: 15
  });
  return listCarType;
};

const getCarById = async (id) => {
  const car = await Car.findByPk(id);
  return car
};
//get Relation by id
const getRelationById = async (id) => {
  const car = await Car.findByPk(id);
  const relation1 = await Car.findAll({
    where: {
      id: {
        [Op.ne]: car.id,
      },
      brand: car.brand,
      cartype: car.cartype,
      vehiclelife: car.vehiclelife,
    },
    limit: 10,
  });
  const listId1 = relation1.map((car) => car.id);
  const relation2 = await Car.findAll({
    where: {
      id: {
        [Op.notIn]: [car.id, ...listId1],
      },
      brand: car.brand,
      cartype: car.cartype,
      vehiclelife: {
        [Op.ne]: car.vehiclelife,
      },
    },
    limit: 10,
  });
  const listId2 = relation2.map((car) => car.id);
  const relation3 = await Car.findAll({
    where: {
      id: {
        [Op.notIn]: [car.id, ...listId1, ...listId2],
      },
      brand: {
        [Op.ne]: car.brand,
      },
      cartype: car.cartype,
      vehiclelife: {
        [Op.ne]: car.vehiclelife,
      },
    },
    limit: 10,
  });
  const result = getData(relation1.length, relation2.length, relation3.length)
  const c1 = relation1.length - result.x1 + result.n1
  const c2 = relation2.length - result.x2 + result.n2
  const c3 = relation3.length - result.x3 + result.n3
  const data = [
    ...relation1.slice(0, c1),
    ...relation2.slice(0, c2),
    ...relation3.slice(0, c3),
  ];
  if (data.length === 10) return data
  else {
    const relation4 = await Car.findAll({
      where: {
        id: {
          [Op.notIn]: [car.id, ...listId1, ...listId2],
        },
        cartype: car.cartype,
      },
      limit: 10 - data.length,
    });
    return [...data, ...relation4]
  }
};


const updateCar = async (id, data) => {
  const CarUpdate = await Car.update(
    { ...data },
    {
      where: {
        id,
      },
    }
  );
  return CarUpdate;
};
const getTypeBrandCar = async () => {
  const topTour = await Car.findAll({
    attributes: ["brand"],
    group: "brand"
  });
  return topTour;
};

const getNumberSitCar = async () => {
  const topTour = await Car.findAll({
    attributes: ["cartype"],
    group: "cartype",
  });
  return topTour;
};

const getYearCar = async () => {
  const topTour = await Car.findAll({
    attributes: ["vehiclelife"],
    group: "vehiclelife",
  });
  return topTour;
};

const filterCar = async (filter, page) => {
  const data = await Car.findAndCountAll({
    offset: (page - 1) * 15,
    limit: 15,
    where: {
      ...filter,
      status: true
    },
  });
  return data
}

const deleteCar = async (id) => {
  const CarUpdate = await Car.update(
    { status: false },
    {
      where: {
        id,
      },
    }
  );
  return CarUpdate;
};


const getCarByListId = async (listId) => {
    const listCar = await Car.findAll({
      where: {
        id: listId,
        status: true
      },
    });
    return listCar;
};

const getAllIdTitle = async () => {
  const listIdTitle = await Car.findAll({
    attributes: ["id", "title"]
  });
  return listIdTitle;
};

module.exports = {
  createData,
  createArrayData,
  getAllCar,
  getTuorType,
  getCarById,
  updateCar,
  getTypeBrandCar,
  getNumberSitCar,
  getYearCar,
  filterCar,
  getRelationById,
  deleteCar,
  getCarByListId,
  getAllIdTitle
};
