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
        this.busInfo = [];
        var self = this
        this.loaded = false;
    },

	getDom: function() {
		var wrapper = document.createElement("div");

        if (!this.loaded) {
            wrapper.innerHTML = "Loading...";
            return wrapper;
        }
        console.log("Wow get bus info!!!!!!");
        console.log(this.busInfo);
        wrapper.innerHTML = "Hello world!"
		return wrapper;
	},

    getBusInfo: function() {
        Log.info("Requesting bus info");
        this.sendSocketNotification("GET_BUS_DATA",
            {
                "config": this.config,
                "identifier": this.identifier
            }
        )
    },

	notificationReceived: function(notification, payload, sender){
        switch (notification) {
            case "DOM_OBJECTS_CREATED":
                this.getBusInfo();
                var timer = setInterval(() => {
                        this.getBusInfo();
                }, this.config.updateInterval);
                break;
        }
	},

    getHeader: function() {
        if (this.busInfo) {
            console.log(this.busInfo);
            return '정보가 있네? 3006번 버스 정보';
        }
        return '3006번 버스 정보';
    },

    socketNotificationReceived: function (notification, payload) {
        switch (notification) {
            case "BUS_DATA":
                this.loaded = true;
                console.log("NotificationReceived:" + notification);
                console.log(payload);
                console.log(this.busInfo);
                this.busInfo = payload;
                //this.updateDom();
                this.updateDom();
                break;
            case "BUS_DATA_ERROR":
                //this.data = [];
                break;
        }
    }    
})
