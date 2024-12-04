const { default: axios } = require("axios");
const { GenerateQR } = require("../../utils/qr-generator");
const { UpdateMetaField } = require("../../utils/metafields");

const app = require("express").Router();

app.post("/GetOrderDetails", async (req, res) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${req.body.StoreName}/admin/api/2024-10/orders/${req.body.OrderId}.json`,
      headers: {
        "X-Shopify-Access-Token": process.env.Shopify_Token,
      },
    };
  
    try {
      // Fetch order details
      const orderResponse = await axios.request(config);
      const orderNumber = orderResponse.data.order.order_number;
  
      // Generate QR code
      const qrCodeUrl = await GenerateQR(orderNumber);
  
      // Update metafield
      const metafieldUpdateResponse = await UpdateMetaField(
        req.body.OrderId,
        qrCodeUrl,
        req.body.StoreName
      );
  
      res.json({
        message: "Order details processed successfully",
        metafield: metafieldUpdateResponse,
      });
    } catch (error) {
      console.error("Error processing order details:", error);
      res.status(500).json({ error: "Something went wrong!" });
    }
  });
  

app.post("/UpdateOrderMetafield", (req, res) => {
  console.log(req.body.OrderId);
  const metafieldData = {
    metafield: {
      namespace: "custom", // Replace with your namespace
      key: "test", // Replace with your key
      value: "RahKdfeghrghrg ruwgihwrighwri fegfegumar", // Replace with the value you want to store
      type: "single_line_text_field", // Type of metafield (string, JSON, etc.)
      owner_resource: "order",
      owner_id: req.body.OrderId,
    },
  };

  const url = `https://${req.body.StoreName}/admin/api/2024-10/metafields.json`;

  axios
    .post(url, metafieldData, {
      headers: {
        "X-Shopify-Access-Token": process.env.Shopify_Token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      res.send("ok");
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = app;
