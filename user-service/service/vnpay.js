const { nonAccentVietnamese }  = require('./vntoen')
function sortObject(o) {
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

function getUrlVnpay(amount, orderInfo, ipAddr) {
  const dateFormat = require("dateformat");
  const vnp_OrderType = "T4";
  var tmnCode = "3PAJMHZD";
  var secretKey = "OEZCBLJTLBUYLIBRUUVSCJBFNUFGZUDP";
  var vnpUrl = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var returnUrl = "http://www.viettraveluet-linux-ha.com:3005/order-item";

  var date = new Date();

  var createDate = dateFormat(date, "yyyymmddHHmmss");
  var orderId = dateFormat(date, "HHmmss");
  var locale = "vn";
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderType"] = vnp_OrderType;
  vnp_Params["vnp_OrderInfo"] = nonAccentVietnamese(orderInfo);
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = '192.168.0.113';
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  var sha256 = require("sha256");

  var secureHash = sha256(signData);

  vnp_Params["vnp_SecureHashType"] = "SHA256";
  vnp_Params["vnp_SecureHash"] = secureHash;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });
  console.log(vnpUrl)
	return vnpUrl;
}
//console.log(getUrlVnpay(90000, 'T56-hello cacs baN', '192.168.4.9'))
module.exports = getUrlVnpay
