import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home.vue'
// import storage from '../utils/storage'
// import Api from '../api'
// import utils from '../utils/utils'

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎体验Vue3全栈课程'
        },
        component: () => import('@/views/Welcome.vue')
      },
      {
        name: 'menu',
        path: '/system/menu',
        meta: {
          title: '菜单管理'
        },
        component: () => import('@/views/Menu.vue')
      },
      {
        name: 'user',
        path: '/system/user',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/User.vue')
      },
      {
        name: 'role',
        path: '/system/role',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/views/Role.vue')
      },
      {
        name: 'dept',
        path: '/system/dept',
        meta: {
          title: '部门管理'
        },
        component: () => import('@/views/Dept.vue')
      },
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '页面不存在'
    },
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// const loadAsyncRoutes = async () => {
//   const userInfo = storage.getItem('userInfo') || {}
//   if (userInfo.token) {
//     try {
//       const menuList = await Api.getMenuList({}) as any
//       let routes = utils.generateRoute(menuList)
//       routes.map(route => {
//         const url = `../views/${route.component}.vue`
//         route.component = () => import(url)
//         router.addRoute('home', route)
//       })
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// await loadAsyncRoutes()
// 导航守卫
router.beforeEach((to, from, next) => {
  if (router.hasRoute(to.name || '')) {
    document.title = String(to.meta.title)
    next()
  } else {
    next('/404')
  }
})

export default router
