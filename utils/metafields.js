const axios = require("axios");

async function UpdateMetaField(OrderId, path, StoreName) {
  console.log("OrderId:", OrderId, "Path:", path, "StoreName:", StoreName);

  const metafieldData = {
    metafield: {
      namespace: "custom", // Replace with your namespace
      key: "test", // Replace with your key
      value: path, // Replace with the value you want to store
      type: "single_line_text_field", // Type of metafield (string, JSON, etc.)
      owner_resource: "order",
      owner_id: OrderId,
    },
  };

  const url = `https://${StoreName}/admin/api/2024-10/metafields.json`;

  try {
    const response = await axios.post(url, metafieldData, {
      headers: {
        "X-Shopify-Access-Token": process.env.Shopify_Token,
        "Content-Type": "application/json",
      },
    });

    console.log("Metafield created successfully:", response.data);
    return response.data; // Return the API response to the caller
  } catch (error) {
    console.error("Error creating metafield:", error.response?.data || error.message);
    throw error; // Throw the error to be handled by the caller
  }
}

module.exports = { UpdateMetaField };
