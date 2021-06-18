const express = require("express");
const { getRelationById } = require("./db/model");
const router = express.Router();
const {
  createData,
  createArrayData,
  getAllNews,
  getPageNews,
  getNewsById,
  updateNews,
  deleteNews,
  rateNews,
  getRelation,
  getAllIdTitle
} = require("./db/modelNews");

router.get("/", async (req, res) => {
  try {
    const data = await getAllNews();
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.get("/all-id-title", async (req, res) => {
  try {
    const data = await getAllIdTitle();
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
    if (parseInt(page)) {
      const data = await getPageNews(page);
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

router.get("/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    if (parseInt(newsId)) {
      const data = await getNewsById(newsId);
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

router.get("/relation/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    if (parseInt(newsId)) {
      const data = await getRelation(newsId);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});


router.post("/", async (req, res, next) => {
  try {
    const news = req.body;
    console.log(req.body)
    if (Array.isArray(news)) await createArrayData(news);
    else await createData(news);
    res.json({ success: true });
  } catch (error) {
    console.log(error)
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await updateNews({
      content: req.body,
      id: req.params.id,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteNews(req.params.id)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
router.post("/rate/:id", async (req, res, next) => {
  try {
    console.log('rate is ', req.body)
    await rateNews(req.params.id, req.body.rate)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});


module.exports = router