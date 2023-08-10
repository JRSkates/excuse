const mongoose = require('mongoose');

beforeAll((done) => {
mongoose.connect("mongodb://localhost:27017/excuse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', () => {
    console.log('Connected to MongoDB');
    done();
  });
})

afterAll(() => {
  mongoose.disconnect();
});