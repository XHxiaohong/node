<template>
  <div class="login" id="login">
    <div class="log-box">
      <div>
        <a class="log-title" :class="[sTitle?'sTitle':'']" @click="sTitle=!sTitle">登录</a>
        <a class="log-title" :class="[sTitle?'':'sTitle']" @click="sTitle=!sTitle">注册</a>
      </div>

      <div class="log-input-box">
        <span class="log-input-title">用户</span>
        <input type="text" v-model="form.username" class="log-input" autocomplete="off">
      </div>

      <div class="log-input-box">
        <span class="log-input-title">密码</span>
        <input :type="[ispass1?'password':'text']" v-model="form.password" class="log-input" autocomplete="off">
        <a class="log-ioc" @click="ispass1=!ispass1" :class="[ispass1?'xh-icon-yanjing':'xh-icon-yanjing1']"></a>
      </div>

      <div class="log-input-box" v-show="!sTitle">
        <span class="log-input-title">确认密码</span>
        <input :type="[ispass2?'password':'text']" @change="passFun(pass)" v-model="pass" class="log-input" autocomplete="off">
        <i class="log-ioc" @click="ispass2=!ispass2" :class="[ispass2?'xh-icon-yanjing':'xh-icon-yanjing1']"></i>
      </div>

      <div class="log-input-box" v-show="!sTitle">
        <span class="log-input-title">邮箱</span>
        <input type="email" v-model="form.email" class="log-input" autocomplete="off">
      </div>

      <div class="log-txt-box">
        <a @click="seekPass()" class="log-txt">忘记密码</a>
        <a @click="WXLogin()" class="log-txt">微信登录</a>
      </div>

      <button class="log-but" v-show="sTitle" @click="login()">{{but}}</button>
      <button class="log-but" v-show="!sTitle" @click="register()">{{but}}</button>
    </div>

    <div id="WxLogin" class="WxLogin"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sTitle: true,
      ispass1: true,
      ispass2: true,
      form: {
        username: '',
        password: '',
        email: ''
      },
      pass: ''
    }
  },
  computed: {
    but () {
      return this.sTitle ? '登录' : '注册'
    }
  },
  methods: {
    login () { // 登录
      let url = `/api/login`  
      let obj = {
        username: this.form.username,
        password: this.$store.getters.encrypt(this.form.password)
      }
      this.$http.post(url, obj).then(res=> {
        console.log(res, obj)
        let a = this.$store.getters.decrypt(obj.password)
        console.log('...................')
        console.log(a, obj.password)
      }).catch(err=> {
        console.log(err)
      })
    },
    register () { // 注册
      let url = `/api/register`  
      let obj = {
        email: this.form.email,
        username: this.form.username,
        password: this.$store.getters.encrypt(this.form.password)
      }
      this.$http.post(url, obj).then(res=> {
        console.log(res, obj)        
      }).catch(err=> {
        console.log(err)
      })
    },
    seekPass () { // 忘记密码
      let url = `/api/seekPass?username=${this.form.username}`  

      this.$http.get(url).then(res=> {
        console.log(res)        
      }).catch(err=> {
        console.log(err)
      })
    },
    WXLogin () {

      // 5cf6433d7ea9eb49579342bed3ce8926
      console.log(window.WxLogin)
      var obj = new WxLogin({
        id:"login_container",//div的id
        appid: "wx50eeb3d97fe206d9",
        scope: "",//写死
        redirect_uri:encodeURI("") ,
        state: "",
        style: "black",//二维码黑白风格        
        //href: "https://某个域名下的css文件"
      });

      //this.$router.replace('/WxAuth')
    },
    passFun (val) {
      if (val !== this.form.password) {
        this.pass = ''
        this.form.password = ''
      }
    }
  },
  watch: { }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/login.less');
</style>