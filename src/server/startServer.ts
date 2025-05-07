import "dotenv/config";
import createDebug from "debug";
import chalk from "chalk";
import app from "./app.js";

const debug = createDebug("restaurants:server");

const startServer = (port: number): void => {
  app.listen(port, () => {
    debug("--------------------------------");
    debug(
      `✅ ${chalk.bold.magentaBright("Listening at")} ${chalk.green(
        `http://localhost:${port}`,
      )} ✅`,
    );
    debug("--------------------------------");
  });
};

export default startServer;
