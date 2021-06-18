const express = require("express");
const router = express.Router();
const axios = require("axios");
const {host_user} = require('../config/index')
const { checkPasswd } = require("../service/checkPasswd");
const { generateAccessToken } = require("../service/token");
const { OAuth2Client } = require("google-auth-library");
const { google_url } = require("../config/index");
const sendMailGmail = require('../service/sendMail')
const uuid = require('uuid-v4')
const client = require('../testRedis')
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data } = await axios.get(`${host_user}/email/${email}`);
    if (data.length === 1) {
      if (
        checkPasswd(
          { salt: data[0].salt, passwd: data[0].passwdhash },
          password
        )
      ) {
        const token = generateAccessToken({
          email: data[0].email,
          id: data[0].id,
          role: data[0].role,
        });
        res
          .cookie("token", token, { httpOnly: true })
          .status(200)
          .json({ auth: "ok", email, id: data[0].id, role: data[0].role });
      } else
        res.status(401).json({
          auth: "UserName or password incorrect",
          error: "UserName or password incorrect",
        });
    } else
      res.status(401).json({
        auth: "UserName or password incorrect",
        error: "UserName or password incorrect",
      });
  } catch (error) {
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

router.post("/login-google",(req, res) => {
  try {
    const { tokenId } = req.body;
    const oAuth2Client = new OAuth2Client(google_url);
    oAuth2Client
      .verifyIdToken({ idToken: tokenId, audience: google_url })
      .then(async (response) => {
        const { name, email, picture } = response.payload;
        const { data } = await axios.get(`${host_user}/email/${email}`);
        let id = ''
        if (data.length === 1)  id = data[0].id
        else {
          const { data } = await axios.post(`${host_user}/user-google-facebook`, {
            email,
            name,
          });
          id = data.id
        }
        const token = generateAccessToken({
          name,
          email,
          picture,
          id
        });
        res
          .cookie("token", token, { httpOnly: true })
          .status(200)
          .json({ auth: "ok", name, email, picture });
      })
      .catch((err) => {
        console.log(err, 'agfhfdsasdfghfdsadfg')
        res.status(400).json({ error: err.message });
      });
  } catch (error) {
   res.status(400).json({ error: err.message });
  }
});


router.post("/login-facebook", (req, res) => {
  try {
    const { id, accessToken } = req.body;
    const url_facebook = `https://graph.facebook.com/v2.11/${id}/?field=id,name,email,phone&access_token=${accessToken}`;
    axios.get(url_facebook).then( async response => {
      const { name, id } = response.data
      const { data } = await axios.get(`${host_user}/email/${id}`);
      let idU = "";
      if (data.length === 1) idU = data[0].id;
      else {
        const { data } = await axios.post(`${host_user}/user-google-facebook`, {
          email: id,
          name,
        });
        idU = data.id;
      }
      const token = generateAccessToken({
        name,
        id
      });
     res
       .cookie("token", token, { httpOnly: true })
       .status(200)
       .json({ auth: "ok", email: name, id });
    }).catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/create-user", async (req, res, next) => {
  try {
    console.log(req.body, '---------gateway')
    const { email } = req.body
    sendMailGmail(email, "check email exists", "Chúng tôi kiểm tra xem email có tồn tại không")
      .then(async () => {
        const { data } = await axios.post(host_user, req.body);
        const codeAccess = uuid()
        sendMailGmail(
          email,
          "Xác minh email là của bạn",
          `Đây là đoạn mã dùng để kích hoạt tài khoản cho bạn: ${codeAccess} \n Nó chỉ có thời hạn trong vòng 3h nên bạn cần sớm xác minh`
        )
          .then(() => {
            client.set(codeAccess, data.id,'EX', 60 * 60 * 3, err => {
              if (!err) res.json({ create: "ok" });
                
              else res.status(400).json({
              error: error.message,
            })
          
            })
          })
          .catch((error) =>
            res.status(400).json({
              error: error.message,
            })
          );
      })
      .catch(error => res.status(400).json({
      error: error.message,
    }))
  
  } catch (error) {
    if (error.response)
      res.status(400).json({ error: error.response.data.error });
    res.status(400).json({
      error: error.message,
    });
  }
});



router.post("/check-code-user", (req, res) => {
  try {
    const code = req.body.code
    client.get(code, async (error, id) => {
      console.log('-------id', id)
      if(error || id === null)res.status(400).json({
        error: 'Code của bạn không đúng hoặc đã hết hạn',
      })
      else {
        const { data } = await axios.put(`${host_user}/enable-user/${id}`)
        client.del(code, error => console.log(error, '---------------'))
        res.json({status: "ok"})
      }
    })
  } catch (error) {
    console.log(error, '---------tttttttttttttttt-----------')
    if (error.response)
      res.status(400).json({ error: error.response.data.error });
    res.status(400).json({
      error: error.message,
    });
  }
});





module.exports = router;
