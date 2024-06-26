let path = require("path");
let express = require("express");
let router = express.Router();
let fetch = require("node-fetch");

let foodList2;

let total = [];
let totalIndex = 0;
//PARAMETERS WE PASS WHEN WE DO AN API CALL

let params = {
  api_key:'G5URR8VauFywFkn8SauA8YMn7zRGG1EfZSSinmK5',
  query : 'apple',
  dataType: ["Survey (FNDDS)"],
  pagesize: 5,
}

let api_url2 = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}`;


router.get("/",function(req,res) {
  	var thePath = path.resolve(__dirname,"public/views/index.html");
	   res.sendFile(thePath);	
});

const myDatabase = require('./myDatabase');
let db = new myDatabase();

const Data = require('./Data');

router.get("/total",function(req,response) {
  response.sendFile(__dirname + "/public/views/total.html");
});
router.get("/about",function(req,response) {
  response.sendFile(__dirname + "/public/views/about.html");
});
router.get("/foodsearch",function(req,res) {
  console.log("GET REQUEST")

  params.query = req.query.foodName;

  fetch(api_url2, {
  method: "POST",
  body: JSON.stringify({
    "query" : params.query,
    dataType: 
    ["Survey (FNDDS)",
    "Foundation",
    "SR LEGACY",
    "Branded"
    ],
    pagesize : 5,
    sortOrder: "asc"
  }),
  headers: {
    "Content-type": "application/json",

  }
})
  .then((response) => response.json())
  .then((json) => {
    

    if(json.totalHits<1){
      res.json(null);
    }
    else{
    res.json({name : json})
    }
    
  })
  
});


router.delete("/deletefoodlist",function(req,res) {
console.log("DELETE FOOD LIST")

console.log(req.body.index)
const newtotal = total.splice((req.body.index-1), 1);

db.deleteData((req.body.index-1),res);

if(req.body.index-1 < totalIndex){
  for(let i = req.body.index;i<totalIndex;i++){
    db.putData(i,res);
  }
}

totalIndex--;

console.log(total);
res.json(null);


});

router.put("/getfoodlist",function(req,res) {
console.log("CHANGE ITEM FROM FOOD LIST")

foodList2 = req.body.food;
console.log(req.body.food);
console.log(foodList2);

foodList2.calories *= req.body.multiplier;
foodList2.fats *= req.body.multiplier;
foodList2.carbs *= req.body.multiplier;
foodList2.proteins *= req.body.multiplier;
foodList2.sugars *= req.body.multiplier;

let foodName = foodList2.foodName;
let calories = foodList2.calories;
let fats = foodList2.fats;
let carbs = foodList2.carbs;
let proteins = foodList2.proteins;
let sugars = foodList2.sugars;


let obj = new Data(foodName,calories,fats,carbs,proteins,sugars,totalIndex);

db.postData(obj,res);


console.log(foodList2);

total[totalIndex] = foodList2

totalIndex++;
res.json(foodList2);
});

router.post("/addfood",function(req,res) {
console.log("ADDED POST")
var temp = {foodName : req.body.foodName,calories: req.body.calories, fats: req.body.fats,carbs:req.body.carbs,proteins:req.body.proteins,sugars:req.body.sugars};
total[totalIndex] = temp;
totalIndex++;
res.json(total[totalIndex]);


});
router.get("/checktotal",function(req,res) {
console.log("CHECK GET");

db.getData(res);

/*
if(total[0]==null){
  res.json(null);
}
else{
    res.json({total:total,index:totalIndex});
  }

*/
});



 
module.exports = router;
