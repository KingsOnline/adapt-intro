define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var introJs = require('extensions/adapt-introjs/js/intro.js');

    // This should add/update progress on menuView
    Adapt.on('adapt:initialize', function(view) {
    	introJs().start();
    });

});