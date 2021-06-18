const sequelize = require("../postrogesql");
const { Op } = require("sequelize");
const interfaceOrder = require("../interface/order");
const Order = sequelize.define("order", interfaceOrder);
const { QueryTypes } = require("sequelize");

const createOrder = async (data) => {
  await Order.create(data);
};

const createArrayData = async (data) => {
  await sequelize.transaction(async (t) => {
    console.log(data, '-------------------------------------------------------------------------------------')
    await Order.bulkCreate(data, { transaction: t });
  });
};

const getAllOrder = async () => {
  const listOrder = await Order.findAndCountAll();
  return listOrder;
};

const getPageOrder = async (page, filter) => {
  const listOrder = await Order.findAndCountAll({
    where: {
      order_date: {
        [Op.like]: filter.order_date,
      },
      item_id: {
        [Op.like]: filter.item_id,
      },
      user_id: {
        [Op.like]: filter.user_id,
      },
      pay_method: {
        [Op.like]: filter.pay_method,
      },
    },
    offset: (page - 1) * 30,
    limit: 30,
    order: [["order_date", "DESC"]],
  });
  const sum = await Order.sum("count", {
    where: {
      order_date: {
        [Op.like]: filter.order_date,
      },
      item_id: {
        [Op.like]: filter.item_id,
      },
      user_id: {
        [Op.like]: filter.user_id,
      },
      pay_method: {
        [Op.like]: filter.pay_method,
      },
    },
  });
  return { ...listOrder, sum };
};
const getOrderUser = async (userId) => {
  const listOrderUser = await Order.findAndCountAll({
    where: {
      user_id: userId,
    },
  });
  return listOrderUser;
};

const getOrderById = async (id) => {
  const order = await Order.findByPk(id);
  return order;
};

const updateOrder = async (id, type, date) => {
  await Order.update(
    { pay_date: date || new Date(), pay_method: type },
    {
      where: {
        id,
      },
    }
  );
  console.log("-----------------------end");
  return await Order.findByPk(id);
};

const deleteOrderById = async (id) => {
  await Order.destroy({ where: { id } });
};


const chartOrderAll = async (id) => {
  const chartYear = await sequelize.query(
    `select sum(count) as count_year, cast( extract(year from cast(order_date as date)) as integer)as year from "order" group by year order by year desc`,
    { type: QueryTypes.SELECT }
  );
  const listYear = chartYear.map((data) => data.year);
  const mountByYearMonth = {}
  for (let i = 0; i < listYear.length; i++) {
    const countMonthOfYear = Array.from({length: 12}, () => 0);
    const countByMonthYear = await sequelize.query(
      `select to_char(cast(order_date as date),'YYYY-MM') as year_month,
       sum(count) as mount
from "order" where cast( extract(year from cast(order_date as date)) as integer)= ${listYear[i]}
group by 1 order by year_month asc`,
      { type: QueryTypes.SELECT }
    );

    countByMonthYear.forEach(data => {
      countMonthOfYear[parseInt(data.year_month.slice(5, 7)) -1] = data.mount;
    })
    mountByYearMonth[`'${listYear[i]}'`] = countMonthOfYear;
  }

  return {chartYear, mountByYearMonth};
};

module.exports = {
  createOrder,
  createArrayData,
  getAllOrder,
  getPageOrder,
  getOrderUser,
  getOrderById,
  updateOrder,
  deleteOrderById,
  chartOrderAll,
  Order,
};
