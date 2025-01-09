const redis = require("redis");

// Buat client Redis
// Tentukan Redis URL berdasarkan lingkungan (local atau docker)
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:6379`,  // Default ke '127.0.0.1' jika environment tidak ada
});

redisClient.on("error", (err) => console.error("Redis Error:", err));
redisClient.on("connect", () => console.log("Redis connected!"));

(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
