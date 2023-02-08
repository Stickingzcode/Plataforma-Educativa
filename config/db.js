const mongoose = require('mongoose');

const connectMongoDB = async (uri) => {
  if (!uri) throw new Error('MONGO_URI is required');
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};

module.exports = { connectMongoDB };
