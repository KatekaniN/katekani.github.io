const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // Adjust the URL for your MongoDB instance
const dbName = 'BizBacker'; // Replace with your database name

let db;

async function connectDB() {
  if (db) return db;

  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB');
  return db;
}

module.exports = { connectDB };