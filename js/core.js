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

            this.shapes.push(this.createShape1());
            this.shapes.push(this.createShape2());
        },
        createShape1 : function () {

            return new window.SHAPER.Square({
                id : 1,
                height : 10,
                width : 10,
                x : 30,
                y : 30
            });
        },
        createShape2 : function () {

            return new window.SHAPER.Circle({
                id : 2,
                radius : 10,
                x : 60,
                y : 50
            });
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
                if (this.shapes[l].contains(e.x, e.y)) {
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
                var object = that.getClickedObject(that.getMouse(e));
                if (object) {
                    console.log(object);
                }
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
