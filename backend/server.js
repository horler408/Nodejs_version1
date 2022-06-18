const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const userRoute = require('./v1/routes/userRoute.js');
const { errorHandler, notFound } = require('./middleware/errorMiddleware.js');
const dbConnect = require('./config/dbRemote.js');

dotenv.config();
// dbConnect();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use('/api/v1', userRoute);

// --------------------------deployment------------------------------
// const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
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
