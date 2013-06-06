

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
var SProc = function(config, id){
	if(config == null)
		throw "You need to set a config object for creation of SProc.";

	if( !(config instanceof SProc.System) && !config.System )
		throw "You cannot create a new SProc whitout a System.";

	var tSystem = (config instanceof SProc.System) ? config : config.System;

	this.system = tSystem;
	this.system.Parent = this;
	
	this.Cycle = 0;
	this.Delta = config && !config instanceof SProc.System && config.Delta || 1;
	this._id = id || config && config.id || $('canvas').attr('id');

	this.Parent = this;
	//Should be implemented in future versions to have more than one system.
	//this.canvasId = config.id || "main";

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