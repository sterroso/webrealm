import app from "./app.js";
import appConfig from "./src/config/app.config.js";

const PORT = appConfig.port || 3000;

const server = app.listen(PORT, () => {
    console.info(`Server listening requests on port ${PORT} ...`);
});

server.on("error", (error) => {
    console.error("An error occurred on the server:", error.message);
});