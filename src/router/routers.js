import Main from '@/components/main'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      title: 'SignUp - 注册',
      hideInMenu: true
    },
    component: () => import('@/view/signup/signup.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: 'home',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/home/home')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  {
    path: '/schedule',
    name: 'schedule',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'schedule',
        name: 'schedule',
        meta: {
          icon: 'md-calenda',
          title: '日程'
        },
        component: () => import('@/view/schedule/schedule-page.vue')
      },
      {
        path: 'create_schedule',
        name: 'create_schedule',
        component: () => import('@/view/schedule/create-schedule.vue')
      },
      {
        path: 'change_schedule',
        name: 'change_schedule',
        component: () => import('@/view/schedule/change-schedule.vue')
      }
    ]
  },
  {
    path: '/note',
    name: 'note',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'note',
        name: 'note',
        meta: {
          icon: 'ios-list',
          title: '记事'
        },
        component: () => import('@/view/note/note-page.vue')
      },
      {
        path: 'create_note',
        name: 'create_note',
        component: () => import('@/view/note/create-note.vue')
      },
      {
        path: 'change_note',
        name: 'change_note',
        component: () => import('@/view/note/change-note.vue')
      }
    ]
  },
  {
    path: '/tag',
    name: 'tag',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'tag',
        name: 'tag',
        meta: {
          icon: 'md-pricetag',
          title: 'tag'
        },
        component: () => import('@/view/tag/tag-page.vue')
      },
      {
        path: 'change_tag',
        name: 'change_tag',
        component: () => import('@/view/tag/change-tag.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: Main,
    children: [
      {
        path: 'search',
        name: 'search',
        component: () => import('@/view/search/search-page.vue')
      }
    ]
  },
  {
    path: '/change_password',
    name: 'change_password',

    component: () => import('@/view/others/change-password.vue')
  },
  {
    path: '/recycle_bin',
    name: 'recycle_bin',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'recycle_bin',
        name: 'recycle_bin',
        meta: {
          icon: 'md-trash',
          title: 'recycle_bin'
        },
        component: () => import('@/view/recycle-bin/recycle-bin-page.vue')
      }
    ]
  }
]
