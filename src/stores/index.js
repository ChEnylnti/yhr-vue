import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loadMenus } from '@/api/menus'
import HomeView from '@/views/HomeView.vue'
import router from '@/router/index'
const modules = import.meta.glob('@/views/**/*.vue');
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const menusStore=defineStore('menus',{
  state:()=>({
    //这个变量就用来保存服务端返回的菜单数据，每一次页面跳转的时候，如果menus中有值，说明就是普通的页面点击跳转，如果这个menus为空
    //说明可能是用户按F5进行页面跳转的
      menus:[]
  }),
  actions:{
      clearMenus(){
        this.menus = [];
      },
      initMenus(){
        return new Promise(resolve => {
          loadMenus().then(res =>{
            this.menus=res.data;
            let fmtMenus = formatMenus(res.data);
            // console.log(fmtMenus);
            resolve(fmtMenus);
            // console.log(router.getRoutes());
          }
          )
        })
      },
  }
})
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
