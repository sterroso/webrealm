import express from "express";
import cors from "cors";
import appConfig from "./src/config/app.config.js";

// Create app
const app = express();

// Set app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: (origin, next) => {
        if (appConfig.cors.origins.indexOf(origin) !== -1) {
            return next(null, origin);
        } else {
            return next(new Error("Origin not allowed by CORS!"));
        }
    },
    methods: appConfig.cors.methods,
}));

// App routes


// Module exports
export default app;