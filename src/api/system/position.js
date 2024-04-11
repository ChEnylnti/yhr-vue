import request from '@/utils/request';
export function loadAllPositions(parms){
    return request({
        url:'/api/system/basic/position',
        method:'get',
        parms: parms
    })
}

