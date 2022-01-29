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
        this.loaded = false;
    },

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

        if (!this.loaded) {
            wrapper.innerHTML = "Loading...";
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
                this.sendSocketNotification("GET_BUS_DATA",
                    {
                        "config": this.config,
                        "identifier": this.identifier
                    }
                )
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
                this.loaded = true;
                console.log("NotificationReceived:" + notification);
                this.updateDom();
                break;
            case "BUS_DATA_ERROR":
                this.data = [];
                break;
        }
    }    
})
