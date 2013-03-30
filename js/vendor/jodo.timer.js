// ------------ JODO ------------
// Module: Timer
// Version: 1.0
// Created: 2012-09-07 by Glen Cheney
// Updated: 2012-10-16 by Glen Cheney
// Dependencies: jQuery 1.4+
// ------------------------------

/*global jQuery */

(function($, window, undefined) {

    "use strict"; // jshint ;_;

    var Timer = function(fn, delay) {
        this.timerId = null;
        this.start = null;
        this.delay = delay;
        this.remaining = delay;
        this.fn = fn;
        this.resume();
    };

    // Clears current timer and sets this.remaining
    Timer.prototype.pause = function() {
        this.clear();
        this.remaining -= new Date() - this.start;
        return this.remaining;
    };

    // Sets start time and a timeout of this.remaining
    Timer.prototype.resume = function() {
        this.start = new Date();
        this.timerId = window.setTimeout(this.fn, this.remaining);
        return this.remaining;
    };

    // Sets time remaining to initial delay and clears timer
    Timer.prototype.reset = function() {
        this.remaining = this.delay;
        this.clear();
    };

    // Clears timer
    Timer.prototype.clear = function() {
        window.clearTimeout(this.timerId);
    };

    $.timer = function(fn, delay) {
        return new Timer(fn, delay);
    };
})(jQuery, window);