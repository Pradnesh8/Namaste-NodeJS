const { MongoClient } = require('mongodb')
const { URI } = require('./database.js');


const client = new MongoClient(URI)

// Database Name
const dbName = 'User'

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');
    // console.log("Users =>", getUsers);
    const userInfo = {
        firstname: 'John',
        lastname: 'Wick',
        city: 'Ohio',
        phoneNo: '9876543210'
    }
    const addUsers = await collection.insertMany([userInfo]);
    console.log("Users added =>", addUsers);
    const updateUser = await collection.updateMany({ firstname: 'John' }, { $set: { city: 'New York' } })
    console.log("User updated=>", updateUser)
    const addUser = await collection.insertOne({
        firstname: 'Jane',
        lastname: 'Doe',
        city: 'New',
        phoneNo: '9876543210'
    });
    console.log("Users added =>", addUser);
    const deleteUsers = await collection.deleteMany({ firstname: 'Jane' });
    console.log("Users deleted=>", deleteUsers);
    const getUsers = await collection.find({}).toArray();
    console.log("Users =>", getUsers);
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());