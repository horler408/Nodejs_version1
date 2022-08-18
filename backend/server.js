const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const userRoute = require('./v1/routes/userRoute.js');
const productRoute = require('./v1/routes/productRoute.js');
const orderRoute = require('./v1/routes/orderRoute.js');
const noteRoute = require('./v1/routes/notesRoute');

const productRouteV2 = require('./v2/routes/productRoute');
const categoryRouteV2 = require('./v2/routes/categoryRoute');
const { errorHandler, notFound } = require('./middleware/errorMiddleware.js');
const dbConnect = require('./config/dbRemote.js');
const cors = require('./config/cors');

dotenv.config();
dbConnect();

const app = express(); // main thing

app.use(express.json()); // to accept json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors);

app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/notes', noteRoute);

// Version 2 routes
app.use('/api/v2/products', productRouteV2);
app.use('/api/v2/categories', categoryRouteV2);

// --------------------------deployment------------------------------
// const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
