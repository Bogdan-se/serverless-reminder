const AWS = require('aws-sdk');
const {v4} = require('uuid');

const REMINDER_TABLE = process.env.REMINDER_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

class ReminderDAO {
    async list () {
        const params = {
            TableName: REMINDER_TABLE,
        };

        const { Items } = await dynamoDbClient.scan(params).promise();

        return Items;
    }

    async getById (id) {
        const params = {
            TableName: REMINDER_TABLE,
            Key: {
                id,
            },
        };

        const { Item } = await dynamoDbClient.get(params).promise();

        return Item;
    }

    async create (data) {
        const params = {
            TableName: REMINDER_TABLE,
            Item: {
                id: v4(),
                ...data,
            },
        };

        await dynamoDbClient.put(params).promise();

        return params.Item;
    }

    async update (id, {label}) {
        const params = {
            TableName: REMINDER_TABLE,
            Key: {
                id,
            },
            ExpressionAttributeValues: {
                ':label': label,
            },
            UpdateExpression: 'SET label = :label',
            ReturnValues: 'ALL_NEW',
        };

        const {Attributes} = await dynamoDbClient.update(params).promise();
        return Attributes;
    }

    async delete (id) {
        const params = {
            TableName: REMINDER_TABLE,
            Key: {
                id,
            },
        };
        return dynamoDbClient.delete(params).promise();
    }
}

module.exports = new ReminderDAO();
