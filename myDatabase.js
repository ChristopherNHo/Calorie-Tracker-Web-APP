var express = require("express");
var mongoose = require("mongoose");
var DataModel = require("./models/Data");
const Data = require('./Data');

let myDatabase = function() {
}

 

myDatabase.prototype.postData = function(data,res) {
  let obj = {foodName:data.foodName,calories:data.calories,fats:data.fats,carbs:data.carbs,proteins:data.proteins,sugars:data.sugars,totalIndex:data.totalIndex};
  DataModel.create(obj,function(info) {
      
      res.json();

  });
}

myDatabase.prototype.deleteData = function(totalIndex,res) {
	console.log(totalIndex);
    DataModel.remove({totalIndex:totalIndex},function() {   
    	res.json();
    });
}

module.exports = myDatabase;

 
