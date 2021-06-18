const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const sequelize = require("./postrogesql");
const interfaceTour = require("./interface");
const Tour = sequelize.define("tour", interfaceTour);
const getDataTour = require("../service/suggestTour");
const createData = async (data) => {
  await Tour.create(data);
};

const createArrayData = async (data) => {
  await sequelize.transaction(async (t) => {
    await Tour.bulkCreate(data, { transaction: t });
  });
};

const getAllTour = async () => {
  const listTour = await Tour.findAndCountAll();
  return listTour;
};

const getPageTour = async (page) => {
  const data = await Tour.findAll({
    offset: (page - 1) * 15,
    limit: 15,
  });
  const count = await Tour.count();
  return {
    data,
    count,
  };
};

const getPageFilterTour = async (page, filter) => {
  if (filter.price === undefined)
    return await Tour.findAndCountAll({
      where: {
        ...filter,
        is_delete: {
          [Op.ne]: 1
        }
      },
      order: [['updatedat', 'DESC']],
      offset: (page - 1) * 15,
      limit: 15,
    });
  else
    return await Tour.findAndCountAll({
      where: {
        ...filter,
        price: {
          [Op.between]: [filter.price.min, filter.price.max],
        },
      },
      offset: (page - 1) * 15,
      limit: 15,
    });
};

const getTuorType = async (type, page) => {
  const listTourType = await Tour.findAll({
    where: {
      type,
    },
    offset: (page - 1) * 15,
    limit: 15,
  });
  return listTourType;
};

const getTuorById = async (id) => {
  const tour = await Tour.findByPk(id);
  return tour;
};

const getTourByTypeZone = async (type, zone) => {
  const listTourByTypeZone = await Tour.findAndCountAll({
    where: {
      type,
      zone,
    },
  });
  return listTourByTypeZone;
};

const updateTour = async ({ content, id }) => {
  const tourUpdate = await Tour.update(
    { ...content },
    {
      where: {
        id,
      },
    }
  );
  return tourUpdate;
};

const getAllIdTour = async () => {
  const listTour = await Tour.findAll({
    attributes: ["id"],
  });
  return listTour;
};

const getAllIdTitle = async () => {
  const listTour = await Tour.findAll({
    attributes: ["id", "title"],
  });
  return listTour;
};


const getTourByListId = async (listId) => {
  const listTour = await Tour.findAll({
    attributes: [
      "id",
      "title",
      "img",
      "date_start",
      "date_range",
      "map_maker",
      "number_sit",
      "note_attack",
      "price",
      "rate",
    ],
    where: {
      id: listId,
      is_delete: 0
    },
  });
  return listTour;
};


const getAllZoneByType = async (type) => {
  const listZone = await Tour.findAll({
    attributes: ["zone"],
    where: {
      type,
    },
    group: "zone",
  });
  return listZone;
};

const getAllDataFilter = async (type) => {
  const listDateRange = await Tour.findAll({
    attributes: ["date_range"],
    group: "date_range",
    order: [["date_range", "DESC"]],
  });
  const listAllMap = await Tour.findAll({
    attributes: ["map_maker"],
    group: "map_maker",
  });
  const listAllDateStart = await Tour.findAll({
    attributes: ["date_start"],
    group: "date_start",
  });
  return {
    listAllDateStart,
    listAllMap,
    listDateRange,
  };
};

const getTopTour = async () => {
  const topTour = await sequelize.query(
    `select id,title,img,date_start,date_range,map_maker,number_sit,note_attack,price from tour where cast(id as varchar) in (
      select SUBSTRING ( item_id ,2 , length(item_id) -1) from (SELECT item_id, count(item_id) as countTour from  "public"."order" group by item_id order by countTour desc limit 10) as top_tour
    )`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return topTour;
};

const getRelationById = async (id) => {
  const tour = await Tour.findByPk(id);
  const relation1 = await Tour.findAll({
    where: {
      id: {
        [Op.ne]: tour.id,
      },
      date_start: {
        [Op.or]: [tour.date_start, "Hàng ngày"],
      },
      date_range: tour.date_range,
      map_maker: tour.map_maker,
      price: {
        [Op.between]: [parseInt(0.9 * tour.price), parseInt(1.1 * tour.price)],
      },
      zone: {
        [Op.or]: [tour.zone, 'Khởi hành 63 tỉnh/TP'],
      },
    },
    limit: 10,
  });
  const listId1 = relation1.map((tour) => tour.id);
  const relation2 = await Tour.findAll({
    where: {
      id: {
        [Op.notIn]: [tour.id, ...listId1],
      },
      date_start: {
        [Op.ne]: tour.date_start,
      },
      date_range: tour.date_range,
      map_maker: tour.map_maker,
      price: {
        [Op.between]: [parseInt(0.9 * tour.price), parseInt(1.1 * tour.price)],
      },
      zone: {
        [Op.or]: [tour.zone, "Khởi hành 63 tỉnh/TP"],
      },
    },
    limit: 10,
  });
  const listId2 = relation2.map((tour) => tour.id);

  const relation3 = await Tour.findAll({
    where: {
      id: {
        [Op.notIn]: [tour.id, ...listId1, ...listId2],
      },
      date_start: {
        [Op.ne]: tour.date_start,
      },
      date_range: {
        [Op.ne]: tour.date_range,
      },
      map_maker: tour.map_maker,
      price: {
        [Op.between]: [parseInt(0.9 * tour.price), parseInt(1.1 * tour.price)],
      },
      zone: {
        [Op.or]: [tour.zone, "Khởi hành 63 tỉnh/TP"],
      },
    },
    limit: 10,
  });
  const listId3 = relation3.map((tour) => tour.id);
  const relation4 = await Tour.findAll({
    where: {
      id: {
        [Op.notIn]: [tour.id, ...listId1, ...listId2, ...listId3],
      },
      date_start: {
        [Op.ne]: tour.date_start,
      },
      date_range: {
        [Op.ne]: tour.date_range,
      },
      map_maker: tour.map_maker,
      price: {
        [Op.between]: [parseInt(0.9 * tour.price), parseInt(1.1 * tour.price)],
      },
      zone: {
        [Op.ne]: tour.zone,
      },
    },
    limit: 10,
    
  });
  const listId4 = relation4.map((tour) => tour.id);
  const relation5 = await Tour.findAll({
    where: {
      id: {
        [Op.notIn]: [tour.id, ...listId1, ...listId2, ...listId3, ...listId4],
      },
      date_start: {
        [Op.ne]: tour.date_start,
      },
      date_range: {
        [Op.ne]: tour.date_range,
      },
      map_maker: {
        [Op.ne]: tour.map_maker,
      },
      price: {
        [Op.between]: [parseInt(0.9 * tour.price), parseInt(1.1 * tour.price)],
      },
      zone: {
        [Op.or]: [tour.zone, "Khởi hành 63 tỉnh/TP"],
      },
    },
    limit: 10,
  });
  const result = getDataTour(
    relation1.length,
    relation2.length,
    relation3.length,
    relation4.length,
    relation5.length
  );
  const c1 = relation1.length - result.x1 + result.n1;
  const c2 = relation2.length - result.x2 + result.n2;
  const c3 = relation3.length - result.x3 + result.n3;
  const c4 = relation4.length - result.x4 + result.n4;
  const c5 = relation5.length - result.x5 + result.n5;
  const data = [
    ...relation1.slice(0, c1),
    ...relation2.slice(0, c2),
    ...relation3.slice(0, c3),
    ...relation4.slice(0, c4),
    ...relation5.slice(0, c5),
  ];
  
  if (data.length === 10) return data;
  else {
    const dataId = data.map(tour => tour.id)
    const realtion6 = await Tour.findAll({
      where: {
        id: {
          [Op.notIn]: [tour.id, ...dataId]
        },
      },
      limit: 10 - data.length,
      order: [['price', 'desc']]
    })
    return [...data, ...realtion6]
  }
};

module.exports = {
  createData,
  createArrayData,
  getAllTour,
  getPageTour,
  getTuorType,
  getTuorById,
  getTourByTypeZone,
  updateTour,
  getAllIdTour,
  getTopTour,
  getAllZoneByType,
  getAllDataFilter,
  getPageFilterTour,
  getRelationById,
  getAllIdTitle,
  getTourByListId,
};
