// var ggsDevEnv = function(){

// };

var ggsDevEnv = (function(){

	_slideOut = function(elem,value) {
		elem.style.left = value;
	};

	_slideIn = function(elem,value) {
		elem.style.left = value;
	};

	_setMainClickEvents = function() {
		for(var i=0; i<document.getElementById('main-navi').children[0].children.length; i++) {
			var liElem = document.getElementById('main-navi').children[0].children[i];
			liElem.addEventListener("onclick", function(){ggsDevEnv.slideOut(document.getElementById('sub-navi'), '300px')}, false)
		}
	};

	_init = function() {
		document.getElementById('main-navi').addEventListener("mouseover", function(){ggsDevEnv.slideOut(document.getElementById('main-navi'), '0px')}, false);
		document.getElementById('main-navi').addEventListener("mouseout", function(){ggsDevEnv.slideIn(document.getElementById('main-navi'), '-230px')}, false);
		_setMainClickEvents();
	};

	return {
		init : _init,
		slideOut : _slideOut,
		slideIn : _slideIn
	}
})();

window.onload = ggsDevEnv.init;

