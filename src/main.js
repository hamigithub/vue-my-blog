// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import Routers from './routers'
//引入Bmob SDK
import Bmob from 'hydrogen-js-sdk'
//初始化Bmob
Bmob.initialize("b23da1fe0ad05a1e85a18e3984e2b0f6", "cf199ff770b10e3e84209413c839f953");
//挂载到全局使用
Vue.prototype.Bmob = Bmob;

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueRouter);

//全局定义 自定义指令
Vue.directive('dark', {
  bind(el, binding, vnode) {
    el.style.color = "red"
  }
});

Vue.directive('light', {
  bind(el, binding, vnode) {

  }
});

Vue.directive('theme', {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') {
      el.style.maxWidth = "1260px";
    } else if (binding.value == 'narrow') {
      el.style.maxWidth = "560px";
    }
    if (binding.arg == 'column') {
      el.style.background = "#6677cc";
      el.style.padding = "20px";
    }
  }
});

//自定义过滤器——全局
// Vue.filter("to-uppercase", function (value) {
//   return value.toUpperCase();
// });

Vue.filter("snippet", function (value) {
  return value.slice(0, 100) + "...";
});

//创建路由
const router = new VueRouter({
  routes: Routers,
  mode: "history"
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  router: router
});
