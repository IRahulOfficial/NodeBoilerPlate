const express = require('express')
const app = express()
var cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cors())
//Api Routers
const authRoute = require("./auth")
const shopify = require("./controller/Shopify/Orders")
app.use ("/auth",authRoute)
app.use("/shopify",shopify)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})