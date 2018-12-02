// const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');


  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5c04185435306c12307bfae7")
  },{
    // Add mongo db update operators
    $set: {
      text: 'New Yolo'
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })


  db.close();
  // ObjectId("5c04185435306c12307bfae7")

});