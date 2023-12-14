const winston = require("winston");
const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
    const consoleLog = process.env.NODE_ENV === 'development' ? true : false;
    const logMessage = consoleLog
        ? `[${timestamp}] [info] ${message}`
        : `[${timestamp}] [error] ${message}`;

    return logMessage;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        process.env.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        myFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/server.log' })
    ],
});

// Disable logging to the console in a test environment
if (process.env.NODE_ENV === 'test') {
    logger.transports.find(transport => transport instanceof winston.transports.Console).silent = true;
}

module.exports = logger;
