#!/usr/bin/env node
/**
 *  初始化前端项目,创建项目配置文件：
 * 	scaffold-config.js
 * 	package-config.js
 * 	components/
 *  common/
 * 	assets/
 *  apis/
 *  utils/
 *  views/
 *  router/
 *  locale/
 *  stores/
 *
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

let fs = require('fs')
let _ = require('lodash')
let path = require('path')
let utils = require('./utils')
let through2 = require('through2')

let isInScaffold = utils.hasArgu('self')

function createDir(dirName) {
  fs.mkdir(dirName,(error)=>{
  	if(error) {
  	  return console.info(`Create dir fail : ${dirName}`)
  	}

  	console.info(`Create dir success : ${dirName}`)
  })	
}

function createFile(readFileName, writeFileName) {
	let projectName = utils.getNowProjectName()
	let currentProjectPath = utils.getNowProjectPath()
	let readerStream = fs.createReadStream(path.resolve(__dirname,`../${readFileName}`),'utf-8');
	let writerStream = fs.createWriteStream(path.join(currentProjectPath, writeFileName), 'utf-8');
	let formatProjectName = through2((data, enc, cb)=>{
		cb(null, new Buffer(data.toString().replace(/\$\{nowProjectName\}/g, projectName)));
	})

	readerStream.pipe(formatProjectName).pipe(writerStream)
	console.info(`Create file success : ${writeFileName}`)
}

function exists(fileName, callback, newFileName,existCallback) {
	let basePath = utils.getNowProjectPath(isInScaffold)

	fs.exists(path.join(basePath, newFileName || fileName), (exists)=>{
		if(exists) {
			existCallback && existCallback(fileName, newFileName)
		}else{
			callback(fileName, newFileName)
		}
	})
}

function packageJsonUpdate() {
	let currentProjectPath = utils.getNowProjectPath()
	
	exists('package.json', ()=>{}, null, function() {
		let isFixed = false
		let packageJsonData = fs.readFileSync(path.resolve(currentProjectPath, 'package.json'),'utf-8')

		packageJsonData = JSON.parse(packageJsonData)
		
		if(packageJsonData && packageJsonData.scripts) {
			
			if(_.isEmpty(packageJsonData.scripts.start)) {
				isFixed = true
				_.extend(packageJsonData.scripts,{
					"start": "npx eld-start"
				})
			}

			if(_.isEmpty(packageJsonData.scripts.build)) {
				isFixed = true
				_.extend(packageJsonData.scripts,{
					"build": "npx eld-build"
				})
			}

			if(isFixed) {
				fs.writeFileSync(
					path.resolve(currentProjectPath, 'package.json'), 
					JSON.stringify(packageJsonData, null, '\t')
				)
			}
		}
	})
}


if(isInScaffold) {
	exists('build/template/webpack.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'webpack.js')
}else{
	packageJsonUpdate()
	exists('apis', filename => createDir(filename))
	exists('views', filename => {
		createDir(filename)
		exists('src/views/home.vue', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'views/home.vue')
	})
	exists('router', filename => {
		createDir(filename)
		exists('src/router/router.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'router/router.js')
		exists('src/router/index.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'router/index.js')
	})
	exists('utils', filename => createDir(filename))
	exists('stores', filename => createDir(filename))
	exists('locale', filename => {
		createDir(filename)
		exists('src/locale/zh-CN.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'locale/zh-CN.js')
		exists('src/locale/en-US.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'locale/en-US.js')
		exists('src/locale/index.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'locale/index.js')
	})
	exists('components', filename => createDir(filename))
	exists('assets', filename => createDir(filename))
    exists('common', filename => {
		createDir(filename)
		exists('src/common/ant-design.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'common/ant-design.js')
		exists('src/common/ant-icons.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'common/ant-icons.js')
	})
	exists('build/template/webpack.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'webpack.js')
}

exists('build/template/scaffold.json', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'scaffold.json')
exists('build/template/babel.js', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'babel.config.js')
exists('build/template/favicon.ico', (readFilename, writeFileName) => createFile(readFilename, writeFileName), 'favicon.ico')
