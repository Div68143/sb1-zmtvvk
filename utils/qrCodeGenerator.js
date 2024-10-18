const QRCode = require('qrcode');
const crypto = require('crypto');

const generateQRCode = async (teacherId) => {
  const token = crypto.randomBytes(16).toString('hex');
  const data = JSON.stringify({ teacherId, token, timestamp: Date.now() });
  const qrCodeImage = await QRCode.toDataURL(data);
  return { token, qrCodeImage };
};

module.exports = {
  generateQRCode,
};