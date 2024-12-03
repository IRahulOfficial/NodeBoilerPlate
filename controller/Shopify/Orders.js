const { default: axios } = require("axios");

const app = require("express").Router();

app.post("/GetOrderDetails" , (req ,res ) => {
    

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://rahul8689.myshopify.com/admin/api/2024-10/orders/5990678888688.json',
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