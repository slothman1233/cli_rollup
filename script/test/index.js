(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.videojs = factory());
}(this, function () { 'use strict';

    var foo = "hello word!";

    function main () {
        console.log(foo);
    }

    return main;

}));
