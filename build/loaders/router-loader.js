/**
 * 解析目标项目中的路由配置
 * 
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

let utils = require('../utils')

module.exports = function(routerSource) {
  let targetSystem = utils.getNowProjectName()
  
  return routerSource.replace('__{targetSystem}__',targetSystem)
}