const ReminderDAO = require('../dao/ReminderDAO');
const handlerWrapper = require('../utils/handlerWrapper');

module.exports.handler = handlerWrapper((event) => {
    const {body} = event;
    const {label} = JSON.parse(body);

    return ReminderDAO.create({
        label,
    });
});
