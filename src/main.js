import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/style/index.less' // 覆盖vant的样式
import Commit from './utils/commit'
import Variate from './utils/variate'
import axios from './request/index'
import "./utils/font/font.css";
import plugin from './components' // 使用插件 里边放置了全局组件
Vue.prototype.$http = axios;
Vue.prototype.$commit = Commit;
Vue.prototype.$variate = Variate;
Vue.use(Vant);
Vue.use(plugin);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  let move_token = localStorage.getItem('move_token')
  // console.log(move_token);
  if (move_token === '' || move_token === null) {
    if (to.fullPath == "/startup") {
      next();
    } else if (to.fullPath == "/login") {
      next();
    } else {
      next('/startup');
    }
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
