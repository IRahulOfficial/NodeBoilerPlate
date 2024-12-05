const qr = require("qr-image");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

async function GenerateQR(data, path) {
  // let imagepath = data + uuidv4();
  var qr_svg = qr.image(data, { type: "png" });
  qr_svg.pipe(
    require("fs").createWriteStream(`./public/images/${path}.png`)
  );
  return path
  // var svg_string = qr.imageSync('I love QR!', { type: 'png' });
}

module.exports = { GenerateQR };
