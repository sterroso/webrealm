import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT || 5000,
    mongo: {
        uri: process.env.MONGO_CONNECTION_STRING || "NO CONNECTION",
    },
    cors: {
        origins: [/localhost/gi, "127.0.0.1"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
}