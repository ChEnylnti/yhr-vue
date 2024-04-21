<template>
    <div>
        <div>
            <div style="margin-top: 10px;display: flex;justify-content: center;">
                <el-input v-model="empForSearch.name" style="width: 400px;margin-right: 10px" placeholder="通过员工名称搜索员工..."
                    :prefix-icon="Search" />
                <el-button type="primary" :icon="Search" @click="empList">搜索</el-button>
            </div>
        </div>
        <div>
            <el-button type="primary" style="margin-left: 25px;" @click="handleAddEmp">
                添加员工<el-icon class="el-icon--right">
                    <Plus />
                </el-icon>
            </el-button>
        </div>
        <div style="margin-top: 10px;">
            <el-table :data="emps" stripe style="width: 100%" v-loading="loading" element-loading-text="正在加载"
                :element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50"
                element-loading-background="rgba(122, 122, 122, 0.8)">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="name" fixed align="left" label="姓名" width="90" />
                <el-table-column prop="workId" align="left" label="工号" width="85" />
                <el-table-column prop="gender" align="left" label="性别" width="85" />
                <el-table-column prop="birthday" align="left" label="出生日期" width="95" />
                <el-table-column prop="idCard" align="left" label="身份证号码" width="150" />
                <el-table-column prop="wedlock" align="left" label="婚姻状况" width="80" />
                <el-table-column prop="nation.name" align="left" label="民族" width="85" />
                <el-table-column prop="nativePlace" align="left" label="籍贯" width="80" />
                <el-table-column prop="politicsstatus.name" align="left" label="政治面貌" />
                <el-table-column prop="email" align="left" label="电子邮件" width="100" />
                <el-table-column prop="phone" align="left" label="电话号码" width="100" />
                <el-table-column prop="address" align="left" label="联系地址" width="220" />
                <el-table-column prop="department.name" align="left" label="所属部门" width="100" />
                <el-table-column prop="position.name" align="left" label="职位" width="100" />
                <el-table-column prop="joblevel.name" align="left" label="职称" width="100" />
                <el-table-column prop="engageForm" align="left" label="聘用形式" width="100" />
                <el-table-column prop="tipTopDegree" align="left" label="最高学历" width="80" />
                <el-table-column prop="specialty" align="left" label="专业" width="150" />
                <el-table-column prop="school" align="left" label="毕业院校" width="150" />
                <el-table-column prop="beginDate" align="left" label="入职日期" width="95" />
                <el-table-column prop="conversionTime" align="left" label="转正日期" width="95" />
                <el-table-column prop="beginContract" align="left" label="合同起始日期" width="110" />
                <el-table-column prop="endContract" align="left" label="合同截止日期" width="110" />
                <el-table-column align="left" label="合同期限" width="100">
                    <template #default="scope">
                        <el-tag>{{ scope.row.contractTerm }}</el-tag>
                        年
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="150" label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end;margin-top: 10px;">
                <el-pagination background @change="paginationChange" :page-sizes="[5, 10, 20, 30, 50, 100]"
                    layout="sizes,prev, pager, next, jumper, ->, total" :total="total" />
            </div>
        </div>
        <el-dialog @close="empList" :title="title" v-model="addDialogVisible" width="80%">
            <div>
                <el-form :model="emp" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="name">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.name"
                                    placeholder="请输入员工姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别:" prop="gender">
                                <el-radio-group v-model="emp.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="出生日期:" prop="birthday">
                                <el-date-picker v-model="emp.birthday" size="mini" type="date" value-format="YYYY-MM-DD" 
                                    style="width: 150px" placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="政治面貌:" prop="politicId">
                                <el-select v-model="emp.politicId" placeholder="政治面貌" size="mini" style="width: 200px">
                                    <el-option v-for="item in politicsstatus" :key="item.id" :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族:" prop="nationId">
                                <el-select v-model="emp.nationId" placeholder="民族" size="mini" style="width: 150px">
                                    <el-option v-for="item in nations" :key="item.id" :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="籍贯:" prop="nativePlace">
                                <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="emp.nativePlace" placeholder="请输入籍贯"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-message"
                                    v-model="emp.email" placeholder="请输入电子邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系地址:" prop="address">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                    v-model="emp.address" placeholder="请输入联系地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位:" prop="posId">
                                <el-select v-model="emp.posId" placeholder="职位" size="mini" style="width: 150px">
                                    <el-option v-for="item in positions" :key="item.id" :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="职称:" prop="jobLevelId">
                                <el-select v-model="emp.jobLevelId" placeholder="职称" size="mini" style="width: 150px">
                                    <el-option v-for="item in joblevels" :key="item.id" :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属部门:" prop="departmentId">
                                <el-popover placement="right" :width="400" trigger="click">
                                    <template #reference>
                                        <el-button style="margin-right: 16px;width: 150px;">{{ inputDepName
                                            }}</el-button>
                                    </template>
                                    <el-tree style="max-width: 100%" :data="allDeps" :props="defaultProps"
                                        :expand-on-click-node="false" @node-click="handleNodeClick"
                                        :filter-node-method="filterNode" ref="tree">
                                        <template #default="scope">
                                            <span class="dropdown custom-tree-node" slot-scope="{node,data}"
                                                style="display: flex;justify-content: space-between;width: 100%;">
                                                <span>{{ scope.data.name }}</span>
                                            </span>
                                        </template>
                                    </el-tree>
                                </el-popover>

                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="电话号码:" prop="phone">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                                    v-model="emp.phone" placeholder="电话号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号:" prop="workId">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="emp.workId" placeholder="工号" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="学历:" prop="tipTopDegree">
                                <el-select v-model="emp.tipTopDegree" placeholder="学历" size="mini" style="width: 150px">
                                    <el-option v-for="item in tipTopDegrees" :key="item.id" :label="item.name" :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="毕业院校:" prop="school">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="emp.school" placeholder="毕业院校名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="专业名称:" prop="specialty">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                    v-model="emp.specialty" placeholder="请输入专业名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期:" prop="beginDate">
                                <el-date-picker v-model="emp.beginDate" size="mini" type="date" format="YYYY-MM-DD"
                                    value-format="YYYY-MM-DD" style="width: 130px" placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="转正日期:" prop="conversionTime">
                                <el-date-picker v-model="emp.conversionTime" size="mini" type="date" format="YYYY-MM-DD"
                                value-format="YYYY-MM-DD" style="width: 130px" placeholder="转正日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期:" prop="beginContract">
                                <el-date-picker v-model="emp.beginContract" size="mini" type="date" format="YYYY-MM-DD"
                                value-format="YYYY-MM-DD" style="width: 130px" placeholder="合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同终止日期:" prop="endContract">
                                <el-date-picker v-model="emp.endContract" size="mini" type="date" format="YYYY-MM-DD"
                                value-format="YYYY-MM-DD" style="width: 150px" placeholder="合同终止日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号码:" prop="idCard">
                                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                    v-model="emp.idCard" placeholder="请输入身份证号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="聘用形式:" prop="engageForm">
                                <el-radio-group v-model="emp.engageForm">
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="婚姻状况:" prop="wedlock">
                                <el-radio-group v-model="emp.wedlock">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false;empList">取 消</el-button>
                <el-button type="primary" @click="doAddEmp">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, toRefs, nextTick, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { loadAllEmployees, getAllNations, getAllPoliticsstatus, getAllJobLevels, getAllPosition, getAllDepartments, getMaxWorkId, updateEmp, toAddEmp,getDepsWithOutChildren,deleteEmpById } from '@/api/employee/employee';
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
    emps: [],
    keywords: '',
    total: 0,
    page: 1,
    size: 10,
    addDialogVisible: false,
    allDeps: [],
    nations: [],
    joblevels: [],
    politicsstatus: [],
    positions: [],
    tipTopDegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
    rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        birthday: [{ required: true, message: '请输入出生日期', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }, {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '身份证号码格式不正确',
            trigger: 'blur'
        }],
        wedlock: [{ required: true, message: '请输入婚姻状况', trigger: 'blur' }],
        nationId: [{ required: true, message: '请输入您组', trigger: 'blur' }],
        nativePlace: [{ required: true, message: '请输入籍贯', trigger: 'blur' }],
        politicId: [{ required: true, message: '请输入政治面貌', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
        }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        address: [{ required: true, message: '请输入员工地址', trigger: 'blur' }],
        departmentId: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        jobLevelId: [{ required: true, message: '请输入职称', trigger: 'blur' }],
        posId: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        engageForm: [{ required: true, message: '请输入聘用形式', trigger: 'blur' }],
        tipTopDegree: [{ required: true, message: '请输入学历', trigger: 'blur' }],
        specialty: [{ required: true, message: '请输入专业', trigger: 'blur' }],
        school: [{ required: true, message: '请输入毕业院校', trigger: 'blur' }],
        beginDate: [{ required: true, message: '请输入入职日期', trigger: 'blur' }],
        workState: [{ required: true, message: '请输入工作状态', trigger: 'blur' }],
        workId: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        contractTerm: [{ required: true, message: '请输入合同期限', trigger: 'blur' }],
        conversionTime: [{ required: true, message: '请输入转正日期', trigger: 'blur' }],
        notWorkDate: [{ required: true, message: '请输入离职日期', trigger: 'blur' }],
        beginContract: [{ required: true, message: '请输入合同起始日期', trigger: 'blur' }],
        endContract: [{ required: true, message: '请输入合同结束日期', trigger: 'blur' }],
        workAge: [{ required: true, message: '请输入工龄', trigger: 'blur' }],
    },
    emp: {
        id: '',
        name: "",
        gender: "",
        birthday: "",
        idCard: "",
        wedlock: "",
        nationId: 1,
        nativePlace: "",
        politicId: 13,
        email: "",
        phone: "",
        address: "",
        departmentId: null,
        jobLevelId: 9,
        posId: 29,
        engageForm: "",
        tipTopDegree: "",
        specialty: "",
        school: "",
        beginDate: "",
        workId: "",
        contractTerm: 2,
        conversionTime: "",
        notWorkDate: null,
        beginContract: "",
        endContract: "",
        workAge: null,
    },
    title: '',
    inputDepName: 'w',
    defaultProps: {
        children: "children",
        label: "name",
    },
    popVisible: true,
    depsWithOutChildren:[],
    empForSearch:{
        id: '',
        name: "",
        gender: "",
        birthday: "",
        idCard: "",
        wedlock: "",
        nationId: 1,
        nativePlace: "",
        politicId: 13,
        email: "",
        phone: "",
        address: "",
        departmentId: null,
        jobLevelId: 9,
        posId: 29,
        engageForm: "",
        tipTopDegree: "",
        specialty: "",
        school: "",
        beginDate: "",
        workId: "",
        contractTerm: 2,
        conversionTime: "",
        notWorkDate: null,
        beginContract: "",
        endContract: "",
        workAge: null,
    }
})

const { emps, keywords, total, page, size, emp, rules, addDialogVisible, allDeps, nations, joblevels, politicsstatus, positions, tipTopDegrees, title, inputDepName, popVisible,depsWithOutChildren,empForSearch } = toRefs(data)



function handleEdit(index, row) {
    addDialogVisible.value = true;
    title.value = "编辑员工信息";
    // console.log(row.beginDate);
    emp.value = row;
    depsWithOutChildren.value.forEach(function(item,index,arr){
        if (item.id == emp.value.departmentId) {
            inputDepName.value = item.name;
        }
    })
}



function handleAddEmp() {
    emptyEmp();
    addDialogVisible.value = true;
    title.value = "添加员工";
    getWorkId();
}

function handleDelete(index,row){
    ElMessageBox.confirm(
        '此操作将删除员工【' + row.name + '】，是否继续?',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteEmpById(row.id).then(res => {
                empList();
            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

function getWorkId() {
    getMaxWorkId().then(res => {
        emp.value.workId = res.data;
    })
}



function paginationChange(newPage, newSize) {
    page.value = newPage;
    size.value = newSize;
    empList();
}


function empList() {
    loadAllEmployees({ page: page.value, size: size.value,name: empForSearch.value.name}).then(res => {
        // console.log(res.data);
        emps.value = res.data;
        total.value = res.total;
    })
}

function doAddEmp() {
    // console.log(emp.value);
    //有id就是修改
    if (emp.value.id) {
        updateEmp(emp.value).then(res => {
            addDialogVisible.value = false;
            empList();
            emptyEmp();
        })

    } else {
        toAddEmp(emp.value).then(res => {
            addDialogVisible.value = false;
            empList();
            emptyEmp();
        })
        
    }
}
// const tree = ref()
function handleNodeClick(data) {
    inputDepName.value = data.name;
    emp.value.departmentId = data.id;

}

function initData() {
    if (!window.sessionStorage.getItem("nations")) {
        getAllNations().then((resp) => {
            if (resp) {
                nations.value = resp;
                window.sessionStorage.setItem("nations", JSON.stringify(resp));
            }
        });
    } else {
        nations.value = JSON.parse(window.sessionStorage.getItem("nations"));
    }
    if (!window.sessionStorage.getItem("joblevels")) {
        getAllJobLevels().then((resp) => {
            if (resp) {
                joblevels.value = resp;
                window.sessionStorage.setItem("joblevels", JSON.stringify(resp));
            }
        });
    } else {
        joblevels.value = JSON.parse(window.sessionStorage.getItem("joblevels"));
    }
    if (!window.sessionStorage.getItem("politicsstatus")) {
        getAllPoliticsstatus().then((resp) => {
            if (resp) {
                politicsstatus.value = resp;
                window.sessionStorage.setItem(
                    "politicsstatus",
                    JSON.stringify(resp)
                );
            }
        });
    } else {
        politicsstatus.value = JSON.parse(
            window.sessionStorage.getItem("politicsstatus")
        );
    }
    if (!window.sessionStorage.getItem("deps")) {
        getAllDepartments().then((resp) => {
            if (resp) {
                allDeps.value = resp;
                window.sessionStorage.setItem("deps", JSON.stringify(resp));
            }
        });
    } else {
        allDeps.value = JSON.parse(window.sessionStorage.getItem("deps"));
    }
    if (!window.sessionStorage.getItem("positions")) {
        getAllPosition().then((resp) => {
            if (resp) {
                positions.value = resp;
                window.sessionStorage.setItem("positions", JSON.stringify(resp));
            }
        });
    } else {
        positions.value = JSON.parse(window.sessionStorage.getItem("positions"));
    }
    if (!window.sessionStorage.getItem("depsWithOutChildren")) {
        getDepsWithOutChildren().then((resp) => {
            if (resp) {
                depsWithOutChildren.value = resp;
                window.sessionStorage.setItem("depsWithOutChildren", JSON.stringify(resp));
            }
        });
    } else {
        depsWithOutChildren.value = JSON.parse(window.sessionStorage.getItem("depsWithOutChildren"));
    }
}

function emptyEmp() {
    emp.value = {
        id: '',
        name: "cyt",
        gender: "",
        birthday: "",
        idCard: "430327200000200011",
        wedlock: "",
        nationId: 1,
        nativePlace: "",
        politicId: 13,
        email: "123@123.com",
        phone: "",
        address: "",
        departmentId: null,
        jobLevelId: 9,
        posId: 29,
        engageForm: "",
        tipTopDegree: "",
        specialty: "",
        school: "",
        beginDate: "",
        workId: "",
        contractTerm: 2,
        conversionTime: "",
        notWorkDate: null,
        beginContract: "",
        endContract: "",
        workAge: null,
    };
    inputDepName.value = "";
}

empList();
initData();
</script>

<style scoped>
.slide-fade-enter-active {
    transition: all .8s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
