const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const port = process.env.PORT;

app.set('trust proxy', 1);

const allowed_origin = 'http://localhost:3000';

const cors_options = {
  origin: allowed_origin,
  credentials: true,
};

app.use(cors(cors_options));

app.use(express.json());

app.get('/', (req, res) => {
  console.log('root');
  res.send('Hello from root!');
});

app.use('/', routes);

app.listen(port, () => {
    console.log(`Joyboy has arrived !!!!!`);
});