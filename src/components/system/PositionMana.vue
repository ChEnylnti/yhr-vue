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
  </div>
</template>

<script setup>
import {reactive,toRefs} from 'vue';
import {loadAllPositions} from '@/api/system/position';
const data = reactive({
    positions:[]
})

const {positions} = toRefs(data)


function positionList(){
    loadAllPositions().then(res=>{
        positions.value = res.data;
    })
}

positionList();

</script>
<style scoped>

</style>