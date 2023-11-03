let chosenOption = 0;


function clicked()
{
    var query = $("#search").val();
$("#search").val("");
$.ajax({
url: "/foodsearch",
type: "GET",
data: {foodName:query},
success: add
});


}
function askServings(number)
{
	chosenOption = number;
	console.log("serving size function " + number)
	$(".serving").empty();
	$(".serving").text("How many servings of option " + (number+1) +  "? (Serving size = 100g)")
	$(".serving").append('<input id="servings" type="number" value="1" >');
	
}
function updateTotal(multiplier)
{
	alert(multiplier);
	$(".serving").empty();
	$.ajax({
	url: "/getfoodlist",
	type: "GET",
	data: {index:chosenOption}
});
}
function addTotal(){
	console.log("THIS WORKS FOOD ADDED")
}
function add(data){
if(!data){
    alert("ERROR");
}

console.log("success function")

$(".serving").empty();
$("#food").empty();

var calories = 0;
var fats = 0;
var carbs = 0;
var proteins = 0;
var sugars = 0;


for(var j = 0;j<5;j++){
	var nutrients = data.name.foods[j].foodNutrients

		for(var i = 0;i<nutrients.length;i++){
			if (nutrients[i].nutrientId == 1008){
				calories = nutrients[i].value;
			}
			else if (nutrients[i].nutrientId == 1004){
				fats = nutrients[i].value;
			}
			else if (nutrients[i].nutrientId == 1005){
				carbs = nutrients[i].value;
			}
			else if (nutrients[i].nutrientId == 1003){
				proteins = nutrients[i].value;
			}
			else if (nutrients[i].nutrientId == 2000){
				sugars = nutrients[i].value;
			}

		}
		//send nutrient values to server, have server store it in an array
		var values = "Choose option " + (j+1);
		$("#food").append('<li>' + data.name.foods[j].description + " : Calories - " + calories +
    " kcal, Total Fats - " + fats + " g, Carbs - " + carbs + " g, Proteins - " + proteins +
    " g , Sugars - " + sugars + " g" +  '</li>');

		$.ajax({
            url: "/addfoodlist",
            type: "POST",
            data: {foodName:data.name.foods[j].description, calories:calories, fats:fats, carbs:carbs, proteins:proteins, sugars:sugars},  
            dataType: "json"
          });



// HARD CODED, FIX LATER

		if(j == 0){
			$("#food").append('<li> <input id=option0 onclick="askServings(0)" type="button"  /></li>');
			$("#option0").val(values);
		}
		else if(j == 1){
			$("#food").append('<li> <input id=option1 onclick="askServings(1)" type="button"  /></li>');
			$("#option1").val(values);
		}
		else if(j == 2){
			$("#food").append('<li> <input id=option2 onclick="askServings(2)" type="button"  /></li>');
			$("#option2").val(values);
		}
		else if(j == 3){
			$("#food").append('<li> <input id=option3 onclick="askServings(3)" type="button"  /></li>');
			$("#option3").val(values);
		}
		else if(j == 4){
			$("#food").append('<li> <input id=option4 onclick="askServings(4)" type="button"  /></li>');
			$("#option4").val(values);
		}
		
	}


}
$(document).ready(function(){        

	$("#search").keydown( function( event ) {
        if ( event.which === 13 ) {
          clicked();
          event.preventDefault();
          return false;
        }
    });
    
    $(".serving").keydown( function( event ) {
        if ( event.which === 13 ) {
          //alert("serving button + enter")
          updateTotal($("#servings").val())
          event.preventDefault();
          return false;
        }
      }); 
  });

