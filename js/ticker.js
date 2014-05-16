(function(window, document, undefined){

    window.LOOPER = window.LOOPER || {};

    var Ticker = function (config) {

        this.timeout = config.timeout;
        this.previousTime = new Date();
        this.currentTime = new Date();
        this.timeoutId;
        this.fps = 0;
    }

    Ticker.prototype = {

        constructor : Ticker,

        init : function (args) {

            this.timeoutId = window.setTimeout(this.tick.bind(this), this.timeout);
        },
        tick : function () {

            this.currentTime = new Date();
            this.fps = 1000 / (this.currentTime - this.previousTime);
            this.trigger('tick', { 'fps' : this.fps });
            this.previousTime = this.currentTime;
            this.timeoutId = window.setTimeout(this.tick.bind(this), this.timeout);
        },
        pauseCommand : function () {

            window.clearTimeout(this.timeoutId);
            this.timeoutId = null;
            this.trigger('pause');
        },
        resumeCommand : function () {

            if (!this.timeoutId) {
                this.timeoutId = window.setTimeout(this.tick.bind(this), this.timeout);
            }
            this.trigger('resume');
        },
        execute : function (command) {

            this[command + 'Command']();
        }
    }

    MicroEvent.mixin(Ticker);

    window.LOOPER.Ticker = Ticker;

})(window, document);
