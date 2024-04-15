import request from '@/utils/request';

//导航栏的参数用params
export function loadAllHrs(params){
    return request({
        url:'/api/system/hr',
        method:'get',
        params:params
    })
}


export function toShowRole(data){
    return request({
        url:'/api/system/hr/roles',
        method:'post',
        data:data
    })
}

export function toAddRole(data){
    return request({
        url:'/api/system/hr/addRole',
        method:'post',
        data:data
    })
}
export function deleteHrById(id){
    return request({
        url:'/api/system/hr/'+id,
        method:'delete'
    })
}

// 请求体的参数用data
export function updateHr(data){
    return request({
        url:'/api/system/hr',
        method:'put',
        data: data
    })
}

export function toAddHr(data){
    return request({
        url:'/api/system/hr',
        method:'post',
        data: data
    })
}

export function deleteRoleByHrId(data){
    return request({
        url:'/api/system/hr/deleteRole',
        method:'delete',
        data:data
    })
}