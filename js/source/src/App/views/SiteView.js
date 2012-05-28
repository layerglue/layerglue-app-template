(function(){

	Layerglue.createLazyObjectHierarchy('App.views');

	App.views.SiteView = Layerglue.views.BaseView.extend({

		initialize:function(){

			Layerglue.views.BaseView.prototype.initialize.call(this);
		}

	});
	
})();
