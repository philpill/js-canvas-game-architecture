(function(window, document, undefined){

    console.log(',-->--->--->--->--->-,');
    console.log('|  ,---->----->---,  |');
    console.log('|  | JS Game Loop |  |');
    console.log('|  \'---<-----<----\'  |');
    console.log('\'--<---<---<---<---<-\'');

    window.LOOPER = window.LOOPER || {};

    var modules = [];

    var core = {

        init : function () {

            var config = window.LOOPER.state;

            this.loadModules(config);
            this.initialiseModules();
            this.bindEvents(config);
        },
        loadModules : function (config) {

            this.ticker = new window.LOOPER.Ticker(config);
            this.interface = new window.LOOPER.Interface(config);
            this.canvas = new window.LOOPER.Canvas(config);
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
        bindEvents : function (config) {

            var that = this;

            this.ticker.bind('tick', function(e) {
                that.interface.execute('tick', e);
                that.canvas.execute('tick', e);
            });

            this.canvas.bind('click', function(e) {
                console.log('canvas:click');
                if (config.isPaused) {
                    that.ticker.execute('resume');
                } else {
                    that.ticker.execute('pause');
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
