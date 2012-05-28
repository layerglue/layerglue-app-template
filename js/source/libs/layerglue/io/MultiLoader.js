
(function(){

Layerglue.createLazyObjectHierarchy('Layerglue.io');

Layerglue.io.MultiLoader = Backbone.Model.extend({

	initialize:function(){
		this.id = null;
		this.successCount = 0;
	    this.errorCount = 0;
	    this.cache = {};
	    this.items = [];
	    this.complete = false;
	},

	addItem:function(loader) {
	    // console.log('MultiLoader.addItem: ' + loader.path);
	    this.items.push(loader);


	    //NOTE: Need to make sure we listen to ITEM_ERROR to catch nested MultiLoaders
	    loader.on(Layerglue.io.LoadEvents.COMPLETE, _.bind(this.onItemComplete, this));
	    loader.on(Layerglue.io.LoadEvents.ERROR, _.bind(this.onItemError, this));
	    loader.on(Layerglue.io.LoadEvents.ITEM_ERROR, _.bind(this.onItemError, this));
	},

	start:function() {
		this.loadNextItem();
	},

	loadNextItem: function(){

		if(this.getProgress() === 1)
		{
			this.complete = true;
			this.trigger(Layerglue.io.LoadEvents.COMPLETE);
		}
		else
		{
			for(var i=0 ; i<this.items.length ; i++)
			{
				var item = this.items[i];

				if(!item.complete)
				{
					item.start();
					break;
				}
			}
		}
	},

	onItemComplete: function(item){
		//console.log('MultiLoader.onItemComplete: ' + item.path);
		this.trigger(Layerglue.io.LoadEvents.ITEM_COMPLETE, item);
		this.loadNextItem();
	},

	onItemError: function(item){
		console.log('MultiLoader.onItemError: ' + item.path);
		console.log('multiloader error ', this);
		this.trigger(Layerglue.io.LoadEvents.ITEM_ERROR, item);
		this.loadNextItem();
	},

	getAsset: function(path) {
	    return this.cache[path];
	},

	getProgress:function(){
		//If there are no items in the loader report that it is finished, so that processes relying on load complete will run even if loader is empty
		if(this.items.length === 0)
		{
			return 1;
		}

		var completeCount = 0;

		for(var i=0 ; i<this.items.length ; i++)
		{
			if(this.items[i].complete)
			{
				completeCount++;
			}
		}

		// console.log(completeCount , this.items.length);
		return completeCount / this.items.length;
	},

	getNumItems:function(){
		return this.items.length;
	},

	isComplete: function() {
	    return (this.queue.length === this.successCount + this.errorCount);
	}
});

})();