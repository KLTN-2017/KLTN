const express = require("express");
const router = express.Router();
const client = require('../testRedis')
router.get("/",(req, res) => {
  client.get("route_action", (err, obj) => {
      if (err) res.status(400).json({ error: err.message })
    res.json(JSON.parse(obj))
  });
});

router.post("/", (req, res) => {

  client.get("route_action", (err, obj) => {
    if (err) res.status(400).json({ error: err.message });
    const newList = [...JSON.parse(obj), req.body]
    client.set("route_action", JSON.stringify(newList), (err, data) => {
      if (err) res.status(400).json({ error: err.message })
      res.json({status: 'ok'})
    });
  });
});

router.delete("/:id", (req, res) => {
  client.get("route_action", (err, obj) => {
    if (err) res.status(400).json({ error: err.message });
    const newList = JSON.parse(obj).filter((route, index) => index != req.params.id);
    client.set("route_action", JSON.stringify(newList), (err, data) => {
      if (err) res.status(400).json({ error: err.message });
      res.json({ status: "ok" });
    });
  });
});

router.put("/:id", (req, res) => {
  client.get("route_action", (err, obj) => {
    if (err) res.status(400).json({ error: err.message });
    const newList = JSON.parse(obj).map(
      (route, index) => {
        if (index == req.params.id) return req.body
        else return route
      }
    );
    client.set("route_action", JSON.stringify(newList), (err, data) => {
      if (err) res.status(400).json({ error: err.message });
      res.json({ status: "ok" });
    });
  });
});

module.exports = router;
