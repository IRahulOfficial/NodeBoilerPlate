const app = require("express").Router();

const axios = require("axios");
app.post("/CustomerOrders", (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://${req.body.StoreName}/admin/api/2024-10/customers/${req.body.CustomerId}/orders.json`,
    headers: {
      "X-Shopify-Access-Token": req.body.Shopify_Token,
    },
  };

  axios
    .request(config)
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app