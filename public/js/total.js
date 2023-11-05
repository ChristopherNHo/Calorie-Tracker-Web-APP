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
let totalCal = 0;
let totalProtein =0;
let totalCarb = 0;
let totalFat = 0; 
let totalSugar = 0;

	if(data){
		console.log(data);
		for(var i=0; i<data.index; i++){
		totalCal= totalCal + Number(data.total[i].calories);
		totalProtein= totalProtein + Number(data.total[i].proteins);
		totalCarb= totalCarb + Number(data.total[i].carbs);
		totalFat= totalFat + Number(data.total[i].fats);
		totalSugar= totalSugar + Number(data.total[i].sugars);
		
		console.log("HERE FROM FOR LOOP")
		let str = "<tr> <th>" + data.total[i].foodName +  "</th> <th>" + data.total[i].calories + "</th> <th>" +data.total[i].proteins + "</th> <th>" + data.total[i].carbs+ "</th> <th>" +data.total[i].fats+ "</th> <th>" + data.total[i].sugars + "</th> </tr>";
		$("#total").append(str);

		}
		let str = "<tr> <th>" + "TOTAL" +  "</th> <th>" + totalCal + "</th> <th>" +totalProtein + "</th> <th>" + totalCarb+ "</th> <th>" +totalFat+ "</th> <th>" + totalSugar + "</th> </tr>";
		$("#total").append(str);
		console.log(totalCal,totalProtein,totalCarb,totalFat,totalSugar);

	}
	else{
		console.log("EMPTY")
	}
}
