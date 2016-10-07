define([ "coreJS/adapt", "./intro" ], function(Adapt, introJs) {

    var IntroView = Backbone.View.extend({

        initialize: function() {
            this.listenTo(Adapt, {
                "navigation:openIntro": this.startIntro
            }).render();
        },

        render: function() {
            var data = this.model.toJSON();
            var template = Handlebars.templates.intro;

            console.log(data);
            console.log(template);

            var intro = Adapt.course.attributes._intro;
            if(intro === undefined) return;
            if($("#wrapper").hasClass("location-page") && intro._isEnabled && intro._steps[0] != null){
               for (i = 0; i < intro._steps.length; i++) { 
                    assignTutorial(intro._steps[i]._element, intro._steps[i].text);
                }
                introJs().start();
            }

            data._globals = Adapt.course.get("_globals");
            this.setElement(template(data)).$el.prependTo($(".navigation-inner"));
        },

        startIntro: function() {
            console.log('g');
            introJs().start();
        }

    });

    function assignTutorial(className, text){
        var h1 = document.getElementsByClassName(className)[0];
        if (h1 === undefined) return;
        var att = document.createAttribute("data-intro");
        att.value = text;
        h1.setAttributeNode(att);
    }

    function onBeforeUnload(config) {
        return !Adapt.course.get("_isComplete") ?
            config.browserPromptIfIncomplete || undefined :
            config.browserPromptIfComplete || undefined;
    }

    Adapt.once("adapt:initialize", function() {
        var config = Adapt.course.get("_intro");

        if (!config) return;

        var button = config._button;


        new IntroView({ model: new Backbone.Model(button) });

        if (config.browserPromptIfIncomplete || config.browserPromptIfComplete) {
            $(window).on("beforeunload", _.partial(onBeforeUnload, config));
        }
    });

});