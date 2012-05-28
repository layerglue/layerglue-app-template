
(function(){

	Layerglue.createLazyObjectHierarchy('Layerglue.sequencer');

	var events = Layerglue.sequencer.SequencerEvents;
	var states = Layerglue.sequencer.SequencerStates;

	Layerglue.sequencer.SeriesSequencer = Backbone.Model.extend({
		index:null,

		initialize:function(initialItems){
			this.items = [];
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
			item.on(events.COMPLETE,function(){self.onItemComplete(item);});
			this.items.push(item);
		},

		playForwards:function()
		{
			if(this.state === states.PAUSED_START || this.state === states.PAUSED_MID || this.state === states.PLAYING_BACKWARDS)
			{
				if(this.state === states.PLAYING_BACKWARDS)
				{
					this.pause();
				}
				this.state = states.PLAYING_FORWARDS;
				this.getActiveItem().playForwards();
			}
		},

		playBackwards:function()
		{
			if(this.state === states.PAUSED_END || this.state === states.PAUSED_MID || this.state === states.PLAYING_FORWARDS)
			{
				if(this.state === states.PLAYING_FORWARDS)
				{
					this.pause();
				}

				this.state = states.PLAYING_BACKWARDS;
				this.getActiveItem().playBackwards();
			}
		},

		pause:function()
		{
			if(this.state === states.PLAYING_FORWARDS || this.state === states.PLAYING_BACKWARDS)
			{
				var activeItem = this.getActiveItem();

				if(activeItem)
				{
					activeItem.pause();
				}

				this.state = states.PAUSED_MID;
			}
		},

		rewind:function(){
			if(this.state !== states.PAUSED_START)
			{
				this.pause();

				for(var i=this.index ; i>=0 ; i--)
				{
					if(this.items[i].state !== states.PAUSED_START)
					{
						this.items[i].rewind();
					}
				}

				this.index = 0;
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

				this.index = this.items.length-1;
				this.state = states.PAUSED_END;
			}
		},

		next:function(){
			if(this.index < this.items.length-1)
			{
				this.index++;
				this.getActiveItem().playForwards();
			}
			else
			{
				this.state = states.PAUSED_END;
				this.trigger(events.COMPLETE);
			}
		},

		previous:function(){
			if(this.index > 0)
			{
				this.index--;
				this.getActiveItem().playBackwards();
			}
			else
			{
				this.state = states.PAUSED_START;
				this.trigger(events.COMPLETE);
			}
		},

		getActiveItem:function(){
			return this.items[this.index];
		},

		onItemComplete:function(item){

			this.trigger(events.ITEM_COMPLETE);
			if(this.state === states.PLAYING_BACKWARDS)
			{
				this.previous();
			}
			else
			{
				this.next();
			}
		},

		destroy:function(){
			//TODO clear out references to enable garbage collection
		}
	});

})();