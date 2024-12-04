const { default: axios } = require("axios");

const app = require("express").Router();

app.post("/GetOrderDetails" , (req ,res ) => {
      console.log(req.body.OrderId)

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://${req.body.StoreName}/admin/api/2024-10/orders/${req.body.OrderId}.json`,
        headers: { 
          'X-Shopify-Access-Token': process.env.Shopify_Token
        }
      };
      
      axios.request(config)
      .then((response) => {
        res.send(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

})

module.exports = app;