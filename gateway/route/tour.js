const express = require("express");
const router = express.Router();
const axios = require('axios')
const {host_tour} = require('../config/index')
const client = require("../elastTic");
const viToEn = require("../service/vnToen");
router.get("/", async (req, res) => {
  try {
      const { data } = await axios.get(host_tour)
      res.json(data)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
});

//get all tour
router.get("/tours", async (req, res) => {
  try {
      const { data } = await axios(`${host_tour}/tours`)
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

//get tour by page
router.get("/tours/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
        const { data }= await axios(`${host_tour}/tours/${page}`);
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

router.post("/tours-filter/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
        const { data } = await axios.post(`${host_tour}/tours-filter/${page}`, req.body);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    console.log(error)
    
    if(error.response) res.status(400).json({ error: error.response.data.error });
    else res.status(400).json({
      error: error.message,
    });
  }
});

//get tour by id
router.get("/tour/:id", async (req, res) => {
  try {
    const tourId = req.params.id;
    if (parseInt(tourId)) {
        const { data } = await axios(`${host_tour}/tour/${tourId}`);
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

// create tour

router.post("/tour", async (req, res, next) => {
  try {
    const { title } = req.body;
    const name = viToEn(title);
    const bulk = [];
    bulk.push({
      index: {
        _index: "api-city-world",
        _type: "cities_list",
      },
    });
    bulk.push({ name, title });

    await axios.post(`${host_tour}/tour`, req.body);
    client.bulk({ body: bulk }, function (err, response) {
      if (err) {
        console.log("Failed Bulk operation".red, err);
      } else {
        console.log("Successfully imported %s".green, cities.length);
      }
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error)
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});
//update tour by id

router.put("/tour/:id", async (req, res, next) => {
  try {
    await axios.put(`${host_tour}/tour/${req.params.id}`, req.body)
    const { title } = req.body
    if (title) {
      const name = viToEn(title.toLowerCase());
      await client.updateByQuery({
        index: "api-title-tour",
        type: "tours_list",
        body: {
          query: { match: { id: req.params.id } },
          script: {
            source: `ctx._source.title = "${title}"; ctx._source.name = "${name}"`,
          },
        },
      });
    }
    res.json({ success: true });
  } catch (error) {

    // if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
        });
    console.log(error)
  }
});
//get tour by type current have 2 type national and international
router.get("/tour/type/:type/:page", async (req, res, next) => {
  try {
      const { data } = await axios.get(`${host_tour}/tour/type/${req.params.type}/${req.params.page}`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

//get tour by type and zone
router.get("/tour/type/:type/:zone", async (req, res, next) => {
  try {
      const { data } = await axios.get(`${host_tour}/tour/type/${req.params.type}/${req.params.zone}`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

//get all tourId

router.get("/tour-id", async (req, res, next) => {
  try {
      const { data } = await axios.get(`${host_tour}/tour-id`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});
router.get("/tour-top", async (req, res, next) => {
  try {
    const { data } = await axios.get(`${host_tour}/tour-top`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/tour-type/:type", async (req, res, next) => {
  try {
    const { data } = await axios.get(`${host_tour}/tour-type/${req.params.type}`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
        res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/tour-data-filter", async (req, res, next) => {
  try {
    const { data } = await axios.get(`${host_tour}/tour-data-filter`);
    res.json(data);
  } catch (error) {
    if(error.response) res.status(400).json({ error: error.response.data.error });
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/tour-relation/:id", async (req, res, next) => {
  try {
    const tourId = req.params.id;
    if (parseInt(tourId)) {
      const { data } = await axios.get(`${host_tour}/tour-relation/${req.params.id}`);
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

router.post("/tour/:id", async (req, res, next) => {
  try {
    console.log('-------gateway--------', req.body)
    await axios.post(`${host_tour}/tour/${req.params.id}`, req.body);
    res.json({ status: "ok" });
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.post("/tour-by-list-id", async (req, res, next) => {
  try {
    const { data } = await axios.post(`${host_tour}/tour-by-list-id`, req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});



module.exports = router;
