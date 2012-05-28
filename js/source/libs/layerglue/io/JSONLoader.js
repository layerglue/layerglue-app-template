(function(){

	Layerglue.createLazyObjectHierarchy('Layerglue.io');
	
	Layerglue.io.JSONLoader = Backbone.Model.extend({

		defaults:{
			path:null,
			id:null,
			complete:false
		},

		initialize:function(options){

			_.extend(this, Backbone.Events);

			this.path = options.path;
			this.id = options.id;
			this.params = options.params
		},

		start:function(){

			var self = this;

			$.ajax({
				url: this.path,
				dataType: 'json',
				data: this.params,
				success: function(){
					self.complete = true;
					self.trigger(Layerglue.io.LoadEvents.COMPLETE);
					console.log('JSONsLoader.complete: ' + self.path);
				},
				error: function(){
					self.trigger(Layerglue.io.LoadEvents.ERROR);
				}
			});
		}
	});

})();