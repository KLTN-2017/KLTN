const {app, http} = require('./server')
const checkToken = require("./middleware/checkToken");
const fs = require("fs");
const checkAction = require('./middleware/checkAction')
const authRoute = require("./route/auth");
const elasticSearch = require("./route/elastic");
const authAdminRoute = require("./route/authAmin");
const { port } = require("./config");
const tourRoute = require("./route/tour");
const carRoute = require("./route/carHotel/car");
const hotelRoute = require("./route/carHotel/hotel");
const userRoute = require("./route/user");
const orderRoute = require("./route/order");
const permissionRoute = require("./route/permission");
const newsRoute = require("./route/news");
const rolePermissionRoute = require("./route/rolePermission");
const introduceRoute = require("./route/introduce");
const bannerRoute = require("./route/banner");
const actionRoute = require("./route/action");
const upload = require("./service/upload");
const resizeAndToFirebase = require("./service/resizeImg");
const multipartMiddleware = require("./service/ckeditorUploadImg");
const uploadFile = require("./service/toFireBase");
const {getListMessage} = require('./mongodb/baseMessage')
app.use("/api-auth", authRoute);

app.use("/api-auth-admin", authAdminRoute);


app.use("/api-elastic", elasticSearch);

app.use("/api-message/:id", async(req, res, next)=>{
  try{
    console.log(req.params.id, '--------------------------')
    const listComments = await getListMessage(req.params.id)
	  const data = listComments.reverse()
    res.json(data)
  } catch(error){
    res.status(400).json({error: error.message})
  }

})

app.use(checkToken);
app.use(checkAction)
app.get("/", (req, res) => {
  res.send("Wellcome you to with api gateway");
});

app.use("/api-tour", tourRoute);


app.use("/api-car", carRoute);


app.use("/api-hotel", hotelRoute);


app.use("/api-user", userRoute);


app.use("/api-order", orderRoute);


app.use("/api-permission", permissionRoute);


app.use("/api-role-permission", rolePermissionRoute);


app.use("/api-news", newsRoute);

app.use('/api-introduce',introduceRoute)

app.use('/api-banner',bannerRoute)

app.use("/api-action-route", actionRoute);


app.post("/:bucket/uploads", async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({ err: true, url: '', error: err.message });
    }
    const { error, url } = await resizeAndToFirebase(
      req.file.path,
      req.params.bucket
    );
    if (error) res.status(500).json({ err: true, url: '', error: error.message  });
    else res.json({ url, err: false });
  });
});


app.post(
  "/ckeditor-upload-img",
  multipartMiddleware,
  async (req, res, next) => {
    try {
      const { error, url } = await uploadFile(req.files.upload.path, 'ckeditor');
      fs.unlink(req.files.upload.path, (err) => console.log(err));
      res.json({
        uploaded: true,
        url
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        uploaded: false,
        error: error.message
      })
    }
  }
);
require('./io/main')


app.use((req, res, next) =>{
  res.status(404).json({ error:"Route not found" });
  next();
})

http.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
