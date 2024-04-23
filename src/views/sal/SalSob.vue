<template>
    <div>
        <div>
            <el-button type="primary" style="margin-top: 10px;" @click="handleAddSalary">
                添加公司账套<el-icon class="el-icon--right">
                    <Plus />
                </el-icon>
            </el-button>
        </div>
        <div style="margin-top: 10px">
            <el-table :data="salaries" border stripe>
                <el-table-column width="130" prop="name" label="账套名称"></el-table-column>
                <el-table-column width="90" prop="basicSalary" label="基本工资"></el-table-column>
                <el-table-column width="90" prop="trafficSalary" label="交通补助"></el-table-column>
                <el-table-column width="90" prop="lunchSalary" label="午餐补助"></el-table-column>
                <el-table-column width="70" prop="bonus" label="奖金"></el-table-column>
                <el-table-column width="120" prop="createDate" label="启用时间"></el-table-column>
                <el-table-column label="养老金" align="center">
                    <el-table-column width="70" prop="pensionPer" label="比率"></el-table-column>
                    <el-table-column width="70" prop="pensionBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="医疗保险" align="center">
                    <el-table-column width="70" prop="medicalPer" label="比率"></el-table-column>
                    <el-table-column width="70" prop="medicalBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="公积金" align="center">
                    <el-table-column width="70" prop="accumulationFundPer" label="比率"></el-table-column>
                    <el-table-column width="70" prop="accumulationFundBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column fixed="right" width="150" label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="dialogTitle" v-model="dialogVisible" width="50%">
            <div style="display: flex;justify-content: space-around;align-items: center">
                <el-steps direction="vertical" :active="activeItemIndex">
                    <el-step :title="itemName" v-for="(itemName, index) in salaryItemName" :key="index"></el-step>
                </el-steps>
                <el-input v-model="salary[title]" :placeholder="'请输入' + salaryItemName[index] + '...'"
                    v-for="(value, title, index) in salary" :key="index" v-show="activeItemIndex == index"
                    style="width: 200px"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="preStep">{{ activeItemIndex == 10 ? '取消' : '上一步' }}</el-button>
                <el-button type="primary" @click="nextStep">{{ activeItemIndex == 10 ? '完成' : '下一步' }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, toRefs, nextTick, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllSalaries, toAddSalary, updateSalary, deleteSalaryById } from '@/api/salary/salary';


const data = reactive({
    salaries: [],
    dialogVisible: false,
    dialogTitle: '添加员工账套',
    activeItemIndex: 0,
    salaryItemName: [
        '基本工资',
        '交通补助',
        '午餐补助',
        '奖金',
        '养老金比率',
        '养老金基数',
        '医疗保险比率',
        '医疗保险基数',
        '公积金比率',
        '公积金基数',
        '账套名称'
    ],
    salary: {
        basicSalary: 0,
        trafficSalary: 0,
        lunchSalary: 0,
        bonus: 0,
        pensionPer: 0,
        pensionBase: 0,
        medicalPer: 0,
        medicalBase: 0,
        accumulationFundPer: 0,
        accumulationFundBase: 0,
        name: ''
    }
})
const { salaries, dialogTitle, dialogVisible, salary, salaryItemName, activeItemIndex } = toRefs(data);

function salaryList() {
    getAllSalaries().then(res => {
        salaries.value = res.data;
    })
}

function handleAddSalary() {
    salary.value = {
        basicSalary: 0,
        trafficSalary: 0,
        lunchSalary: 0,
        bonus: 0,
        pensionPer: 0,
        pensionBase: 0,
        medicalPer: 0,
        medicalBase: 0,
        accumulationFundPer: 0,
        accumulationFundBase: 0,
        name: ''
    }
    dialogTitle.value = '添加员工账套';
    activeItemIndex.value = 0;
    dialogVisible.value = true;
}

function handleEdit(index, row) {
    salary.value = {
        basicSalary: row.basicSalary,
        trafficSalary: row.trafficSalary,
        lunchSalary: row.lunchSalary,
        bonus: row.bonus,
        pensionPer: row.pensionPer,
        pensionBase: row.pensionBase,
        medicalPer: row.medicalPer,
        medicalBase: row.medicalBase,
        accumulationFundPer: row.accumulationFundPer,
        accumulationFundBase: row.accumulationFundBase,
        name: row.name,
        id: row.id,
    }
    console.log(salary.value);
    dialogTitle.value = '修改员工帐套';
    dialogVisible.value = true;
}

function handleDelete(index, row) {
    ElMessageBox.confirm(
        '此操作将删除帐套【' + row.name + '】，是否继续?',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteSalaryById(row.id).then(res => {
                salaryList();
            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

function preStep() {
    if (activeItemIndex.value == 0) {
        return
    } else if (activeItemIndex.value == 10) {
        dialogVisible = false;
        return;
    }
    activeItemIndex.value--;
}

function nextStep() {
    if (activeItemIndex.value == 10) {
        // console.log(activeItemIndex.value);
        // console.log(salary.value.id);
        //最后一步如果有id就是修改，没有id就是添加
        if (salary.value.id) {
            updateSalary(salary.value).then(res => {
                salaryList();
                dialogVisible.value = false;
                activeItemIndex.value = 0;
            })
        } else {
            toAddSalary(salary.value).then(res => {
                salaryList();
                dialogVisible.value = false;
                activeItemIndex.value = 0;
            })
        }
        return;
    }
    activeItemIndex.value++;
}



salaryList();
</script>

<style scoped></style>
