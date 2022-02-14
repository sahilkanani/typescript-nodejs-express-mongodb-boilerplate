import winston from 'winston';
import { getEnv } from '@utils/common';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'white',
};
winston.addColors(colors);

const getLevel = () => {
  const env = getEnv();
  return env === 'development' ? 'debug' : 'warn';
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transports = new winston.transports.Console();

const logger = winston.createLogger({
  level: getLevel(),
  levels,
  format,
  transports,
});

export default logger;
