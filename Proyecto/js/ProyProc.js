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

SProc.prototype.clear = function(){

};

SProc.prototype.stop = function(){

};

SProc.prototype.check = function(){

};
/*
	System.prototype.draw = function(){
		var configs = this.canvas, width = configs.width || 400, 
			height = configs.height || 400,
			canvas = $(this.container)[0].getContext('2d');

		canvas.lineWidth = configs.lineWidth || 3;
		canvas.moveTo(0,height/2);
		canvas.lineTo(width/4,height/2);
		canvas.stroke();
		setLines(this.servers.length);
	};
*/
/*
	SProc.System:
*/

SProc.System = function(config){

};
/*
	SProc.Queue:
*/
/*
	SProc.Server:
*//*
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