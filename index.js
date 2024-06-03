
var Express = require('express');
var Mongoclient=require('mongodb').MongoClient;
var cors=require('cors');
const multer=require('multer');

var app = Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://admin:admin@cluster0.uyzsxc1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";




var DATABASENAME="todoappdb";
var database;



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.uyzsxc1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/api/todoapp/GetNotes',(req,res)=>{
    database.collection("todoappcollection").find({}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/api/todoapp/AddNote',multer().none(),(req,res)=>{
  database.collection("todoappcollection").count({}, function(err, result){
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result.ops[0]);
    }
    database.collection("todoappcollection").insertOne({
        id:(numofDocs+1).toString(),
        description:request.body.newNotes
    });
    response.json("Note added successfully");
    })
});