#! /usr/bin/env node

const importLocal = require('import-local')
console.log(importLocal(__filename))

if(importLocal(__filename)){
    reqiure('npmlog').info('cli', '正在使用本地版本')
}else{
    require('../lib')(process.argv.slice(2))
}