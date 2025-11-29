//This file defines and exports the schema for the user collection in the database
import mongoose from 'mongoose';

//Defines schema to be used for user information in the database
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
    //Enables timestamps option. Timestamps create createdAt and updatedAt fields in the schema which are automatically updated by mongodb. 
    timestamps:true
});

//Creates mongoose model. Model will be used for CRUD operations and define how documents are structured
const User = mongoose.model('User', userSchema);
export default Blog; 