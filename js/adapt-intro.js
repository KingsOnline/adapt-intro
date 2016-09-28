define(function(require) {

    var Adapt = require('coreJS/adapt');
    var pageView = require('core/js/views/pageView');
    var introJs = require('./intro');

    // This should add/update progress on menuView

	Adapt.on("pageView:ready", function() {
		console.log('hello world');
    	if($("#wrapper").hasClass("location-page")){
	    	assignTutorial("page-level-progress-navigation","This bar shows your progress on the page. You can click it to see what components you have left to complete.");
			assignTutorial("page-header","The content of the course goes here. Scroll down to read it!");

    		introJs().start();
    	}
    }); function myFunction() {

}



});	

function assignTutorial(className, text){
    var h1 = document.getElementsByClassName(className)[0];
    var att = document.createAttribute("data-intro");
    att.value = text;
    h1.setAttributeNode(att);
}