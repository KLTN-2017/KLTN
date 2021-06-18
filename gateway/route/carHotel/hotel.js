const express = require("express");
const router = express.Router();
const axios = require('axios')
const {host_hotel} = require('../../config/index')

router.get("/", async (req, res) => {
 try {
     const { data } = await axios.get(host_hotel)
     res.json(data)
 } catch (error) {
     res.status(400).json({
       error: error.message,
     });
 }
});

//get all tour
router.get("/hotels", async (req, res) => {
  try {
    const { data } = await axios.get(`${host_hotel}/hotels`);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//get tour by page
router.get("/hotels/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
      const { data } = await axios.get(`${host_hotel}/hotels/${page}`);
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

//get hotel by id
router.get("/hotel/:id", async (req, res) => {
  try {
    const hotelId = req.params.id;
    if (parseInt(hotelId)) {
      const { data } = await axios.get(`${host_hotel}/hotel/${hotelId}`);
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

router.get("/hotel-relation/:id", async (req, res) => {
  try {
    const hotelId = req.params.id;
    if (parseInt(hotelId)) {
      const { data } = await axios.get(`${host_hotel}/hotel-relation/${hotelId}`);
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

// get zone hotel

router.get("/hotel-zone", async (req, res) => {
  try {
    const { data } = await axios.get(`${host_hotel}/hotel-zone`);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
//get group by numbersit
router.get("/hotel-star", async (req, res) => {
  try {
    const { data } = await axios.get(`${host_hotel}/hotel-star`);
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/hotel-filter/:page", async (req, res, next) => {
  try {
  const { location, star } = req.query;
    const { data } = await axios.get(
      `${host_hotel}/hotel-filter/${req.params.page}?star=${star}&location=${location}`
    );
    console.log(data,'wertyuiop[poiuytrewwertyuiopoiuytrewertyuiopiawertghjnhgftdresrdtfyguhijuhygtfrdeswaesrdtfyguhihygtfrdesrdtfy')

  res.json(data);
} catch (error) {
  console.log(error,'wertyuiop[poiuytrewwertyuiopoiuytrewertyuiopiawertghjnhgftdresrdtfyguhijuhygtfrdeswaesrdtfyguhihygtfrdesrdtfy')
  res.status(400).json({
    error: error.message,
  });
}
});

// create hotel

router.post("/hotel", async (req, res, next) => {
  try {
    const hotel = req.body;
     await axios.post(`${host_hotel}/hotel`,hotel);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
// update tour by id

router.put("/hotel/:id", async (req, res, next) => {
  try {
    await axios.put(`${host_hotel}/hotel/${req.params.id}`, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});


router.post("/hotel/:id", async (req, res, next) => {
  try {
    await axios.post(`${host_hotel}/hotel/${req.params.id}`, req.body);
    res.json({ status: "ok" });
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.post("/hotel-by-list-id", async (req, res, next) => {
  try {
    const { data} = await axios.post(
      `${host_hotel}/hotel-by-list-id`,
      req.body
    );
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
