import pkg from '../../package.json';
import config from '../config';
import { createLogger, format, transports } from 'winston';
import { PapertrailTransport, PapertrailTransportOptions } from 'winston-papertrail-transport';

const winstonTransports = [];
const consoleTransport = new transports.Console({
  level: config.TR_PAPERTRAIL_LOGLEVEL,
  handleExceptions: true,
});
winstonTransports.push(consoleTransport);

if (!config.isDevelopment) {
  const papertrail = new PapertrailTransport({
    host: config.TR_PAPERTRAIL_HOST || '',
    port: Number(config.TR_PAPERTRAIL_PORT),
    hostname: `${pkg.name}:${config.NODE_ENV}`,
    level: config.TR_PAPERTRAIL_LOGLEVEL,
  });
  winstonTransports.push(papertrail);
}

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.simple(),
    format.printf(({ level, message }) => `[${level}] - ${message}`)
  ),
  //levels: winston.config.syslog.levels,
  transports: winstonTransports,
});

export default logger;
