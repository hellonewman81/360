/* Author: 
	ANDREW NEWMAN - FRONT END WEB DEVELOPER
*/


$(function(){
	
	window.$myvars =
	{
		// Store some vars for later
		jq_example : $('#jquery-example'),
		remove_txt : $('.remove-txt'),
		click_class : '.clickme',
		get_json_data : $('#getJsonData'),
		json_data : $('#jsonData'),
		toggleBtns : $('#bind, #unbind'),
		clickmetext : $('#clickmetext'),
		bind_id : $("#bind"),
		unbind_id : $("#unbind"),
		mylist : $('#myList')
	};

	//$('[role="banner"]').addClass('moo')
	//$('[role^="b"]').addClass('moo')

	// jQuery 1.7 tests / .on() .off()
	$myvars.jq_example.on('click',$myvars.click_class  , function(e){
		addtext();
		e.preventDefault();
	});
	
	$myvars.remove_txt.on('click',$myvars.remove_txt  , function(e){
		$myvars.clickmetext.html('');
		e.preventDefault();
	});
	
	function addtext() {
		$myvars.clickmetext.append('<p class="clickme">click me</p>');
		// removes / unbinds the click event
		//$myvars.jq_example.off('click', '.clickme');
	}

	// example 2 bind and unbind the click
	$('#testdiv, #unbind').hide();

	function aClick() {
		$("#testdiv").show().fadeOut("slow");
	}
	
	$myvars.bind_id.click(function () {
		$myvars.jq_example.on("click", "#theone", aClick).find("#theone").text("Can click!");
		$myvars.toggleBtns.toggle();
	});
	
	$myvars.unbind_id.click(function () {
		$myvars.jq_example.off("click", "#theone", aClick).find("#theone").text("Does nothing...");
		$myvars.toggleBtns.toggle();
	});
	
	//log the index of li on clicked ul - a faster click method
	$myvars.mylist.on('click', function(e){
		var target = e.target,
		$target = $(target); 
		if (target.nodeName === 'LI') {
			$target.addClass('clicked');
			console.log($target.index());
		}
	});
	
	// JSON example
	function createHTML(json) {
		var jsonData = json;
		var html = '';
		for (var key in jsonData) {
			var cnode = jsonData[key];
			var href = cnode.href;
			var title = cnode.text;
			var pgraph = cnode.description;
			
			if( key != 'parent' ){
				html += '<h3>' + key + '</h3>';
				html += '<ul>';
				html += '<li><a class="blc" href="' + href + '" >' + title +'</a><p>'+ pgraph +'</p></li>';
				html += '</ul>';
			}
			
			if (typeof cnode.child != 'undefined' && typeof cnode.child == 'object') {
				html += createHTML(cnode.child);
			}
	
		}
		
		return html;
	} 
	

	
	// on click get the data and return it
	$myvars.get_json_data.on('click', function(e){

		$url = $(this).attr('href');
		
		$.ajax({
		  url: $url,
		  dataType: 'json',
		  beforeSend: function(){
			  $myvars.get_json_data.attr('disabled','disabled');
			  $myvars.json_data.html('<p class="loading large">loading</p>');
			},
		  success: function(data){
			  console.log(data);
			  $myvars.json_data.find('p').fadeOut().remove();
			  $myvars.json_data.slideToggle().append(createHTML(data)).slideToggle();
			  $myvars.get_json_data.removeAttr('disabled');
			},
			error: function(data){
			  console.log('json error');
			}
		});
			
		e.preventDefault();
	});
	
	// Canvas example
	function initCanvas() {
		var canvas = document.getElementById("head-canvas");
		var ctx = canvas.getContext("2d");
		draw(ctx);
	}
	
	function draw(ctx) {
	  // Illustrator layer1 / Guide
	  ctx.save();
	  
	  // Illustrator layer1 / Path
	  ctx.beginPath();
	  ctx.moveTo(0.0, 143.2);
	  ctx.lineTo(289.3, 143.2);
	  ctx.bezierCurveTo(288.5, 63.2, 224.0, 0.0, 144.6, 0.0);
	  ctx.bezierCurveTo(65.3, 0.0, 0.8, 63.2, 0.0, 143.2);
	  ctx.closePath();
	  ctx.fill();
	  ctx.restore();
	}
	
	initCanvas();
	
})

