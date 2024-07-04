// const AWS = require('aws-sdk');
// const dynamo = new AWS.DynamoDB.DocumentClient();

// exports.handler = async (event) => {
//   const items = await dynamo.scan({ TableName: 'Items' }).promise();
//   return { statusCode: 200, body: JSON.stringify(items.Items) };
// };

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase';

exports.handler = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const collection = client.db('mydatabase').collection('items');
  const items = await collection.find().toArray();
  await client.close();
  return { statusCode: 200, body: JSON.stringify(items) };
};