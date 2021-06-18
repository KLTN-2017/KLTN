const express = require("express");
const router = express.Router();
const axios = require('axios')
const { host_order } = require('../config/index')
const sendMailGmail = require("../service/sendMail");
const mailSuccessOrder = require('../service/mailTemplate')
router.get("/", async (req, res) => {
  try {
      const { data } = await axios(host_order);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/data-chart-order", async (req, res) => {
  try {
    const { data } = await axios.get(`${host_order}/data-chart-order`);
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
    const {year, month, day , type, user_id, isPay} = req.query
    const { data } = await axios.get(
      `${host_order}/page/${page}?year=${year}&month=${month}&day=${day}&type=${type}&user_id=${user_id}&isPay=${isPay.toUpperCase()}`
    );
      res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

//get user by id
router.get("/order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    if (parseInt(orderId)) {
        const { data } = await axios(`${host_order}/order/${orderId}`)
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/order-user", async (req, res) => {
  try {
    const userId = req.id
    if (parseInt(userId)) {
        const { data } = await axios(`${host_order}/order-user/${userId}`);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.id}`,
      });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const order = req.body.map(order => ({...order, user_id: req.id}));
    await axios.post(host_order, order)
    const bodyMail = mailSuccessOrder(req.body)
    await sendMailGmail(req.email, 'Xác nhận đặt hàng thành công', bodyMail)
    res.json({ success: true });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});
//update user by id

router.put("/:id", async (req, res, next) => {
  try {
    await axios.put(`${host_order}/${req.params.id}`, req.body)
    console.log(req.body, '-------------pay----------------')
    res.json({ success: true });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});
router.post("/url-pay", async (req, res, next) => {
  try {
    const { data } = await axios.post(`${host_order}/url-pay`, req.body)
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
    const { data } = await axios.delete(`${host_order}/${req.params.id}`);
    res.json(data);
  } catch (error) {
    if (error.response) res.status(400).json({ error: error.response.data.error })
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

module.exports = router;
