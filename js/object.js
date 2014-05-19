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
        this.clickable = false;
        this.focusable = false;
        this.hasFocus = false;
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
                fillStyle   : this.fillStyle,
                strokeStyle : this.strokecolour
            }
        },
        blurCommand : function (e) {

            if (this.hasFocus) {
                this.hasFocus = false;
            }
        },
        focusCommand : function (e) {

            if (this.focusable) {
                this.hasFocus = true;
                this.fillStyle = 'silver';
            }
        },
        clickCommand : function (e) {

            if (this.clickable) {
                console.log(this);
            }
        }
    }

    MicroEvent.mixin(CanvasObject);

    window.SHAPER.CanvasObject = CanvasObject;

})(window, document);
