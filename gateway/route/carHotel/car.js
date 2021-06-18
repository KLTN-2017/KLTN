const express = require("express");
const router = express.Router();
const axios = require('axios')
const {host_car} = require('../../config/index')
router.get("/", async(req, res) => {
  try {
    const { data } = await axios.get(host_car)
    res.json(data)
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});

//get all tour
router.get("/cars", async (req, res) => {
  try {
    const { data } = await axios.get(`${host_car}/cars`);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//get tour by page
router.get("/cars/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
      const { data } = await axios.get(`${host_car}/cars/${page}`);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//get tour by id
router.get("/car/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    if (parseInt(carId)) {
      const { data } = await axios.get(`${host_car}/car/${carId}`);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// get car relation by id
router.get("/car-relation/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    if (parseInt(carId)) {
      const { data } = await axios.get(`${host_car}/car-relation/${carId}`);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//get typrCar

router.get("/car-type", async (req, res) => {
  try {
    const { data } = await axios.get(`${host_car}/car-type`);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
//get group by numbersit
router.get("/car-numbersit", async (req, res) => {
  try {
    const { data } = await axios.get(`${host_car}/car-numbersit`);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
// get group by year car
router.get("/car-year", async (req, res) => {
  try {
    const { data } = await axios.get(`${host_car}/car-year`);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/car-filter/:page", async (req, res, next) => {
  
  try {
    const { vehiclelife, brand, cartype } = req.query;
    const { data } = await axios.get(
      `${host_car}/car-filter/${req.params.page}?vehiclelife=${vehiclelife}&brand=${brand}&cartype=${cartype}`
    );
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// create tour

router.post("/car", async (req, res, next) => {
  try {
    const car = req.body;
    await axios.post(`${host_car}/car`, car);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
//update tour by id

router.put("/car/:id", async (req, res, next) => {
  try {
    await axios.put(`${host_car}/car/${req.params.id}`, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/car/:id", async (req, res, next) => {
  try {
    await axios.delete(`${host_car}/car/${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

router.post("/car/:id", async (req, res, next) => {
  try {
    await axios.post(`${host_car}/car/${req.params.id}`, req.body)
    res.json({ status: "ok" });
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.post("/car-by-list-id", async (req, res, next) => {
  try {
    const { data } = await axios.post(`${host_car}/car-by-list-id`, req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
