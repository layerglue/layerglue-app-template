(function(){

	Layerglue.createLazyObjectHierarchy('App.views.pages');

	App.views.pages.PreloaderPageViewModes = {
		SKIP_ANIM_IF_CACHED:'skipAnimIfCached',
		ALWAYS_PLAY_ANIM:'alwaysPlayAnim'
	};

	App.views.pages.PreloaderPageView = Layerglue.views.BasePageView.extend({

		id: App.constants.PageConstants.PRELOADER,
		className: 'page',
		mode:App.views.pages.PreloaderPageViewModes.ALWAYS_PLAY_ANIM,

		initialize:function(){

			Layerglue.views.BasePageView.prototype.initialize.call(this);


			this.loadIsComplete = false;
			this.cacheCheckDuration = 100;
			this.animationDuration = 500;

			this.model.data.on('itemLoadComplete', _.bind(this.onLoadItemComplete, this));
			this.model.data.on('loadComplete', _.bind(this.onLoadComplete, this));

			this.minDurationComplete = false;

			this.render();

			if(this.mode === App.views.pages.PreloaderPageViewModes.SKIP_ANIM_IF_CACHED)
			{
				//Skip directly to first page if content loads before cacheCheckDuration
				_.defer(_.bind(this.startCacheCheckTimeout, this));
			}
			else
			{
				//Always show the loader animation
				_.defer(_.bind(this.updateProgress, this));
			}

			this.setupInitialAppearance();
		},

		onAddedToDOM:function(){
			this.progressBar = this.addChild(new App.views.controls.ProgressBar({el:this.$el.find('.progress-bar-wrapper')}));
			this.progressBar.on('animationComplete', _.bind(this.onProgressBarAnimationComplete, this));
		},

		startCacheCheckTimeout:function(){
			this.cacheCheckTimeout = setTimeout(_.bind(this.onCacheCheckTimeout, this), this.cacheCheckDuration);
		},

		onCacheCheckTimeout:function(){

			if(this.model.getProgress() === 1)
			{
				Access.notificationCentre.trigger(Layerglue.constants.SystemEvents.PRELOADER_COMPLETE);
			}
			else
			{
				this.updateProgress();
			}
		},

		startProgressCheckTimeout:function(){
			this.progressCheckTimeout = setTimeout(_.bind(this.onProgressCheckTimeout, this), this.animationDuration);
		},

		updateProgress:function(){

			// console.log('this.model.getProgress(): ' + this.model.getProgress(), this.model.items.length);
			this.progressBar.setValue(this.model.data.getProgress(), this.animationDuration);
		},

		onProgressBarAnimationComplete:function(){

			if(this.progressBar.calculateValue() === 1)
			{
				Access.notificationCentre.trigger(Layerglue.constants.SystemEvents.PRELOADER_COMPLETE);
			}
			else
			{
				this.updateProgress();
			}
		},

		onLoadItemComplete:function(item){
		},

		onLoadComplete:function(){
		},

		render:function(){
			this.populateTemplate();
			return this;
		}

	});

})();
