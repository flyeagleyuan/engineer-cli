#!/usr/bin/env node

const yargs = require('yargs/yargs')
// const lib = require('flyeagle-test-lib')
const {hideBin} = require('yargs/helpers')
const { strict, alias, describe } = require('yargs')
const dedent = require('dedent')
const pkg = require('../package.json')
const arg = hideBin(process.argv)
 
const cli = yargs()
const argv  = process.argv.slice(2)

const context = {
  imoocVersion: pkg.version
}

cli
.usage('Usage: $0 [commond] <options>')
.demandCommand(1, 'a command is required, Pass --help to see availble commands and options')
.strict()
.recommendCommands()
.fail((err,msg)=>{
  console.log(err)
})
.alias('h', 'help')
.alias("v", "version")
.wrap(cli.terminalWidth())
.epilog(dedent` 
  When a command fails, all logs are written to lerna-debug.log in the current working directory.

  For more information, check out the docs at https://lerna.js.org/docs/introduction
`)
.options(
  {
    debug: {
      type: 'boolean',
      alias: 'd',
      describe: 'Bootstrap debug mode'  
    }
  }
)
.option('registry', {
  type: 'string',
  alias: 'r',
  describe: 'Define global registry'
})
.group(['debug'],' Dev options')
.group(['registry'],' Extra options')
.command('init [name]', 'Do init a project', (yargs)=>{
  yargs.option('name', {
    type: 'string', 
    describe: 'name of project',
    alias: 'n'
  })
}, (argv)=>{
 console.log(argv)
})
.command({
  command: 'list',
  aliases:['ls', 'la', 'll'],
  describe: 'List local package',
  builder:(yargs)=>{

  },
  handler: (argv)=>{
    console.log(argv)
  }
})
.parse(argv, context)
// console.log(argv)

// if(lib[commond]){
//   lib[commond]()
// }else{
//   console.log('请输入有效命令')
// }

// console.log(lib.sum(1,5))

