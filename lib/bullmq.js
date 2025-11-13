'use strict'

const assert = require('assert')
const { Queue, Worker, QueueEvents } = require('bullmq')

const TypeInvokeFunc = {
  queue: Queue,
  worker: Worker,
  events: QueueEvents,
}

module.exports = app => {
  app.addSingleton('bullmq', createQueue)
}

function createQueue (config, app) {
  // console.log(config)
  const { name, redis } = config
  assert(name, '[egg-bullmq] name is required in config')
  assert(
    redis && redis.host && redis.port,
    '[egg-bullmq] host and port of redis are required in config',
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
