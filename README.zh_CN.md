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

[English](https://github.com/skyblue/egg-bullmq/blob/master/README.md)

[BullMQ](https://github.com/taskforcesh/bullmq) 是一个快速的，可靠的，基于 Redis 的 Node.js 队列服务。

## 安装

```bash
$ npm i @skyblue/egg-bullmq --save
```

## 使用

```js
// {app_root}/config/plugin.js
exports.bullmq = {  // 插件名称是 'bullmq'
  enable: true,
  package: '@skyblue/egg-bullmq'
};
```

## 配置

### 单一队列

```js
// {app_root}/config/config.default.js
exports.bullmq = {
  client: {
    name: 'queue',
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
    },
  },
};
```

### 多队列（推荐）

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

## 用例

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

// 具体查看 ./example

```

关于 BullMQ 的 API 和使用请阅读 [Reference](https://docs.bullmq.io/)。

## License

[MIT](LICENSE)
