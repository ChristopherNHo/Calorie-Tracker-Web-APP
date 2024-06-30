var express = require("express");
var mongoose = require("mongoose");
var DataModel = require("./models/Data");
const Data = require('./Data');

let myDatabase = function() {
}

 

myDatabase.prototype.postData = function(data,res) {
  let obj = {foodName:data.foodName,calories:data.calories,fats:data.fats,carbs:data.carbs,proteins:data.proteins,sugars:data.sugars,totalIndex:data.totalIndex};

  let food =  new DataModel(obj);


  console.log(food);

  food.save();
}
myDatabase.prototype.getData = function(res) {
  console.log("Inside of getData");
  DataModel.find({},function(error,items) {   
      console.log(items);

      if (error) {
        console.log(error)
          return res.json({error:true});
      }
      else if (items == null) {
          return res.json({error:true});
      }

      res.json(items);
   });
}
myDatabase.prototype.putData = function(oldIndex,res) {
  //let obj = {ident:data.ident,name:data.name,grade:data.grade,residence:data.residence};  
  DataModel.findOneAndUpdate({totalIndex:oldIndex},
    {totalIndex:(oldIndex-1)},function() {
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

 
