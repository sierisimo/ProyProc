
/*
	Server Class
*/
SProc.Server = function(config){
	if(config == undefined){
		throw "You must provide a config object";
	}

	if(config instanceof Object && !config.Mu_s)
		throw "You need to provide Mu_s for creating a new Server Object";

	this.Mu_s = config.Mu_s;
	this.busy = false;
	this.attendedTasks = 0;
	this.task = {};
	this.canvas = new SProc.Canvas({
		type: "Server",
		x:config.x,
		y:config.y,
		width:SProc.Canvas.serverWidth,
		height:SProc.Canvas.serverHeight,
		color:"#FFFFFF"
	});

};

SProc.Server.prototype.free = function(){
	this.setState();
	this.canvas.color = "#FFFFFF";
	this.task.timeDeparture = this.Parent.Parent.getTime();

	/*
		TO-DO
			Implementar llamada a Chichona
	*/

};

SProc.Server.prototype.refresh = function(){
	if(this.getState()){
		var actualTime = this.Parent.Parent.getTime();
		/*
			Switched the order of the operands since actualTime
			is always equal or greater than timeStartService
			not the other way around
		*/
		if((actualTime - this.task.timeStartService) >= this.Mu_s){
			this.free();
			console.log("Se ha liberado una tarea");
			} 
	}
};

SProc.Server.prototype.attend = function(task){
	if(!task)
		throw "Can't attend an invisible client!!";

	this.task = task;
	this.setState();
//	this.canvas.color = task.canvas.color;
};

/*
	TO-DO:
		Implement a toString method.

SProc.Server.prototype.toString = function() {
	return ;
};
*/
SProc.Server.prototype.getState = function(){
	return this.busy;
};

SProc.Server.prototype.setState = function(){
	this.busy = !this.busy;
};

SProc.Server.prototype.valueOf = function() {
	return this.attendedTasks;
};
/*
	Task: Class example. 
*/