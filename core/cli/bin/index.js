#! /usr/bin/env node

const importLocal  = require('import-local')

if(importLocal(__filename)){
  reqiure('npmlog').info('cli', '正在使用cli，本地版本')
}else{
  require('../lib')(process.argv(2))
}