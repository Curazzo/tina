// feuchtigkeitsobergrenzeButton

$("#feuchtigkeitsobergrenzeButton").on("click", function () {
  var msg = $("#soilmoistureUpperLevel").val();
  console.log("msg", msg);
  message = new Paho.MQTT.Message(msg);

  message.destinationName = "soilmoistureUpperLevel";
  //message.qos = 1;
  message.retained = true;
  if ($("#soilmoistureUpperLevel").val() === "") {
    alert("Das Eingabefeld darf nicht leer sein!");
    return;
  }
  if ($("#soilmoistureUpperLevel").val() > 100) {
    $("#soilmoistureUpperLevel").val("");
    alert('Das Wert kann nicht höher als "100" sein!');
    return;
  }
  client.send(message);
});

$("#soilmoistureUpperLevel").bind("enterKey", function (e) {
  $("#feuchtigkeitsobergrenzeButton").click();
});
$("#soilmoistureUpperLevel").keyup(function (e) {
  if (e.keyCode == 13) {
    $(this).trigger("enterKey");
  }
});



// feuchtigkeitsultergrenzeButton

$("#feuchtigkeitsuntergrenzeButton").on("click", function () {
	var msg = $("#soilmoistureLowerLevel").val();
	console.log("msg", msg);
	message = new Paho.MQTT.Message(msg);
  
	message.destinationName = "soilmoistureLowerLevel";
	//message.qos = 1;
	message.retained = true;
	if ($("#soilmoistureLowerLevel").val() === "") {
	  alert("Das Eingabefeld darf nicht leer sein!");
	  return;
	}
	if ($("#soilmoistureLowerLevel").val() > 100) {
	  $("#soilmoistureLowerLevel").val("");
	  alert('Das Wert kann nicht höher als "100" sein!');
	  return;
	}
	client.send(message);
  });
  
  $("#soilmoistureLowerLevel").bind("enterKey", function (e) {
	
	$("#feuchtigkeitsuntergrenzeButton").click();
  });
  $("#soilmoistureLowerLevel").keyup(function (e) {
	if (e.keyCode == 13) {
	  $(this).trigger("enterKey");
	}
  });
