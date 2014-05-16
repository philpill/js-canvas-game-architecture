(function(window, document, undefined){

    window.SHAPER = window.SHAPER || {};

    var modules = [];

    var core = {

        init : function () {

            var config = window.SHAPER.state;

            this.loadModules(config);
            this.initialiseModules();
            this.bindEvents(config);

            this.shapes = [];

            this.shapes.push(this.createShape());
        },
        contains : function (mouseX, mouseY) {

            var inX = (this.x <= mouseX) && (mouseX <= this.x + this.width);
            var inY = (this.y <= mouseY) && (mouseY <= this.y + this.height);

            return (inX && inY);
        },
        createShape : function () {

            return new window.SHAPER.Shape();
        },
        loadModules : function (config) {

            this.ticker = new window.SHAPER.Ticker(config);
            this.interface = new window.SHAPER.Interface(config);
            this.canvas = new window.SHAPER.Canvas(config);
            modules.push(this.ticker);
            modules.push(this.interface);
            modules.push(this.canvas);
        },
        initialiseModules : function () {

            var l = modules.length;
            while (l--) {
                modules[l].init();
            }
        },
        getSerializedShapes : function () {

            var l = this.shapes.length;
            var serializedShapes = [];
            while (l--) {
                serializedShapes.push(this.shapes[l].serialize());
            }
            return serializedShapes;
        },
        getClickedObject : function (e) {

            var objects = [];
            var l = this.shapes.length;
            while (l--) {
                if (this.contains.call(this.shapes[l], e.x, e.y)) {
                    objects.push(this.shapes[l]);
                }
            }
            return objects.sort(function(a, b) {
                return a.zIndex - b.zIndex;
            })[0];
        },

        getMouse : function(e) {
            var element = this.canvas.canvas, offsetX = 0, offsetY = 0, mx, my;

            if (element.offsetParent !== undefined) {
                do {
                  offsetX += element.offsetLeft;
                  offsetY += element.offsetTop;
                } while ((element = element.offsetParent));
              }

            mx = e.pageX - offsetX;
            my = e.pageY - offsetY;

            return {x: mx, y: my};
        },

        bindEvents : function (config) {

            var that = this;

            this.ticker.bind('tick', function(e) {
                that.interface.execute('tick', e);
                that.canvas.execute('tick', {
                    event: e,
                    shapes : that.getSerializedShapes()
                });
            });

            this.canvas.bind('click', function(e) {
                console.log('canvas:click');
                var object = that.getClickedObject(that.getMouse(e));
                console.log(object);
            });

            this.ticker.bind('pause', function(e) {
                console.log('ticker:pause');
                that.interface.execute('pause');
                config.isPaused = true;
            });

            this.ticker.bind('resume', function(e) {
                console.log('ticker:resume');
                that.interface.execute('resume');
                config.isPaused = false;
            });

            this.interface.bind('pause', function(e) {
                console.log('interface:pause');
                that.ticker.execute('pause');
            });

            this.interface.bind('resume', function(e) {
                console.log('interface:resume');
                that.ticker.execute('resume');
            });
        }
    }

    return core.init();

})(window, document);
