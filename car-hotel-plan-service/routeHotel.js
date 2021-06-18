const express = require("express");
const router = express.Router();
const {
  createData,
  createArrayData,
  getAllHotel,
  getPageHotel,
  getHotelById,
  updateHotel,
  getZoneHotel,
  getStarHotel,
  filterHotel,
  getRelationById,
  getHotelByListId,
  getAllIdTitle,
} = require("./db/hotelModel");

router.get("/", (req, res) => {
  res.send("Api hotel-travel");
});

//get all tour
router.get("/hotels", async (req, res) => {
  try {
    const data = await getAllHotel();
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

//get tour by page
router.get("/hotels/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
      const data = await getPageHotel(page);
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

//get hotel by id
router.get("/hotel/:id", async (req, res) => {
  try {
    const hotelId = req.params.id;
    if (parseInt(hotelId)) {
      const data = await getHotelById(hotelId);
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

router.get("/hotel-relation/:id", async (req, res) => {
  try {
    const hotelId = req.params.id;
    if (parseInt(hotelId)) {
      const data = await getRelationById(hotelId);
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

// get zone hotel

router.get("/hotel-zone", async (req, res) => {
  try {
    const data = await getZoneHotel()
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
//get group by numbersit
router.get("/hotel-star", async (req, res) => {
  try {
    const data = await getStarHotel();
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.get("/hotel-filter/:page", async (req, res, next) => {
  try {
    const { location, star } = req.query;
    const fiter = {
      location,
      star
    };
    Object.keys(fiter).forEach(
      (key) =>
        (fiter[key] === undefined || fiter[key] === "") && delete fiter[key]
    );
    const data = await filterHotel(fiter, req.params.page);
    res.json(data);
  } catch (error) {
    console.log(error , 'loi day nay cac ban oi')
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

// create hotel

router.post("/hotel", async (req, res, next) => {
  try {
    const hotel = req.body;
    if (Array.isArray(hotel)) await createArrayData(hotel);
    else await createData(hotel);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
// update tour by id

router.put("/hotel/:id", async (req, res, next) => {
  try {
    await updateHotel(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.post("/hotel/:id", async (req, res, next) => {
  try {
    const hotel = await getHotelById(req.params.id);
    const [rate, count] = hotel.rate.split("-");
    const userRate = parseInt(req.body.rate);
    const newRate = `${(
      (parseFloat(rate) * parseInt(count) + userRate) /
      (parseInt(count) + 1)
    ).toFixed(2)}-${parseInt(count) + 1}`;
    await updateHotel(req.params.id, { rate: newRate });
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.post("/hotel-by-list-id", async (req, res, next) => {
  try {
    const listId = req.body
    const listHotel = await getHotelByListId(listId)
    res.json(listHotel)
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});


router.get("/all-id-title", async (req, res) => {
  try {
    const data = await getAllIdTitle()
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

module.exports = router;
