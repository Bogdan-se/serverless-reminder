const ReminderDAO = require('../dao/ReminderDAO');
const handlerWrapper = require('../utils/handlerWrapper');

module.exports.handler = handlerWrapper(() => {
    return ReminderDAO.list();
});
