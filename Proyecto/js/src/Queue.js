
/*
	SProc.Queue:
*/
sProc.Queue = function(config){
	this.Mu_a = 4;
	this.capacity = 20;
	this.Task = new Array();
};

sProc.Queue.prototype.getMu_a = function(){
	return this.Mu_a;
};

sProc.Queue.prototype.getCapacity = function(){
	return this.capacity;
};

sProc.Queue.prototype.getNumberTask = function(){
	return this.Task.length;
};

sProc.Queue.prototype.getFirstTask = function(){
	return this.Task[this.capacity-1];
};

sProc.Queue.prototype.setMu_a = function(newMu_a){
	this.Mu_a = newMu_a;
};

sProc.Queue.prototype.setCapacity = function(newCapacity){
	this.capacity = newCapacity;
};

sProc.Queue.prototype.setTask = function(newTask){
	this.Task = newTask;
};
