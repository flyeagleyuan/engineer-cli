#!/usr/bin/env node

const yargs = require('yargs/yargs')
const lib = require('flyeagle-test-lib')
const argv = require('process').argv

const commond = argv[2]

if(lib[commond]){
  lib[commond]()
}else{
  console.log('请输入命令')
}


console.log(lib.sum(1,3))

yargs()