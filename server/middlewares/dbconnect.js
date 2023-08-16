import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.DB_CONNECTION_STRING
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let db;

async function dbconnect() {

    if (!uri) throw new Error('no connection string')

    await client.connect();
    db = await client.db("Pavel");
    console.log("You successfully connected to MongoDB!");

}
function getDB() {
    return db
}

export { dbconnect, getDB }