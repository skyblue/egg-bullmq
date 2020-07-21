# README

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-bull-queue.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-bull-queue
[travis-image]: https://img.shields.io/travis/brickyang/egg-bull.svg?style=flat-square
[travis-url]: https://travis-ci.org/brickyang/egg-bull
[codecov-image]: https://img.shields.io/codecov/c/github/brickyang/egg-bull.svg?style=flat-square
[codecov-url]: https://codecov.io/github/brickyang/egg-bull?branch=master
[david-image]: https://img.shields.io/david/brickyang/egg-bull.svg?style=flat-square
[david-url]: https://david-dm.org/brickyang/egg-bull
[snyk-image]: https://snyk.io/test/npm/egg-bull/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-bull
[download-image]: https://img.shields.io/npm/dm/egg-bull-queue.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-bull-queue

[中文版](https://github.com/skyblue/egg-bullmq/blob/master/README.zh_CN.md)

Plugin to handle jobs and messages with [BullMQ](https://github.com/taskforcesh/bullmq) in Egg.js and follow Egg's way.

BullMQ is a fast, reliable, Redis-based queue for Node.

Base on [egg-bull-queue](https://github.com/brickyang/egg-bull)

## Install

```bash
$ npm i @skyblue/egg-bullmq --save

```

## Usage

```js
// {app_root}/config/plugin.js
exports.bullmq = {  // plugin name is 'bull'
  enable: true,
  package: '@skyblue/egg-bullmq', // package name is '@skyblue/egg-bullmq'
};
```

## Configuration

### Single queue

```js
// {app_root}/config/config.default.js
exports.bullmq = {
  client: {
    name: 'queue-name',
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
    },
  },
};
```

### Multiple queue (recommended)

```js
exports.bullmq = {
  clients: {
    q1: { name: 'q1' },
    q2: { name: 'q2' },
  },
  default: {
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
    },
  },
};
```

## Example

```js


// add job to queue
const queue = app.bullmq.get('queueName')
await queue.add('namespace', { text: 'this is a job' }, { delay: 5000,  lifo: true })
const count = await queue.count()

//worker
const worker = new Worker(queueName, async job => {
  // do the job
  console.log(process.pid, job.data)
  job.updateProgress(42)
  // await ctx.service.someTask.run()
}, { connection })


// and look at ./example

```

For BullMQ's api read [Reference](https://docs.bullmq.io/) for more details.

## License

[MIT](LICENSE)
