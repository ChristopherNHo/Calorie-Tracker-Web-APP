var mongoose = require("mongoose");

const { Schema } = mongoose;

const foodSchema = new Schema({
    foodName: {
        required: true,
        unique: true,
        type:String
    },
    calories: Number,
    fats: Number,
    carbs: Number,
    proteins: Number,
    sugars: Number,
    totalIndex: Number
});

var Data = mongoose.model("items",foodSchema);



module.exports = Data;
