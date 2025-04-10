import { serverConfig } from "./server.config.js";
import { logger } from "./logger.config.js";

export const { PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, FLIGHT_SERVICE } =
  serverConfig;
export { logger };
