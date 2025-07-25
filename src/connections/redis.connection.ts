import { createClient } from 'redis';
import { redisEnv } from '../config/env.config';

const redis = createClient({
  socket: {
    host: redisEnv.REDIS_HOST,
    port: redisEnv.REDIS_PORT,
    connectTimeout: 2000
  }
});

export default redis;