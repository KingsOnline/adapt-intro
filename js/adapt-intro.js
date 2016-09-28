define(function(require) {

    var Adapt = require('coreJS/adapt');
    var pageView = require('core/js/views/pageView');
    var introJs = require('./intro');

    // This should add/update progress on menuView

	Adapt.on("pageView:postRender", function() {
    	if($("#wrapper").hasClass("location-page")){
    		introJs().start();
    	}
    });

});