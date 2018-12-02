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

  // delete many
  // db.collection('Todos').deleteMany({text: 'Something to do'}).then ((docs)=>{
  //   console.log(JSON.stringify(docs, undefined, 2));
  // });

  // db.collection('Todos').findOneAndDelete({_id: new ObjectID("5c03c99cda5291a347886dc2")}).then((result)=> {
  //   console.log(JSON.stringify(result, undefined, 2));
  // })

  // db.collection('Todos').deleteOne({
  //   _id: new ObjectID("5c03c99cda5291a347886dc2")
  // }).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 2));
  // });

  db.collection('Todos').deleteOne({
    _id: new ObjectID("5c03fe8624490dacc1b15975")
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });


  // db.close();

});