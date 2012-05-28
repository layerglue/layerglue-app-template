(function(){

	Layerglue.createLazyObjectHierarchy('Layerglue.math');

	Layerglue.math.MathUtils = {
		//Define constants here
	};

	Layerglue.math.MathUtils.clamp = function(val, min, max){
		return Math.max(min, Math.min(max, val));
	};

	Layerglue.math.MathUtils.cube = function(value){
		return value * value * value;
	};

	Layerglue.math.MathUtils.round = function(num, dec) {
		var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		return result;
	};

})();