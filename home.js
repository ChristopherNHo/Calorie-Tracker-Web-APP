
		$(document).ready(function(){        


				$(document).on('keypress',function(e) {

					if(e.which == 13) {
					
						clicked();
						
						
					}
				});

				}); 
	function clicked()
	{
	/* console.log("CLICKED FUNCTIOn")
	$.get("/food",function(data){
		
		console.log(data.protein);
		//$("#food").append('<li>' +"protein " + data.protein + '</li>');
	}); */


	$.ajax({
	url: "/food",
	type: "GET",
	data: {foodName:$("#search").val()},
	success: add
	});


	}
	function add(data){
		console.log("success function")
		console.log(data.name.foods[0]);
		$("#food").append('<li>' + data.name.foods[0].description + " : " + data.name.foods[0].fdcId + '</li>');

	}
