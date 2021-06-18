// const { json } = require("express");
const redis = require("redis");
const fs = require('fs')
// const publicRoute = require('./middleware/routePublic.json')
// const routeAction = require('./middleware/actionRoute.json')
const host_redis = process.env.HOST_REDIS || 'localhost'
console.log('-----------------------', host_redis, '---------------------')
const client = redis.createClient({
  host: host_redis,
  port: 6379
});
// console.log(listNameCountry)
// client.set('public_route', JSON.stringify(publicRoute.data), (err) => {
//   if (err) console.log(err)
//   console.log('ok')
// })

// client.set("route_action", JSON.stringify(routeAction.data), (err) => {
//   if (err) console.log(err);
//   console.log("ok");
// });


client.on("error", function (error) {
  console.error(error);
});
module.exports = client
