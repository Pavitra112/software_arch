// const AWS = require('aws-sdk');
// const dynamo = new AWS.DynamoDB.DocumentClient();

// exports.handler = async (event) => {
//   const index = event.pathParameters.index;
//   await dynamo.delete({ TableName: 'Items', Key: { id: index } }).promise();
//   return { statusCode: 200, body: JSON.stringify({}) };
// };

const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase';

exports.handler = async (event) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const index = event.pathParameters.index;
  const collection = client.db('mydatabase').collection('items');
  await collection.deleteOne({ _id: new ObjectId(index) });
  await client.close();
  return { statusCode: 200, body: JSON.stringify({}) };
};