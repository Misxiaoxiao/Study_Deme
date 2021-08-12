<template>
  <div class="role-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="handleReset(form)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd">创建</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        />
        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row._id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="用户新增" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="roleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            v-model="roleForm.remark"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 认</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 权限弹窗 -->
    <el-dialog title="权限设置" v-model="showPermission">
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="选择权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="_id"
            default-expand-all
            :prop="{ label: 'menuName' }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlePermissionClose">取 消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, nextTick, onMounted } from 'vue'
import { MenuItem } from '../type/MenuType'
import { RoleQueryForm, RoleColumns } from '../type/RoleType'
import { Column, Action } from '../type/CommonType'
import utils from '../utils/utils'
import Api from '../api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const form = ref<any>(null)
    const dialogForm = ref<any>(null)

    const queryForm = reactive<RoleQueryForm>({
      roleName: ''
    })
    const actionMap = ref<{ [k: string]: string }>({})
    const roleList = ref<RoleColumns[]>([])
    const columns = reactive<Column[]>([
      { label: '角色名称', prop: 'roleName' },
      { label: '备注', prop: 'remark' },
      { label: '权限列表', prop: 'permissionList', width: 200, formatter (row, column, value) {
        let names: string[] = []
        const list = {...value as any}.halfCheckedKeys || []
        list.map((key: string) => {
          const name = actionMap.value[key]
          if (key && name) names.push(name)
        })
        return names.join(',')
      } },
      { label: '更新时间', prop: 'updateTime', formatter(row, column, value) {
        return utils.formateDate(new Date(value))
      } },
      { label: '创建时间', prop: 'createTime', formatter(row, column, value) {
        return utils.formateDate(new Date(value))
      } },
    ])
     // 初始化分页对象
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0
    })
    const action = ref<Action>('add')
    const showModal = ref(false)
    const roleForm = ref<Partial<RoleColumns>>({})
    const rules = ref()
    const showPermission = ref(false)
    const curRoleId = ref('')
    const curRoleName = ref('')
    const tree = ref<any>(null)
    const menuList = ref<MenuItem[]>([])

    // 角色列表初始化
    const getRoleList = async () => {
      try {
        const { list, page } = await Api.getRoleList({
          ...queryForm,
          ...pager
        }) as any

        roleList.value = list
        pager.total = page?.total || 0
      } catch (e) {
        throw new Error(e)
      }
    }
    // 表单重置
    const handleReset = (form: any) => {
      form?.resetFields()
    }
    // 角色添加
    const handleAdd = () => {
      action.value = 'add'
      showModal.value = true
    }
    // 角色编辑
    const handleEdit = (row: RoleColumns) => {
      action.value = 'edit'
      showModal.value = true
      nextTick(() => {
        Object.assign(roleForm, {
          _id: row._id,
          roleForm: row.roleName,
          remark: row.remark
        })
      })
    }
    // 角色删除
    const handleDel = async (_id: string) => {
      await Api.roleOperate({ _id, action: 'delete' })
      ElMessage.success('删除成功')
      getRoleList()
    }
    const handleCurrentChange = (current: number) => {
      pager.pageNum = current
    }
    // 弹框关闭
    const handleClose = () => {
      handleReset(dialogForm.value)
      showModal.value = false
    }
    // 角色提交
    const handleSubmit = () => {
      dialogForm.value.validate(async (valid: boolean) => {
        if (valid) {
          const params = { ...roleForm, action: action.value }
          const res = await Api.roleOperate(params)
          if (res) {
            showModal.value = false
            ElMessage.success('创建成功')
            handleReset(dialogForm.value)
            getRoleList()
          }
        }
      })
    }
    // 关闭权限弹窗
    const handlePermissionClose = () => {
      showPermission.value = false
    }
    // 提交权限
    const handlePermissionSubmit = async () => {
      const nodes = tree.value.getCheckedNodes()
      const halfKeys = tree.value.getHalfCheckedKeys()
      let checkedKeys: any[] = []
      let parentKeys: any[] = []
      nodes.map((node: any) => {
        if (!node.children) {
          checkedKeys.push(node._id)
        } else {
          parentKeys.push(node._id)
        }
      })
      const params = {
        _id: curRoleId.value,
        permissionList: {
          checkedKeys,
          halfCheckedKeys: parentKeys.concat(halfKeys)
        }
      }
      await Api.updatePermission(params)
      showPermission.value = false
      ElMessage.success('设置成功')
      getRoleList()
    }
    // 菜单列表初始化
    const getMenuList = async () => {
      try {
        const list = await Api.getMenuList({}) as any
        menuList.value = list
        getActionMap(list)
      } catch (e) {
        throw new Error(e)
      }
    }

    const getActionMap = (list: MenuItem[]) => {
      let _actionMap: { [k: string]: string } = {}
      const deep = (arr: MenuItem[]) => {
        while (arr.length) {
          const item = arr.pop()
          if (item?.children && item.action) {
            _actionMap[item._id] = item.menuName
          }
          if (item?.children && !item.action) {
            deep(item.children)
          }
        }
      }
      deep(JSON.parse(JSON.stringify(list)))
      actionMap.value = _actionMap
    }

    onMounted(() => {
      getRoleList()
      getMenuList()
    })

    return {
      form,
      dialogForm,
      queryForm,
      roleList,
      columns,
      pager,
      showModal,
      roleForm,
      rules,
      showPermission,
      curRoleName,
      tree,
      menuList,
      getRoleList,
      handleReset,
      handleAdd,
      handleEdit,
      handleDel,
      handleCurrentChange,
      handleClose,
      handleSubmit,
      handlePermissionClose,
      handlePermissionSubmit
    }
  },
})
</script>
