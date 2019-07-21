var CryptoJS = require("crypto-js");

getResult = rbody =>
  rbody.task == 1
    ? performEncryption(rbody.data, rbody.algo, rbody.key)
    : performDecryption(encodeData(rbody.data), rbody.algo, rbody.key);

performEncryption = (data, algo, key) => {
    switch(algo.toString()) {
        case "1": return CryptoJS.AES.encrypt(data, key).toString();
        case "2": return CryptoJS.DES.encrypt(data, key).toString();
        case "3": return CryptoJS.TripleDES.encrypt(data, key).toString();
        case "4": return CryptoJS.RC4.encrypt(data, key).toString();
        case "5": return CryptoJS.Rabbit.encrypt(data, key).toString();
    }
}

performDecryption = (data, algo, key) => {
    switch(algo.toString()) {
        case "1": return CryptoJS.AES.decrypt(data.toString(), key).toString(CryptoJS.enc.Utf8);
        case "2": return CryptoJS.DES.decrypt(data.toString(), key).toString(CryptoJS.enc.Utf8);
        case "3": return CryptoJS.TripleDES.decrypt(data.toString(), key).toString(CryptoJS.enc.Utf8);
        case "4": return CryptoJS.RC4.decrypt(data.toString(), key).toString(CryptoJS.enc.Utf8);
        case "5": return CryptoJS.Rabbit.decrypt(data.toString(), key).toString(CryptoJS.enc.Utf8);
    }
}

encodeData = data => data.replace(/\s/g, "+");

module.exports.getResult = this.getResult;
