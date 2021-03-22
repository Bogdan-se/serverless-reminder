const ReminderDAO = require('../dao/ReminderDAO');
const handlerWrapper = require('../utils/handlerWrapper');

module.exports.handler = handlerWrapper((event) => {
    const {pathParameters: {id}} = event;

    return ReminderDAO.delete(id);
});
