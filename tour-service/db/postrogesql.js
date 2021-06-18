const Sequelize = require("sequelize");
const { url_db } = require("../config");
const sequelize = new Sequelize(url_db, {
  define: {
    createdAt: "createdat",
    updatedAt: "updatedat",
    freezeTableName: true, // name define = name table
  },
  // logging: false, product should off
});
module.exports = sequelize;

// async function testConnect() {
//     try {
//       await sequelize.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
// }

// testConnect()
