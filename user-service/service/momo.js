const uuid = require("uuid-v4")
const crypto = require("crypto")
const { default: axios } = require("axios")

async function generationPayUrl(info, count, id) {
    const partnerCode = "MOMO7DRZ20200522"
    const accessKey = "DSwpN7M59VBTmdxf"
    const serectkey = "HSooIY7iQa8xhYHG6iTCUvHsOBIg7RBh"

    const returnUrl = "http://www.viettraveluet-linux-ha.com:3005/order-item";
    const notifyurl = "https://callback.url/notify"
    const orderInfo = info
    const amount = count
    const orderId = id + '-' + new Date().getTime()
    const requestId = id + "-" + new Date().getTime()
    const requestType = "captureMoMoWallet"
    const extraData = "merchantName=;merchantId="
    const rawSignature =
      "partnerCode=" +
      partnerCode +
      "&accessKey=" +
      accessKey +
      "&requestId=" +
      requestId +
      "&amount=" +
      amount +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&returnUrl=" +
      returnUrl +
      "&notifyUrl=" +
      notifyurl +
      "&extraData=" +
      extraData
    const signature = crypto
      .createHmac("sha256", serectkey)
      .update(rawSignature)
      .digest("hex")
    const body = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      returnUrl: returnUrl,
      notifyUrl: notifyurl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
    })
    const { data } = await axios
      .post(
        "https://test-payment.momo.vn/gw_payment/transactionProcessor",
        body
      )
      
    return data.payUrl;
}

module.exports = generationPayUrl