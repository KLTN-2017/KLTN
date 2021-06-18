const express = require('express')
const compression = require("compression");
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const tour = require('./router')
const news = require('./routeNews')
const banner = require('./routeBanner')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors())
const { port } = require("./config");
app.get('/', (req, res, next) => {
    res.send("Hi! This is Tour service")
})
app.use('/api', tour)

app.use('/api-news', news)
app.use('/api-banner', banner)


 app.listen(port, () => {
    console.log(`app is running at port ${port}`);
  });