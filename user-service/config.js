const dotenv = require("dotenv");
dotenv.config();
const url_db = process.env.URL_DB;
const port = process.env.PORT || 3030;

module.exports = {
  url_db,
  port,
};