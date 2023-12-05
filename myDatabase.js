var express = require("express");
var mongoose = require("mongoose");
var DataModel = require("./models/Data");
const Data = require('./Data');

let myDatabase = function() {
}

 

myDatabase.prototype.postData = function(data,res) {
  let obj = {foodName:data.foodName,calories:data.calories,fats:data.fats,carbs:data.carbs,proteins:data.proteins,sugars:data.sugars};
  DataModel.create(obj,function(info) {
      
      res.json();

  });
}

module.exports = myDatabase;

 
