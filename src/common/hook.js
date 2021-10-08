/**
 * 框架生命周期钩子函数
 * 
 *    ————————————————————
 *       1.beforeStart          业务项目入口执行之前
 *    ————————————————————
 *           |
 *           |
 *           |
 *    ____________________
 *      2. afterAuth            验证accesstoken成功之后
 *    ____________________    
 *           |
 *           |
 *           |
 *    ____________________
 *     3.beforeCreateView       创建视图之前
 *    ____________________ 
 *           |
 *           |
 *           |
 *    ————————————————————
 *     4.afterViewMounted       App视图创建成功之后
 *    ____________________
 *           |
 *           |
 *           |
 *    ____________________
 *      5. pageLoaded           页面渲染完毕
 *    ____________________
 * 
 *    ______________________
 *      1.routerBeforeEach      路由守卫触发
 *    ——————————————————————
 *            |
 *            |
 *            |
 *    ——————————————————————
 *      2. pageLoaded           页面渲染完毕
 *    ______________________
 * 
 * 钩子函数使用方法：
 *   import { 
 *     useBeforeStart, useAfterAuth, 
 *     useBeforeCreateView, useAfterViewMounted 
 *   } from "jw_common/hook"
*
*    useBeforeStart(function() {
*      console.log('before start:' + (new Date()).getTime())
*    })
*
*    useAfterAuth(function() {
*      console.log('after auth:' + (new Date()).getTime())
*    })
*
*    useBeforeCreateView(function() {
*      console.log('before create view:' + (new Date()).getTime())
*    })
*
*    useAfterViewMounted(function() {
*      console.log('after view mounted:' + (new Date()).getTime())
*    })
* 
* @author Barry@gmail.com
* @date 2021-10-01
*/

import _ from 'lodash'

let hookObjectMap = window.__JWHOOKS_MAP__
let __externRouters__ = []
let __externLanguages__ = {}

let hookRegisterHandler = function(hookType, func) {
  if(_.isFunction(func)) {
    if(_.isArray(hookObjectMap[ hookType ])) {
      hookObjectMap[ hookType ].push(func)
    }else{
      hookObjectMap[ hookType ] = [ func ]
    }
  }  
}

export let useBeforeStart = function(func) {
  hookRegisterHandler(hookObjectMap.HOOK_BEFORE_START, func)
}

export let useAfterAuth = function(func) {
  hookRegisterHandler(hookObjectMap.HOOK_AFTER_AUTH, func)
}

export let useBeforeCreateApp = function(func) {
  hookRegisterHandler(hookObjectMap.HOOK_BEFORE_CREATE_APP, func)
}

export let useAfterAppMounted = function(func) {
  hookRegisterHandler(hookObjectMap.HOOK_AFTER_APP_MOUNTED, func)
}

export let useRouterBeforeEach = function(func) {
  hookObjectMap[ hookObjectMap.HOOK_ROUTER_BEFORE_EACH ] = null
  hookRegisterHandler(hookObjectMap.HOOK_ROUTER_BEFORE_EACH, func)
}

export let useUserLoaded = function(func) {
  hookRegisterHandler(hookObjectMap.HOOK_USER_LOADED, func)
}

export let usePermissionCheck = function(func) {
  hookObjectMap[ hookObjectMap.HOOK_PERMISSION_CHECK ] = null
  hookRegisterHandler(hookObjectMap.HOOK_PERMISSION_CHECK, func)
}

export let usePageLoaded = function(func) {
  hookRegisterHandler(hookObjectMap.HOOK_PAGE_LOADED, func)
}

//将npm包中的路由，注入项目中
export let useExternRouters = function(routers) {
  if(_.isArray(routers)) {
    __externRouters__ = __externRouters__.concat(routers)
  }

  return __externRouters__
}

export let getExternRouters = function() {
  return __externRouters__
}

//将npm包中的语言，注入项目中
export let useExternLanguages = function(languages) {
  if(_.isObject(languages)) {
    __externLanguages__ = Object.assign(languages,__externLanguages__);
  }

  return __externLanguages__
}

export let getExternLanguages = function() {
  return __externLanguages__
}