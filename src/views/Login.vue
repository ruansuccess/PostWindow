<script setup>
import { ref,reactive,toRefs } from 'vue'
import api from '../api/index.js'
const {ipcRenderer} = window.require('electron')

const user = reactive({
  username:"",
  password:""
})

const msgRef = ref("未登录")

const delLogin = (res)=>{
  if(res.code===0){
    localStorage.setItem('uniIdToken',res.token),
    localStorage.setItem('tokenExpired',res.tokenExpired)
    localStorage.setItem('userInfo',JSON.stringify(res.userInfo))
    setTimeout(()=>{
      ipcRenderer.send('close-login-window')
    },1500)
    msgRef.value = "登录成功 1.5秒后关闭"
  }else{
   alert(res.message)
  console.log(res)
  }
}

const login = () => {
  api.login(user).then(res=>{
  delLogin(res.data)
})
}
const register = () => {
  api.register(user).then(res=>{
  delLogin(res.data)
})
}

</script>

<template>
  <div>
    用户名:<input v-model="user.username" title="登录" />
    密码:<input v-model="user.password" title="登录" />
  </div>
  <button @click="login" class="login">登录</button>
  <button @click="register" class="login">注册</button>
  <p>{{msgRef}}</p>
</template>

<style scoped>
.login{
  margin-top: 10px;
}
</style>
