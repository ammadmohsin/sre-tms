import { env } from "../../env.js";
import { type Service, type Setting } from "@prisma/client";
import { Redis } from "ioredis";

const globalForRedis = globalThis as unknown as { redis: Redis };
// export const redis = globalForRedis.redis ?? new Redis(env.REDIS_URL);
export const redis = new Redis({
  host: env.REDIS_HOST,
  port: 6379,
  password: env.REDIS_HOST_PASSWORD,
});

if (env.NODE_ENV !== "production") globalForRedis.redis = redis;

export const REDIS_KEYS = {
  setting: "SETTING",
  service: "SERVICE",
} as const;

type KeyType = (typeof REDIS_KEYS)[keyof typeof REDIS_KEYS];

type KeysValueType = {
  SETTING: Setting;
  SERVICE: Service;
};

export class RedisService {
  private static readonly UNIQUE_KEY = env.REDIS_APP_ID;

  public static getKey = (key: string) => {
    return `${this.UNIQUE_KEY}:${key}`;
  };

  public static getValue = async <K extends KeyType>(key: K) => {
    const data = await redis.get(this.getKey(key));
    if (data) {
      return JSON.parse(data) as KeysValueType[K];
    }
    return null;
  };

  public static setValue = async <K extends KeyType>(
    key: K,
    data: KeysValueType[K]
  ) => {
    await redis.set(this.getKey(key), JSON.stringify(data), "EX", 60 * 60 * 24);
  };

  public static getOrSetValue = async <K extends KeyType>(
    key: K,
    cb: () => Promise<KeysValueType[K]>
  ) => {
    const data = await this.getValue<K>(key);
    if (data) return data;
    const newData = await cb();
    await this.setValue(key, newData);
    return newData;
  };
}
