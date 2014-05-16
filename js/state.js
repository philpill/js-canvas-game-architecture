(function(window, document, undefined){

    window.LOOPER = window.LOOPER || {};

    window.LOOPER.state = {

        timeout : 50,
        isPaused : false,
        canvas : {
            heartbeat : {
                rate : 0.05
            }
        }
    }

})(window, document);
