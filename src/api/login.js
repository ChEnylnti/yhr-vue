import request from '@/utils/request';
export function login(hr){
    return request({
        url:'/api/login',
        method:'post',
        data: hr,
    })
}


export function logout(){
    return request({
        url:'/api/logout',
        method:'get',
    })
}