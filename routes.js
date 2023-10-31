
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

async function getData2(){
const reponse = await fetch(api_url)
const data = await reponse.json();
console.log(data);


}
function getData(){
  return fetch(api_url).then(response => response.json())
}

let api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pagesize=${encodeURIComponent(params.pagesize)}`
let api_url2 = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}`;


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

  fetch(api_url2, {
  method: "POST",
  body: JSON.stringify({
    "query" : params.query
    dataType: ["Survey (FNDDS)"],
    pagesize : 5
  }),
  headers: {
    "Content-type": "application/json",

  }
})
  .then((response) => response.json())
  .then((json) => res.json({name : json}));
  res.json(null);
});


 
module.exports = router;