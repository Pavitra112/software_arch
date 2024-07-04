// const AWS = require('aws-sdk');
// const dynamo = new AWS.DynamoDB.DocumentClient();

// exports.handler = async (event) => {
//   const index = event.pathParameters.index;
//   const newItem = JSON.parse(event.body);
//   const params = {
//     TableName: 'Items',
//     Key: { id: index },
//     UpdateExpression: 'set #name = :name',
//     ExpressionAttributeNames: { '#name': 'name' },
//     ExpressionAttributeValues: { ':name': newItem.name },
//   };
//   await dynamo.update(params).promise();
//   return { statusCode: 200, body: JSON.stringify(newItem) };
// };

const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase';

exports.handler = async (event) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const index = event.pathParameters.index;
  const newItem = JSON.parse(event.body);
  const collection = client.db('mydatabase').collection('items');
  await collection.updateOne({ _id: new ObjectId(index) }, { $set: newItem });
  await client.close();
  return { statusCode: 200, body: JSON.stringify(newItem) };
};