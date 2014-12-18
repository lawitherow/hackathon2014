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

	_hasCssClass = function(element, cssCls) {
		if(typeof(element) === 'string') {
	        element = document.getElementById(element);
	    }
	    if(!element) {
			return;	    	
	    }
		return (' ' + element.className + ' ').indexOf(' ' + cssCls + ' ') > -1;
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

	_createNewEnv = function() {

	};

	_createNewProject = function() {

	};

	_setSubClickEvent = function() {
		for(var i=0;i<document.getElementsByClassName('sub-navi').length;i++) { 
			for(var n=0; n<document.getElementsByClassName('sub-navi')[i].children.length;n++) {
				var liSubElem = document.getElementsByClassName('sub-navi')[i].children[n];
				liSubElem.addEventListener("click", function(event) {
					event.stopPropagation()
					switch(this.parentNode.getAttribute("id")){
						case "pro-sub":
							if(_hasCssClass(this,"create-new")) {
								_createNewProject();
							}
							else {
								_doProjectClickEvent(this);
							}
							break;
						case "env-sub":
							if(_hasCssClass(this,"create-new")) {
								_createNewEnv();
							}
							else {
								_doEnvClickEvent(this);
							}
							break;
						default:
							break;
					}
				}, false);
			}
		}
	};

	_doProjectClickEvent = function(element) {
		_doTheRequest("boxes-detail",element.getAttribute("data-name"));
		document.getElementById("env-window").style.display = "none";
		document.getElementById("proj-name").textContent = element.children[0].textContent;
		document.getElementById("proj-window").style.display = "block";
	};

	_doEnvClickEvent = function(element) {
		document.getElementById("proj-window").style.display = "none";
		document.getElementById("env-name").textContent = element.children[0].textContent;
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

	_doTheRequest = function(status,subStatus) {
	    var xmlHttp = null;
	    var basicURL = "http://localhost/hackathon2014/js/json1.json";

	    xmlHttp = new XMLHttpRequest();

	    if(status === "boxes") {
			url = "http://localhost/hackathon2014/js/json1.json";
		}
		else if(status === "boxes-detail") {
			url = "http://localhost/hackathon2014/js/json3.json";
		}
		else if(status === "environments") {
			url = "http://localhost/hackathon2014/js/json2.json";
		}

    	xmlHttp.open( "GET", url, false );
	    xmlHttp.send( null );
	    var responseObj = JSON.parse(xmlHttp.responseText);

		if(status === "boxes") {
			for(var i=0;i<responseObj.length;i++) {
				document.getElementById("pro-sub").innerHTML += "<li data-name='"+responseObj[i]['code']+"'><a href='#'>"+responseObj[i]['name']+"</a><i class='fa fa-trash-o right fa-1.5x'></i></li>";
			}
			document.getElementById("pro-sub").innerHTML += "<li class='create-new'><a href='#'>Create new</a></li>";
		}
		else if(status === "environments") {
			for(var i=0;i<responseObj.length;i++) {
				document.getElementById("env-sub").innerHTML += "<li data-name='"+responseObj[i]['code']+"'><a href='#'>"+responseObj[i]['name']+"</a><i class='fa fa-trash-o right fa-1.5x'></i></li>";
			}
			document.getElementById("env-sub").innerHTML += "<li class='create-new'><a href='#'>Create new</a></li>";
		}
		else if(status === "boxes-detail") {
			document.getElementById("proj-textarea").textContent = JSON.stringify(responseObj);
		}
	};

	_init = function() {
		_doTheRequest("boxes");
		_doTheRequest("environments");
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

