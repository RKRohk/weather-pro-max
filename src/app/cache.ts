import { createClient } from 'redis';

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    }
});

export const redisClient = async () => {
    if(client.isOpen) return client;

    await client.connect();
    return client;
}

client.on("connect", () => {
    console.log('Redis connected');
}) 