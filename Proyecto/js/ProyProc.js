(function(version){
	
/* 
	SProc:
*/

/*
	TO-DO: Define 'config' object, properties and that things.
		TO-DO:
			Implement a Class called config, which is a factory for configs.
*/
var SProc = function(config){
	if(config == null)
		throw "You need to set a config object for creation of SProc.";

	if(!config.System)
		throw "You cannot create a new SProc whitout a System.";

	this.System = config.System;

	//Should be implemented in future versions to have more than one system.
	//this.canvasId = config.id || "main";


};

SProc.prototype.getVersion = function(){
	return "Version: " + version;
};

SProc.prototype.draw = function(id){
	// Only one canvas... this should be changed in next version.
	//
	// context should come in a config object in future version.
	// with some initialization like these:
	/*
		for(var i in config){
			canvas[i] = config[i];
		}
	*/
	var canvas = $('#'+id)[0].getContext("2d"),
		width = canvas.width, height = canvas.height,
		linesEndPts = [], recs = [], //arrays of objects on the style {x:number,y:number}
		mainLine = {x:width*0.35,y:height/2}, //0.35 == 35%
		elements = this.System.server.length, segments = height/elements;

	function setLines(){
		var len = elements, midlePoint = segments/2, 
			newWidth = width-mainLine.x, 
			space = {x:mainLine.x+newWidth*0.1};

		for(var i = 0; i<elements;i++){
			canvas.moveTo(mainLine.x,mainLine.y);
			canvas.lineTo(space.x,midlePoint);
			linesEndPts.push({x:space.x,y:midlePoint});
			midlePoint += segments;
		}
		canvas.moveTo(space.x,midlePoint);
	};

	function setRects(){

	};

	// Configuration for the canvas, next version should take this from an config object.
	// TO-DO:
	// 		Implement the option to make the lines visible or not.
	canvas.fillStyle = "white";
	canvas.strokeStyle = "white";
	canvas.lineWidth = 2;

	//Main line/Visible Queue
	canvas.moveTo(0,height/2);
	canvas.lineCap = "round";
	canvas.lineTo(mainLine.x,mainLine.y);
	linesEndPts.push({x:mainLine.x,y:mainLine.y});
	setLines();

	canvas.endPoints = {lines: linesEndPts, recs: recs};
	this.canvas = canvas;
	this.inDOM = true;

	/* 
		TO-DO: Implement the 
	*/
};

// This method is still on doubt because we don't know if we need this method or a setInterval to draw().
SProc.prototype.redraw = function(){

};

// Should be changed in future version tod implement this.canvas
SProc.prototype.clear = function(id){
	var canvas = document.getElementById(id).getContext("2d"), 
		width = canvas.canvas.width, height = canvas.canvas.height;
	canvas.clearRect(0,0,width,height)
};

SProc.prototype.stop = function(){

};

SProc.prototype.cycle = function(){

};
/*
	SProc.System:
*/

SProc.System = function(config){

};

SProc.System.prototype.sayHello = function(){
	return "Hello";
};
/*
	SProc.Queue:
*/
/*
	SProc.Server:

	var servidor1 = new SProc.Server({})
*/

SProc.Server = function(config){
	if(config == undefined){
		throw "You must provide a config object";
	}

	if(config instanceof Object && !config.MuS)
		throw "You need to provide MuS for creating a new Server Object";

	this.MuS = config.MuS ? config.MuS : config;
	this.busy = false;
	this.attendedTasks = 0;
	this.task = {};
};

SProc.Server.prototype.free = function(){

};

SProc.Server.prototype.refresh = function(){

};

SProc.Server.prototype.valueOf = function() {
	return this.attendedTasks;
};

SProc.Server.prototype.toString = function() {
	return "Hi";
}
/*
	Task: Class example. 
*/
SProc.Task = function(config){
	this.name = "Tarea";
	this.atributo = config.atributo;
	this.edad = 10;
};

SProc.Task.prototype.getName = function(){
	return this.name;
};

SProc.Task.prototype.setName = function(newName){
	function nombre(){
		console.log("se escribe el nuevo nombre en la tarea " + this.name);
	};
	nombre();
	this.name = newName;
}

SProc.Task.prototype.bornAge = function(){
	var today = new Date();
	return today.getYear() - this.edad;
}
	window.SProc = SProc;
})("0.0.1");