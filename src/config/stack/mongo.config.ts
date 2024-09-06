export function MongoConfig() {
  return {
    /**
     * ---------------------------------------------------
     * @description URL de la base de datos MongoDB
     * @default 'http://127.0.0.1:27017/my-app'
     * ---------------------------------------------------
     */
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/my-app',
  };
}
