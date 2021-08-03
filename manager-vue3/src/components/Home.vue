<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- 系统logo -->
      <div class="logo">
        <img src="../assets/logo.png" />
        <span v-if="!isCollapse">Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        default-active="2"
        class="nav-menu"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">菜单管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-setting"></i>
            <span>审批管理</span>
          </template>
          <el-menu-item index="2-1">休假申请</el-menu-item>
          <el-menu-item index="2-2">待我审批</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content-right" :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold"
            @click="toggle"
          >
            <i class="el-icon-s-fold" />
          </div>
          <div class="bread">面包屑</div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="true" class="notice" type="danger">
            <i class="el-icon-bell" />
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{userInfo?.userName}}
              <i class="el-icon--right" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱: {{userInfo?.userEmail}}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

type UserInfo = {
  userName: string;
  userEmail: string;
}

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const userInfo = ref<UserInfo | null>({
      userName: 'xiao',
      userEmail: 'xiao@admin.com'
    })

    const isCollapse = ref(false)

    const handleLogout = (key: string) => {
      if (key === 'email') return
      store.commit('saveUserInfo', '')
      userInfo.value = null
      router.push('/login')
    }

    const toggle = () => {
      isCollapse.value = !isCollapse.value
    }

    return {
      userInfo,
      handleLogout,
      isCollapse,
      toggle
    }
  },
});
</script>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
          cursor: pointer;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>
