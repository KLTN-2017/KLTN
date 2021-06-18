const express = require("express");
const router = express.Router();
const client = require('../elastTic')
const vnToEn = require('../service/vnToen')

router.get("/search-city", function (req, res) {
  const name = req.query["q"].toLowerCase()
  let body = {
    size: 20,
    from: 0,
    query: {
      match: {
        name
      },
    },
  };
  client
    .search({ index: "api-city-world", body: body, type: "cities_list" })
    .then((results) => {
      res.send(results.hits.hits.map(city => city._source));
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});


router.get("/search-tour", function (req, res) {
  const title = vnToEn(req.query["q"].toLowerCase());
  let body = {
    size: 10,
    from: 0,
    query: {
      match: {
        name: title,
      },
    },
  };
  client
    .search({ index: "api-title-tour", body: body, type: "tours_list" })
    .then((results) => {
      const data = results.hits.hits.map((tour) => tour._source);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});

router.get("/search-car", function (req, res) {
  const title = vnToEn(req.query["q"].toLowerCase());
  let body = {
    size: 10,
    from: 0,
    query: {
      match: {
        name: title,
      },
    },
  };
  client
    .search({ index: "api-title-car", body: body, type: "cars_list" })
    .then((results) => {
      const data = results.hits.hits.map((car) => car._source);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});

router.get("/search-hotel", function (req, res) {
  const title = vnToEn(req.query["q"].toLowerCase());
  let body = {
    size: 10,
    from: 0,
    query: {
      match: {
        name: title,
      },
    },
  };
  client
    .search({ index: "api-title-hotel", body: body, type: "hotels_list" })
    .then((results) => {
      const data = results.hits.hits.map((car) => car._source);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});

router.get("/search-news", function (req, res) {
  const title = vnToEn(req.query["q"].toLowerCase());
  let body = {
    size: 10,
    from: 0,
    query: {
      match: {
        name: title,
      },
    },
  };
  client
    .search({ index: "api-title-news", body: body, type: "news_list" })
    .then((results) => {
      const data = results.hits.hits.map((car) => car._source);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});


module.exports = router