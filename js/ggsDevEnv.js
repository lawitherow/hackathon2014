// var ggsDevEnv = function(){

// };

var ggsDevEnv = (function(){

	_slideOut = function(elem,value) {
		elem.style.left = value;
	};

	_slideIn = function(elem,value) {
		elem.style.left = value;
	};

	_showElement = function(elem) {
		elem.style.opacity = 1;
	};

	_hideElement = function(elem) {
		elem.style.opacity = 0;
	};

	_addCssClass = function(element,cssCls) {
		if(typeof(element) === 'string') {
	        element = document.getElementById(element);
	    }
	    if(!element || element.className.indexOf(cssCls) > 0) {
	        return;
	    }
	    element.className +=" "+ cssCls;
	};

	_removeCssClass = function(element,cssCls) {
		if(typeof(element) === 'string'){
	        element = document.getElementById(element);
	    }
	    if(!element) {
	    	return;
	    }
	    var t_text = ""+element.className;
	    t_text = t_text.replace(eval("/ "+cssCls+"/g"), "");
	    element.className = t_text;
	};

	_setMainClickEvents = function() {
		for(var i=0; i<document.getElementById('main-navi').children[0].children.length; i++) {
			var liElem = document.getElementById('main-navi').children[0].children[i];
			liElem.addEventListener("click", function()
			{
				ggsDevEnv.showElement(document.getElementById("sub-navi"));
				ggsDevEnv.slideOut(document.getElementById('sub-navi'), '200px');
				ggsDevEnv.addCssClass(document.getElementById("main-navi"),"opacityDown");
				
			}, false)
		}
	};

	_init = function() {
		document.getElementById('main-navi').addEventListener("mouseenter", function(){ggsDevEnv.slideOut(document.getElementById('main-navi'), '0px')}, false);
		document.getElementById('main-navi').addEventListener("mouseleave", function(){
			ggsDevEnv.slideIn(document.getElementById('main-navi'), '-230px');
			ggsDevEnv.hideElement(document.getElementById('sub-navi'));
			ggsDevEnv.slideIn(document.getElementById('sub-navi'), '0');
		}, false);
		_setMainClickEvents();
	};

	return {
		init : _init,
		slideOut : _slideOut,
		slideIn : _slideIn,
		showElement : _showElement,
		hideElement : _hideElement,
		addCssClass : _addCssClass,
		removeCssClass : _removeCssClass
	}
})();

window.onload = ggsDevEnv.init;

