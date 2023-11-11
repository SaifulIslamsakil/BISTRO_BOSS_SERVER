const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT | 5000
require('dotenv').config()

app.use(express.json())
app.use(cors())




const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.8amboqe.mongodb.net/?retryWrites=true&w=majority`;

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
    const ManuCollaction = client.db("bistroBossDB").collection("ManuDB")
    const ReviewCollaction = client.db("bistroBossDB").collection("ReviewDB")
    app.get("/manuData", async(req,res)=>{
        const result = await ManuCollaction.find().toArray()
        res.send(result)
    })
    app.get("http://localhost:5000/reviewData", async(req,res)=>{
        const result = await ReviewCollaction.find().toArray()
        res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res)=>{
    res.send("big boss is comming")
})

app.listen(port, ()=>{
    console.log(`big boss server in runing on ${port}`)
})