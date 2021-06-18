const express = require("express");
const router = express.Router();
const axios = require('axios')
const {host_user} = require('../config/index')

router.get("/page/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
        const { data } = await axios(`${host_user}/page/${page}?role=${req.query.role}`);
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

router.get("/page-employee/:page", async (req, res) => {
  try {
    const page = req.params.page
    if (parseInt(page)) {
      const { data } = await axios(
        `${host_user}/page-employee/${page}`
      );
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    console.log(error)
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
      const userId = req.params.id;
    if (parseInt(userId)) {
      const {data} = await axios(`${host_user}/user/${userId}`);
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

//get all id-email customer

router.get("/customer/id-email", async (req, res, next) => {
  try {
    const { data } = await axios(`${host_user}/customer/id-email`);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});


router.get("/user-id", async (req, res, next) => {
  try {
    const {data} = await axios.get(`${host_user}/user-id`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/username/:username", async (req, res, next) => {
  try {
      const { data } = await axios(`${host_user}/username/${req.params.username}`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});


router.put("/role-of-user/:id", async (req, res, next) => {
  try {
    await axios.put(`${host_user}/role-of-user/${req.params.id}`, req.body);
    res.json({ success: true });
  } catch (error) {
    // console.log(error, 'gateway nnha')
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/delete-employee/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (parseInt(userId)) {
      await axios.delete(`${host_user}/delete-employee/${userId}`);
      res.json({success: 'ok'});
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    console.log('gate-way: ', error)
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});


router.post('/', async(req, res, next) => {
    try {
      const { data } = await axios.post(host_user, req.body)
        res.json(data);
    } catch (error) {
        if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
    }

})


module.exports = router;
