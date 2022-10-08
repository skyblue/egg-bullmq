'use strict'

exports.bullmq = {
  app: true,
  agent: true,
  ignoreError: true, // 忽略queue.add的错误
  defaultJobOptions: {
    removeOnComplete: false, // job完成后删除
  },
}
