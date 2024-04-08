<script setup>
  import {reactive,toRefs} from "vue"
  import { ElMessageBox } from "element-plus";
  import { getCurrentInstance} from "vue";
  import { logout } from "@/api/login";
  import { ElMessage } from "element-plus";
  const {proxy} = getCurrentInstance();
  const data = reactive({
    hr: JSON.parse(window.sessionStorage.getItem("hr"))
  })
  const {hr} = toRefs(data);
  function menuHandle(cmd){
    if(cmd==='logout'){
      ElMessageBox.confirm(
        '此操作将注销登录是否继续',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          logout().then(res=>{
            //1.清空登录数据
            window.sessionStorage.removeItem('hr');
            //2.跳转到登录页面
            proxy.$router.replace('/');
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消操作',
          })
        })
        }
  }
</script>

<template>
  <div>
    <el-container>
      <el-header style="background-color: lightblue;align-items: center;display: flex;justify-content: space-between;">
        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif;font-size: 30px;">易人事</div>
        <div>
          <el-dropdown style="cursor: pointer;" @command="menuHandle">
            <span class="el-dropdown-link" style="display: flex;align-items: center;">
              {{hr.name}} 
              <img :src="hr.userface" style="width: 48px;height: 48px;border-radius: 24px;" alt="">
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
                <el-dropdown-item command="settings">设置</el-dropdown-item>
                <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>