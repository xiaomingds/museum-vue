import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/show'),
      meta: { title: '智慧博物馆', icon: 'dashboard' }
    }]
  }
  ]
/**
 * 动态路由
 */
export const asyncRoutes = [
  // {
  //   path: '/show',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'show',
  //       name: 'show',
  //       component: () => import('@/views/dashboard/show'),
  //       meta: { title: '全部环境', icon: 'chart'}
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: '人员管理', icon: 'example', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'User',
  //       component: () => import('@/views/table/user'),
  //       meta: { title: '员工管理', icon: 'user', roles: ['admin'] } // you can set roles in root nav
  //     }
  //     // {
  //     //   path: 'tree',
  //     //   name: 'Tree',
  //     //   component: () => import('@/views/tree/index'),
  //     //   meta: { title: '角色管理', icon: 'eye-open' }
  //     // },
  //     // {
  //     //   path: 'tree',
  //     //   name: 'Tree',
  //     //   component: () => import('@/views/tree/index'),
  //     //   meta: { title: '权限', icon: 'tree' }
  //     // }
  //   ]
  // },
  {
    path: '/getway',
    component: Layout,
    redirect: '/getway/table',
    name: 'getway',
    meta: { title: '基础设备', icon: 'exit-fullscreen'},
    children: [
      {
        path: 'master',
        name: 'Master',
        component: () => import('@/views/table/master'),
        meta: { title: '网关', icon: 'table' }
      },
      // {
      //   path: 'device',
      //   name: 'Device',
      //   component: () => import('@/views/table/device'),
      //   meta: { title: '设备', icon: 'fullscreen'}
      // },
      {
        path: 'regulation',
        name: 'regulation',
        component: () => import('@/views/table/regulation'),
        meta: { title: '环境列表', icon: 'drag'}
      },
      // {
      //   path: 'line',
      //   name: 'Line',
      //   component: () => import('@/views/table/device'),
      //   meta: { title: '图表', icon: 'message' }
      // },
      {
        path: 'error',
        name: 'Error',
        component: () => import('@/views/table/deviceError'),
        meta: { title: '故障字典', icon: 'nested' }
      }
    ]
  },
  {
    path: '/warning',
    component: Layout,
    children: [
      {
        path: 'wslave',
        name: 'wslave',
        component: () => import('@/views/table/warningSlave'),
        meta: { title: '设备报警', icon: 'el-icon-warning'}
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1'},
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2'},
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link'}
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
