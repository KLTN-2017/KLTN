
const sequelize = require("./postrogesql");
const interfaceNews= require("./interfaceNews");
const { Op } = require("sequelize");
const News = sequelize.define("news", interfaceNews);

const createData = async (data) => {
  await News.create(data);
};

const createArrayData = async (data) => {
  await sequelize.transaction(async (t) => {
    await News.bulkCreate(data, { transaction: t });
  });
};

const getAllNews = async () => {
  const listNews = await News.findAndCountAll({
    attributes: ["id", "title", "img", "location", "view", "rate", "createdat"],
  });
  return listNews;
};

const getPageNews = async (page) => {
  const data = await News.findAndCountAll({
    attributes: ["id", "title", "img", "location", "view", "rate", "createdat"],
    order: [["updatedat", "DESC"]],
    offset: (page - 1) * 9,
    limit: 9,
  });
  return data
};

const getNewsById = async (id) => {
  await News.increment('view', { where: {id} })
    const news = await News.findByPk(id);
  return news;
};

const updateNews = async ({ content, id }) => {
  const newsUpdate = await News.update(
    { ...content },
    {
      where: {
        id,
      },
    }
  );
  return newsUpdate;
};

const deleteNews = async (id) => {
    const newsDelete = await News.destroy({
        where: {
            id
        }
    })
    return newsDelete
}

const rateNews = async (id, rateUser) => {
  const news = await News.findByPk(id)
  const [rate, count] = news.rate.split('-')
  const newsRate =
    `${((parseFloat(rate) * parseInt(count) + rateUser) / ((parseInt(count) + 1))).toFixed(2)}-${parseInt(count) + 1}`;
  console.log(newsRate,'-----------------------------------')
  await News.update({rate: newsRate}, { where: {id}})
};

const getRelation = async (id) => {
  const news = await News.findByPk(id);
  const data = await News.findAll({
    attributes: ["id", "title", "img", "location", "view", "rate", "createdat"],
    where: {
      createdat: {
        [Op.gte] : news.createdat
      },
      id: {
        [Op.ne]: news.id
      }
    },
    limit: 4,
  });
  const data2 = await News.findAll({
    attributes: ["id", "title", "img", "location", "view", "rate", "createdat"],
    where: {
      id: {
        [Op.notIn]: [news.id, ...data.map((news) => news.id)],
      },
    },
    limit: 6 - data.length,
    order: [["createdat", "desc"]],
  });
  return [...data, ...data2]
};

const getAllIdTitle = async () => {
  const listNews = await News.findAll({
    attributes: ["id", "title"],
  });
  return listNews;
};



module.exports = {
    createData,
    createArrayData,
    getAllNews,
    getPageNews,
    getNewsById,
    updateNews,
    deleteNews,
  rateNews,
  getRelation,
    getAllIdTitle
}


