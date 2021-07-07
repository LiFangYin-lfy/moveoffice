import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import('@/views/Layout')
import Abeyance from '../views/abeyance/abeyance'
import Adhibition from '../views/adhibition/adhibition'
import Userinfo from '../views/userinfo/userinfo'
import Meborrow from '../views/meborrow/meborrow'
import Personal from '../views/personal/personal'
import Myapproval from '../views/myapproval/myapproval'
import Myborrowdetail from '../views/myborrowdetail/myborrowdetail'
import Myauthorization from '../views/myauthorization/myauthorization'
import Login from '../views/login/login'
import Mydetails from '../views/mydetails/mydetails'
import Microservice from '../views/microservice/microservice'
import Sos from '../views/sos/sos'
import Examine from '../views/examine/examine'
import Mywage from '../views/mywage/mywage'
import Mywagedetail from '../views/mywagedetail/mywagedetail'
import Budget from '../views/budget/budget'
import Myreimburse from '../views/myreimburse/myreimburse'
import Execute from '../views/execute/execute'
import Expenditure from '../views/expenditure/expenditure'
import Affix from '../views/affix/affix'
import Affproview from '../views/affproview/affproview'
import Startup from '../views/startup/startup'
import Otherincome from '../views/otherincome/otherincome'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [{
      path: '/',
      name: 'abeyance',
      component: Abeyance
    }, {
      path: '/adhibition',
      name: 'adhibition',
      component: Adhibition
    }, {
      path: '/userinfo',
      name: 'userinfo',
      component: Userinfo
    }]
  },
  {
    path: '/otherincome',
    name: 'otherincome',
    component: Otherincome
  },
  {
    path: '/myreimburse',
    name: 'myreimburse',
    component: Myreimburse
  },
  {
    path: '/affix',
    name: 'affix',
    component: Affix
  }, {
    path: '/affproview',
    name: 'affproview',
    component: Affproview
  }, {
    path: '/budget',
    name: 'budget',
    component: Budget
  }, {
    path: '/expenditure',
    name: 'expenditure',
    component: Expenditure
  },
  {
    path: '/execute',
    name: 'execute',
    component: Execute
  },
  {
    path: '/mywage',
    name: 'mywage',
    component: Mywage
  },
  {
    path: '/mywagedetail',
    name: 'mywagedetail',
    component: Mywagedetail
  },
  {
    path: '/sos',
    name: 'sos',
    component: Sos
  },
  {
    path: '/meborrow',
    name: 'meborrow',
    component: Meborrow
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal
  }, {
    path: '/myauthorization',
    name: 'myauthorization',
    component: Myauthorization
  },
  {
    path: '/myapproval',
    name: 'myapproval',
    component: Myapproval
  }, {
    path: '/myborrowdetail',
    name: 'myborrowdetail',
    component: Myborrowdetail
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mydetails',
    name: 'mydetails',
    component: Mydetails
  },
  {
    path: '/microservice',
    name: 'microservice',
    component: Microservice
  },
  {
    path: '/examine',
    name: 'examine',
    component: Examine
  },
  {
    path: '/startup',
    name: 'startup',
    component: Startup
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
