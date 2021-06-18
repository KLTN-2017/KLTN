const admin = require("firebase-admin");
const uuid = require("uuid-v4");
const serviceAccount = require("./ha-uet-gateway-firebase-adminsdk-rttxl-2ceafcf515.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "ha-uet-gateway.appspot.com",
});

const bucket = admin.storage().bucket();


async function uploadFile(filename, storename) {
  try {
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
      },
      contentType: "image/jpg",
      cacheControl: "public, max-age=31536000",
    };
    await bucket.upload(filename, {
      gzip: true,
      metadata: metadata,
      destination: `${storename}/${filename}`
    });
    const name = `${storename}/${filename}`.replace(/\//g, "%2F");
    return {
      error: false,
      url: `https://firebasestorage.googleapis.com/v0/b/ha-uet-gateway.appspot.com/o/${name}?alt=media`,
    };
  } catch (error) {
    return {
      error: true,
      url: error.message
    }
  }
}

module.exports = uploadFile

// bucket
//   .getFiles({
//     prefix: ''
//   })
//   .then((results) => {
//     const files = results[0];
//     console.log("Total files:", files.length);
//     files.forEach((file) => {
//       console.log(file.name);
//       if (file.name === "news/uploads/girl-xinh-32.jpg") file.delete((err, apiResponse) => {
//         if (err) console.log('-----error',err)
//         else console.log("----------not error---------", Object.keys(apiResponse), apiResponse);
//       }) 
//   });
//   })
//   .catch((err) => {
//     console.error("ERROR:", err);
//   });
