
(function(){

	Layerglue.createLazyObjectHierarchy('Layerglue.route');
	
	Layerglue.route.BaseRouter = Backbone.Router.extend({

		initialize:function(){

			this.isFirstPage = true;
			this.pages = {};
			this.complexRoutes = new Backbone.Collection();	
			this.loadAllAssetsAtStartup = true;
		},

		addRoute: function(id, pageClass, uri, handlerName){
			this.complexRoutes.push(new Layerglue.route.Route(id, pageClass, uri, handlerName));

			var self = this;

			//If there is a specified handler, let it deal with the navigation
			if(handlerName)
			{
				this.route(uri, handlerName);
			}
			else //Else use the default showPage functionality
			{
				this.route(uri, handlerName, function(query){
					self.showPage(id, {query:query});
				});
			}
		},

		getPage:function(id, model){
			
			//Try to get requested page from list of already created ones
			var page = this.pages[id];

			//If the page hasn't already been created we need to make a new one
			if(page === undefined)
			{
				var pageClass = this.complexRoutes.get(id).pageClass;

				page = new pageClass({
					model:model
				});

				page.on(Layerglue.sequencer.SequencerEvents.TRANSITION_OUT_COMPLETE, _.bind(this.onPageTransitionOutComplete, this));
				page.on(Layerglue.sequencer.SequencerEvents.TRANSITION_IN_COMPLETE, _.bind(this.onPageTransitionInComplete, this));

				this.pages[id] = page;
			}
			else //Otherwise set the model on the existing page
			{
				//TODO Look into pass the duration as an extra param
				page.setModel(model, 1000);
			}

			return page;
		},

		showPage:function(id, model){
			
			this.pendingPage = this.getPage(id, model);

			if(this.isFirstPage)
			{
				this.isFirstPage = false;
				this._showPendingPage();
			}
			else
			{
				this.startTransitionOut();
			}

			Access.notificationCentre.trigger(Layerglue.constants.SystemEvents.PENDING_PAGE_CHANGE, this.pendingPage);
		},

		_showPendingPage:function(){

			if(!this.pendingPage.isInDOM())
			{
				this.pendingPage.appendToElement($('#main'));
			}

			//TODO Check whether render() needs to happen here
			this.currentPage = this.pendingPage;

			//Deferring here to get rid of glitch at start of animation if startTransitionIn is called immediately
			_.defer(_.bind(this.startTransitionIn, this));

			Access.notificationCentre.trigger(Layerglue.constants.SystemEvents.PAGE_TRANSITION_IN_START, this.currentPage);
		},

		startTransitionIn:function(){

			this.currentPage.attach();
			this.currentPage.startTransitionIn();
		},

		startTransitionOut:function(){
			this.currentPage.startTransitionOut();
		},

		onPageTransitionOutComplete:function(){

			this.currentPage.detach();
			this._showPendingPage();
		},

		onPageTransitionInComplete:function(){

		}
	});

})();