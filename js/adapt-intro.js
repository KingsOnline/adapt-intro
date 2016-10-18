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

        getElements: function(path) {
            if($("#wrapper").hasClass("location-page") && path._isEnabled && path._steps[0] != null){
               for (i = 0; i < path._steps.length; i++) {
                    this.assignIntro(path._steps[i]._element, path._steps[i].text);
                }
            }
        },

        startIntro: function(){
          var introPath = Adapt.course.attributes._intro;
            this.getElements(introPath);
            $('.navigation-intro').attr('disabled',true); // prevents the button being pressed again during introduction.
            introJs().setOptions(introPath._options).start().oncomplete(function() {
              $('.navigation-intro').attr('disabled',false);
            }).onexit(function() {
              $('.navigation-intro').attr('disabled',false);
            });
        },

        assignIntro: function(className, text){
            var h1 = document.getElementsByClassName(className)[0];
            if (h1 === undefined) return;
            var att = document.createAttribute("data-intro");
            att.value = text;
            h1.setAttributeNode(att);
        }
    });

    Adapt.on("pageView:preRender", function() {
        if(this.course.attributes._intro._showOn != undefined) { // if not defined assume all pages
          if(this.course.attributes._intro._showOn.length > 0){
            if(jQuery.inArray(this.location._currentId, this.course.attributes._intro._showOn) === -1){
              $('.navigation-intro').hide();
              return; // skip the next if statement that creates adapt-intro
            }
          }
        }

        if($('.navigation-intro').length){ // If you have been on a page before show.
          $('.navigation-intro').show();
        } else { // create the element when you load into your first page.
          var jsonExists = this.course.get("_intro");
          if (!jsonExists) return;
          new IntroView({ model: new Backbone.Model() });
        }
    });

    Adapt.on('menuView:preRender', function(view) { // hide on menu
        $('.navigation-intro').hide();
    });

});
