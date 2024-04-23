<template>
    <div>
        <div style="margin-top: 10px;display: flex;justify-content: center;">
            <el-input v-model="keywords" style="width: 400px;margin-right: 10px" placeholder="通过员工名称搜索员工..."
                :prefix-icon="Search" />
            <el-button type="primary" :icon="Search" @click="ESList">搜索</el-button>
        </div>
        <div style="margin-top: 10px;">
            <el-table :data="emps" border stripe size="mini">
                <el-table-column prop="name" label="姓名" fixed width="120" align="left"></el-table-column>
                <el-table-column width="90" prop="salary.basicSalary" label="基本工资"></el-table-column>
                <el-table-column width="90" prop="salary.trafficSalary" label="交通补助"></el-table-column>
                <el-table-column width="90" prop="salary.lunchSalary" label="午餐补助"></el-table-column>
                <el-table-column width="70" prop="salary.bonus" label="奖金"></el-table-column>
                <el-table-column width="120" prop="salary.createDate" label="启用时间"></el-table-column>
                <el-table-column label="养老金" align="center">
                    <el-table-column width="70" prop="salary.pensionPer" label="比率"></el-table-column>
                    <el-table-column width="70" prop="salary.pensionBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="医疗保险" align="center">
                    <el-table-column width="70" prop="salary.medicalPer" label="比率"></el-table-column>
                    <el-table-column width="70" prop="salary.medicalBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="公积金" align="center">
                    <el-table-column width="70" prop="salary.accumulationFundPer" label="比率"></el-table-column>
                    <el-table-column width="70" prop="salary.accumulationFundBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column fixed="right" width="200" label="操作">
                    <template #default="scope">
                        <el-select v-model="scope.row.salary.name" placeholder="Select" size="default"
                            style="width: 170px">
                            <el-option v-for="item in salaries" :key="item.id" :label="item.name" :value="item.id"
                                @click="changeEmpSalary(scope.row.id, item.id)" />
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end;margin-top: 10px;">
                <el-pagination background @change="paginationChange" :page-sizes="[5, 10, 20, 30, 50, 100]"
                    layout="sizes,prev, pager, next, jumper, ->, total" :total="total" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, nextTick, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllEmpWithSalary, updateEmpSalary } from '@/api/personnel/personnel';
import { getAllSalaries } from '@/api/salary/salary';

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

const data = reactive({
    page: 1,
    size: 10,
    total: 0,
    keywords: '',
    emps: [],
    salaries: [],
    noSalary: '无'
})
const { emps, salaries, page, size, keywords, total } = toRefs(data);

function changeEmpSalary(eId, sId) {
    console.log(eId, sId);
    updateEmpSalary({ eId: eId, sId: sId }).then(res => {
        ESList();
    })

}


function ESList() {
    getAllEmpWithSalary({ page: page.value, size: size.value, name: keywords.value }).then(res => {
        emps.value = res.data;
        total.value = res.total;
        console.log(res.data);
    })
}

function initSalary() {
    getAllSalaries().then(res => {
        salaries.value = res.data;
    })
}

function paginationChange(newPage, newSize) {
    page.value = newPage;
    size.value = newSize;
    ESList();
}

ESList();
initSalary();
</script>

<style scoped></style>