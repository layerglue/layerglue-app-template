
(function(){

	Layerglue.createLazyObjectHierarchy('Layerglue.route');

	Layerglue.route.Route = Backbone.Model.extend({

		id:null,
		pageClass:null,
		uri:null,
		handlerName:null,

		initialize:function(id, pageClass, uri, handlerName){

			this.id = id;
			this.pageClass = pageClass;
			this.uri = uri;
			this.handlerName = handlerName;
		}

	});

})();