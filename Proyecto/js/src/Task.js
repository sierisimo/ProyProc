
/*
	Task: Class example. 
*/
SProc.Task = function(configObject){
	if (configObject.timeArrival === undefined || configObject.timeStartService === undefined || configObject.timeDeparture === undefined){
		//return error or ser default values
	}
	else{
	this.timeArrival = configObject.timeArrival;
	this.timeStartService = configObject.timeStartService;
	this.timeDeparture = configObject.timeDeparture;
	}
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
}
SProc.Task.prototype.setTimeStartService = function(newTimeStartService){
	this.timeStartService = newTimeStartService;
}
SProc.Task.prototype.setTimeDeparture = function(newTimeDeparture){
	this.timeArrival = newTimeDeparture;
}
