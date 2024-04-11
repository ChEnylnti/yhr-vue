import request from '@/utils/request';

//导航栏的参数用params
export function loadAllPositions(params){
    return request({
        url:'/api/system/basic/position',
        method:'get',
        params: params
    })
}

// 请求体的参数用data
export function updatePosition(data){
    return request({
        url:'/api/system/basic/position',
        method:'put',
        data: data
    })
}
