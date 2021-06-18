const express = require("express");
const router = express.Router();
const axios = require('axios')
const {host_news} = require('../config/index')

router.get("/", async (req, res) => {
  try {
      const { data } = await axios(host_news);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/page/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
        const { data } = await axios(`${host_news}/page/${page}`)
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

router.get("/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    if (parseInt(newsId)) {
        const { data } = await axios(`${host_news}/${newsId}`);
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

router.post("/", async (req, res, next) => {
  try {
    const news = req.body;
    await axios.post(host_news, news)
    res.json({ success: true });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await axios.put(`${host_news}/${req.params.id}`, req.body)
    res.json({ success: true });
  } catch (error) {
  
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await axios.delete(`${host_news}/${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/rate/:id", async (req, res, next) => {
  try {
    await axios.post(`${host_news}/rate/${req.params.id}`, req.body);
    res.json({ success: true });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});
router.get("/relation/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    if (parseInt(newsId)) {
      const { data } = await axios.get(`${host_news}/relation/${newsId}`);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

module.exports = router;
