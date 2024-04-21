<template>
    <div>
        <div style="margin-top: 10px;display: flex;justify-content: center;">
            <el-input v-model="keywords" style="width: 400px;margin-right: 10px" placeholder="通过用户名搜索用户..."
                :prefix-icon="Search" />
            <el-button type="primary" :icon="Search" @click="hrList">搜索</el-button>
        </div>
        <el-button type="primary" style="margin-left: 25px;" @click="handleAddHr">
            添加Hr<el-icon class="el-icon--right">
                <Plus />
            </el-icon>
        </el-button>
        <el-dialog v-model="addDialogVisible" title="添加Hr" width="500">
            <div>
                <table>
                    <tr>
                        <td>Hr名称:</td>
                        <td>
                            <el-input v-model="addHr.name" style="width: 240px" placeholder="Please input" />
                        </td>
                    </tr>
                    <tr>
                        <td>Hr账号:</td>
                        <td>
                            <el-input v-model="addHr.username" style="width: 240px" placeholder="Please input" />
                        </td>
                    </tr>
                    <tr>
                        <td>Hr手机号码:</td>
                        <td>
                            <el-input v-model="addHr.phone" style="width: 240px" placeholder="Please input" />
                        </td>
                    </tr>
                    <tr>
                        <td>Hr电话号码:</td>
                        <td>
                            <el-input v-model="addHr.telephone" style="width: 240px" placeholder="Please input" />
                        </td>
                    </tr>
                    <tr>
                        <td>Hr地址:</td>
                        <td>
                            <el-input v-model="addHr.address" style="width: 240px" placeholder="Please input" />
                        </td>
                    </tr>
                    <tr>
                        <td>Hr密码:</td>
                        <td>
                            <el-input type="password" v-model="addHr.password" style="width: 240px"
                                placeholder="Please input" />
                        </td>
                    </tr>
                </table>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="addDialogVisible = false; initAddHr()">取消</el-button>
                    <el-button type="primary" @click="doAddHr()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <div class="hr-container">
            <el-card class="hr-card" v-for="(hr, index) in hrs" :key="index">
                <template #header>
                    <div class="card-header clearfix">
                        <span>{{ hr.name }}</span>
                        <el-button @click="handleDeleteHr(hr)" style="float: right;padding: 3px 0;" type="danger"
                            :icon="Delete" circle />
                    </div>
                </template>
                <div>
                    <div class="img-container">
                        <img :scr="hr.userface" :alt="hr.name" :title="hr.name" class="userface-img" />
                    </div>
                    <div class="userinfo-container">

                        <div>用户名： {{ hr.name }}</div>
                        <div>手机号码： {{ hr.phone }}</div>
                        <div>电话号码： {{ hr.telephone }}</div>
                        <div>地址： {{ hr.address }}</div>
                        <div>用户状态：
                            <el-switch v-model="hr.enabled" inline-prompt active-text="启用" inactive-text="禁用"
                                @change="changeEnabled(hr)" />
                        </div>
                        <div>用户角色：
                            <el-dialog v-model="roleDialogVisible" title="添加role" width="500">
                                <div>
                                    <el-button style="margin-top: -4px;" v-for="(role, index) in roles" :key="index"
                                        class="button-new-tag" size="small" @click="addNewRole(role.id, hr.id)">
                                        {{ role.nameZh }}
                                    </el-button>
                                </div>
                                <template #footer>
                                    <div class="dialog-footer">
                                        <el-button @click="roleDialogVisible = false; initAddHr()">取消</el-button>
                                        <el-button type="primary" @click="doAddHr()">
                                            确认
                                        </el-button>
                                    </div>
                                </template>
                            </el-dialog>
                            <el-tag style="margin-right: 4px;margin-bottom: 4px;" v-for="(role, index) in hr.roles"
                                :key="indexj" closable :disable-transitions="false"
                                @close="handleDeleteRole(hr.id, role.id)">
                                {{ role.nameZh }}
                            </el-tag>
                            <el-button style="margin-top: -4px;" class="button-new-tag" size="small"
                                @click="showRoleList(hr.roles, hr.id)">
                                + 新角色
                            </el-button>
                            <el-dialog v-model="roleDialogVisible" title="添加role" width="500">
                                <div>
                                    <el-button style="margin-top: -4px;" v-for="(role, index) in roles" :key="index"
                                        class="button-new-tag" size="small" @click="addNewRole(role.id)">
                                        {{ role.nameZh }}
                                    </el-button>
                                </div>
                                <template #footer>
                                    <div class="dialog-footer">
                                        <el-button @click="roleDialogVisible = false; initAddHr()">取消</el-button>
                                        <el-button type="primary" @click="doAddHr()">
                                            确认
                                        </el-button>
                                    </div>
                                </template>
                            </el-dialog>
                        </div>
                    </div>
                </div>
                <template #footer>
                    备注：{{ hr.remark }}
                </template>

            </el-card>

        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, nextTick } from 'vue';
import { loadAllHrs, toAddHr, updateHr, toShowRole, toAddRole, deleteRoleByHrId, deleteHrById } from '@/api/system/hr';
import { Delete } from '@element-plus/icons-vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const data = reactive({
    keywords: '',
    hrs: [],
    roles: [],
    addDialogVisible: false,
    roleDialogVisible: false,
    addHr: {
        name: '',
        username: '',
        phone: '',
        telephone: '',
        address: '',
        password: '',
        enabled: true
    },
    upHr: {
        id: -1,
        name: '',
        username: '',
        enabled: true
    },
    hrId: -1
})

const { keywords, hrs, roles, addDialogVisible, roleDialogVisible, addHr, upHr, hrId } = toRefs(data)


function hrList() {
    loadAllHrs({ keywords: keywords.value }).then(res => {
        // console.log(res.data);
        hrs.value = res.data;
    })
}



function handleAddHr() {
    addDialogVisible.value = true;
}

function doAddHr() {
    toAddHr(addHr.value).then(res => {
        addDialogVisible.value = false;
        hrList();
        initAddHr();
    })
}
function changeEnabled(data) {
    // console.log(data.enabled);
    upHr.value.id = data.id;
    upHr.value.enabled = data.enabled;
    upHr.value.username = data.username;
    upHr.value.name = data.name;
    updateHr(upHr.value).then(res => {
        upHr.value.id = -1;
        upHr.value.enabled = true;
        upHr.value.username = '';
        upHr.value.name = '';
        hrList();
    })
    // hrList();
}

function showRoleList(data, id) {
    // console.log(JSON.stringify(data));
    hrId.value = id;
    toShowRole(JSON.stringify(data)).then(res => {
        roles.value = res.data;
        console.log(roles.value);
        roleDialogVisible.value = true;
    })
}
function addNewRole(rId) {
    // console.log( rId, hrId.value );
    let hId = hrId.value
    toAddRole(JSON.stringify({ rId, hId })).then(res => {
        roleDialogVisible.value = false;
        hrId.value = -1;
        hrList();
    })

}

function handleDeleteRole(hId, rId) {
    deleteRoleByHrId(JSON.stringify({ hId, rId })).then(res => {
        hrList();
    })
}

function handleDeleteHr(hr) {

    ElMessageBox.confirm(
        '此操作将删除hr【' + hr.name + '】，是否继续?',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleteHrById(hr.id).then(res => {
                hrList();
            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

function initAddHr() {
    addHr.value.name = '';
    addHr.value.username = '';
    addHr.value.phone = '';
    addHr.value.telephone = '';
    addHr.value.address = '';
    addHr.value.password = '';
    addHr.value.enabled = true;
}
hrList();
</script>

<style scoped>
.userinfo-container div {
    font-size: 12px;
    color: #409eff;
}

.userinfo-container {
    margin-top: 20px;
}

.img-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.userface-img {
    width: 72px;
    height: 72px;
    border-radius: 72px;
}

.hr-container {
    height: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.hr-card {
    width: 350px;
    margin-bottom: 20px;
}
</style>
