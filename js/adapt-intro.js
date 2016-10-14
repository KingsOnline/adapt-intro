define([ "coreJS/adapt", "./intro" ], function(Adapt, introJs) {

    var IntroView = Backbone.View.extend({

        initialize: function() {
            var data = this.model.toJSON();
            var template = Handlebars.templates.intro;
            this.setElement(template(data)).$el.appendTo($(".navigation-inner"));
            this.listenTo(Adapt, {
                "navigation:openIntro": this.startIntro
            });
        },

        getElements: function() {
            var intro = Adapt.course.attributes._intro;
            if($("#wrapper").hasClass("location-page") && intro._isEnabled && intro._steps[0] != null){
               for (i = 0; i < intro._steps.length; i++) {
                    this.assignTutorial(intro._steps[i]._element, intro._steps[i].text);
                }
            }
        },

        startIntro: function(){
            this.getElements();
            $('.navigation-intro').attr('disabled',true); // prevents the button being pressed again during introduction.
            introJs().start().oncomplete(function() {
              $('.navigation-intro').attr('disabled',false);
            }).onexit(function() {
              $('.navigation-intro').attr('disabled',false);
            });
        },

        assignTutorial: function(className, text){
            var h1 = document.getElementsByClassName(className)[0];
            if (h1 === undefined) return;
            var att = document.createAttribute("data-intro");
            att.value = text;
            h1.setAttributeNode(att);
        }
    });

    Adapt.on("pageView:ready", function() {
        if($('.navigation-intro').length){ // If you have been on a page before show.
          $('.navigation-intro').show();
        } else { // create the element when you load into your first page.
          var jsonExists = Adapt.course.get("_intro");
          if (!jsonExists) return;
          new IntroView({ model: new Backbone.Model() });
        }
    });

    Adapt.on('menuView:ready', function(view) { // hide on menu
        $('.navigation-intro').hide();
    });

});
