import request from '@/utils/request';

//导航栏的参数用params
export function loadAllDepartment(){
    return request({
        url:'/api/system/basic/department',
        method:'get'
    })
}

// export function getPositionById(id){
//     return request({
//         url:'/api/system/basic/position/'+id,
//         method:'get'
//     })
// }

// // 请求体的参数用data
// export function updatePosition(data){
//     return request({
//         url:'/api/system/basic/position',
//         method:'put',
//         data: data
//     })
// }

export function addDepartment(data){
    return request({
        url:'/api/system/basic/department',
        method:'post',
        data: data
    })
}

export function deleteDepartmentById(id){
    return request({
        url:'/api/system/basic/department/'+id,
        method:'delete'
    })
}