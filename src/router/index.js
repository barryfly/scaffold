/**
 * 注入路由、多语言
 *
 * @author Barry@gmail.com
 * @date 2021-10-01
 */
import { useExternLanguages, useExternRouters } from "_common/hook"
const language = {};

const routers = [
  {
    path: '/',
    name: 'home',
    component: () => import( /*webpackChunkName: "home"*/ 'views/home.vue')
  }
];

export let init = function () {
  useExternLanguages(language);
  useExternRouters(routers)
}

export default routers