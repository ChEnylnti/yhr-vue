import request from '@/utils/request';


//导航栏的参数用params
// export function loadAllEmployees(params){
//     return request({
//         url:'/api/employee/basic',
//         method:'get',
//         params:params
//     })
// }

export function getAllEmpWithSalary(params){
    return request({
        url:'/api/personnel/salary',
        method:'get',
        params:params
    })
}

//请求体的参数用data
export function updateEmpSalary(data){
    return request({
        url:'/api/personnel/salary',
        method:'put',
        data: data
    })
}
// export function toAddSalary(data){
//     return request({
//         url:'/api/salary/sob',
//         method:'post',
//         data:data
//     })
// }


// export function deleteSalaryById(id){
//     return request({
//         url:'/api/salary/sob/'+id,
//         method:'delete'
//     })
// }
// export function getAllPoliticsstatus(){
//     return request({
//         url:'/api/employee/basic/politicsstatus',
//         method:'get'
//     })
// }

// export function getAllJobLevels(){
//     return request({
//         url:'/api/employee/basic/joblevels',
//         method:'get'
//     })
// }

// export function getAllPosition(){
//     return request({
//         url:'/api/employee/basic/positions',
//         method:'get'
//     })
// }

// export function getAllDepartments(){
//     return request({
//         url:'/api/employee/basic/deps',
//         method:'get'
//     })
// }

// export function getMaxWorkId(){
//     return request({
//         url:'/api/employee/basic/maxWorkId',
//         method:'get'
//     })
// }

// export function getDepsWithOutChildren(){
//     return request({
//         url:'/api/employee/basic/depsWithOutChildren',
//         method:'get'
//     })
// }





// export function deleteEmpById(id){
//     return request({
//         url:'/api/employee/basic/'+id,
//         method:'delete'
//     })
// }

// export function toShowRole(data){
//     return request({
//         url:'/api/system/hr/roles',
//         method:'post',
//         data:data
//     })
// }






// export function toAddHr(data){
//     return request({
//         url:'/api/system/hr',
//         method:'post',
//         data: data
//     })
// }

// export function deleteRoleByHrId(data){
//     return request({
//         url:'/api/system/hr/deleteRole',
//         method:'delete',
//         data:data
//     })
// }