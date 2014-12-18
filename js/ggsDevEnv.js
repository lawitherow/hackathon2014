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
		document.getElementById("proj-window").style.display = "none";
		document.getElementById("env-window").style.display = "none";
		document.getElementById("create-proj-window").style.display = "block";

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
		document.getElementById("create-proj-window").style.display = "none";
		document.getElementById("proj-window").style.display = "block";
		document.getElementById("proj-trash").addEventListener("click",function() {
			_doTheRequest("deleteProject",element.getAttribute("data-name"));
		}, false);
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
	    var basicURL = "http://hack-nl01.nl.ggs-net.com/index.php/";

	    xmlHttp = new XMLHttpRequest();
	    var responseObj = "";

	    if(status === "boxes") {
			url = "http://hack-nl01.nl.ggs-net.com/index.php/boxes";
			xmlHttp.open( "GET", url, false );
			xmlHttp.send( null );
	     	responseObj = JSON.parse(xmlHttp.responseText);
		}
		else if(status === "boxes-detail") {
			url = "http://hack-nl01.nl.ggs-net.com/index.php/boxes/"+subStatus;
			xmlHttp.open( "GET", url, false );
			xmlHttp.send( null );
	     	responseObj = JSON.parse(xmlHttp.responseText);
		}
		else if(status === "environments") {
			url = "http://hack-nl01.nl.ggs-net.com/index.php/environments";
			xmlHttp.open( "GET", url, false );
			xmlHttp.send( null );
	     	responseObj = JSON.parse(xmlHttp.responseText);
		}
		else if(status === "saveProject") {
			url = "http://hack-nl01.nl.ggs-net.com/index.php/boxes/"+document.getElementById("proj-textarea").getAttribute("acitve-code");
			xmlHttp.open( "POST", url, false );
			xmlHttp.setRequestHeader("Content-type", "application/json");
			xmlHttp.send(document.getElementById("proj-textarea").textContent);
			document.getElementById("proj-textarea").setAttribute("disabled");
			document.getElementById("proj-save").setAttribute("disabled");
		}
		else if(status === "deleteProject") {
			url = "http://hack-nl01.nl.ggs-net.com/index.php/boxes/"+document.getElementById("proj-textarea").getAttribute("acitve-code");
			xmlHttp.open( "DELETE", url, false );
			xmlHttp.send(null);
			window.location.reload();
		}

		if(status === "boxes") {
			for(var i=0;i<responseObj.length;i++) {
				document.getElementById("pro-sub").innerHTML += "<li data-name='"+responseObj[i]['code']+"'><a href='#'>"+responseObj[i]['name']+"</a></li>";
			}
			document.getElementById("pro-sub").innerHTML += "<li class='create-new btn btn-success'><a href='#'>Create new</a></li>";
		}
		else if(status === "environments") {
			for(var i=0;i<responseObj.length;i++) {
				document.getElementById("env-sub").innerHTML += "<li data-name='"+responseObj[i]['code']+"'><a href='#'>"+responseObj[i]['name']+"</a></li>";
			}
			document.getElementById("env-sub").innerHTML += "<li class='create-new btn btn-success'><a href='#'>Create new</a></li>";
		}
		else if(status === "boxes-detail") {
			document.getElementById("proj-textarea").setAttribute("acitve-code",subStatus);
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
		document.getElementById("proj-edit").addEventListener("click", 
			function()			{
				document.getElementById("proj-textarea").removeAttribute("disabled");
				document.getElementById("proj-save").removeAttribute("disabled");
			}, 
		false);

		document.getElementById("proj-save").addEventListener("click", 
			function()			{
				_doTheRequest("saveProject");
			}, 
		false);
	};

	return {
		init : _init
	}
})();

window.onload = ggsDevEnv.init;

