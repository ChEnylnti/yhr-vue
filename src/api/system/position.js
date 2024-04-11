import request from '@/utils/request';
export function loadAllPositions(params){
    return request({
        url:'/api/system/basic/position',
        method:'get',
        params: params
    })
}

