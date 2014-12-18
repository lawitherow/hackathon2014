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
		elem.style.visibility = "visible";
		elem.style.opacity = 1;
	};

	_hideElement = function(elem) {
		elem.style.visibility = "hidden";
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
				_checkVisibility();
				_showElement(this.children[1]);
				_slideOut(this.children[1], '200px');
				_addCssClass(document.getElementById("main-navi"),"opacityDown");
				
			}, false);
		}
	};

	_setSubClickEvent = function() {
		for(var i=0;i<document.getElementsByClassName('sub-navi').length;i++) { 
			for(var n=0; n<document.getElementsByClassName('sub-navi')[i].children.length;n++) {
				var liElem = document.getElementsByClassName('sub-navi')[i].children[n];
				liElem.addEventListener("click", function() {
					switch(this.parentNode.getAttribute("id")){
						case "pro-sub":
							_doProjectClickEvent(this);
							break;
						case "env-sub":
							_doEnvClickEvent(this);
							break;
						default:
							break;
					}
				}, false);
			}
		}
	};

	_doProjectClickEvent = function(element) {
		document.getElementById("env-window").style.display = "none";
		document.getElementById("proj-window").style.display = "block";
	};

	_doEnvClickEvent = function(element) {
		document.getElementById("proj-window").style.display = "none";
		document.getElementById("env-window").style.display = "block";
	}

	_checkVisibility = function() {
		for(var l=0;l<document.getElementsByClassName('sub-navi').length;l++) {
			if(document.getElementsByClassName('sub-navi')[l].style.visibility === "visible") {
				var visibleElement = document.getElementsByClassName('sub-navi')[l];
				_hideElement(visibleElement);
			    _slideIn(visibleElement, '0');
			}
		}
	};

	_init = function() {
		document.getElementById('main-navi').addEventListener("mouseenter", function(){_slideOut(document.getElementById('main-navi'), '0px')}, false);
		document.getElementById('main-navi').addEventListener("mouseleave", function(){
			_slideIn(document.getElementById('main-navi'), '-230px');
			_checkVisibility();
			_removeCssClass(document.getElementById("main-navi"),"opacityDown");
		}, false);
		_setMainClickEvents();
		_setSubClickEvent();
	};

	return {
		init : _init
	}
})();

window.onload = ggsDevEnv.init;

