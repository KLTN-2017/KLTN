const express = require('express')
const compression = require("compression");
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const car = require('./router')
const hotel = require('./routeHotel')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors())
const { port } = require("./config");
app.get('/', (req, res, next) => {
    res.send("Hi! This is Tour service")
})
app.use('/api', car)
app.use("/api-hotel", hotel);

 app.listen(port, () => {
    console.log(`car-service is running at port ${port}`);
  });