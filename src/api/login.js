import request from '@/utils/request';
export function login(hr){
    return request({
        url:'/api/login',
        method:'post',
        data: hr,
    })
}