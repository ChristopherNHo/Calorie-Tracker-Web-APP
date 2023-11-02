
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
	//ask server for array information, multiply values and send back here
	console.log("serving size function " + number)
	$(".serving").empty();
	$(".serving").text("How many servings? (Serving size = 100g)")
	$(".serving").append('<input id="servings" type="number" value="1" >');
	
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



// HARD CODED, FIX LATER

		if(j == 0){
			$("#food").append('<li> <input id=option0 onclick="askServings(0)" type="button"  /><li>');
			$("#option0").val(values);
		}
		else if(j == 1){
			$("#food").append('<li> <input id=option1 onclick="askServings(1)" type="button"  /><li>');
			$("#option1").val(values);
		}
		else if(j == 2){
			$("#food").append('<li> <input id=option2 onclick="askServings(2)" type="button"  /><li>');
			$("#option2").val(values);
		}
		else if(j == 3){
			$("#food").append('<li> <input id=option3 onclick="askServings(3)" type="button"  /><li>');
			$("#option3").val(values);
		}
		else if(j == 4){
			$("#food").append('<li> <input id=option4 onclick="askServings(4)" type="button"  /><li>');
			$("#option4").val(values);
		}
		
	}


}
$(document).ready(function(){        


    $(document).on('keypress',function(e) {

        if(e.which == 13) {
        
            clicked();
            
            
        }
    });

    }); 
