$(function(){
	$('#mode').change(function(){
		juma.emulation_mode($(this).val());
	});

	$('#scan-button').click(function() {
		juma.scan('#device-list');
    });

	$('#temperature').click(function() {
	    juma.read("/sensors/temperature",function(value){
		    $('#temperature-value').html(value+"℃");
	    });
	});

	$('#beep-button').click(function() {
	    juma.write("/peripherals/buzzer","5s");
	}); 
	
	
	// create canvas and context objects
	var canvas = document.getElementById('picker');
	var ctx = canvas.getContext('2d');
	
	// drawing active image
	var image = new Image();
	image.onload = function () {
	    ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
	}
	
	// select desired colorwheel
	var imageSrc = 'img/colorwheel1.png';
	image.src = imageSrc;
	
	$('#picker').click(function(e) { // click event handler
			e.preventDefault();
			var canvasOffset = $(canvas).offset();
	        var canvasX = Math.floor(e.pageX - canvasOffset.left);
	        var canvasY = Math.floor(e.pageY - canvasOffset.top);
	
	        // get current pixel
	        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
	        var pixel = imageData.data;
	
	        // update preview color
	        var pixelColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
	        
      
	        var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];

	        $('#hexVal').html(' #' + ('0000' + dColor.toString(16)).substr(-6)+' ');
	       			
			juma.write("/peripherals/rgblight",('0000' + dColor.toString(16)).substr(-6));

	}); 
});