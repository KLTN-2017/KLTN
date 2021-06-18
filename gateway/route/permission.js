const express = require("express");
const router = express.Router();
const axios = require("axios");
const {host_permission} = require('../config/index')

router.get("/", async (req, res) => {
  try {
    const {data} = await axios.get(host_permission);
    res.json(data);
  } catch (error) {
    console.log(error)
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});
router.post("/", async (req, res, next) => {
  try {
    const permission = req.body;
    await axios.post(host_permission, permission);
    res.json({ success: true });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/:name", async (req, res, next) => {
  try {
    
    await axios.delete(`${host_permission}/${req.params.name}`);
    res.json({ success: true });
  } catch (error) {
    
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});
module.exports = router;
