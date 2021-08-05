<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form inline :model="user" ref="formRef">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-select v-model="user.state" >
            <el-option :value="0" label="所有" />
            <el-option :value="1" label="在职" />
            <el-option :value="2" label="离职" />
            <el-option :value="3" label="试用期" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table
        :data="userList"
        style="width: 100%"
      >
        <el-table-column type="selection" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item?.width"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
        >
          <template #default>
            <el-button size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { UserInfo } from '../store'
import Api from '../api'
// import { _Form } from 'element-plus'

type FormItem = {
  userId?: string;
  userName?: string;
  state?: 0 | 1 | 2 | 3;
}

export default defineComponent({
  setup() {
    const formRef = ref<null | any>(null)
    // 初始化用户表单对象
    const user = reactive<FormItem>({
      state: 0
    })
    // 初始化用户列表数据
    const userList = ref<UserInfo[]>([])
    // 初始化分页对象
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0
    })
    // 邓毅动态表格-格式
    const columns = reactive<
      { label: string, prop: string, width?: string | number; }[]
    >([
      { label: '用户ID', prop: 'userId' },
      { label: '用户名', prop: 'userName' },
      { label: '用户邮箱', prop: 'userEmail' },
      { label: '用户角色', prop: 'role' },
      { label: '用户状态', prop: 'state' },
      { label: '注册时间', prop: 'createTime' },
      { label: '最后登录时间', prop: 'lastLoginTime' },
    ])
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
    const handleReset = () => {
      if (formRef && formRef.value) {
        formRef.value.resetFields()
      }
    }
    // 分页事件处理
    const handleCurrentChange = (current: number) => {
      pager.pageNum = current
      getUserList()
    }

    onMounted(() => {
      getUserList()
    })

    return {
      formRef,
      user,
      userList,
      columns,
      pager,
      handleQuery,
      handleReset,
      handleCurrentChange
    }
  },
})
</script>

