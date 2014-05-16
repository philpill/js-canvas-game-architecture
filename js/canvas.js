(function(window, document, undefined){

    window.LOOPER = window.LOOPER || {};

    var Canvas = function (config) {

        this.beatRate = config.canvas.heartbeat.rate;
    }

    Canvas.prototype = {

        constructor : Canvas,

        init : function () {

            this.canvas = document.getElementById('Canvas');
            this.ctx = this.canvas.getContext("2d");
            this.heartbeat = new window.LOOPER.Heartbeat({
                ctx     : this.ctx,
                rate    : this.beatRate
            });
            this.bindEvents();
        },
        bindEvents : function () {

            this.canvas.onclick = this.trigger.bind(this, 'click');
        },
        execute : function (command, e) {

            this[command + 'Command'](e);
        },
        tickCommand : function (e) {

            this.clear();
            this.heartbeat.execute('tick', e);
        },
        clear : function () {

            this.canvas.width = this.canvas.width;
        }
    }

    MicroEvent.mixin(Canvas);

    window.LOOPER.Canvas = Canvas;

})(window, document);
