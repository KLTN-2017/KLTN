const express = require("express");
const router = express.Router();
const {
  createOrder,
  createArrayData,
  getAllOrder,
  getPageOrder,
  getOrderUser,
  getOrderById,
  updateOrder,
  deleteOrderById,
  chartOrderAll
} = require("../db/model/order");

const generationPayUrl = require("../service/momo");
const getUrlVnpay = require("../service/vnpay");
const getUrlZaloPay = require("../service/zalopay")
//get all user
router.get("/", async (req, res) => {
  try {
    const data = await getAllOrder();
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});


router.get("/data-chart-order", async (req, res) => {
  try {
    const data = await chartOrderAll()
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.get("/page/:page", async (req, res) => {
  try {
    const page = req.params.page;
    const { year, month, day, type, user_id, isPay } = req.query;
    console.log(req.query, '----------------------------------------');
    const filter = {
      order_date:
        (year ? `${year}-` : "%") + (month ? `${month}-` : "%") + `${day}%`,
      item_id: type ? `${type}%` : "%",
      user_id: user_id ? user_id : "%",
      pay_method: isPay ? isPay : "%",
    };
    if (parseInt(page)) {
      const data = await getPageOrder(req.params.page, filter);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    console.log(error, 'loi day nha cac ban oi');
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

//get user by id
router.get("/order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    if (parseInt(orderId)) {
      const data = await getOrderById(orderId);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.get("/order-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (parseInt(userId)) {
      const data = await getOrderUser(userId);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const order = req.body;
    console.log('list order is --------------------------------', order)
    if (Array.isArray(order)) await createArrayData(order.map(od => ({...od, count: od.count, img: order.img, item_id: od.item_id, title: od.title})));
    else await createOrder(order);
    res.json({ success: true });
  } catch (error) {
    console.log(error, 'wertyutrfedwsadghjhgsdfghj')
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});
//update user by id

router.put("/:id", async (req, res, next) => {
  try {
    console.log(
      "data update order",
      req.params.id,
      req.body.type,
      req.body.date
    , '-----------------------------');
    const data = await updateOrder(req.params.id, req.body.type, req.body.date);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.post("/url-pay", async (req, res, next) => {
  try {
    const { title, count, id, type } = req.body;
    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    console.log(count, id + "-" + title, ipAddr);
    let data;
    if (type !== "momo" && type !== "vnpay" && type !== "zalopay")
      res.status(400).json({ error: "Lỗi hình thức thanh toán" });
    else if (type === "momo")
      data = await generationPayUrl(title, count, id);
    else if (type === "vnpay")
      data = await getUrlVnpay(count, id + "-" + title, ipAddr);
    else
      data = await getUrlZaloPay({ title, id, count })
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    // console.log(new Date(new Date(order.createdat).getTime() + 10 * 60 * 60 * 1000), new Date());
    if (
      new Date(new Date(order.createdat).getTime() + 10 * 60 * 60 * 1000) <
      new Date()
    )
      res
        .status(400)
        .json({
          error:
            "Hóa đơn đã qua thời gian chỉnh xửa nó chỉ có thể hủy sau 3h đặt",
        });
    else {
      await deleteOrderById(req.params.id);
      res.json({ status: "ok" });
    }
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

module.exports = router;
