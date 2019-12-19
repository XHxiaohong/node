const CryptoJS = require('crypto-js');
const iv = CryptoJS.enc.Hex.parse('ABCDEF1234123412'); // 十六位十六进制数作为密钥偏移量
const key = CryptoJS.enc.Hex.parse('1234123412ABCDEF'); // 十六位十六进制数作为密钥

// 加密
function encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();  //返回的是base64格式的密文
}

// 解密
function decrypt (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv,  mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

  return decryptedStr.toString();
}

module.exports = {
  encrypt,
  decrypt
}

