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
		
		for(var i=0; i<data.index+1; i++){
		console.log("HERE FROM FOR LOOP")
		let str = "<tr> <th>" + data.total[i].foodName +  "</th> <th>" + data.total[i].fats + "</th> <th>" +data.total[i].carbs + "</th> <th>" + data.total[i].proteins+ "</th> <th>" +data.total[i].sugars+ "</th> <th>" + data.total[i].calories + "</th> </tr>";
		$("#total").append(str);

		}

	}
	else{
		console.log("EMPTY")
	}
}
