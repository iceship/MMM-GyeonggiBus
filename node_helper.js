const NodeHelper = require("node_helper");
const request = require('request');

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper: " + this.name);
        //this.sendSocketNotification("starting node helper", "");       
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("Query: " + notification + " Parameters: " + payload);
        switch (notification) {
            case "GET_BUS_DATA":
                let self = this;
                self.getData(payload);
                break;
        }
    },


    getData: async function (payload) {
        let self = this;
        console.log("getData:");
        console.log(payload);

        var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + payload.config.serviceKey; /* Service Key*/
        queryParams += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent(payload.config.stationId); /* */
        var url = payload.config.apiBase + queryParams;
        console.log("url:" + url);
        request({
            url: url,
            method: 'GET'
        }, function (error, response, body) {
            console.log('Status', response.statusCode);
            console.log('Headers', JSON.stringify(response.headers));
            //console.log('Reponse received', body);
            var result = convert.xml2json(body, { compact: true, spaces: 4 });
            var data = JSON.parse(result).response.body.items.item;
            console.log('Reponse received Data:', data);
            self.sendSocketNotification("BUS_DATA", data);
        });
    },


});