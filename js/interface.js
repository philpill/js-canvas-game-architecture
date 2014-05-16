(function(window, document, undefined){

    window.LOOPER = window.LOOPER || {};

    var Interface = function (config) {

        this.timeout = config.timeout;
        this.timeoutEl = document.getElementById('Timeout');
        this.fpsEl = document.getElementById('Fps');
        this.inactiveStyleClass = 'link--inactive';
        this.controlClass = 'control';
    }

    Interface.prototype = {

        constructor : Interface,

        init : function () {

            this.initialiseControls();
            this.bindControls();
            this.deactivateControls();
            this.activatePause();
        },
        initialiseControls: function () {

            this.timeoutEl.innerHTML = this.timeout;
        },
        deactivateControls : function () {

            var controls = document.getElementsByClassName(this.controlClass);
            var l = controls.length;
            while (l--) {
                this.deactivateElement(controls[l]);
            }
        },
        isActive : function () {

            return this.className.indexOf(this.isActiveClass) >= 0;
        },
        bindControls : function () {

            var pauseEl = document.getElementById('Pause');
            var resumeEl = document.getElementById('Resume');
            pauseEl.onclick = this.trigger.bind(this, 'pause');
            resumeEl.onclick = this.trigger.bind(this, 'resume');
        },
        deactivateElement : function (el) {

            var className = el.className;
            if (className.indexOf(this.inactiveStyleClass) < 0) {
                className = className + ' ' + this.inactiveStyleClass;
                el.className = this.sanitiseString(className);
            }
        },
        sanitiseString : function (string) {

            return string.replace(/\s\s/g, ' ').trim();
        },
        activateResume : function () {

            this.activateElement(document.getElementById('Resume'));
        },
        activatePause : function () {

            this.activateElement(document.getElementById('Pause'));
        },
        activateElement : function (el) {

            el.className = el.className.replace(this.inactiveStyleClass, '');
            el.className = this.sanitiseString(el.className);
        },
        pauseCommand : function () {

            this.deactivateControls();
            this.activateResume();
        },
        resumeCommand : function () {

            this.deactivateControls();
            this.activatePause();
        },
        execute : function (command, e) {

            this[command + 'Command'](e);
        },
        tickCommand : function (e) {

            var fps = Math.round(e.fps*10)/10;
            this.fpsEl.innerHTML = fps;
        }
    }

    MicroEvent.mixin(Interface);

    window.LOOPER.Interface = Interface;

})(window, document);
