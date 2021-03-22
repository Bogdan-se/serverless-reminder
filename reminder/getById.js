const ReminderDAO = require('../dao/ReminderDAO');
const NotFound = require('../exceptions/notFound');
const handlerWrapper = require('../utils/handlerWrapper');

module.exports.handler = handlerWrapper(async (event) => {
    const {pathParameters: {id}} = event;

    const reminder = await ReminderDAO.getById(id);

    if (!reminder) {
        throw new NotFound();
    }

    return reminder;
});
