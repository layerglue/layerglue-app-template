
(function(){

	Layerglue.createLazyObjectHierarchy('Layerglue.views');

	var sequencerEvents = Layerglue.sequencer.SequencerEvents;
	var sequencerStates = Layerglue.sequencer.SequencerStates;
	var states = Layerglue.views.TransitionStates;

	Layerglue.views.BasePageView = Layerglue.views.TransitionableView.extend({

		hasDualTransitions: true,

		initialize:function(){

			Layerglue.views.TransitionableView.prototype.initialize.call(this);

			this.createTemplate();
			this.createLoader();

			this.render();	
		},

		render:function(){
			this.populateTemplate();
			
			return this;
		},

		setModel:function(model){
			// console.log('BasePageView.setModel ' ,  model);
			this.model = model;
		},

		/****************************************
		Asset loading
		****************************************/

		createLoader:function(){
			this.loader = [ new Layerglue.io.ImageLoader({path:this.getDefaultImagePath()}) ];
		},

		getDefaultImagePath:function(){
			return 'images/pages/' + this.id + '.png'
		},

		/****************************************
		Templating
		****************************************/

		//Retrieves the template, defined by convention and related to the id of the page.
		createTemplate:function(){
			this.template = _.template($("#" + this.id + "-template").html());
		},

		populateTemplate:function(){

			if(this.model)
			{

				// this.modelToJSON();
				//this.$el.html(this.template(this.model.toJSON()));
				this.$el.html(this.template(this.modelToJSON()));
			}
			else
			{
				this.$el.html(this.template());
			}
		},

		modelToJSON:function(){
			var output = {};

			for(var name in this.model){
				
				if(this.model[name] && this.model[name].toJSON)
				{
					output[name] = this.model[name].toJSON();
				}
				else
				{
					output[name] = this.model[name];
				}
			}

			return output;
		},

		/****************************************
		Transitioning
		****************************************/

		setupInitialAppearance:function(){
			this.$el.css({opacity:0});
		},

		/****************************************
		Event handlers
		****************************************/

		_onAddedToDOM:function(){

			this.onAddedToDOM();
		},

		onAddedToDOM:function(){
			if(!this.hasDualTransitions)
			{
				this.setupMonoTransition();
			}

			this.setupInitialAppearance();
		},

		attach:function(){
			this.$el.css({display:'block'});
		},

		detach:function(){
			this.$el.css({display:'none'});
		}

		
	});

})();