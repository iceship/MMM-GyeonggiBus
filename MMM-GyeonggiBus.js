/* Magic Mirror
 * Module: GyeonggiBus
 *
 * By Juil Kim
 * MIT Licensed.
 */
Module.register("MMM-GyeonggiBus", {
    requiresVersion: "2.12.0",
    default: {
        apiBase: "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList",
        serviceKey: "",
        stationId: 236000618,
        routeId: 236000222,
        updateInterval: 1000 * 60 * 2, // refresh every 2 minutes, minimum 10 seconds
    },

    getStyles: function() {
        return ["MMM-GyeonggiBus.css"]
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        var self = this
        //Data[]
        this.loaded = false;
    },

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

        if (!this.loaded) {
            wrapper.innerHTML = "Loading...";
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        wrapper.innerHTML = 'Hello world!';
		return wrapper;
	},

    getBusInfo: function() {
        Log.info("Requesting Station Info");
        this.sendSocketNotification("GetStationStatus", this.config);
    },

	notificationReceived: function(notification, payload, sender){
        switch (notification) {
            case "DOM_OBJECTS_CREATED":
                //Update the data, after creating
                this.sendSocketNotification("GET_BUS_DATA",
                    {
                        "config": this.config,
                        "identifier": this.identifier
                    }
                )
                //Start timer for update
                var timer = setInterval(() => {
                    this.sendSocketNotification("GET_BUS_DATA",
                        {
                            "config": this.config,
                            "identifier": this.identifier
                        }
                    )
                }, this.config.updateInterval);
                break;
        }
	},

    socketNotificationReceived: function (notification, payload) {
        switch (notification) {
            case "BUS_DATA":
                //this.roadData = payload;
                //this.roadData.lastUpdate = "";
                this.loaded = true;
                console.log("test");
                this.updateDom();
                break;
            case "BUS_DATA_ERROR":
                this.data = [];
                //ToDo Error Handling to user
                break;
        }
    }    

})





/////////////////////////////////////////
var val;

function getInfo() {
	var xmlhttp = new XMLHttpRequest();
    var url = "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList";
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + this.config.serviceKey; /* Service Key*/
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
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");    
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