let logger = require('../middleware/logger');
class StatisticsInfo {
    constructor() {
        this.counter = 0;
    }
    parseSession(session)  {
        if (!session) {
            return;
        }
        if (session.isVisit) {
            session.isVisit++;            
        } else {
            session.isVisit = 1;
            logger.info(session);
            logger.info('first-visit');
        }
    }
    parseCookie(cookie) {
        if (!cookie) {
            return;
        }
        logger.info(cookie);
    }
}

let infoStatistics = new StatisticsInfo();

module.exports = infoStatistics;
