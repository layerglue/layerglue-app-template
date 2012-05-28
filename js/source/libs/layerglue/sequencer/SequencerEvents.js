(function() {

	Layerglue.createLazyObjectHierarchy('Layerglue.sequencer');

	Layerglue.sequencer.SequencerEvents = {

		COMPLETE:'complete',
		ITEM_COMPLETE: 'itemComplete',

		TRANSITION_IN_START:'transitionInStart',
		TRANSITION_IN_COMPLETE:'transitionInComplete',
		TRANSITION_OUT_START:'transitionOutStart',
		TRANSITION_OUT_COMPLETE:'transitionOutComplete'
	};

})();