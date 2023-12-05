var mongoose = require("mongoose");

var Data = mongoose.model("Info",{
    foodName: {
        required: true,
        unique: true,
        type:String
    },
    calories: Number,
    fats: Number,
    carbs: Number,
    proteins: Number,
    sugars: Number
});



module.exports = Data;
