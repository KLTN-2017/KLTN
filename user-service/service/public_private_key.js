const crypto = require("crypto");
const { generateKeyPairSync } = require("crypto");
const keyPair = () => generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "top secret",
  },
});
const encryptedData = (publicKey, data) =>
  crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(data)
  );
const decryptedData = (privateKey, encryptedData) =>
  crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
      passphrase: "top secret",
    },
    Buffer.from(encryptedData, 'hex')
    );
module.exports = {
    keyPair,
    encryptedData,
    decryptedData
}

