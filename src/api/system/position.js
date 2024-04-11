import request from '@/utils/request';

//导航栏的参数用params
export function loadAllPositions(params){
    return request({
        url:'/api/system/basic/position',
        method:'get',
        params: params
    })
}

export function getPositionById(id){
    return request({
        url:'/api/system/basic/position/'+id,
        method:'get'
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

export function addPosition(data){
    return request({
        url:'/api/system/basic/position',
        method:'post',
        data: data
    })
}

export function deletePositionById(id){
    return request({
        url:'/api/system/basic/position/'+id,
        method:'delete'
    })
}