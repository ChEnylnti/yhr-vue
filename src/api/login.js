import request from '@/utils/request';
export function login(hr){
    return request({
        url:'/login',
        method:'post',
        data: hr,
    })
}