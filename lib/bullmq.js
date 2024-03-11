'use strict'

const assert = require('assert')
const { Queue } = require('bullmq')

module.exports = app => {
  app.addSingleton('bullmq', createQueue)
  // app.addSingleton('bullmq:worker', createWorker)
}

function createQueue (config, app) {
  // console.log(config)
  const { name, redis } = config
  assert(name, '[egg-bullmq] name is required on config')
  assert(
    redis && redis.host && redis.port,
    '[egg-bullmq] host and port of redis are required on config',
  )
  const options = { connection: redis, ...config }
  const queue = new Queue(name, options)

  if (options.ignoreError) {
    const add_ = queue.add
    queue.add = (...args) => {
      try {
        add_.apply(queue, args)
      } catch (ex) {
        app.coreLogger.error(ex)
      }
    }
  }
  /* istanbul ignore next */
  queue.on('error', error => {
    app.coreLogger.error(error)
    process.exit(1)
  })

  app.beforeStart(() => {
    app.coreLogger.info(`[egg-bullmq] Queue ${name} is OK.`)
  })

  return queue
}
