<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState">
            <el-option :value="1" label="正常" />
            <el-option :value="2" label="停用" />
          </el-select>
        </el-form-item>
        <el-from-item>
          <el-button type="primary" @click="getMenuList">查询</el-button>
          <el-button @click="handleReset(form)">重置</el-button>
        </el-from-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">新增</el-button>
      </div>
      <el-table
        :data="menuList"
        row-key="_id"
        :tree-props="{
          children: 'children'
        }"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              @click="handleAdd(2, scope.row)"
              type="primary"
              size="mini"
            >新增</el-button>
            <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
            <el-butto
              type="danger"
              size="mini"
              @click="handleDel(scope.row._id)"
            >删除</el-butto>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="菜单新增" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="menuForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuList"
            :prop="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
          />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuForm.menuType === 1"
        >
          <el-input v-model="menuForm.icon" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="menuForm.menuType === 1"
        >
          <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="menuForm.menuType === 2"
        >
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item
          label="组件路径"
          prop="component"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="menuState"
          v-show="menuForm.menuType == 1"
        >
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick } from 'vue'
import { MenuQueryForm, MenuItem } from '../type/MenuType'
import { Action } from '../type/CommonType'
import { Column } from '../type/CommonType'
import utils from '../utils/utils'
import Api from '../api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const form = ref()
    const dialogForm = ref()
    const queryForm = reactive<MenuQueryForm>({
      menuName: '',
      menuState: 1
    })
    const columns = reactive<Column[]>([
      { label: '菜单名称', prop: 'menuName', width: 150 },
      { label: '图标', prop: 'icon' },
      { label: '菜单类型', prop: 'menuType', formatter (row, column, value) {
        return {
          1: '菜单',
          2: '按钮'
        }[value]
      } },
      { label: '权限标识', prop: 'menuCode' },
      { label: '路由地址', prop: 'path' },
      { label: '组件路径', prop: 'component' },
      { label: '菜单状态', prop: 'menuState', formatter (row, column, value) {
        return {
          1: '正常',
          2: '停用'
        }[value]
      } },
      { label: '创建时间', prop: 'createTime', formatter (row, column, value) {
        return utils.formateDate(new Date(value))
      } },
    ])
    const menuList = ref<MenuItem[]>([])
    const showModal = ref(false)
    const menuForm = reactive<Partial<MenuItem>>({
      parentId: [],
      menuType: 1,
      menuState: 1
    })
    const rules = reactive({
      menuName: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在2-8个字符', trigger: 'blur' }
      ]
    })
    const action = ref<Action>('add')

    const getMenuList = async () => {
      try {
        const list: any = await Api.getMenuList(queryForm)
        menuList.value = list
      } catch (e) {
        throw new Error(e)
      }
    }

    const handleReset = (form: any) => {
      form?.resetFields()
    }

    const handleAdd = (type: 1 | 2, row?: MenuItem) => {
      showModal.value = true
      action.value = 'add'
      if (type === 2 && row) {
        menuForm.parentId = [
          ...row.parentId, row._id
        ].filter(item => item)
      }
    }

    const handleEdit = (row: MenuItem) => {
      showModal.value = true
      action.value = 'edit'
      nextTick(() => {
        Object.assign(menuForm, row)
      })
    }

    const handleDel = async (_id: string) => {
      await Api.menuSubmit({ _id, action: 'delete' })
      ElMessage.success('删除成功')
      getMenuList()
    }

    const handleClose = () => {
      showModal.value = false
      handleReset(dialogForm.value)
    }

    const handleSubmit = () => {
      dialogForm.value.validate(async (valid: boolean) => {
        const params = { ...menuForm, action: action.value }
        await Api.menuSubmit(params)
        showModal.value = false
        ElMessage.success('操作成功')
        handleReset(dialogForm.value)
        getMenuList()
      })
    }

    return {
      form,
      dialogForm,
      queryForm,
      columns,
      menuList,
      showModal,
      menuForm,
      rules,
      getMenuList,
      handleReset,
      handleAdd,
      handleEdit,
      handleDel,
      handleClose,
      handleSubmit
    }
  },
})
</script>
