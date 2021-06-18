const express = require("express");
const router = express.Router();
const {
  createData,
  createArrayData,
  getAllCar,
  getCarById,
  updateCar,
  getTypeBrandCar,
  getYearCar,
  getNumberSitCar,
  filterCar,
  getRelationById,
  deleteCar,
  getCarByListId,
  getAllIdTitle,
} = require("./db/model");

router.get("/", (req, res) => {
  res.send("Api car-travel");
});

//get all tour
router.get("/cars", async (req, res) => {
  try {
    const data = await getAllCar();
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

//get tour by page
router.get("/cars/:page", async (req, res) => {
  try {
    const page = req.params.page;
    if (parseInt(page)) {
      const data = await getPageCar(page);
      res.json(data);
    } else
      res.status(400).json({
        error: `Bad request page can must a number interger but currently page is ${req.params.id}`,
      });
  } catch (error) {
    console.log(error, 'day la loi')
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

//get tour by id
router.get("/car/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    if (parseInt(carId)) {
      const data = await getCarById(carId);
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

// get car relation by id 
router.get("/car-relation/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    if (parseInt(carId)) {
      const data = await getRelationById(carId);
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



//get typrCar

router.get("/car-type", async (req, res) => {
  try {
    const data = await getTypeBrandCar()
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
//get group by numbersit
router.get("/car-numbersit", async (req, res) => {
  try {
    const data = await getNumberSitCar();
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});
// get group by year car
router.get("/car-year", async (req, res) => {
  try {
    const data = await getYearCar();
    res.json(data);
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.get('/car-filter/:page', async (req, res, next) => {
  try {
    const { vehiclelife, brand, cartype } = req.query;
    const fiter = {
      vehiclelife,
      brand,
      cartype
    }
    Object.keys(fiter).forEach(
      (key) => (fiter[key] === undefined || fiter[key] === '') && delete fiter[key]
    );
    const data = await filterCar(fiter, req.params.page)
    res.json(data)
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
})

// create tour

router.post('/car', async(req, res, next) => {
    try {
        const car = req.body;
        if (Array.isArray(car)) await createArrayData(car)
        else await createData(car)
        res.json({ success: true });
        
    } catch (error) {
        res.status(400).json({
          error: error.parent.detail,
        });
    }

})
//update tour by id 

router.put("/car/:id", async (req, res, next) => {
  try {
     await updateCar(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.delete("/car/:id", async (req, res, next) => {
  try {
    await deleteCar(req.params.id)
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
          error: error.parent.detail,
        });
  }
});

router.post("/car/:id", async (req, res, next) => {
  try {
    console.log(req.body, '------------------------')
    const car = await getCarById(req.params.id)
    const [rate, count] = car.rate.split('-')
    const userRate = parseInt(req.body.rate)
    const newRate = `${((parseFloat(rate) * parseInt(count) + userRate) / (parseInt(count) +1 )).toFixed(2)}-${parseInt(count) +1}`
    await updateCar(req.params.id, {rate: newRate})
    res.json({status: 'ok'});
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: error.parent.detail,
    });
  }
});

router.post("/car-by-list-id", async (req, res, next) => {
  try {
    const listId = req.body;
    const listCar = await getCarByListId(listId);
    res.json(listCar);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: error.message,
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


module.exports = router;
