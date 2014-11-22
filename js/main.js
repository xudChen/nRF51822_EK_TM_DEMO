var url = '';

$(function(){
	$('#selectDevice').click(function(){
	    selectDevice(function(device){
	        console.log(JSON.stringify(device));
	        $('#device_name').html(device.name);
	        $('#device_addr').html(device.address);
            selected_device = device
	    });
	})
	
    on_mode_selected = function() {
	    if($('#mode').val()==0){
		    url = 'http://127.0.0.1:8086/ble?callback=?';
	    }else{
		    url = 'http://www.gatt.io:8080/server?callback=?';
	    }
    }
	
	$('#mode').change(on_mode_selected);

    console.log($('#mode').val());

    on_mode_selected();

	$('#temperature').click(function() { // click event handler
	    if(!(typeof selected_device == 'undefined')){
	        var params = {
	            address : selected_device.address,
	            resource : "/sensors/temperature",
	            operation : "read"
	        };

	        $.getJSON(url, params, function(data){
	            $('#temperature_view').html(data['value']+" C");
	        });
	    }
	}); 
});
