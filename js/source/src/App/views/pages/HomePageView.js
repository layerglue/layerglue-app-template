(function(){

	Layerglue.createLazyObjectHierarchy('App.views.pages');

	App.views.pages.HomePageView = Layerglue.views.BasePageView.extend({

		id: App.constants.PageConstants.HOME,
		className: 'page',

		initialize: function() {
			Layerglue.views.BasePageView.prototype.initialize.call(this);
		}
	});
	
})();
