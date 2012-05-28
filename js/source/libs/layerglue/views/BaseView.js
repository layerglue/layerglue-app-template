
(function(){

	Layerglue.createLazyObjectHierarchy('Layerglue.views');

	Layerglue.views.BaseView = Backbone.View.extend({

		initialize:function(){
			_.extend(this, Backbone.SequencerEvents);

			this.children = [];
		},

		render:function(){
			return this;
		},

		_onAddedToDOM:function(){
			this.onAddedToDOM();
		},

		onAddedToDOM:function(){
		},

		checkAddedToDOM:function(){
			if(this.isInDOM())
			{
				this._onAddedToDOM();

				//Tell each of the added children they have been added to the DOM
				_.each(this.children, function(item){
					item._onAddedToDOM();
				});
			}
		},

		invalidate:function(defer){
			if(defer)
			{
				_.defer(_.bind(this.update, this));
			}
			else
			{
				this.update();
			}
		},

		update:function(){
		},

		appendToElement:function(jqueryElement){
			jqueryElement.append(this.el);

			this.checkAddedToDOM();
		},

		isInDOM:function(){
			return this.$el.closest('html').length > 0;
		},

		addChild:function(child){
			this.children.push(child);
			return child;
		},

		removeChild:function(child){
			return this.children.splice(this.children.indexOf(child), 1)[0];
		}

	});

})();