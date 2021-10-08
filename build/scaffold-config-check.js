/**
 * 检查scaffold-config.js中配置项和框架中关键字冲突
 * 
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

let fs = require("fs")
let _ = require('lodash')
let path = require("path")
let utils = require("./utils")
let scaffoldConfigPath = path.join(utils.getNowProjectPath(), 'scaffold.json')
let clientConfig = fs.readFileSync(scaffoldConfigPath)

//框架保留字
const SCAFFOLD_CONST_WORDES = [
  'EventBus',
  'Vue',
  'dayjs',
  'environment',
  'getUser',
  'getAuth',
  'getLanguageList',
  'getLoginToken',
  'getMainDom',
  'getMatchPath',
  'getMatchRoute',
  'getSelectedLanguageCode',
  'hideAside',
  'hideFooter',
  'hideHeader',
  'hideLocalLoading',
  'showLocalLoading',
  'isChinese',
  'mainAside',
  'mainHeader',
  'mainView',
  'fullScreen',
  'normalScreen',
  'showAside',
  'showFooter',
  'showHeader',
  'start'
]

clientConfig = clientConfig.toString()
clientConfig = (new Function(`return ${clientConfig}`))()

module.exports = function() {
  let privateKeys = []
  let errorMesg = ""

  _.each(SCAFFOLD_CONST_WORDES, (key)=>{
    
    if(!_.isUndefined(clientConfig[ key ])) {
      privateKeys.push(key)
    }
  })
  
  if(_.size(privateKeys)>0) {
    errorMesg = `Some private attributes: ${privateKeys.join('、')} in ${scaffoldConfigPath}, you must rename them!`
    throw new Error(errorMesg)
  }
}