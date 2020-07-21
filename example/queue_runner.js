// app/schedule/runner.js

// 写法 1
/*
const Subscription = require('egg').Subscription

class QueueRunner extends Subscription {
  static get schedule () {
    return {
      type: 'queue',
      queue: 'test',
      worker: 'one', // or 'all'
      // worker: 'all',
    }
  }

  async subscribe ({ queueName, redis: connection }) {
    const { ctx, service, app } = this
    const { bullmq } = app
    const { WorkerClass: Worker, QueueEventsClass: QueueEvents } = bullmq

    const worker = new Worker(queueName, async job => {
      // do the job
      console.log(process.pid, job.data)
      job.updateProgress(42)
      // await ctx.service.someTask.run()
    }, { connection })

    worker.on('drained', (job) => {
      // Queue is drained, no more jobs left
      console.log('drained')
    })

    worker.on('completed', (job) => {
      // job has completed
      // console.log('completed')
    })

    worker.on('failed', (job) => {
      // job has failed
      // console.log('failed')

    })

    const queueEvents = new QueueEvents(queueName, { connection })
    queueEvents.on('completed', (jobId) => {
      // Called every time a job is completed in any worker.
      // console.log('QueueEvents::completed', jobId)
    })

    queueEvents.on('progress', (jobId, progress) => {
      // jobId received a progress event
      // console.log('QueueEvents::progress', jobId, progress)
    })
  }
}

module.exports = QueueRunner
*/

// 写法2
module.exports = app => {
  return {
    schedule: {
      type: 'queue',
      queue: 'test',
      // worker: 'one', // or 'all'
      worker: 'all',
    },

    async task (ctx, { queueName, redis: connection }) {
      const { app, service } = ctx
      const { bullmq } = app
      const { WorkerClass: Worker, QueueEventsClass: QueueEvents } = bullmq
      const worker = new Worker(queueName, async job => {
        console.log(process.pid, job.name, job.data)
        // do the job
        if (job.name === 'apple') {
          return await ctx.service.apple.runTask()
        }
        if (job.name === 'peach') {
          return await ctx.service.peach.runTask()
        }
        // job.updateProgress(42)
        // await ctx.service.someTask.run()
      }, { connection })
    },
  }
}
