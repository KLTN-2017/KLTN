
const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const { v1 } = require("uuid"); 
const moment = require("moment"); 

const config = {
  appid: "554",
  key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
  key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder",
};

const embeddata = {
  redirecturl: "http://www.viettraveluet-linux-ha.com:3005/order-item",
};



  
async function getUrlZaloPay({ title, count, id }) {
  const items = {
    title,
    count,
    id
  }
  const order = {
    appid: config.appid,
    apptransid: `${moment().format("YYMMDD")}_${id + '-' + v1()}`, // mã giao dich có định dạng yyMMdd_xxxx
    appuser: "dulichvietTravelUet",
    apptime: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embeddata: JSON.stringify(embeddata),
    amount: count,
    description: title,
    bankcode: "zalopayapp",
  };
  const data =
    config.appid +
    "|" +
    order.apptransid +
    "|" +
    order.appuser +
    "|" +
    order.amount +
    "|" +
    order.apptime +
    "|" +
    order.embeddata +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  return axios
    .post(config.endpoint, null, { params: order }).then(res => { return res.data.orderurl }).catch(err => {return ''})
};

module.exports = getUrlZaloPay

getUrlZaloPay({title: 'hello', count: 50000, id: '5'}).then (res => console.log(res))

