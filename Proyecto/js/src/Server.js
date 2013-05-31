
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
	this.canvas = new SProc.Canvas({
		type: SProc.Canvas.RECT,
		x:config.x,
		y:config.y,
		width:SProc.Canvas.serverWidth,
		height:SProc.Canvas.serverHeight,
		color:"#FFFFFF"
	});
};

SProc.Server.prototype.free = function(){
		
};

SProc.Server.prototype.refresh = function(){

};

SProc.Server.prototype.getState = function(){
	return this.busy;
};

SProc.Server.prototype.setState = function(){
	this.busy = !this.busy;
}

SProc.Server.prototype.valueOf = function() {
	return this.attendedTasks;
};

SProc.Server.prototype.attend = function(task){
	if(!task)
		throw "Can't attend an invisible client!!";

	this.task = task;
	/*
		Logica de dibujo
	*/
};

/*
	TO-DO:
		Implement a toString method.
*/
SProc.Server.prototype.toString = function() {
	return ;
}