/**
 * 主文件
 *
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

import "_assets/css/base.css";

import Vue from "vue";
import VueRouter from "vue-router";
import EventBus from "_common/event-bus";
import injectAntDesignUi from "_ant_design";

import App from "_app";
import store from "_stores";
import { getLanguage } from "_utils/cookie";
import routes from "./inject.router";
import language from "_locale/inject.language";

(function() {
  Eld.EventBus = new EventBus();
  Vue.use(VueRouter);
  injectAntDesignUi(Vue);

  //创建系统视图
  let createView = () => {
  const router = new VueRouter({
    routes
  })
new Vue({
  router,
  store,
  data: {
    language
  },
  render: h => h(App)
}).$mount('#app')

  };
  Vue.prototype.$t = function(code) {
    return this.$root.language[code] || code;
  };
  Vue.prototype.$tc = function(code) {
    // getter 注入
    if (!this.$options.__i18n) {
      Object.defineProperty(this.$options, "__i18n", {
        get: () => (this.i18n ? this.i18n() : {}),
      });
    }
    // 获取数据
    const langs = this.$options.__i18n[getLanguage()];
    return langs ? langs[code] : code;
  };

createView();

})();
