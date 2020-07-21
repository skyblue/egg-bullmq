'use strict'

const queue = require('./lib/bullmq')
const { Worker } = require('bullmq')

module.exports = agent => {
  agent.logger.info('[egg-bullmq] plugin init')

  const config = agent.config.bullmq
  if (config.agent) {
    queue(agent)
  }

  class QueueStrategy extends agent.ScheduleStrategy {
    start () {
      const { app, schedule: { queue: queueName, worker } } = this
      const { clients, client, default: { redis } } = config
      if (worker === 'all') {
        this.sendAll({ redis, queueName })
      } else {
        this.sendOne({ redis, queueName })
      }
    }
  }

  agent.schedule.use('queue', QueueStrategy)
}
