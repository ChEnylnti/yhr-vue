import request from '@/utils/request';
export function loadMenus(hr){
    return request({
        url:'/api/menus',
        method:'get',
    })
}

