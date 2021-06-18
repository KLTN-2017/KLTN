const express = require("express");
const router = express.Router();
const axios = require("axios");
const {host_role_permission} = require('../config/index')

router.post("/", async (req, res, next) => {
  try {
    await axios.post(host_role_permission,req.body);
    res.json({ success: true });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/:role", async (req, res, next) => {
  try {
    await axios.delete(`${host_role_permission}/${req.params.role}`)
    res.json({ success: true });
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/all-role", async (req, res, next) => {
  try {
    const { data } = await axios.get(`${host_role_permission}/all-role`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/permission-of-role/:role", async (req, res, next) => {
  try {
    const { data } = await axios.get(`${host_role_permission}/permission-of-role/${req.params.role}`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/re-fect-action", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `${host_role_permission}/permission-of-role/${req.role}`
    );
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
