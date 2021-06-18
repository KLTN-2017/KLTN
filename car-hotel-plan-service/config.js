const dotenv = require("dotenv");
dotenv.config();
const url_db = process.env.URL_DB;
const port = process.env.PORT || 6000;

module.exports = {
  url_db,
  port,
};