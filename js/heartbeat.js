(function(window, document, undefined){

    window.LOOPER = window.LOOPER || {};

    var Heartbeat = function (config) {

        this.rate = config.rate;
        this.ctx = config.ctx;
    }

    Heartbeat.prototype = {

        constructor : Heartbeat,

        execute : function (command, e) {

            this[command + 'Command'](e);
        },
        tickCommand : function (e) {

            this.render();
        },
        setAlpha : function () {

            this.alpha = this.alpha || 1;
            this.direction = this.direction || 1;
            this.delta = this.delta || this.rate;

            if (this.direction === 1) {
                this.alpha += this.delta;
                if (this.alpha >= 1) {
                    this.direction = -1;
                }
            }

            if (this.direction === -1) {
                this.alpha -= this.delta;
                this.alpha = (this.alpha < 0.1) ? 0.1 : this.alpha;
                if (this.alpha <= 0.2) {
                    this.direction = 1;
                }
            }
        },
        render : function () {

            this.setAlpha();

            this.ctx.beginPath();
            this.ctx.arc(10, 10, 5, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = 'rgba(255, 0, 0, ' + this.alpha + ')';
            this.ctx.fill();
        }
    }

    MicroEvent.mixin(Heartbeat);

    window.LOOPER.Heartbeat = Heartbeat;

})(window, document);
