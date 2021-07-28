/*
 * @Author: xiao
 * @Description: 日志管理
 * @FilePath: /manager-server/utils/log4.js
 */
const log4js = require('log4js')

const levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL,
}

log4js.configure({
  appenders: {
    console: { type: 'console' },
    info: {
      type: 'file',
      filename: 'logs/all-logs.log'
    },
    error: {
      type: 'dateFile',
      filename: 'logs/log',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true // 设置文件名称为 filename + patternn
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'debug'
    },
    info: {
      appenders: ['info', 'console'],
      level: 'info'
    },
    error: {
      appenders: ['console', 'error'],
      level: 'error'
    }
  }
})

/**
 * @description: 日志输出，level为debug
 * @param {string} content
 * @return {*}
 */
exports.debug = (content) => {
  let logger = log4js.getLogger()
  logger.level = levels.debug
  logger.debug(content)
}

/**
 * @description: 日志输出，level为error
 * @param {string} content
 * @return {*}
 */
 exports.error = (content) => {
  let logger = log4js.getLogger('error')
  logger.level = levels.error
  logger.error(content)
}

/**
 * @description: 日志输出，level为info
 * @param {string} content
 * @return {*}
 */
 exports.info = (content) => {
  let logger = log4js.getLogger('info')
  logger.level = levels.info
  logger.info(content)
}
