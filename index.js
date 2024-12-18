const express = require("express");
const app = express();
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { GenerateQR } = require("./utils/qr-generator");

///----------------------------------------------- MiddelWare Start --------------------------------------------------

app.use(express.json());
app.use(cors());
app.use(express.static('public'))
app.use('/images', express.static('images'));
///----------------------------------------------- MiddelWare End --------------------------------------------------

///------------------------------------------------Api Routers Start ------------------------------------------------------

const authRoute = require("./auth");
const shopify = require("./controller/Shopify/Orders");
const Customer = require("./controller/Shopify/Customer")
///------------------------------------------------Api Routers End ------------------------------------------------------

app.use("/auth", authRoute);
app.use("/shopify", shopify);
app.use("/Customer",Customer);

app.get("/", (req, res) => {
  res.send("Hello World!");
  GenerateQR("sfsfsfsfsfsfsfsfs", "").then(res => console.log(res))
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
