const mongoose = require('mongoose');

// Define the schema for storing form data
const formDataSchema = new mongoose.Schema({
    Bedroom: Number,
    Bathroom: Number,
    Floors: Number,
    Year: Number,
    RoadWidth: Number,
    Area_in_sqft: Number,
    Backyard: Boolean,
    Balcony: Boolean,
    Fencing: Boolean,
    Frontyard: Boolean,
    Parking: String,
    Jacuzzi: Boolean,
    KidsPlayground: Boolean,
    Lawn: Boolean,
    ModularKitchen: Boolean,
    StoreRoom: Boolean,
    SwimmingPool: Boolean,
    City: String,
    Face: String,
    RoadType: String,
    email: String,
    prediction: Number
});

// Create and export the model
const FormData = mongoose.model('FormData', formDataSchema);
module.exports = FormData;
