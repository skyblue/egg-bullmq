import { QueueOptions } from 'bullmq'

interface IBullConfig extends QueueOptions {
  name?: string;
}

declare module 'egg' {
  interface EggAppConfig {
    bullmq: {
      client?: IBullConfig;
      clients?: {
        [key: string]: IBullConfig;
      };
      default?: IBullConfig;
    };
  }
}
