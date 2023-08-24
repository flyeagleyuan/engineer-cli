'use strict';

const path = require('path')
const semver = require('semver')
const colors = require('colors/safe')
const userHome = require('user-home')
const pathExists = require('path-exists').sync
const pkg = require('../package.json')
const log = require('@engineer-cli-dev/log')
const constants = require('./constants')

// import rootCheck from 'root-check'


module.exports = core;

let args,
config

async function core() {
  try {
    checkVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs()
    checkEnv()
    await checkGlobalUpdate()
  } catch (error) {
    log.error(error.message)
  }
   
}


async function checkGlobalUpdate() {
  //获取当前版本
  const currentVersion = pkg.version
  const npmName = pkg.name
  //点用npmapi，获取所有版本号
  const { getNpmSevmerVersion } = require('@engineer-cli-dev/get-npm-info')
  const lastVersion = await getNpmSevmerVersion(currentVersion, npmName)
  console.log(lastVersion)
  if(lastVersion && semver.gt(lastVersion, currentVersion)){
    // if(true){
    log.warn(colors.yellow(`请手动更新${npmName}，当前版本:${currentVersion}，最新版本: ${lastVersion}
      更新命令： npm install -g ${npmName}`
    ))
  }
  //提取所有版本号，对比版本，获取大于当前版本的包
  //升级版本
}

function checkEnv() {
  const dotenv = require('dotenv')
  const dotenvPath = path.resolve(userHome, '.env')
  if(pathExists(dotenvPath)){
     dotenv.config({
      path: dotenvPath
    })
    config= checkDefaultConfig()
   
  }
  log.verbose('环境变量', process.env.CLI_HOME_PATH)
}


function checkDefaultConfig() {
  const cliConfig = {
    home: userHome
  }
  if(process.env.CLI_HOME){
    cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME)
  }else{
    cliConfig['cliHome'] = path.join(userHome, constants.DEFAULT_ENV)

  }  
  process.env.CLI_HOME_PATH = cliConfig.cliHome
}

function checkInputArgs() {
  const minimist = require('minimist')
   args = minimist(process.argv.slice(2))
  checkArgs()
}

function checkArgs() {
  if(args.debug){
    process.env.LOG_LEVEL = 'verbose'
  }else{
    process.env.LOG_LEVEL = 'info'
  }
  log.level = process.env.LOG_LEVEL

}

function checkUserHome() {
  if(!userHome || !pathExists(userHome) ){
    throw new Error('当前登录用户主目录不存在！')
  }
}

function checkRoot (){
  const rootCheck = require('root-check')
  rootCheck()
}

function checkNodeVersion(){
    const currentVersion = process.version
    const lowestVersion = constants.lowestVersion
    if(!semver.gte(currentVersion, lowestVersion)){
       throw new Error(colors.red(`engineer-cli-dev 需要安装${lowestVersion}以上版本的node版本`))

    }
}

function checkVersion(){
    log.info('version', pkg.version)
}