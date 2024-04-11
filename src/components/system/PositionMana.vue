<template>
  <div>
    <el-table :data="positions" border stripe  style="width: 100%">
    <el-table-column prop="id" label="编号" width="180" />
    <el-table-column prop="name" label="职位名称" width="180" />
    <el-table-column prop="createDate" label="创建日期" />
    <el-table-column prop="enabled" label="是否启用" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="display: flex;justify-content: flex-end;">
    <el-pagination background 
     @change="paginationChange"
    :page-sizes="[5,10,20,30,50,100]" 
    layout="sizes,prev, pager, next, jumper, ->, total" :total="total" />
  </div>
  </div>
</template>

<script setup>
import {reactive,toRefs} from 'vue';
import {loadAllPositions} from '@/api/system/position';
const data = reactive({
    positions:[],
    total: 0,
    page: 1,
    size: 10
})

const {positions,total,page,size} = toRefs(data)

function paginationChange(newPage,newSize){
    page.value = newPage;
    size.value = newSize;
    positionList();
}

function positionList(){
    loadAllPositions({page:page.value,size:size.value}).then(res=>{
        positions.value = res.data;
        total.value = res.total;
    })
}

positionList();

</script>
<style scoped>

</style>