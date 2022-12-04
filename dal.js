const { append } = require('express/lib/response');

const MongoClient = require('mongodb').MongoClient;
const url         = mongoose.connect(process.env.MONGODB.URI || 'mongodb://localhost/myproject');
let db            = null;
const PORT = process.env.PORT || 8080;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    console.log("Connected successfully to jelyn server");

    // connect to myproject database
    db = client.db('myproject');
});

if (process.env.NODE_ENV ==='production'){
    append.use(express.static('build'));
}

// create user account
function create(name, email, password) {
    return new Promise((resolve, reject)=>{
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err) : resolve(doc);
        })
    })
}

// all users
function all(){
    return new Promise((resolve) => {
        const customers = db.collection('users').find({}).toArray(function(err,docs){
            err ? reject(err) : resolve(docs);
        });
    })
}

module.exports = {create, all};