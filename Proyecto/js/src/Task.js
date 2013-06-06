
/*
	Task: Class example. 
*/
SProc.Task = function(configObject){
	if (configObject === undefined){
		throw "Se esperaba un objeto de configuración";
	}
	if (configObject.timeArrival === undefined)
		throw "Debes de establecer un tiempo de arribo";
	this.timeArrival = configObject.timeArrival
	this.timeStartService = (configObject && configObject.timeStartService) || -1;
	this.timeDeparture = (configObject && configObject.timeDeparture) || -1;
};

SProc.Task.prototype.getTimeArrival = function(){
	return this.timeArrival;
};
SProc.Task.prototype.getTimeStartService = function(){
	return this.timeStartService;
};
SProc.Task.prototype.getTimeDeparture = function(){
	return this.timeDeparture;
};

SProc.Task.prototype.setTimeArrival = function(newTimeArrival){
	this.timeArrival = newTimeArrival;
};
SProc.Task.prototype.setTimeStartService = function(newTimeStartService){
	this.timeStartService = newTimeStartService;
};
SProc.Task.prototype.setTimeDeparture = function(newTimeDeparture){
	this.timeArrival = newTimeDeparture;
};
