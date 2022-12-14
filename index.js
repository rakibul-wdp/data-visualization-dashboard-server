const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.izjxu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const chartDataCollection = client.db('data_visualization_dashboard').collection('charts_data');

    app.get('/chart', async (req, res) => {
      const query = {};
      const cursor = chartDataCollection.find(query);
      const charts = await cursor.toArray();
      res.send(charts);
    });
  } finally {
    // some kind of code that stope this function
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from Data-visualization-dashboard');
});

app.listen(port, () => {
  console.log(`Data-visualization-dashboard app listening on port ${port}`);
});
