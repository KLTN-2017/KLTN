const sharp = require("sharp");
const fs = require('fs')
const path = require('path')
const uploadFile = require('./toFireBase')
const uuid = require('uuid-v4')
async function resizeAndToFirebase(pathFile, bucket) {
    const name = uuid()
    try {
        const typeFile = path.extname(pathFile);
        await sharp(pathFile).resize(300, 300).toFile(`uploads/${name}${typeFile}`);
        const { error, url } = await uploadFile(
            `uploads/${name}${typeFile}`,
            bucket
        );
        
            fs.unlink(pathFile, err => console.log('unlink1', err))
            fs.unlink(`uploads/${name}${typeFile}`, (err) =>
              console.log('unlin2',err)
            );
        
        return {error, url}
    } catch (error) {
        console.log(error, 'resize')
        return {
            error: true,
            url: error.message
        }
    }
}

module.exports = resizeAndToFirebase