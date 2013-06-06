

/* 
	SProc:
	t = tiempo virtual del sistema
	n = ciclo 
	delta = momento de vision del sistema

	al setear n se cambia la velocidad con la que avansa el sistema
*/

/*
		TO-DO:
			Implement a Class called config, which is a factory for configs.
*/
var SProc = function(config){
	if(config == null)
		throw "You need to set a config object for creation of SProc.";

	if(!config.System)
		throw "You cannot create a new SProc whitout a System.";

	this.system = config.System instanceof SProc.System && config.System;

	if(!this.system)
		throw "System provided its not an SProc.System object.";
	
	this.system.Parent = this;
	
	this.Cycle = 0;
	this.Delta = config && config.Delta || 1;

	this.Parent = this;

	this.Canvas = SProc.Canvas;
};

SProc.prototype.getVersion = function(){
	return "Version: " + version;
};

SProc.prototype.getTime = function() {
	return this.Cycle * this.Delta;
};

SProc.prototype.play = function(){
	this.Canvas.draw(this._id);

};

SProc.prototype.stop = function(){

};

SProc.prototype.cycle = function(){




	this.Cycle++;
};