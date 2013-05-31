
/*
	SProc.Queue:
*/
SProc.Queue = function(config){
	this.Mu_a = 4;
	this.capacity = 20;
	this.Task = new Array();
};

SProc.Queue.prototype.getMu_a = function(){
	return this.Mu_a;
};

SProc.Queue.prototype.getCapacity = function(){
	return this.capacity;
};

SProc.Queue.prototype.getNumberTask = function(){
	return this.Task.length;
};

SProc.Queue.prototype.getFirstTask = function(){
	return this.Task[this.capacity-1];
};

SProc.Queue.prototype.setMu_a = function(newMu_a){	
	this.Mu_a = newMu_a;
};

SProc.Queue.prototype.setCapacity = function(newCapacity){
	this.capacity = newCapacity;
};

SProc.Queue.prototype.setTask = function(newTask){
	this.Task = newTask;
};

SProc.Queue.prototype.attention = function(system){

	if(this.getNumberTask()>=1) {
		for(var i=0;i<system.servers.length;i++){
			if(!system.servers[i].busy){
				break; //Change this to a better sustitution
					//policy in next version
			}

		}	 
	}
}