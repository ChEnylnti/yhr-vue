<template>
  <div>
    <el-tabs v-model="activeName">
    <el-tab-pane label="部门管理" name="department">
      <department-mana></department-mana>
    </el-tab-pane>
    <el-tab-pane label="职位管理" name="PositionMana">
      <position-mana></position-mana>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script setup>

import {reactive,toRefs} from "vue"
import PositionMana from '@/components/system/PositionMana.vue'
import DepartmentMana from '@/components/system/DepartmentMana.vue'
const data=reactive({
  activeName: ''
})

const {activeName} = toRefs(data);

</script>

<style scoped>

</style>
