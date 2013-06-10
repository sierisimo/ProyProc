
/*
	Server Class
*/
SProc.Server = function(config){
	if(config == undefined){
		throw "Se esperaba un objeto de configuración";
	}

	if(config instanceof Object && !config.Mu_s)
		throw "Debes especificar la propiedad Mu_s para crear el nuevo objeto Servidor";

	this.Mu_s = config.Mu_s;
	this.busy = false;
	this.attendedTasks = 0;
	this.task = {};
	this.x = 0;
	this.y = 0;
	this.color = "#FFFFFF";
};

SProc.Server.prototype.free = function(){
	this.setState();
	this.task.timeDeparture = this.Parent.Parent.getTime();
	this.attendedTasks++;
	this.color = "#FFFFFF";
	this.Parent.Parent.Canvas.serverChange(this);
};

SProc.Server.prototype.refresh = function(){
	if(this.getState()){
		var actualTime = this.Parent.Parent.getTime();
		if((actualTime - this.task.timeStartService) >= this.Mu_s){
			this.free();
			console.log("Se ha liberado la tarea que llegó en " + this.task.timeArrival);
			console.log("del servidor " + _.indexOf(this.Parent.servers,this));
			this.Parent.taskLogger.push(this.task);
		} 
	}
};

SProc.Server.prototype.attend = function(task){
	if(!task)
		throw "Se debe especificar la tarea que se quiere atender";
	this.task = task;
	this.setState();
	this.color = task.color;
	this.Parent.Parent.Canvas.serverChange(this);
};

SProc.Server.prototype.getState = function(){
	return this.busy;
};

SProc.Server.prototype.setState = function(){
	this.busy = !this.busy;
};

SProc.Server.prototype.valueOf = function() {
	return this.attendedTasks;
};

