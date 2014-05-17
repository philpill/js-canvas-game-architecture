(function(window, document, undefined){

    window.SHAPER = window.SHAPER || {};

    var CanvasObject = function () {

        this.zIndex = 0;
        this.type = 'object';
        this.height = 0;
        this.width = 0;
        this.x = 0;
        this.y = 0;
        this.lineWidth = 0;
        this.fillStyle = '#ffffff';
        this.strokeStyle = '#000000';
    }

    CanvasObject.prototype = {

        constructor : CanvasObject,

        execute : function (command, e) {

            this[command + 'Command'](e);
        },
        tickCommand : function (e) {

        },
        serialize : function () {

            return {

                zIndex      : 1,
                type        : this.type,
                height      : this.height,
                width       : this.width,
                x           : this.x,
                y           : this.y,
                lineWidth   : this.lineWidth,
                fillStyle   : this.fillColor,
                strokeStyle : this.strokecolour
            }
        }
    }

    MicroEvent.mixin(CanvasObject);

    window.SHAPER.CanvasObject = CanvasObject;

})(window, document);
