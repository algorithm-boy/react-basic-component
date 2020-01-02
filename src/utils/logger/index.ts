import { Logger } from 'peeler-js';

export const logger = new Logger({
  debug: true,
  logLevel: 'warn',
  logPrefix: 'RC-BASIC'
});

export default logger;