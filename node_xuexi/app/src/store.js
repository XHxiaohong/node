// @ts-nocheck
import Vue from 'vue'
import Vuex from 'vuex'
import CryptoJS from 'crypto-js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {
    encrypt: () => (word, keyStr) => { // 加密
      keyStr = keyStr ? keyStr : 'abcdefgabcdefg1a2';
      var key  = CryptoJS.enc.Utf8.parse(keyStr);
      var srcs = CryptoJS.enc.Utf8.parse(word);
      var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      console.log(word, encrypted, 112)
      return encrypted.toString();
    },
    decrypt: () => (word, keyStr) =>{ // 解密
      keyStr = keyStr ? keyStr : 'abcdefgabcvzxfdefg1a2';
      var key  = CryptoJS.enc.Utf8.parse(keyStr);
      var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB, 
        padding: CryptoJS.pad.Pkcs7
      });

      return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
  }
})
