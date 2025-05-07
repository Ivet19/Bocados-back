import express from "express";
import morgan from "morgan";
import handleHealthCheckStatus from "./middlewares/handleHealthCheckStatus/handleHealthCheckStatus.js";

const app = express();

app.use(morgan("dev"));

app.get("/", handleHealthCheckStatus);

export default app;
