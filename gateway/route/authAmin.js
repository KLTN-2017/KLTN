const express = require("express");
const router = express.Router();
const axios = require("axios");
const {host_user, host_role_permission} = require('../config/index')
const { OAuth2Client } = require("google-auth-library");
const { google_url_admin } = require("../config/index");
const { verifyAccessToken } = require("../service/token");

const { checkPasswd } = require("../service/checkPasswd");
const { generateAccessToken } = require("../service/token");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { data } = await axios.get(`${host_user}/email/${username}`);

    if (data.length === 1 && data[0].role !== "customer") {
      if (
        checkPasswd(
          { salt: data[0].salt, passwd: data[0].passwdhash },
          password
        )
      ) {
        const token = generateAccessToken({
          username: data[0].username,
          id: data[0].id,
          role: data[0].role,
        });
        const listAction = await axios.get(
          `${host_role_permission}/permission-of-role/${data[0].role}`
        );
        const arrayAction = listAction.data.map((action) => action.permission);
        res
          .cookie("token", token, { httpOnly: true })
          .status(200)
          .json({ auth: "ok", username, action: arrayAction });
      } else
        res.status(401).json({
          auth: "UserName or password incorrect",
          error: "UserName or password incorrect",
        });
    } else
      res.status(401).json({
        auth: "Bạn không có trong hệ thống của chúng tôi",
        error: "Bạn không có trong hệ thống của chúng tôi",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      auth: "error",
      error: error.message,
    });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ auth: "ok" });
  } catch (error) {
    if (error.response)
      res.status(400).json({ error: error.response.data.error });
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/check-login", (req, res) => {
  try {
    if (req.cookies.token) {
      const verify = verifyAccessToken(req.cookies.token);
      if (verify) {
        res.json({ login: "ok" });
      } else res.status(401).json({ error: "Phiên làm việc của bạn đã hết vui lòng đăng nhập lại" });
    } else res.status(401).json({ error: "Bạn cần đăng nhập để sử dụng dịch vụ" });
  } catch (error) {
    console.log(error);
    if (error.response)
      res.status(400).json({ error: error.response.data.error });
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/login-google", (req, res) => {
  try {
    const { tokenId } = req.body;
    const oAuth2Client = new OAuth2Client(google_url_admin);
    oAuth2Client
      .verifyIdToken({ idToken: tokenId, audience: google_url_admin })
      .then(async (response) => {
        const {email} = response.payload;
        const { data } = await axios.get(`${host_user}/email/${email}`);
        if (data.length === 1 && data[0].role !== "CUSTOMER") {
          const token = generateAccessToken({
            role: data[0].role,
            email,
            id: data[0].id,
          });
          const listAction = await axios.get(
            `${host_role_permission}/permission-of-role/${data[0].role}`
          );
          const arrayAction = listAction.data.map(
            (action) => action.permission
          );
          res
            .cookie("token", token, { httpOnly: true })
            .status(200)
            .json({ auth: "ok", username: email, action: arrayAction });
        } else
          res.status(401).json({
            error:
              "email của bạn không có trong hệ thống vui lòng sử dụng email của công ty để login",
          });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
