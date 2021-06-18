require("dotenv").config();

const port = process.env.PORT;
const secret = process.env.TOKEN_SECRET;

const email = process.env.EMAIL;
const passwd = process.env.PASSWD;
const google_url = process.env.GOOGLE_URL;
const google_url_admin = process.env.GOOGLE_URL_ADMIN;
const host_role_permission = process.env.HOST_USER + "/api-role-permission";
const host_user = process.env.HOST_USER + "/api-user";
const host_permission = process.env.HOST_USER + "/api-permission";
const host_order = process.env.HOST_USER + "/api-order";
const host_banner = process.env.HOST_TOUR + "/api-banner";
const host_tour = process.env.HOST_TOUR + "/api";
const host_news = process.env.HOST_TOUR + "/api-news";
const host_car = process.env.HOST_CAR_HOTEL + "/api";
const host_hotel = process.env.HOST_CAR_HOTEL + "/api-hotel";
module.exports = {
  port,
  secret,
  email,
  passwd,
  google_url,
  google_url_admin,
  host_role_permission,
  host_banner,
  host_car,
  host_user,
  host_tour,
  host_permission,
  host_news,
  host_hotel,
  host_order
};


console.log({
  port,
  secret,
  email,
  passwd,
  google_url,
  google_url_admin,
  host_role_permission,
  host_banner,
  host_car,
  host_user,
  host_tour,
  host_permission,
  host_news,
  host_hotel,
  host_order
}
)