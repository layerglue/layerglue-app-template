(function(){

	Layerglue.createLazyObjectHierarchy('App.router');

	App.router.AppRouter = Layerglue.route.BaseRouter.extend({

		initialize:function(){
			Layerglue.route.BaseRouter.prototype.initialize();

			Access.siteView = new App.views.SiteView({el:$('body')});

			//Add in shared assets
			Access.loadManager.addPreloadableAsset(new Layerglue.io.ImageLoader({id:'shared', path:'/images/shared-sprites.png'}));

			//Add routes
			this.addRoute(App.constants.PageConstants.PRELOADER,	App.views.pages.PreloaderPageView,	"preloader");
			this.addRoute(App.constants.PageConstants.HOME,			App.views.pages.HomePageView,		"");

			//Start listening for the preloader completing
			Access.notificationCentre.on(Layerglue.constants.SystemEvents.PRELOADER_COMPLETE, _.bind(this.onPreloaderComplete, this));

			//Start the preloader
			this.showPage(App.constants.PageConstants.PRELOADER, {data:Access.loadManager.loader});

			Access.loadManager.start();
		},

		onPreloaderComplete: function() {
			Backbone.history.start();
		}

	});

})();
