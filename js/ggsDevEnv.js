// var ggsDevEnv = function(){

// };

var ggsDevEnv = (function(){

	_slideOut = function() {
		document.getElementById('main-navi').style.left = "0px";
	};

	_init = function() {
		_slideOut();
	};

	return {
		init : _init
	}

})();

window.onload = ggsDevEnv.init;

