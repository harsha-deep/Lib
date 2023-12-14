// import * as winston from "winston";
// import BrowserConsole from 'winston-transport-browserconsole';

// const level = "debug";
// winston.configure({
//     transports: [
//         new BrowserConsole(
//             {
//                 format: winston.format.simple(),
//                 level,
//             },
//         ),
//     ],
// });

// winston.debug("DEBUG ", { a: 1, b: "two" });
// const { combine, timestamp, json, printf } = winston.format;

// const myFormat = printf(({ level, message, timestamp }) => {
//     return `[${timestamp}] [${level}] [${message}]`;
// });


// const logger = winston.createLogger({
//     level: process.env.LOG_LEVEL || 'info',
//     format: combine(
//         winston.format.colorize(),
//         timestamp({ format: "HH:mm:ss" }),
//         myFormat
//     ),
//     transports: [
//         new winston.transports.Console(),
//         new winston.transports.File({ filename: 'logs/server.log' })
//     ],
// });

// export default logger;