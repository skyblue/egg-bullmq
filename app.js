'use strict'

const { Worker, QueueEvents } = require('bullmq')
const queue = require('./lib/bullmq')

class AppBootHook {
  constructor (app) {
    this.app = app
  }

  async didLoad () {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    const { app } = this
    if (app.config.bullmq.app) {
      queue(app)
    }
  }

  async willReady () {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
  }

  async didReady () {
    // 应用已经启动完毕
    // app.ready 中的代码置于此处。

    this.app.bullmq.WorkerClass = Worker
    this.app.bullmq.QueueEventsClass = QueueEvents
  }
}

module.exports = AppBootHook
