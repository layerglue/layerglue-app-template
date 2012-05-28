(function(){

	Layerglue.createLazyObjectHierarchy('Layerglue.string');

	Layerglue.string.StringUtils = {
		//Define constants here
	};

	Layerglue.string.StringUtils.trim = function(str){
		return str.replace(/^\s+|\s+$/g, '');
	}
	
})();