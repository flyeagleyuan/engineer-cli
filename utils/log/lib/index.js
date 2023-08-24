'use strict';


const log = require('npmlog')

log.level = process.env.LOG_LEVEL || "info"
log.heading = 'engineer' //修改前缀
log.addLevel('success', 2000, {fg: 'green', blod: true}) //自定义

module.exports = log;
 