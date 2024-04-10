<script setup>
  import {reactive,toRefs} from "vue"
  import { ElMessageBox } from "element-plus";
  import { getCurrentInstance} from "vue";
  import { logout } from "@/api/login";
  import { RouterLink, RouterView } from 'vue-router'
  import { ElMessage } from "element-plus";
  import {
  Document,
  Menu as IconMenu,
  Avatar,
  User,
  Histogram,
  Setting,
} from '@element-plus/icons-vue'
import { loadMenus } from "@/api/menus";
import HomeView from '@/views/HomeView.vue'
import { menusStore } from "@/stores/index";

const mStore = menusStore();

  const {proxy} = getCurrentInstance();
  //加载指定路径下的所有 .vue组件.moudles变量类似于map，其中key就是组件的路径，value则是组件对象,读取不到当前组件
  const modules = import.meta.glob('@/views/**/*.vue');
  const data = reactive({
    hr: JSON.parse(window.sessionStorage.getItem("hr")),
    menus: mStore.menus
  })
  const {hr,menus} = toRefs(data);

  function loadAllMenus(){
    loadMenus().then(res =>{
      menus.value=res.data;
      let fmtMenus = formatMenus(res.data);
      fmtMenus.forEach(m=>{
        proxy.$router.addRoute(m);
      })
    }
    )
  }

  function formatMenus(menus){
    let result = [];
    menus.forEach(menu=>{
        let {path,name,children,component} = menu;
        if(children && children instanceof Array){
          //递归去格式化children
          children = formatMenus(children)
        }
        let formatM = {
          path:path,
          name:name,
          children:children,
          component:loadView(component),
        }
        result.push(formatM);
    })
    return result
  }

  function loadView(viewPath){
    if(viewPath == '/src/views/HomeView.vue'){
      return HomeView;
    }else{
      return modules[viewPath];
    }
  }


  function menuSelect(index,indexPath){
    proxy.$router.push(index)
  }

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
  // loadAllMenus();
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
        <el-aside width="200px">
          <el-menu @select="menuSelect">
            <template v-for="(menu,indexi) in menus">
              <el-sub-menu :index="indexi+''" v-if="!menu.hidden" :key="indexi">
                <template #title>
                  <el-icon><Avatar /></el-icon>
                  <span>{{ menu.name }}</span>
                </template>
                <!-- <el-menu-item-group title="Group One"> -->
                  <el-menu-item :index="child.path" v-for="(child,indexj) in menu.children" :key="indexj"><el-icon><User /></el-icon>{{ child.name }}</el-menu-item>
                <!-- </el-menu-item-group> -->
              </el-sub-menu>
            </template>
      </el-menu>
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
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