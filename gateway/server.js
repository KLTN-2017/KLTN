const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const mongoose = require('mongoose')
const corsOptions = {
  origin: [
    "http://192.168.0.113:3000",
    "http://localhost:3000",
    "http://192.168.0.113:3005",
    "http://localhost:3005",
    "http://www.viettraveluet-linux-ha.com:3005",
    "https://www.viettraveluet-linux.com:3005",
  ],
  credentials: true,
};

const io = require("socket.io")(http, {
  cors: corsOptions,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(cors(corsOptions));
// app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const TourMessage = require('./mongodb/baseMessage')
const hostMongo = process.env.HOST_MONGO || 'localhost'
mongoose.connect(
  `mongodb://${hostMongo}:27017/message?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log("error is here", err);
    console.log("connect to mongo db ok");
  }
);

module.exports = {
  http,
  app,
  io
}