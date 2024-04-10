//前端工程的入口文件,类似于java的main方法
// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
//导入路由文件，按理说应该是 ./router/index.js，但是后缀是.js可以省略，进一步，后缀如果是index也可以省略
import router from './router'
import { menusStore } from './stores/index'
//将App这个组建展示在index.html中的一个id为app的div中
//即项目启动之后看到的都是app的内容
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)


const mStore = menusStore();

//路由导航守卫，就相当于一个监听器，监听页面之间的跳转，从A页面跳转到B页面
//在到达B页面之前会先被导航守卫拦截下来
//from表示原页面，to表示目标页面
router.beforeEach((to,from,next)=>{
    if(to.path == '/'){
        //说明要去登录页面，登录页面可以直接去
        //表示继续去下个页面
        next();
        return;
    }
    if (window.sessionStorage.getItem("hr")) {
        //说明用户已经登录
        //在这里做一个判断，判断当前的跳转是普通的页面点击跳转还是浏览器按F5刷新跳转（按F5的特点就是内存中的数据没有了）
        if(mStore.menus && mStore.menus.length != 0){
            //说明普通页面跳转
            next();
        }else {
            //说明用户点击了浏览器刷新按钮进行跳转
            //此时要先去初始化菜单然后再去跳转
            mStore.initMenus().then(res=>{
                res.forEach(r=>{
                    router.addRoute(r);
                });
                //这个还是去下个页面，但是和无参的相比，这里表示终止当前的跳转，重新开启一次新的跳转
                //这种写法有一个好处，可以确保前面的路由已经动态添加完成了
                next({...to});
            });
        }
    }else{
        //说明用户未登录,去登录
        next('/?redirect='+to.path);
    }
    
    
})


app.mount('#app')
