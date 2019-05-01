import * as dotenv from "dotenv";

dotenv.config();

import * as bodyParser from "body-parser";
import * as express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import TxnHistory from "./entity/TxnHistory";
import logger from "./lib/logger";
import initRoutes from "./routes/index";

const app = express();
async function initDatabase() {
  return createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [TxnHistory],
  });
}

function startServer() {
  // const app = express()
  app.use(bodyParser.json());
  initRoutes(app);

  app.listen(process.env.PORT, () => {
    logger.info(`Server started on port ${process.env.PORT}!`);
  });
}

async function initApp() {
  await initDatabase();
  startServer();
}

initApp().catch(logger.error);
export default app;
