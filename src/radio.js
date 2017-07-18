var radio = {

    topics: {},

    on: function (topic, listener) {
        // create the topic if not yet created
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }

        // add the listener
        this.topics[topic].push(listener);
    },

    trigger: function (topic, data) {
        // return if the topic doesn't exist, or there are no listeners
        if (!this.topics[topic] || this.topics[topic].length < 1) {
            return;
        }

        // send the event to all listeners
        this.topics[topic].map(function (listener) {
            listener(data);
        });
    },

    off: function (topic, listener) {
        if (!this.topics[topic]) {
            return;
        }
        this.topics[topic].splice(this.topics[topic].indexOf(listener), 1);
    },

    once: function (topic, listener) {
        var handler = function () {
            this.off(topic, handler);
            listener();
        }.bind(this);
        this.on(topic, handler);
    }

};