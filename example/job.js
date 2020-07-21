// app/controller/job.js
const { Controller } = require('egg')

class JobController extends Controller {
  async addJobs () {
    const { ctx, app, service } = this
    const queue = app.bullmq.get('test')
    for (let i = 0; i < 10; i++) {
      await queue.add('apple', { size: i })
      await queue.add('peach', { size: i }, {
        delay: 200 * i,
      })
    }

    const count = await queue.count()
    ctx.body = {
      count,
    }
  }
}
module.exports = JobController
