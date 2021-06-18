const express = require("express");
const router = express.Router();
const {
  createData,
  getAllImgBanner,
  deleteImgBanner
} = require('./db/modelBanner')

router.get("/", async (req, res) => {
  try {
    const data = await getAllImgBanner();
    res.json(data);
  } catch (error) {
    console.log(error)
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.post("/", async (req, res, next) => {
  try {
  const data =   await createData(req.body)
    res.json(data.id);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteImgBanner(req.params.id)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

module.exports = router
