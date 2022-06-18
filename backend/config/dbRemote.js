const mongoose = require('mongoose');

const dbConnect = () => {
  mongoose
    .connect(
      'mongodb+srv://arseling:UhXoJsWXNbNNjgGk@cluster0.nnle7.mongodb.net/nodejs_version1?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => {
      console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
      console.log('Unable to connect to MongoDB Atlas!');
      console.error(error);
    });
};

module.exports = dbConnect;

// import mongoose from "mongoose";
// import colors from "colors";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.bold);
//     process.exit();
//   }
// };

// export default connectDB;
