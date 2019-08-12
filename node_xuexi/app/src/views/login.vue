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
        <input :type="[ispass2?'password':'text']" v-model="pass" class="log-input" autocomplete="off">
        <i class="log-ioc" @click="ispass2=!ispass2" :class="[ispass2?'xh-icon-yanjing':'xh-icon-yanjing1']"></i>
      </div>

      <div class="log-input-box" v-show="!sTitle">
        <span class="log-input-title">邮箱</span>
        <input type="email" v-model="form.email" class="log-input" autocomplete="off">
      </div>

      <div class="log-txt-box"><a class="log-txt">忘记密码</a></div>

      <button class="log-but" @click="login()">{{but}}</button>
    </div>
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
    login () {
      let url = `/api/login`

      
      let obj = {
        username: this.form.username,
       password: this.$store.getters.encrypt(this.form.password)
      }
      console.log(obj)
      this.$http.post(url, obj).then(res=> {
        console.log(res, obj)        
      }).catch(err=> {
        console.log(err)
      })
    },
    register () {

    }
  },
  watch: {
    pass (val) {
      if (val !== this.form.password) {
        this.pass = ''
        this.form.password = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/login.less');
</style>