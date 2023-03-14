import mongoose from "mongoose";
import appConfig from "./app.config.js";

mongoose.set("strictQuery", false);
mongoose.set("sanitizeFilter", true);

mongoose.connect(appConfig.mongo.uri, (error) => {
    if (error) {
        console.error("¡No se pudo establecer conexión con MongoDB!");
        console.error(error.message);
    } else {
        console.info("¡Conectado a MongoDB!");
    }
});
