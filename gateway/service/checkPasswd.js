const crypto = require("crypto");

function checkPasswd(privateData, password) {
    const { salt, passwd } = privateData;
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
  if (crypto.timingSafeEqual(Buffer.from(passwd, "hex"), encryptHash))
    return true;
  else return false;
}


module.exports = {
  checkPasswd
};
