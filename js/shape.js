(function(window, document, undefined){

    window.SHAPER = window.SHAPER || {};

    var Shape = function () {

        this.type = 'square';
        this.height = 10;
        this.width = 10;
        this.x = 30;
        this.y = 30;
        this.fillColor = '#0000ff';
    }

    Shape.prototype = {

        constructor : Shape,

        execute : function (command, e) {

            this[command + 'Command'](e);
        },
        tickCommand : function (e) {

            this.render();
        },
        render : function () {

        },
        serialize : function () {

            return {

                zIndex      : 1,
                type        : this.type,
                height      : this.height,
                width       : this.width,
                x           : this.x,
                y           : this.y,
                fillColor   : this.fillColor
            }
        }
    }

    MicroEvent.mixin(Shape);

    window.SHAPER.Shape = Shape;

})(window, document);
