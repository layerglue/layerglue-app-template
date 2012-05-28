
(function(){

	Layerglue.createLazyObjectHierarchy('Layerglue.views');

	Layerglue.views.TransitionStates = {
		SHOWN:"shown",
		HIDDEN:"hidden",
		SHOWING:"showing",
		HIDING:"hiding"
	};


	var sequencerEvents = Layerglue.sequencer.SequencerEvents;
	var sequencerStates = Layerglue.sequencer.SequencerStates;
	var states = Layerglue.views.TransitionStates;

	Layerglue.views.TransitionableView = Layerglue.views.BaseView.extend({

		hasDualTransitions: true,

		initialize:function(){

			Layerglue.views.BaseView.prototype.initialize.call(this);

			this.state = states.HIDDEN;
		},

		/****************************************
		Transitioning
		****************************************/

		setupInitialAppearance:function(){
			this.$el.css({opacity:0});
		},

		setupMonoTransition:function(){
			this.transition = this.createMonoTransition();
			this.transition.on(sequencerEvents.COMPLETE, _.bind(this._onTransitionComplete, this));
		},

		destroyTransition:function(transition){
			if(transition){
				transition.off(sequencerEvents.COMPLETE);
				transition.destroy();
				transition = null;
			}
		},

		_onTransitionComplete:function(){
			if(this.transition.state == sequencerStates.PAUSED_END)
			{
				this.trigger(sequencerEvents.TRANSITION_IN_COMPLETE);
				this.onTransitionInComplete();
			}
			else if(this.transition.state == sequencerStates.PAUSED_START)
			{
				this.trigger(sequencerEvents.TRANSITION_OUT_COMPLETE);
				this.onTransitionOutComplete();
			}
			else
			{
				console.log('Error: Got to end of transition and not in PAUSED_END or PAUSED_START state.');
			}
		},

		_onTransitionInComplete:function(){
			this.state = states.SHOWN;
			this.trigger(sequencerEvents.TRANSITION_IN_COMPLETE);
			this.onTransitionInComplete();
		},

		_onTransitionOutComplete:function(){
			this.state = states.HIDDEN;
			this.trigger(sequencerEvents.TRANSITION_OUT_COMPLETE);
			this.onTransitionOutComplete();
		},

		_startTransitionIn:function(doImmediately){
			
			this.state = states.SHOWING;
			this.onTransitionInStart();
			this.trigger(sequencerEvents.TRANSITION_IN_START);

			this.destroyTransition(this.transitionIn);
			
			this.setupInitialAppearance();
			this.transitionIn = this.createTransitionIn();
			
			if(doImmediately)
			{
				this.transitionIn.fastForward();
				this._onTransitionInComplete();
			}
			else
			{
				this.transitionIn.on(sequencerEvents.COMPLETE, _.bind(this._onTransitionInComplete, this));
				this.transitionIn.playForwards();
			}
		},

		_startTransitionOut:function(doImmediately){
			this.state = states.HIDING;
			this.onTransitionOutStart();
			this.trigger(sequencerEvents.TRANSITION_OUT_START);

			this.destroyTransition(this.transitionOut);

			this.transitionOut = this.createTransitionOut();

			if(doImmediately)
			{
				this.transitionOut.fastForward();
				this._onTransitionOutComplete();
			}
			else
			{
				this.transitionOut.on(sequencerEvents.COMPLETE, _.bind(this._onTransitionOutComplete, this));
				this.transitionOut.playForwards();
			}
		},

		createMonoTransition:function(){
			return new Layerglue.sequencer.AnimationSequencerItem(this.$el, {opacity: '1'}, {duration:600,  easing:'easeInOutQuad'});
		},

		createTransitionIn:function(){
			return new Layerglue.sequencer.AnimationSequencerItem(this.$el, {opacity: '1'}, {duration:600, easing:'easeInOutQuad'});
		},

		createTransitionOut:function(){
			return new Layerglue.sequencer.AnimationSequencerItem(this.$el, {opacity: '0'}, {duration:600, easing:'easeInOutQuad'});
		},

		startTransitionIn:function(doImmediately){

			if(this.hasDualTransitions)
			{
				//If we're currently transitioning out, stop the out transition
				if(this.state === states.HIDING){
					if(this.transitionOut)
					{
						this.transitionOut.pause();
					}

					this._startTransitionIn(doImmediately);
				}
				else if(this.state === states.HIDDEN) //Else play the in transition
				{
					this._startTransitionIn(doImmediately);
				}
				else if(this.state === states.SHOWING || this.state === states.SHOWN)
				{
					//Don't do anything if we're already showing or shown
				}
			}
			else
			{
				if(this.state === states.HIDING || this.state === states.HIDDEN)
				{
					this.state = states.SHOWING;
					this.onTransitionInStart();
					this.trigger(sequencerEvents.TRANSITION_IN_START);

					this.transition.playForwards();
				}
			}
		},

		startTransitionOut:function(doImmediately){

			if(this.hasDualTransitions)
			{
				//If we're currently transitioning out, stop the in transition then play the out transition
				if(this.state === states.SHOWING)
				{
					if(this.transitionIn)
					{
						this.transitionIn.pause();
					}

					this._startTransitionOut(doImmediately);
				}
				else if(this.state === states.SHOWN || this.state === undefined) //Else play the out transition
				{
					this._startTransitionOut(doImmediately);
				}
				else if(this.state === states.HIDING || this.state === states.HIDDEN)
				{
					//Don't do anything if we're already hiding or hidden
				}
			}
			else
			{
				if(this.state === states.SHOWING || this.state === states.SHOWN)
				{
					this.state = states.HIDING;
					this.onTransitionOutStart();
					this.trigger(sequencerEvents.TRANSITION_OUT_START);

					this.transition.playBackwards();
				}
			}
		},

		stopTransition:function(){
			this.transition.pause();
		},

		/****************************************
		Event handlers
		****************************************/

		onRenderComplete:function(){

		},

		_onAddedToDOM:function(){

			this.onAddedToDOM();
		},

		onAddedToDOM:function(){
			if(!this.hasDualTransitions)
			{
				this.setupMonoTransition();
			}

			this.setupInitialAppearance();
		},

		attach:function(){
			this.$el.css({display:'block'});
		},

		detach:function(){
			this.$el.css({display:'none'});
		},

		onTransitionInStart:function(){

		},

		onTransitionInComplete:function(){

		},

		onTransitionOutStart:function(){

		},

		onTransitionOutComplete:function(){

		}
	});

})();