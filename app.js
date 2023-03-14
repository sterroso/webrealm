import express from "express";
import cors from "cors";
import appConfig from "./src/config/app.config.js";

// Import routers
import UsersRouter from "./src/routes/user.router.js";

// Create app
const app = express();

// Set app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    methods: appConfig.cors.methods,
}));

// App routes
app.use("/api/users", UsersRouter);

// Module exports
export default app;