const qr = require("qr-image");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

async function GenerateQR(data, path) {
  let imagepath = uuidv4();
  var qr_svg = qr.image(data, { type: "png" });
  qr_svg.pipe(
    require("fs").createWriteStream(`./images/qrcode/${imagepath}.png`)
  );
  return imagepath
  // var svg_string = qr.imageSync('I love QR!', { type: 'png' });
}

module.exports = { GenerateQR };
