
(function(){
	
	Layerglue.createLazyObjectHierarchy('Layerglue.sequencer');

	var events = Layerglue.sequencer.SequencerEvents;
	var states = Layerglue.sequencer.SequencerStates;

	Layerglue.sequencer.ParallelSequencer = Backbone.Model.extend({
		completedItemsIncrementer:NaN,

		initialize:function(initialItems){
			this.items = [];
			this.completedItemsIncrementer = 0;
			this.index = 0;
			this.state = states.PAUSED_START;

			if(initialItems)
			{
				for(var i=0 ; i<initialItems.length ; i++)
				{
					var item = initialItems[i];
					this.addItem(item);
				}
			}
		},

		addItem:function(item)
		{
			var self = this;
//		item.on('complete',function(){this.onItemComplete(item);});
			item.on('complete', _.bind(function(){this.onItemComplete(item);},this));
			this.items.push(item);
		},

		playForwards:function()
		{
			if(this.state === states.PAUSED_START || this.state === states.PAUSED_MID || this.state === states.PLAYING_BACKWARDS)
			{
				this.completedItemsIncrementer = 0;

				for(var i=0 ; i<this.items.length ; i++)
				{
					this.items[i].playForwards();
				}

				this.state = states.PLAYING_FORWARDS;
			}
		},

		playBackwards:function()
		{
			if(this.state === states.PAUSED_END || this.state === states.PAUSED_MID || this.state === states.PLAYING_FORWARDS)
			{
				this.completedItemsIncrementer = 0;

				for(var i=0 ; i<this.items.length ; i++)
				{
					this.items[i].playBackwards();
				}
				this.state = states.PLAYING_BACKWARDS;
			}
		},

		pause:function()
		{
			if(this.state === states.PLAYING_FORWARDS || this.state === states.PLAYING_BACKWARDS)
			{
				this.state = states.PAUSED_MID;

				for(var i=0 ; i<this.items.length ; i++)
				{
					this.items[i].pause();
				}
			}
		},

		rewind:function(){
			if(this.state !== states.PAUSED_START)
			{
				this.pause();

				for(var i=0 ; i<this.items.length ; i++)
				{
					if(this.items[i].state !== states.PAUSED_START)
					{
						this.items[i].rewind();
					}
				}

				this.completedItemsIncrementer = 0;
				this.state = states.PAUSED_START;
			}
		},

		fastForward:function(){
			if(this.state !== states.PAUSED_END)
			{
				this.pause();

				for(var i=this.index ; i<this.items.length ; i++)
				{
					if(this.items[i].state !== states.PAUSED_END)
					{
						this.items[i].fastForward();
					}
				}

				this.completedItemsIncrementer = this.items.length-1;
				this.state = states.PAUSED_END;
			}
		},

		onItemComplete:function(item){
			this.trigger('itemComplete');
			this.completedItemsIncrementer++;

			if(this.completedItemsIncrementer >= this.items.length)
			{
				if(this.state === states.PLAYING_BACKWARDS)
				{
					this.state = states.PAUSED_START;
				}
				else
				{
					this.state = states.PAUSED_END;
				}

				this.trigger('complete');
			}
		},

		destroy:function(){
			//TODO clear out references to enable garbage collection
		}
	});

})();

