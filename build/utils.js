/**
 * 工具箱
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

let path = require('path')
let _ = require('lodash')
let fs = require('fs')

let commandParams = {}

module.exports = {
  /**
   * 获取Node命令行参数
   */
  getCommandParams(attr) {
    let args = process.argv.splice(2)
    let parameters = []

    for(let i=0,len=args.length;i<len;i++) {
      if(args[i] && args[i].indexOf('=')>-1) {
        parameters = args[i].split('=')
        commandParams[parameters[0]] = parameters[1] || null
      }else{
        commandParams[args[i]] = null
      }
    }

    return _.isEmpty(attr)? commandParams : commandParams[attr]
  },

  hasArgu(arguName) {
    return this.getCommandParams(arguName) === null
  },

  resolve(dir) {
    return path.resolve(__dirname, `../${dir}`)
  },

  getBasePath() {
    let index = 0
    let resolvePath = []
    let basePath = " " + __dirname
    const floderName = 'node_modules'

    basePath = basePath.split(path.sep)
    for(; index<basePath.length; index++) {
      if(basePath[ index ] != floderName) {
        resolvePath.push(basePath[ index ])
      }else{
        resolvePath.pop()
        break    
      }
    }

    return _.trim(path.join.apply(null, resolvePath))
  },

  /**
   * 获取当前项目名称
   */
  getNowProjectName() {
    let index = 0
    let resolvePath = []
    let basePath = __dirname
    const floderName = 'node_modules'
    const isInScaffold = this.getCommandParams('self') === null

    if(isInScaffold) {
      return this.getScaffoldSelfProjectName()
    }

    basePath = basePath.split(path.sep)
    for(; index<basePath.length; index++) {
      
      if(basePath[ index ] != floderName) {

        resolvePath.push(basePath[ index ])
      }else{

        return resolvePath.pop() 
      }
    }

    return null
  },

  /**
   * 获取当前项目路径
   */
  getNowProjectPath() {
    let index = 0
    let resolvePath = []
    let basePath = ' ' + __dirname
    const floderName = 'node_modules'
    const isInScaffold = this.getCommandParams('self') === null

    if(isInScaffold) {
      return this.getScaffoldSelfProjectPath()
    }

    basePath = basePath.split(path.sep)
    for(; index<basePath.length; index++) {
      
      if(basePath[ index ] != floderName) {
        resolvePath.push(basePath[ index ])
      }else{

        return _.trim(path.join.apply(null, resolvePath))
      }
    }

    return null
  },

  getIndexHtml() {
    const isInScaffold = this.getCommandParams('self') === null
    let defaultPagePath = path.resolve(__dirname, '../index.ejs')
    let targetSystemPath = this.getNowProjectPath()

    if(!isInScaffold && fs.existsSync(path.join(targetSystemPath, 'index.ejs'))) {

      return path.join(targetSystemPath, 'index.ejs')    
    }

    return defaultPagePath
  },

  /**
   * 获取框架自身的目录路径
   */
  getScaffoldSelfProjectPath() {

    return path.resolve(__dirname, '../')
  },

    /**
   * 获取框架目录名称
   */
  getScaffoldSelfProjectName() {

    let basePath = path.resolve(__dirname, '../')

    basePath = basePath.split('\\')
    return basePath.pop()
  },

  toOutSourceLink(list) {
    let sources = []

    _.each(list,(outFile)=>{
      if(outFile.autoImport) {
        sources.push(outFile.to)
      }
    })

    return sources
  },

  toOutFromSourceLink(links,prex) {
    links = links || []

    return _.map(links,(link)=>{
      link.from = path.resolve(prex,link.from)
      return link
    })
  }
}