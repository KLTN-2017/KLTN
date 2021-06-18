const express = require('express')
const compression = require("compression");
const helmet = require('helmet')
const app = express()
const user = require('./route/user')
const bulkFakeData = require('./service/fakeData')
const order = require('./route/order')
const permission = require('./route/permission')
const rolePermission = require('./route/role_permission')
app.use(express.urlencoded({
  extended: false,
  limit: '50mb'
}));
app.use(express.json({
  limit: '50mb'
}));
app.use(compression());
app.use(helmet());
 
const { port } = require("./config");
app.get('/', (req, res, next) => {
    res.send("Hi! This is User service")
})
app.use('/api-user', user)
app.use("/api-order", order);
app.use("/api-permission", permission);
app.use("/api-role-permission", rolePermission);

app.post('/api/fake-user', async (req, res, next) => {
  try {
    const { listUser, listPrivateData } = req.body;
    await bulkFakeData(listUser, listPrivateData)
    res.json({status: 'ok'})
  } catch (error) {
    res.status(400).json({err: error.message})
  }
})


 app.listen(port, () => {
    console.log(`app is running at port ${port}`);
  });