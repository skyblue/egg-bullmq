'use strict'

const assert = require('assert')
const mock = require('egg-mock')

describe('test/bullmq.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: 'apps/bullmq-test',
    })
    return app.ready()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('should OK', () => {
    assert(app.bullmq)
  })

  it('should work', done => {
    app.bullmq.add({ job1: 'this is a job' })
    app.bullmq.process(job => {
      if (job.data.job1 === 'this is a job') done()
      else done(new Error())
    })
  })
})
