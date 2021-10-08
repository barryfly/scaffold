import routers from '__{targetSystem}__/router/router'
import { getExternRouters } from '_common/hook'
let defaultRouters = [{
  path: '/login',
  component: () => import( /*webpackChunkName: "setting"*/ '_views/home.vue')
}
]
//组合默认路由和业务系统路由
export default defaultRouters.concat(routers).concat(getExternRouters())