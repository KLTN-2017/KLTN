const crypto = require("crypto");

function hash(password) {
    try {
        const salt = crypto.randomBytes(10).toString("base64");
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
        return {
          salt,
          passwd: hash.toString('hex'),
        };
    } catch (error) {
        throw error
    }
}
function encryptHash(privateData, password) {
    const { salt, passwd } = privateData
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
    if (crypto.timingSafeEqual(Buffer.from(passwd, 'hex'), encryptHash)) return true
    else return false
}

module.exports = {
    hash,
    encryptHash
}

// console.log(hash('sdfghjkio'))

