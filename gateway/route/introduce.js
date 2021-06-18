const express = require("express");
const router = express.Router();
const fs = require('fs')
router.get("/", async (req, res) => {
  try {
      fs.readFile("introduce.txt", 'utf8', (err, data) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(data);
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
    const data = req.body.content
      fs.writeFile('introduce.txt', data, (err, data) => {
          if (err) res.status(500).json({ error: err.message });
          else res.json({status: 'ok'})
    })
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router