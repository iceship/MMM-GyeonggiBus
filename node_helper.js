const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper: " + this.name);
        this.sendSocketNotification("starting node helper", "");
    },

    socketNotificationReceived: function(query, parameters) {
        var self = this;
        console.log("Query: " + query + " Parameters: " + parameters);
    },

    // returns all reported train statuses for a given station
    getStationStatusCallback: function(data, direction) {
        console.log("getStationStatusCallback");
        var self = this;
    }
});