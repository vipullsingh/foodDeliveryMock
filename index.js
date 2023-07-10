// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// // Create Express app
// const app = express();

// // Parse requests of content-type - application/json
// app.use(bodyParser.json());

// // Parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false
//   })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Start the server
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB', err);
//     process.exit(1);
//   });

// // Define API routes
// app.use('/api', require('./routes/authRoutes'));
// app.use('/api', require('./routes/userRoutes'));
// app.use('/api', require('./routes/restaurantRoutes'));
// app.use('/api', require('./routes/orderRoutes'));

// // Start the server
// const PORT = process.env.PORT || 3030;
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB');

    app.get('/',(req,res)=>{
        res.send('Welcome to Food Delivery app Backend System')
    })
    
    // Define API routes
    app.use('/api', require('./routes/authRoutes'));
    app.use('/api', require('./routes/userRoutes'));
    app.use('/api', require('./routes/restaurantRoutes'));
    app.use('/api', require('./routes/orderRoutes'));

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
