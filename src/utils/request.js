// 在这个文件中对请求和相应进行封装o
// import { axios } from "axios";
 import  axios from "axios";
//统一加请求头
axios.defaults.headers['Content-Type']='application/json;charset=utf-8'

const service=axios.create({
    timeout: 10000
});
//请求拦截器，如果是使用jwt或者其他令牌登录的话，那么可以在请求拦截器中统一添加令牌
axios.interceptors.request.use()

axios.interceptors.response.use(success => {
    //获取服务端返回的状态码，如果服务端没有设置状态码，默认是200
    const code = success.data.status || 200;
    if(code == 200){
        //说明请求成功
        //返回服务端返回的JSON
        return success.data;
    }else{
        //失败的情况
        
        return Promise.reject(new Error(success.data.message));
    }
},error =>{
    //http状态吗不是200就会进入到这个回调中
    return Promise.reject(error);
})

export default service;
