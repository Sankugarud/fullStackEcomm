require('dotenv').config();
const express = require('express');
const connectDatabase = require('./database/db');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const path = require("path");

var cors = require('cors')
const corsOptions = {
  origin: ['http://localhost:3000', 'https://warm-eclair-3a5dbc.netlify.app'],  credentials: true,
};

const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/build")));



const Productroutes = require('./router/productRouter');
const orderroutes = require('./router/orderRouter');
const userRouter = require('./router/userRouter');
const paymentRouter = require('./router/paymentRouter');

app.use('/api/v1', Productroutes);
app.use('/api/v1', orderroutes);
app.use('/api/v1', userRouter);
app.use('/api/v1', paymentRouter);




connectDatabase()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Error connecting to the database 2:', error);
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
  });
