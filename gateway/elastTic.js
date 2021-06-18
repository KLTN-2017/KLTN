const { default: axios } = require("axios");
const elasticsearch = require("elasticsearch");
const viToEn = require('./service/vnToen')
// const cities = require("./city.json");
console.log(`--------------host_elastic is ${process.env.HOST_ELASTIC}`);
const hosts = process.env.URL_EL || "http://localhost:9200";
const client = new elasticsearch.Client({
  hosts,
  log: "trace",
});
client.ping(
  {
    requestTimeout: 30000,
  },
  function (error) {
    // at this point, eastic search is down, please check your Elasticsearch service
    if (error) {
      console.error("Elasticsearch cluster is down!");
      console.log('error is', error)
    } else {
      console.log("Everything is ok");
    }
  }
);

module.exports = client

// client.indices.create(
//   {
//     index: "api-city-world",
//   },
//   function (error, response, status) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("created a new index", response);
//     }
//   }
// );

// client.indices.create(
//   {
//     index: "api-title-tour",
//   },
//   function (error, response, status) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("created a new index", response);
//     }
//   }
// );

// client.indices.create(
//   {
//     index: "api-title-car",
//   },
//   function (error, response, status) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("created a new index", response);
//     }
//   }
// );

// client.indices.create(
//   {
//     index: "api-title-hotel",
//   },
//   function (error, response, status) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("created a new index", response);
//     }
//   }
// );


// client.indices.create(
//   {
//     index: "api-title-news",
//   },
//   function (error, response, status) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("created a new index", response);
//     }
//   }
// );


















// const bulk = [];
// cities.forEach((city) => {
//   city.name = city.name.toLowerCase();
//   city.origin = city.name.split('-')[0]
//   bulk.push({
//     index: {
//       _index: "api-city-world",
//       _type: "cities_list",
//     },
//   });
//   bulk.push(city);
// });
// client.bulk({ body: bulk }, function (err, response) {
//   if (err) {
//     console.log("Failed Bulk operation".red, err);
//   } else {
//     console.log("Successfully imported %s".green, cities.length);
//   }
// });











// async function getDataTour() {
//   const { data } = await axios.get("htt://localhost:5000/api/tour-id-title");
//   const bulkTour = [];
//   data.forEach((tour) => {
//     tour.name = viToEn(tour.title.toLowerCase());
//     bulkTour.push({
//       index: {
//         _index: "api-title-tour",
//         _type: "tours_list",
//       },
//     });
//     bulkTour.push(tour);
//   });
//   client.bulk({ body: bulkTour }, function (err, response) {
//     if (err) {
//       console.log("Failed Bulk operation".red, err);
//     } else {
//       console.log("Successfully imported %s".green, bulkTour.length);
//     }
//   });
// }


// getDataTour()



















// async function getDataCar() {
//   const { data } = await axios.get("http://localhost:6060/api/all-id-title");
//   const bulkTour = [];
//   data.forEach((tour) => {
//     tour.name = viToEn(tour.title.toLowerCase());
//     bulkTour.push({
//       index: {
//         _index: "api-title-car",
//         _type: "cars_list",
//       },
//     });
//     bulkTour.push(tour);
//   });
//   client.bulk({ body: bulkTour }, function (err, response) {
//     if (err) {
//       console.log("Failed Bulk operation".red, err);
//     } else {
//       console.log("Successfully imported %s".green, bulkTour.length);
//     }
//   });
// }


// getDataCar()









// async function getDataHotel() {
//   const { data } = await axios.get(
//     "http://localhost:6060/api-hotel/all-id-title"
//   );
//   const bulkTour = [];
//   data.forEach((tour) => {
//     tour.name = viToEn(tour.title.toLowerCase());
//     bulkTour.push({
//       index: {
//         _index: "api-title-hotel",
//         _type: "hotels_list",
//       },
//     });
//     bulkTour.push(tour);
//   });
//   client.bulk({ body: bulkTour }, function (err, response) {
//     if (err) {
//       console.log("Failed Bulk operation".red, err);
//     } else {
//       console.log("Successfully imported %s".green, bulkTour.length);
//     }
//   });
// }


// getDataHotel()














// async function getDataNews() {
//   const { data } = await axios.get(
//     "http://localhost:5000/api-news/all-id-title"
//   );
//   const bulkTour = [];
//   data.forEach((tour) => {
//     tour.name = viToEn(tour.title.toLowerCase());
//     bulkTour.push({
//       index: {
//         _index: "api-title-news",
//         _type: "news_list",
//       },
//     });
//     bulkTour.push(tour);
//   });
//   client.bulk({ body: bulkTour }, function (err, response) {
//     if (err) {
//       console.log("Failed Bulk operation".red, err);
//     } else {
//       console.log("Successfully imported %s".green, bulkTour.length);
//     }
//   });
// }


// getDataNews()