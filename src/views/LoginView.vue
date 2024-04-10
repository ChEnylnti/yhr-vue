<template>
  <div style="display: flex;justify-content: center;">
    <el-card 
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)"
    :data="tableData"
    style="max-width: 480px;margin-top: 150px;">
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
import { getCurrentInstance} from "vue";

const {proxy} = getCurrentInstance();


const data=reactive({
  hr:{
    username: 'admin',
    password: '123'
  },
  loading:false
})
const {hr,loading} = toRefs(data)

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

function loginHandle(){
  loading.value=true
  login(hr.value).then(data=>{
    loading.value=false
    //请求成功
    //1.先把用户信息保存起来，后面用
    //这里保存的数据格式是key-value形式的，value只能是字符串，不能是json对象
    window.sessionStorage.setItem("hr",JSON.stringify(data.data));
    //获取到请求地址栏的redirect参数
    let redirect = proxy.$router.currentRoute.value.query.redirect;
    //2.跳转到项目首页
    proxy.$router.replace(redirect ? redirect : '/home')
  }).catch(error=>{
    // alert(JSON.stringify(error));
    // alert("ar");
    loading.value=false
  })
}
</script>
<style scoped>

</style>