// const AWS = require('aws-sdk');
// const dynamo = new AWS.DynamoDB.DocumentClient();

// exports.handler = async (event) => {
//   const item = JSON.parse(event.body);
//   await dynamo.put({ TableName: 'Items', Item: item }).promise();
//   return { statusCode: 201, body: JSON.stringify(item) };
// };

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase';

exports.handler = async (event) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const item = JSON.parse(event.body);
  const collection = client.db('mydatabase').collection('items');
  await collection.insertOne(item);
  await client.close();
  return { statusCode: 201, body: JSON.stringify(item) };
};