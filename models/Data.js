var mongoose = require("mongoose");

var Data = mongoose.model("Info",{
    ident: {
        required: true,
        unique: true,
        type:Number
    },
    name: String,
    grade: Number,
    residence: String
});



module.exports = Data;