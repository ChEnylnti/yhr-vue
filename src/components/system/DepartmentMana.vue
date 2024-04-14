<template>
  <div style="width: 100%">
    <el-tree
    style="max-width: 100%"
    :data="deps"
    :props="defaultProps"
    :expand-on-click-node="false"
    :filter-node-method="filterNode"
    ref="tree"
  >
    <template #default="scope">
        <span class="dropdown custom-tree-node" slot-scope="{node,data}" style="display: flex;justify-content: space-between;width: 100%;">
            <span>{{ scope.data.name }}</span>
            <span>  
                <el-button type="primary"
                            size="small"
                            class="depBtn"
                            @click="showAddDepView(scope.data)"
                >
                添加部门
                </el-button>
                <el-button type="danger"
                            size="small"
                            class="depBtn"
                            @click="handleDelete(scope.data)"
                >
                删除部门
                </el-button>
            </span>
        </span>
    </template>




    </el-tree>
    <el-dialog
    v-model="dialogVisible"
    title="添加部门"
    width="500"
  >
    <div>
        <table>
            <tr>
                <td>上级部门名称:</td>
                <td>
                    <el-input v-model="pname" style="width: 240px" disabled />
                </td>
            </tr>
            <tr>
                <td>部门名称:</td>
                <td>
                    <el-input v-model="dep.name" style="width: 240px" placeholder="输入要添加的部门" />
                </td>
            </tr>
        </table>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>


<script  setup>
import { toRefs,reactive } from 'vue'
import {loadAllDepartment,addDepartment,deleteDepartmentById} from '@/api/system/department'
import { ElTree } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'



const data = reactive({
    deps:[],
    defaultProps: {
        children: 'children',
        label: 'label',
    },
    dep: {
        name: '',
        parentId: -1
    },
    pname: '',
    filterText:'',
    dialogVisible: false
})
const {deps,defaultProps,dep,pname,filterText,dialogVisible} = toRefs(data)

function initDep(){
    dep.value = {
        name: '',
        parentId: -1
    }
    pname.value = ''
}
function showAddDepView(data){
    pname.value = data.name;
    dep.value.parentId = data.id;
    dialogVisible.value = true;
}

function handleAdd(){
    console.log(dep.value);
    addDepartment(dep.value).then(res=>{
        if (res) {
            dialogVisible.value = false;
            departmentList();
        }
    })
}

function departmentList(){
    loadAllDepartment().then(res=>{
        console.log(res.data);
        deps.value = res.data;
        console.log(deps.value);
    })
}

function filterNode(value,data){
    if(!value) return true;
    return data.name.indexOf(value) !==-1;
}

function handleDelete(data){
    ElMessageBox.confirm(
    '此操作将删除【'+data.name+'】部门，是否继续?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        deleteDepartmentById(data.id).then(res=>{
        //刷新
        departmentList();
      })
    // console.log(data.id);

    })
    // .catch(() => {
    //   ElMessage({
    //     type: 'info',
    //     message: '取消删除',
    //   })
    // })
}

departmentList();

</script>
<style scoped>
    .depBtn{
        padding: 2px;
    }
    .dropdown{
        display:flex;
        justify-content: space-between;
        padding: 10px;
        font-size: 15px;
    }
</style>