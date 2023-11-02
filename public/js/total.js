$(document).ready(function(){        
	console.log("HERE")
	$.ajax({
	url: "/checktotal",
	type: "GET",
	data: null,
	success: add
	});
    


 }); 
function add(data){

	if(data){
		console.log(data);
		let str = "<tr> <th>" + data.foodName +  "</th> <th>" + data.fats + "</th> <th>" + data.carbs + "</th> <th>" + data.proteins+ "</th> <th>" + data.sugars+ "</th> <th>" + data.calories + "</th> </tr>";
		$("#total").append(str);

	}
	else{
		console.log("EMPTY")
	}
}
