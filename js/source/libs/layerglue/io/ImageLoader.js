(function(){
	
	Layerglue.createLazyObjectHierarchy('Layerglue.io');

	Layerglue.io.ImageLoader = Backbone.Model.extend({

		defaults:{
			path:null,
			id:null,
			complete:false
		},

		initialize:function(options){

			_.extend(this, Backbone.Events);

			this.path = options.path;
			this.id = options.id;
		},

		start:function(){
			var img = new Image();
			var self = this;

			img.addEventListener('load', function() {
				self.complete = true;
				self.trigger(Layerglue.io.LoadEvents.COMPLETE, self);
				// console.log('ImageLoader.onItemComplete: ' + self.path);
			}, false);

			img.addEventListener('error', function() {
				self.complete = true;
				self.trigger(Layerglue.io.LoadEvents.ERROR, self);
				// console.log('ImageLoader.onItemError: ' + self.path);
			}, false);

			img.src = this.path;
		}
	});

})();