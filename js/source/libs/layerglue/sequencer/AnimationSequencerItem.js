
(function() {

	Layerglue.createLazyObjectHierarchy('Layerglue.sequencer');

	var states = Layerglue.sequencer.SequencerStates;
	var events = Layerglue.sequencer.SequencerEvents;

	Layerglue.sequencer.AnimationSequencerItem = Backbone.Model.extend({
		object:null,
		endValues:null,
		options:{},

		startValues:null,
		state:null,

		delayTimout:null,

		initialize:function(object, properties, options)
		{
			this.object = object;
			this.endValues = properties;

			this.options = options;
			//Need to do this slight hack so that jquery.animate calls the AnimationSequencerItem complete method, we do
			//some stuff, and then call the user defined complete method afterwards.
			this.options._complete = this.options.complete;
			this.options.complete = _.bind(this.onComplete, this);

			this.state = states.PAUSED_START;
		},

		playForwards:function(){
			clearTimeout(this.delayTimeout);
			if(this.state === states.PAUSED_START || this.state === states.PAUSED_MID || this.state === states.PLAYING_BACKWARDS)
			{
				if(this.options.delay)
				{
					this.delayTimeout = setTimeout(_.bind(this._playForwards, this), this.options.delay);
				}
				else
				{
					this._playForwards();
				}
			}
		},

		_playForwards:function(){
			if(this.state === states.PAUSED_START && this.startValues === null)
			{
				this.populateStartValues();
			}

			//Need to pause first to ensure we stop the JQuery animation
			this.pause();

			this.object.animate(this.endValues, this.options);
			this.state = states.PLAYING_FORWARDS;
		},

		playBackwards:function(){
			clearTimeout(this.delayTimeout);
			if(this.state === states.PAUSED_END || this.state === states.PAUSED_MID || this.state === states.PLAYING_FORWARDS)
			{
				if(this.options.delay)
				{
					this.delayTimeout = setTimeout(_.bind(this._playBackwards, this), this.options.delay);
				}
				else
				{
					this._playBackwards();
				}
			}
		},

		_playBackwards:function(){
			//Need to pause first to ensure we stop the JQuery animation
			this.pause();

			this.object.animate(this.startValues, this.options);
			this.state = states.PLAYING_BACKWARDS;
		},

		pause:function(){
			clearTimeout(this.delayTimeout);
			this.object.stop();
			this.state = states.PAUSED_MID;
		},

		rewind:function(){
			clearTimeout(this.delayTimeout);

			if(this.state !== states.PAUSED_START)
			{
				this.pause();

				for(var key in this.startValues)
				{
					if(key === 'rotate')
					{
						this.object.rotate(this.getSafeDegrees(this.startValues[key]));
					}
					else
					{
						this.object.css(key, this.startValues[key]);
					}
				}

				this.state = states.PAUSED_START;
			}
		},

		fastForward:function(){
			clearTimeout(this.delayTimeout);

			if(this.state !== states.PAUSED_END)
			{
				if(this.state === states.PAUSED_START && this.startValues === null)
				{
					this.populateStartValues();
				}

				this.pause();

				var o = this.endValues;

				for(var key in this.endValues)
				{
					if(key === 'rotate')
					{
						this.object.rotate(this.getSafeDegrees(this.endValues[key]));
					}
					else
					{
						this.object.css(key, Number(this.endValues[key]));
					}
				}

				this.state = states.PAUSED_END;
			}
		},

		onComplete:function(){
			if(this.state === states.PLAYING_BACKWARDS)
			{
				this.state = states.PAUSED_START;
			}
			else
			{
				this.state = states.PAUSED_END;
			}

			if(this.options._complete)
			{
				this.options._complete();
			}

			this.trigger(events.COMPLETE);
		},

		populateStartValues:function(){

			this.startValues = {};

			for(var key in this.endValues)
			{
				if(key === 'rotate')
				{
					this.startValues[key] = this.getRotation();
				}
				else if(key === 'scale')
				{
					this.startValues[key] = this.getScale();
				}
				else
				{
					this.startValues[key] = this.object.css(key);
				}
			}
		},

		getTransformMatrix:function(){
			return this.object.css("-webkit-transform") ||
				this.object.css("-moz-transform") ||
				this.object.css("-ms-transform") ||
				this.object.css("-o-transform") ||
				this.object.css("transform") ||
				null;
		},

		getRotation:function(){
			var angle = 0;
			var matrix = this.getTransformMatrix();

			if(matrix && matrix !== 'none')
			{
				var values = matrix.split('(')[1].split(')')[0].split(',');
				var a = values[0];
				var b = values[1];
				var c = values[2];
				var d = values[3];

				angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
			}

			return angle;
		},

		getScale:function(){
			var angle = 0;
			var matrix = this.getTransformMatrix();

			var scale = 1;

			if(matrix && matrix !== 'none')
			{
				var values = matrix.split('(')[1].split(')')[0].split(',');
				var a = values[0];
				var b = values[1];
				var c = values[2];
				var d = values[3];

				scale = Math.sqrt(a*a + b*b);
			}

			return scale;
		},

		getSafeDegrees:function(str)
		{
			if(str && isNaN(str) && str.substring(str.length-3, str.length) === 'deg')
			{
				return Number(str.substring(0, str.length-3));
			}

			return Number(str);
		},

		destroy:function(){
			//TODO clear out references to enable garbage collection
		}
	});


})();