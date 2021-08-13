<template>
  <div class="dept-manage">
    <div class="query-form">
      <el-form :inline="true" ref="form" :model="queryForm">
        <el-form-item label="部门名称">
          <el-input placeholder="请输入部门名称" v-model="queryForm.deptName" />
        </el-form-item>
        <el-form-item>
          <el-button @click="getDeptList" type="primary">查询</el-button>
          <el-button @click="handleReset(queryForm)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="actio">
        <el-button type="primary" @click="handleOpen">创建</el-button>
      </div>
      <el-table
        :data="deptList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
        stripe
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          v-bind="item"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="action === 'add' ? '创建部门' : '编辑部门'"
      v-model="showModal"
    >
      <el-form
        ref="dialogForm"
        :model="deptForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader
            placeholder="请选择上级部门"
            v-model="deptForm.parentId"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            :options="deptList"
            :show-all-levels="true"
          />
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input placeholder="请输入部门名称" v-model="deptForm.deptName" />
        </el-form-item>
        <el-form-item label="负责人" prop="user">
          <el-select
            placeholder="请选择部门负责人"
            v-model="deptForm.user"
            @change="handleUser"
          >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人邮箱" prop="userEmail">
          <el-input
            placeholder="请输入负责人邮箱"
            v-model="deptForm.userEmail"
            disabled
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-butto @click="handleClose">取消</el-butto>
          <el-butto @click="handleSubmit" type="primary">确定</el-butto>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { QueryDeptForm, DeptColumn } from '../type/DeptType'
import { Column, Action } from '../type/CommonType'
import { UserInfo } from '../type/UserType'

export default defineComponent({
  setup() {
    const form = ref<any>()
    const dialogForm = ref<any>()
    const queryForm = reactive<QueryDeptForm>({
      deptName: ''
    })
    const deptList = ref<DeptColumn[]>([])
    const columns = reactive<Column[]>([
      { label: '部门名称', prop: 'deptName' },
      { label: '负责人', prop: 'userName' },
      { label: '更新时间', prop: 'updateTime' },
      { label: '创建时间', prop: 'createTime' },
    ])
    const action = ref<Action>('add')
    const showModal = ref(false)
    const deptForm = reactive<Partial<DeptColumn>>({})
    const rules = reactive({
      parentId: [
        { required: true, message: '请选择上级部门', trigger: 'blur' },
      ],
      deptName: [
        { required: true, message: '请输入部门名称', trigger: 'blur' },
      ],
      user: [
        { required: true, message: '请选择负责人', trigger: 'blur' }
      ]
    })
    const userList = ref<Partial<UserInfo>[]>([])

    const getDeptList = () => {}
    
    const handleReset = (form: any) => {
      form?.resetFields()
    }

    const handleOpen = () => {}

    const handleEdit = (row: DeptColumn) => {}

    const handleDel = (_id: string) => {}

    const handleUser = () => {}

    const handleClose = () => {}

    const handleSubmit = () => {}

    return {
      form,
      dialogForm,
      queryForm,
      deptList,
      columns,
      action,
      showModal,
      deptForm,
      rules,
      userList,
      getDeptList,
      handleReset,
      handleOpen,
      handleEdit,
      handleDel,
      handleUser,
      handleClose,
      handleSubmit
    }
  },
})
</script>

