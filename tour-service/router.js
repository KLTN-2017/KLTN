const express = require("express");
const router = express.Router();
const {
  createData,
  createArrayData,
  getAllTour,
  getPageTour,
  getTuorType,
  getTuorById,
  getTourByTypeZone,
  updateTour,
  getAllIdTour,
  getTopTour,
  getAllZoneByType,
  getAllDataFilter,
  getPageFilterTour,
  getRelationById,
  getAllIdTitle,
  getTourByListId
} = require("./db/model");

router.get("/", (req, res) => {
  res.send("Api tour-travel");
});

//get all tour
router.get("/tours", async (req, res) => {
  try {
    const data = await getAllTour();
    res.json({ data });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });;
  }
});

//get tour by page
router.get("/tours/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
      const data = await getPageTour(page);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });;
  }
});



router.post("/tours-filter/:page", async (req, res) => {
  try {
    const page = req.params.page;
    let { type, zone, date_start, date_range, price, map_maker } = req.body;
    price = price
      ? {
          min: parseInt(price.split("-")[0]),
          max: parseInt(price.split("-")[1]),
        }
      : price;
    const filter = { type, zone, date_start, date_range, price, map_maker };
    Object.keys(filter).forEach(
      (key) =>
        (filter[key] === undefined ||
          filter[key] === "" ||
          filter[key] == "0" ||
          filter[key] === "all") &&
        delete filter[key]
    );
    if (parseInt(page)) {
      const data = await getPageFilterTour(page, filter);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    console.log(error)
    res.status(400).json({
          error: error.parent.detail,
        });;
  }
});

//get tour by id
router.get("/tour/:id", async (req, res) => {
  try {
    const tourId = req.params.id;
    if (parseInt(tourId)) {
      const data = await getTuorById(tourId);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });;
  }
});

// create tour

router.post('/tour', async(req, res, next) => {
    try {
        const tour = req.body;
        if (Array.isArray(tour)) await createArrayData(tour)
        else await createData(tour)
        res.json({ success: true });
        
    } catch (error) {
      console.log(error)
        res.status(400).json({
          error: error.parent.detail,
        });;
    }

})
//update tour by id 

router.put("/tour/:id", async (req, res, next) => {
  try {
     await updateTour({
      content: req.body,
      id: req.params.id,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });;
  }
});
//get tour by type current have 2 type national and international
router.get("/tour/type/:type/:page", async (req, res, next) => {
    try {
      const data = await getTuorType(req.params.type, req.params.page);
      res.json({ data });
    } catch (error) {
      res.status(400).json({
        error: error.parent.detail,
      });
    }
});
  
//get tour by type and zone
router.get("/tour/type/:type/:zone", async (req, res, next) => {
    try {
      const data = await getTourByTypeZone(
        req.params.type,
        req.params.zone
      );
      res.json({ data });
    } catch (error) {
      res.status(400).json({
        error: error.parent.detail,
      });
    }
});
  
//get all tourId

router.get('/tour-id', async (req, res, next) => {
    try {
      const data = await getAllIdTour()
      res.json({ data });
    } catch (error) {
      res.status(400).json({
        error: error.parent.detail,
      });
    }
})

router.get("/tour-id-title", async (req, res, next) => {
  try {
    const data = await getAllIdTitle();
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.post("/tour-by-list-id", async (req, res, next) => {
  try {
    const data = await getTourByListId(req.body)
    res.json(data);
  } catch (error) {
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.get('/tour-top', async (req, res, next) => {
  try {
      const data = await getTopTour()
      res.json({ data });
    } catch (error) {
      res.status(400).json({
        error: error.parent.detail,
      });
    }
})

router.get("/tour-type/:type", async (req, res, next) => {
  try {
    const data = await getAllZoneByType(req.params.type);
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });;
  }
});

router.get("/tour-data-filter", async (req, res, next) => {
  try {
    const data = await getAllDataFilter()
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });;
  }
});

router.get("/tour-relation/:id", async (req, res, next) => {
  try {
    const tourId = req.params.id;
    if (parseInt(tourId)) {
      const data = await getRelationById(tourId)
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });;
  }
});

router.post("/tour/:id", async (req, res, next) => {
  try {
    const tour = await getTuorById(req.params.id);
    const [rate, count] = tour.rate.split("-");
    const userRate = parseInt(req.body.rate);
    const newRate = `${(
      (parseFloat(rate) * parseInt(count) + userRate) /
      (parseInt(count) + 1)
    ).toFixed(2)}-${parseInt(count) + 1}`;
    await updateTour({ id: req.params.id, content: { rate: newRate }});
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});



module.exports = router;
