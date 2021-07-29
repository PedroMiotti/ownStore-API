import buildDevLogger from './DevLogger';
import buildProdLogger from './ProdLogger';
import { Logger } from "winston";

let logger: Logger;

if(process.env.NODE_ENV === 'development')
    logger = buildDevLogger;
else
    logger = buildProdLogger;

export default logger;
