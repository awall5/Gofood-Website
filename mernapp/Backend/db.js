const mongoose = require('mongoose');

const mongoDB = async () => {
  try {
    
    await mongoose.connect('mongodb+srv://awal05:1234@cluster0.eadcm.mongodb.net/gofoodmern?retryWrites=true&w=majority');
    console.log('MongoDB connected successfully');

    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

 
    global.food_items = fetched_data;
    global.foodCategory = foodCategory;

    // console.log( global.food_items);
    // console.log( global.foodCategory);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = mongoDB;
