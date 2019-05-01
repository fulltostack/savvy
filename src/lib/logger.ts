import * as winston from "winston";

const transports = [
  new winston.transports.Console({
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  }),
];

const logger = new winston.Logger({
  transports, exitOnError: false,
});

export default logger;
