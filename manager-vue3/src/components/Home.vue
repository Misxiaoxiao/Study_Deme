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
        :default-active="activeMenu"
        class="nav-menu"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
      >
        <tree-menu :userMenu="userMenu" />
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
          <div class="bread">
            <bread-crumb />
          </div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="!!noticeCount" class="notice" type="danger">
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
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { State, UserInfo } from '../store'
import Api from '../api'
import TreeMenu, { UserMenuItem } from './TreeMenu.vue'
import BreadCrumb from './BreadCrumb.vue'

export default defineComponent({
  components: {
    TreeMenu,
    BreadCrumb
  },
  setup() {
    const store = useStore<State>()
    const router = useRouter()
    const userInfo = ref<UserInfo | null>(store.state.userInfo)
    const noticeCount = ref(0)
    const userMenu = ref<UserMenuItem[]>([])
    const activeMenu = ref(location.hash.slice(1))

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

    const getNoticeCount = async () => {
      try {
        const count = await Api.noticeCount()
        noticeCount.value = Number(count)
      } catch (error) {
        console.error(error)
      }
    }

    const getMenuList = async () => {
      try {
        const list: any = await Api.getMenuList()
        userMenu.value = list
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getNoticeCount()
      getMenuList()
    })

    return {
      userInfo,
      handleLogout,
      isCollapse,
      toggle,
      noticeCount,
      userMenu,
      activeMenu
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
        // background: #fff;
        height: 100%;
      }
    }
  }
}
</style>
