(function() {
	
	Layerglue.createLazyObjectHierarchy('Layerglue.sequencer');

	Layerglue.sequencer.SequencerStates ={
		PAUSED_START:'pausedAtStart',
		PAUSED_MID: 'pausedMid',
		PAUSED_END:'pausedAtEnd',
		PLAYING_FORWARDS: 'playingForwards',
		PLAYING_BACKWARDS: 'playingBackwards'
	};

})();