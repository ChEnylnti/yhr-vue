// 在这个文件中对请求和相应进行封装o
// import { axios } from "axios";
 import  axios from "axios";
 import { ElMessage } from "element-plus";
//统一加请求头
axios.defaults.headers['Content-Type']='application/json;charset=utf-8'

const service=axios.create({
    timeout: 10000
});
//请求拦截器，如果是使用jwt或者其他令牌登录的话，那么可以在请求拦截器中统一添加令牌
service.interceptors.request.use()
service.interceptors.response.use(success => {
    //获取服务端返回的状态码，如果服务端没有设置状态码，默认是200
    const code = success.data.status || 200;
    // const code = 500;
    if(code == 200){
        //说明请求成功
        if(success.data.message){
            ElMessage({
                message: success.data.message,
                type: 'success',
                plain: true,
              });
        }
        //返回服务端返回的JSON
        return success.data;
    }else{
        //失败的情况
        ElMessage({
            message: success.data.message,
            type: 'error',
            plain: true,
          });
        return Promise.reject((success.data.message));
    }
},error =>{
    //http状态吗不是200就会进入到这个回调中
    ElMessage({
        message: error,
        type: 'error',
        plain: true,
      });
    return Promise.reject(error.message);
})

export default service;
