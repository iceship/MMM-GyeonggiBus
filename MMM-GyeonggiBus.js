/* Magic Mirror
 * Module: GyeonggiBus
 *
 * By Juil Kim
 * MIT Licensed.
 */

var val;

function getInfo() {
	//var xmlhttp = new XMLHttpRequest();
    var url = "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList";
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=NFWVvMo3R53H4I5m71D%2BMOCSUqYjplfDTnrx%2B6wlo3p0ajXCBhWg%2FkAqPZZ%2F43Jt4Scnq%2Fm7Zv0FicnS%2BoEZEQ%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent('200000078'); /* */

    xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                var myArr = JSON.parse(this.responseText);
                console.log(myArr);
                val = myArr;
                console.log(val);
            }
    };
    xmlhttp.open("GET", url+queryParams, true);
    xmlhttp.send();

    /*
			xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var myArr = JSON.parse(this.responseText);
						//console.log(myArr);
						val = myArr.halteDoorkomsten[0].doorkomsten;
					}
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.setRequestHeader("Ocp-Apim-Subscription-Key", "$API_KEY");
			xmlhttp.send();
    */
}

function makeTable(){
	let table = document.createElement('table');
    console.log(val);
	return table;
}

Module.register("MMM-GyeonggiBus", {
    //requiresVersion: "2.12.0",
    default: {
        apiBase: "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList",
        serviceKey: "",
        stationId: [200000078],
        updateInterval: 1000 * 60 * 2, // refresh every 2 minutes, minimum 10 seconds
    },

    getStyles: function() {
        return ["MMM-GyeonggiBus.css"]
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        var self = this

        this.ready = false;
		this.val = this.config.text;
		setInterval(function() {
			if(this.ready){
				getInfo();
				self.updateDom();
			}
		},this.config.updateInterval);
    },

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		//wrapper.innerHTML = this.config.text;
        wrapper.innerHTML = makeTable();
        console.log(wrapper);
		return wrapper;
	},

    getBusInfo: function() {
        Log.info("Requesting Station Info");
        this.sendSocketNotification("GetStationStatus", this.config);
    },

	notificationReceived: function(notification, payload, sender){
		if(notification == 'DOM_OBJECTS_CREATED'){
			self.ready = true;
		}
	}

})