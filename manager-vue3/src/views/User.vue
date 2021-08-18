<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form inline :model="user" ref="formRef">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state" >
            <el-option :value="0" label="所有" />
            <el-option :value="1" label="在职" />
            <el-option :value="2" label="离职" />
            <el-option :value="3" label="试用期" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table
        :data="userList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item?.width"
          :formatter="item.formatter"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
        >
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next, jumper"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="用户新增" v-model="showModal">
      <el-form :model="userForm" label-width="100px" ref="dialogForm" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="请输入用户名称" :disabled="action === 'edit'" />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userForm.userEmail" placeholder="请输入邮箱" :disabled="action === 'edit'">
            <template #append>@manager.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state" placeholder="请选择用户状态">
            <el-option :value="1" label="在职" />
            <el-option :value="2" label="离职" />
            <el-option :value="3" label="试用期" />
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select
            v-model="userForm.roleList"
            placeholder="请选择用户系统角色"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="role in roleList"
              :key="role._id"
              :value="role._id"
              :label="role.roleName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader
            v-model="userForm.deptId"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            show-all-levels
            placeholder="请选择用户部门"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw, nextTick } from 'vue'
import Api from '../api'
import { ElMessage } from 'element-plus'
import { FormItem, QueryUserForm, RoleList, DeptList, UserInfo } from '../type/UserType'
import { Column, Action } from '../type/CommonType'
import utils from '../utils/utils'

export default defineComponent({
  setup() {
    const formRef = ref<null | any>(null)
    const dialogForm = ref<null | any>(null)
    // 初始化用户表单对象
    const user = reactive<FormItem>({
      state: 1
    })
    // 初始化用户列表数据
    const userList = ref<UserInfo[]>([])
    // 初始化分页对象
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0
    })
    // 选中用户列表的对象
    const checkedUserId = ref<string[]>([])
    // 动态表格-格式
    const columns = reactive<Column[]>([
      { label: '用户ID', prop: 'userId' },
      { label: '用户名', prop: 'userName' },
      { label: '用户邮箱', prop: 'userEmail' },
      { label: '用户角色', prop: 'role', formatter (row, column, value) {
        return {
          0: '管理员',
          1: '普通用户',
        }[value]
      } },
      { label: '用户状态', prop: 'state',formatter (row, column, value) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[value]
      } },
      { label: '注册时间', prop: 'createTime', width: 180, formatter: (row, column, value) => utils.formateDate(String(value)) },
      { label: '最后登录时间', prop: 'lastLoginTime', width: 180, formatter: (row, column, value) => utils.formateDate(String(value)) },
    ])
    // 添加用户表单对象
    const userForm = reactive<QueryUserForm>({
      state: 3
    })
    // 所有的角色列表
    const roleList = ref<RoleList>([])
    // 所有部门的列表
    const deptList = ref<DeptList>([])
    const action = ref<Action>('add')
    // 定义表单校验规则
    const rules = reactive({
      userName: [
        { required: true, message: '请输入用户名称', trigger: 'blur' },
      ],
      userEmail: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
      ],
      mobile: [
        { pattern: /1[3-9]\d{9}/, message: '请输入正确的手机号格式', trigger: 'blur' },
      ],
      deptId: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' },
      ],
    })
    // 弹框显示对象
    const showModal = ref(false)

    // 获取用户列表
    const getUserList = async () => {
      const params = {
        ...user,
        ...pager
      }
      try {
        const { list, page } = await Api.getUserList(params) as any
        userList.value = list
        pager.total = page.total
      } catch (error) {
        console.error(error)
      }
    }
    // 查询时间，获取用户列表
    const handleQuery = () => {
      getUserList()
    }
    // 重置查询表单
    const handleReset = (form: any) => {
      form?.resetFields()
    }
    // 分页事件处理
    const handleCurrentChange = (current: number) => {
      pager.pageNum = current
      getUserList()
    }
    // 用户单个删除
    const handleDel = async (row: UserInfo) => {
      await Api.userDel({
        userIds: [String(row?.userId)]
      })
      ElMessage.success('删除成功')
      getUserList()
    }
    // 批量删除
    const handlePatchDel = async () => {
      if (checkedUserId.value.length === 0) {
        ElMessage.error('请选择要删除的用户')
        return
      }
      const res: any = await Api.userDel({
        userIds: checkedUserId.value
      })
      if (res.nModified > 0) {
        ElMessage.success('删除成功')
        getUserList()
      } else {
        ElMessage.success('修改失败')
      }
    }
    // 表格多选
    const handleSelectionChange = (list: UserInfo[]) => {
      checkedUserId.value = list.map(item => String(item?.userId))
    }
    // 用户新增
    const handleCreate = () => {
      showModal.value = true
      action.value = 'add'
      handleReset(dialogForm.value)
    }

    const getDeptList = async () => {
      const list: any = await Api.getDeptList()
      deptList.value = list
    }

    const getRoleAllList = async () => {
      const list: any = await Api.getRoleAllList()
      roleList.value = list
    }
    // 用户弹窗管理
    const handleClose = () => {
      showModal.value = false
      handleReset(dialogForm.value)
    }
    // 添加用户表单提交
    const handleSubmit = () => {
      dialogForm.value.validate(async (valid: boolean) => {
        if (valid) {
          const params = toRaw(userForm)
          params.userEmail += '@manager.com'

          const res = await Api.userSubmit({
            ...params,
            action: action.value
          })
          if (res) {
            showModal.value = false
            ElMessage.success('用户创建成功')
            handleReset(dialogForm.value)
            getUserList()
          }
        }
      })
    }
    // 用户编辑
    const handleEdit = (row: UserInfo) => {
      showModal.value = true
      action.value = 'edit'
      nextTick(() => {
        Object.assign(userForm, row)
      })
    }

    onMounted(() => {
      getUserList()
      getDeptList()
      getRoleAllList()
    })

    return {
      formRef,
      dialogForm,
      user,
      userList,
      checkedUserId,
      columns,
      pager,
      userForm,
      showModal,
      rules,
      roleList,
      deptList,
      getRoleAllList,
      getDeptList,
      action,
      handleEdit,
      handleCreate,
      handleQuery,
      handleReset,
      handleDel,
      handlePatchDel,
      handleCurrentChange,
      handleSelectionChange,
      handleClose,
      handleSubmit
    }
  },
})
</script>

