const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import employee model
const employee = require('./model/employee');

// Import routes
const employeeRoutes = require('./routes/employee.routes');

const app = express();
app.use(express.json());
app.use(cors());

// connect with database
// const uri =
//   'mongodb+srv://nipuna:nipuna@cluster0.0emsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

  // routes
app.use('/api/employees', employeeRoutes);

//listen to port
app.listen(5000, () => {
  console.log('server running on port 5000');
});
