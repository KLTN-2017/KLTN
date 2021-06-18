const express = require("express");
const router = express.Router();
const axios = require("axios");
const {host_banner} = require('../config/index')

router.get("/", async (req, res) => {
  try {
    const {data} = await axios(host_banner);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
  const {data} =  await axios.post(host_banner, req.body)
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await axios.delete(`${host_banner}/${req.params.id}`)
    res.json({ success: true });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router



























