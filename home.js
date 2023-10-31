$(document).ready(function(){        


    $(document).on('keypress',function(e) {

        if(e.which == 13) {
        
            clicked();
            
            
        }
    });

    }); 
function clicked()
{
    var query = $("#search").val();
$("#search").val("");
$.ajax({
url: "/food",
type: "GET",
data: {foodName:query},
success: add
});


}
function add(data){
if(!data){
    alert("ERROR");
}

console.log("success function")

var calories = 0;
var fats = 0;
var carbs = 0;
var proteins = 0;
var sugars =0;

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
		console.log(data.name.foods[j]);
		$("#food").append('<li>' + data.name.foods[j].description + " : Calories - " + calories +
    " kcal, Total Fats - " + fats + " g, Carbs - " + carbs + " g, Proteins - " + proteins +
    " g , Sugars - " + sugars + " g" + '</li>');
		}


}
