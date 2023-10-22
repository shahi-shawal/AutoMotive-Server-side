const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ListSearchIndexesCursor, ObjectId } = require('mongodb');
const app= express();
const port = process .env .PORT || 5001;

// middleare
 app.use(express.json())
 app.use(cors())

app.get("/", (req, res)=>{
    res.send("Car Show server Running")
})

// shahishawal
// B6X02wGT2oSPgpxQ


const uri = "mongodb+srv://shahishawal:B6X02wGT2oSPgpxQ@cluster0.rdrxynj.mongodb.net/?retryWrites=true&w=majority";

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
    // await client.connect();
    const database = client.db("carproductDB");
    const productCollection = database.collection("haiku");
    const cartUserCollection = database.collection("Cart")
   
  app.get("/products", async(req, res)=>{
    const result = await productCollection.find().toArray()
    res.send(result)

  })  

  app.get("/cart", async(req, res)=>{
    const result = await cartUserCollection.find().toArray()
    res.send(result)

  }) 

  app.get("/cart/:id", async(req, res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await cartUserCollection.findOne(query)
    console.log(result);
    res.send(result)
  })

  app.delete("/cart/:id", async(req, res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await cartUserCollection.deleteOne(query)
    console.log(result);
    res.send(result)
  })

  //  const carbrand =["Mazda", "Opel"]
  app.get("/products/:brandname", async(req, res)=>{
   const brandname = req.params.brandname;
    const query = { brandname:brandname}
    const result = await productCollection.find(query).toArray()
    if ((await productCollection.countDocuments(query)) === 0) {
      res.send("No documents found!");
    }
    console.log(result);
    res.send(result)
    
  })
  

  app.get("/products/1/:id", async(req, res)=>{
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const result = await productCollection.findOne(query)
    console.log(result);
    res.send(result)
  })




  app.post("/products", async(req, res)=>{
    const products = req.body
    const result= await productCollection.insertOne(products)
    console.log(result);
    res.send(result)
  })


  app.post("/cart", async(req, res)=>{
    const carts = req.body
    const result= await cartUserCollection.insertOne(carts)
    console.log(result);
    res.send(result)
  })



  app.patch("/products/1/:id", async(req, res)=>{
    const id = req.params.id;
    const filter= {_id: new ObjectId(id)}
    const products= req.body;
    
    const updateuser= {
      $set:{
        name:products.name,
        image:products.image,
        brandname: products.brandname,
        price:products.price,
        type:products.type,
        rating: products.rating
      },
    };
    const result = await productCollection.updateOne(filter,updateuser)
   res.send(result) 
  })
   


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, ()=>{
     console.log(`Port is Running form: ${port}`);
})