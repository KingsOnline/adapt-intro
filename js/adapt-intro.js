define([ "coreJS/adapt", "./intro" ], function(Adapt, introJs) {

    var IntroView = Backbone.View.extend({

        initialize: function() {
            var data = this.model.toJSON();
            var template = Handlebars.templates.intro;
            data._globals = Adapt.course.get("_globals");
            this.setElement(template(data)).$el.prependTo($(".navigation-inner"));
            this.listenTo(Adapt, {
                "navigation:openIntro": this.startIntro
            }).render();
        },

        render: function() {
            var intro = Adapt.course.attributes._intro;
            if(intro === undefined) return;
            if($("#wrapper").hasClass("location-page") && intro._isEnabled && intro._steps[0] != null){
               for (i = 0; i < intro._steps.length; i++) {
                    assignTutorial(intro._steps[i]._element, intro._steps[i].text);
                }
            }
        },

        startIntro: function(){
          $('.navigation-intro').attr('disabled',true);
            introJs().start().oncomplete(function() {
              console.log('complete');
              $('.navigation-intro').attr('disabled',false);
            }).onexit(function() {
              console.log('exit');
              $('.navigation-intro').attr('disabled',false);
          });
        }
    });

    function assignTutorial(className, text){
        var h1 = document.getElementsByClassName(className)[0];
        if (h1 === undefined) return;
        var att = document.createAttribute("data-intro");
        att.value = text;
        h1.setAttributeNode(att);
    }

    Adapt.once("adapt:initialize", function() {
        var config = Adapt.course.get("_intro");
        if (!config) return;
        new IntroView({ model: new Backbone.Model() });
    });
});
