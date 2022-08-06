const express = require("express");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
require("dotenv").config();
 
const port = 4000;
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.oq9xl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});


async function run() { 
    try {
       await client.connect()
        
     const database = client.db("portfolio");
      const MessageCollection = database.collection("MessageCollection");
      const ProjectsCollection = database.collection("Projects");
      
      app.post("/users", async (req, res) => {
        const user = req.body
        // console.log(user)
        const result = await MessageCollection.insertOne(user)
        res.send(result)
        
      })

      app.get("/projects", async (req, res) => {
        
        const result = await ProjectsCollection.find().toArray()
        res.send(result)

      })



    }
    finally {
          // await client.close();
    }
    

}
run().catch(console.dir)


app.get("/", (req, res) => {
    res.send("hello world!!");
  });
 
  app.listen(port, () => {
    console.log("my port number is", port);
  });
