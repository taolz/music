import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Recommend = () => import('@/views/Recommend')
const Detail = () => import('@/views/Detail')
const Singer = () => import('@/views/Singer')
const Rank = () => import('@/views/Rank')
const Search = () => import('@/views/Search')
const Account = () => import('@/views/Account')
const Profile = () => import('@/views/Profile')

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/recommend' },
  { path: '/', redirect: '/search' },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:type/:id',
        name: 'Detail',
        component: Detail
      }
    ]
  }, {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [
      {
        path: 'detail/:type/:id',
        component: Detail
      }
    ]
  }, {
    path: '/rank',
    name: 'Rank',
    component: Rank,
    children: [
      {
        path: 'detail/:type/:id',
        component: Detail
      }
    ]
  }, {
    path: '/search',
    name: 'Search',
    component: Search
  }, {
    path: '/account',
    name: 'Account',
    component: Account
  }, {
    path: '/profile/:userId',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
