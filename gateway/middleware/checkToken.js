const { verifyAccessToken } = require('../service/token')
const client = require("../testRedis");
module.exports = function (req, res, next) {
    client.get("public_route", (err, data) => {
      const listPublicRoute = JSON.parse(data);
      // console.log(listPublicRoute, req)
      const link = req.path;
      const method = req.method;
      let public = false;
        for (let i = 0; i < listPublicRoute.length; i++) {
          let newUrlLink = listPublicRoute[i].link;
        if (
          listPublicRoute[i].link.split("/")[
            listPublicRoute[i].link.split("/").length - 1
          ] === "*"
        )
          newUrlLink = listPublicRoute[i].link.replace(
            "*",
            link.split("/")[link.split("/").length - 1]
          );
          // console.log(link, newUrlLink, '----------list link');
          // console.log(method, listPublicRoute[i].method, '------------list mwetrhod');
        if (
          link === newUrlLink &&
          method === listPublicRoute[i].method
        ) {
          public = true;
          i = listPublicRoute.length;
        }
      }
      if (public) next();
      else {
        if (req.cookies.token) {
          const verify = verifyAccessToken(req.cookies.token);
          if (verify !== "error") {
            req.email = verify.email;
            req.role = verify.role;
            req.id = verify.id;
            next();
          } else res.status(401).json({ error: "Phiên làm việc của bạn đã hết vui lòng đăng nhập lại" });
        } else res.status(400).json({ error: "Bạn cần đăng nhập để sử dụng dịch vụ này" });
      }
    });
}