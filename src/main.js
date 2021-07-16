import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload" //图片懒加载

import toast from '@/components/common/toast' // toast 吐司

Vue.config.productionTip = false

/*原形 new Vue 实例  发送事件 事件总线*/
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

//安装toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
