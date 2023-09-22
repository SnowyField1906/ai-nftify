import * as dotenv from "dotenv";
dotenv.config();

export default () => ({
  host: "127.0.0.1",
  node_name: process.env.NODE_NAME,
  grpc_port: parseInt(process.env.GRPC_PORT, 10) || 3000,
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongo_url: process.env.MONGO_URL,
  },
  redis_url: process.env.REDIS_URL,
  private_key: process.env.PRIVATE_KEY,
  ggClientId: process.env.GG_CLIENT_ID,
  ggClientSecret: process.env.GG_CLIENT_SECRET,
});
