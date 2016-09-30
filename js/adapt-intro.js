define(function(require) {

    var Adapt = require('coreJS/adapt');
    var pageView = require('core/js/views/pageView');
    var introJsLibary = require('./intro');

    // This should add/update progress on menuView

	Adapt.on("pageView:ready", function() {
		var introJs = Adapt.course.get('_globals')._introJs;
        console.log(introJs);
        if(introJs === undefined) return;
    	if($("#wrapper").hasClass("location-page") && introJs._isEnabled && introJs._steps[0] != null){
           for (i = 0; i < introJs._steps.length; i++) { 
                assignTutorial(introJs._steps[i]._element, introJs._steps[i].text);
            }
    		introJsLibary().start();
    	}
    });
});	

function assignTutorial(className, text){
    var h1 = document.getElementsByClassName(className)[0];
    var att = document.createAttribute("data-intro");
    att.value = text;
    h1.setAttributeNode(att);
}