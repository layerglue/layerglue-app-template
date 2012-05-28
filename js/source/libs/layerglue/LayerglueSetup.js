/*globals $: false, _: false, Backbone: false, Layerglue: false , Access: false , App: false */

(function(){
	//To be used as the lowest level in a package hierarchy for Layerglue library
	Layerglue = {};

	//To be used as a singleton for global access to properties such as the router or loadManager
	Access = {};

	Layerglue.createLazyObjectHierarchy = function (hierarchyString){

		var splitHierarchy = hierarchyString.split(".");
		var parentItem;
		var currentItem;
		var currentItemName;
		var hierarchy = [];

		for(var i=0 ; i<splitHierarchy.length ; i++)
		{
			if(i === 0)
			{
				parentItem = window;
			}
			else
			{
				parentItem = currentItem;
			}

			currentItemName = splitHierarchy[i];

			//Try to get the object if it already exists
			currentItem = parentItem[currentItemName];

			//If it doesn't exist create a new one
			if(!currentItem)
			{
				parentItem[currentItemName] = currentItem = {};
			}

			hierarchy.push(currentItem);
		}

		return hierarchy;
	};
		
})();