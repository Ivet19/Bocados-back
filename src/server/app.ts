import express from "express";
import morgan from "morgan";
import handleHealthCheckStatus from "./middlewares/handleHealthCheckStatus/handleHealthCheckStatus.js";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.get("/", handleHealthCheckStatus);

app.use(handleErrors);

export default app;
