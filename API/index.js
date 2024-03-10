const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Assignment 2!');
});


app.use('/user',require("./Routes/User"))
app.use('/event',require("./Routes/Event"))
app.use('/team',require("./Routes/Team"))
app.use('/player',require("./Routes/Player"))

// Start the server
app.listen(port, () => {
  console.log("Server is running on http://localhost:"+ port);
})