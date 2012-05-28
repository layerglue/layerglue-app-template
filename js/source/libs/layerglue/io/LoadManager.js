(function(){
	
	Layerglue.createLazyObjectHierarchy('Layerglue.io');

	Layerglue.io.LoadManager = Backbone.Model.extend({

		initialize:function(options){

			this.initialLoadComplete = false;
			this.setupItems = [];

			this.loader =  new Layerglue.io.MultiLoader
			this.loader.on(Layerglue.io.LoadEvents.ITEM_COMPLETE, this.onItemComplete);
			this.loader.on(Layerglue.io.LoadEvents.ITEM_ERROR, this.onItemError);
		},

		start: function(){
			// console.log(this.loader.getNumItems());
			// console.log(this.setupItems.length);
			this.loader.start();
		},

		addDefaultPreloadableAssetForPage: function(id){
			this.addPreloadableAsset(new Layerglue.io.ImageLoader({id:id, path:'images/pages/' + id + '.png'}));
		},

		addPreloadableAsset: function(loader){

			// if(this.initialLoadComplete)
			// {
			// 	this.loader.addItem(loader);
			// }
			// else
			// {
			// 	this.setupItems.push(loader);
			// }


			this.loader.addItem(loader);
		},

		onItemComplete: function(item){
			// console.log('LoadManager.itemComplete: ', item.id);
		},

		onItemError: function(item){
			// console.log('LoadManager.itemError: ', item.id);
		}

	});

	//LoadManager needs to be created upfront because load requirements are defined within the self executing function of each class file
	Access.loadManager = new Layerglue.io.LoadManager();

})();