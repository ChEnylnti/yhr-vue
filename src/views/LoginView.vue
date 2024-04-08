<template>
  <div>
    <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>登录</span>
      </div>
    </template>
    <div>
      <table>
        <tr>
          <td>用户名</td>
          <td><el-input
    v-model="hr.username"
    style="width: 240px"
    placeholder="请输入用户名..."
    clearable
  /></td>
        </tr>
        <tr>
          <td>密码</td>
          <td><el-input
    v-model="hr.password"
    style="width: 240px"
    type="password"
    placeholder="请输入密码..."
    show-password
  /></td>
        </tr>
      </table>
    </div>
    <template #footer>
      <div style="display: flex;justify-content: center;">
        <el-button>重制</el-button>
        <el-button type="primary" @click="loginHandle">登录</el-button>
      </div>
      
    </template>
  </el-card>
  </div>
</template>

<script setup >
import {reactive,toRefs} from "vue"
import { login } from "@/api/login";
const data=reactive({
  hr:{
    username: 'admin',
    password: '123'
  }
})
const {hr} = toRefs(data)


function loginHandle(){
  login(hr.value).then(data=>{
    //请求成功
    alert(data)
  }).catch(error=>{
    alert("e")
  })
}
</script>
<style scoped>

</style>