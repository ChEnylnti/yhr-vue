//前端工程的入口文件,类似于java的main方法
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
//导入路由文件，按理说应该是 ./router/index.js，但是后缀是.js可以省略，进一步，后缀如果是index也可以省略
import router from './router'
//将App这个组建展示在index.html中的一个id为app的div中
//即项目启动之后看到的都是app的内容
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
