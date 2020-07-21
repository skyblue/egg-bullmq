'use strict'

const assert = require('assert')
const { Queue, QueueScheduler, Worker } = require('bullmq')

module.exports = app => {
  app.addSingleton('bullmq', createQueue)
  // app.addSingleton('bullmq:worker', createWorker)
}

module.exports.Worker = Worker

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
  const queueScheduler = new QueueScheduler(name, options)

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
