

var websocket = "postman.cloudmqtt.com";
var port = 30193;
var user = "glysrnfb";
var pass = "vpkAL7rnP_ru";
var reconnectTimeout = 2000;
var id = "web_" + parseInt(Math.random() * 100, 10);


function MQTTconnect() {





	client = new Paho.MQTT.Client(websocket, port, id);

	//client = new Paho.MQTT.Client(websocket, port, "");


	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	var options = {
		useSSL: true,
		userName: user,
		password: pass,
		onSuccess: onConnect,
		onFailure: doFail,



	};

	// connect the client

	client.connect(options);




}





// called when the client connects

function onConnect() {
	// Once a connection has been made, make a subscription and send a message.


	client.subscribe("Feuchtigkeit");
	client.subscribe("Ultraschall");
	client.subscribe("soilmoistureUpperLevel");
	client.subscribe("soilmoistureLowerLevel");
	client.subscribe("WaterLWT");

	console.log("Mqtt Connected");
	






}

function doFail(e) {

	setTimeout(MQTTconnect, reconnectTimeout);

	
	console.log(e);
	



}

// called when the client loses its connection
function onConnectionLost(responseObject) {

	

	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:" + responseObject.errorMessage);
	}

	reconnect = true;


}

function scale(num, in_min, in_max, out_min, out_max) {
	return Math.round((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
  }


function onMessageArrived(message) {

	console.log("onMessageArrived:" + message.destinationName);
	console.log("message.payloadString:" + message.payloadString);

	if (message.destinationName == "Feuchtigkeit") {
		$("#feuchtigkeitsobergrenzeAktuellerWert").html(message.payloadString+"%");
		$('#feuchtigkeitProgressbar').attr('aria-valuenow', message.payloadString).css('width', message.payloadString+'%');
	}
	
	if (message.destinationName == "Ultraschall") {
		
		var oldNumber = parseInt($('#ultraschallProgressbar').attr('aria-valuenow'));
		var newNumber = parseInt(message.payloadString);
		
		
        var percent = scale(newNumber,10,28,0,100)
		
		

		$("#ultraschallobergrenzeAktuellerWert").html(percent.toString()+"%");
		$('#ultraschallProgressbar').attr('aria-valuenow', percent.toString()).css('width', percent.toString()+'%');

	}

	if (message.destinationName == "soilmoistureUpperLevel") {
		
		$("#feuchtigkeitsobergrenzeWert").text(message.payloadString+'%');
	}

	if (message.destinationName == "soilmoistureLowerLevel") {
		
		$("#feuchtigkeitsuntergrenzeWert").text(message.payloadString+'%');
	}

	if (message.destinationName == "WaterLWT") {
		console.log("LWT_WILL_MESSAGE:", message.payloadString);

		if (message.payloadString == "System offline") {
			
		$("#jumbotron-text").text("Fehler im Bewässerungssystem!");
		
		$('#page-title').addClass('show-warning');

		$('#jumbotron').removeClass('hide-content');

		$('#page-content').addClass('hide-content');
	}
	else {
		
		
		$('#page-title').removeClass('show-warning');

		$('#jumbotron').addClass('hide-content');

		$('#page-content').removeClass('hide-content');
	}
		

		
	}

	

}




function sendButton1() {

	client.subscribe("buttons/btn1_ein");
	message = new Paho.MQTT.Message("feuchtigkeit");


	message.destinationName = "feuchtigkeit";
	//message.qos = 1;
	//message.retained = true;
	client.send(message);

}











