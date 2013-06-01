

/* 
	SProc:
	t = tiempo virtual del sistema
	n = ciclo 
	delta = momento de vision del sistema

	al setear n se cambia la velocidad con la que avansa el sistema
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

	this.Canvas = SProc.Canvas;

};

SProc.prototype.getVersion = function(){
	return "Version: " + version;
};

SProc.prototype.getTime = function() {
	// TODO
};

SProc.prototype.play = function(){

};

SProc.prototype.stop = function(){

};

SProc.prototype.cycle = function(){

};