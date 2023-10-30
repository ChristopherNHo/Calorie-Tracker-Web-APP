
let path = require("path");
let express = require("express");
let router = express.Router();
let fetch = require("node-fetch");



//PARAMETERS WE PASS WHEN WE DO AN API CALL

let params = {
  api_key:'G5URR8VauFywFkn8SauA8YMn7zRGG1EfZSSinmK5',
  query : 'apple',
  dataType: ["Survey (FNDDS)"],
  pagesize: 5,

}
let params2 = {
  api_key:'b67bbb215609422e83e5ca852946274d',
  query : 'apple',
  dataType: ["Survey (FNDDS)"],
  pagesize: 5,

}


function getData(){
  return fetch(api_url).then(response => response.json())
}

let api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pagesize=${encodeURIComponent(params.pagesize)}`




//getData().then(data=> console.log(data.foods[0].foodNutrients[0].value));


/* getData().then(
  (data)=> {
      console.log(data.foods[0].foodNutrients[0].value);
  }
) */

router.get("/",function(req,res) {
  res.sendFile(path.resolve(__dirname,"index.html"));
});

 router.get("/food",function(req,res) {
  console.log("GET REQUEST")

params.query = req.query.foodName;
console.log(params.query);
  let protein;
  getData().then(
    (data)=> {
        console.log(data)
        protein = data.results;
        console.log(protein);
        res.json({val:protein,name:params.query});
       
    }
  )

  
  
});


 
module.exports = router;
