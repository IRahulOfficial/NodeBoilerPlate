const { default: axios } = require("axios");
const { GenerateQR } = require("../../utils/qr-generator");

const app = require("express").Router();

app.post("/GetOrderDetails", async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://${req.body.StoreName}/admin/api/2024-10/orders/${req.body.OrderId}.json`,
    headers: {
      "X-Shopify-Access-Token": process.env.Shopify_Token,
    },
  };

  axios
    .request(config)
    .then((response) => {
      GenerateQR(response.data.order.order_number).then((response) =>
        res.send(response)
      );
    })
    .catch((error) => {
      console.log(error);
      res.send("Something Went Wrong!");
    });
});

module.exports = app;
