(function(window, document, undefined){

    window.SHAPER = window.SHAPER || {};

    window.SHAPER.state = {

        timeout : 50,
        isPaused : false,
        canvas : {
            heartbeat : {
                rate : 0.05
            }
        }
    }

})(window, document);
