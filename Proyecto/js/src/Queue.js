
/*
	SProc.Queue:
*/
SProc.Queue = function(configObject){
	if (configObject.Mu_a === undefined || configObject.capacity === undefined || configObject === undefined){
		//return error or set default values
	}
	else{
	this.Mu_a = configObject.Mu_a;
	this.capacity = configObject.capacity;
	this.Task = configObject.Task
	}
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

SProc.Queue.prototype.attention = function(mysystem){
	if(this.getNumberTask()>=1 && mysystem.tasksOnService() != mysystem.servers.length){
		for(var i=0;i<mysystem.servers.length;i++){
			if(mysystem.servers[i].isBusy() == false){
				break; //Change this to a better sustitution
					//policy in next version
			}
		}
		var firstTask = this.getFirstTask();
		firstTask.setTimeStartService(SProc.getTime()); 
		mysystem.servers[i].attend(firstTask);
		console.log("Se mandó una tarea al servidor");
		this.step(mysystem.queue);
		 
	}
	else if(this.getNumberTask()>=1 && mysystem.tasksOnService() == mysystem.servers.length){
		console.log("Hay una tarea en espera pero no hay servidor disponible.");
	}
	else if(this.getNumberTask()==0){
		console.log("Cola vacía");
	}

	else {
		console.log("Error, este if en Queue.attention() no debe de aparecer.");
	}
}
SProc.Queue.prototype.step = function(myqueue){
	var lastIndex = myqueue.tasks.length - 2;
	var tasksCount = myqueue.tasks.length;

	for (var i = 0; i < tasksCount;i++){
		myqueue.tasks[lastIndex + 1] = myqueue.tasks[lastIndex--];
	}

}
SProc.Queue.prototype.arrival = function(myqueue){
	var tasksCount = myqueue.tasks.length;
	var capacity = myqueue.capacity;
	if (tasksCount == capacity){
		console.log("La cola está llena.");
	}
	else if(tasksCount < capacity){
		var configObject = new Object();
		//creates new task
		configObject.timeArrival = Sproc.getTime();
		configObject.timeStartService = -1;
		configObject.timeDeparture = -1;
		var newTask = new SProc.Task(configObject);
		//Puts the incoming task at the end of the queue
		myqueue.tasks[capacity - tasksCount - 1] = newTask;
	}
}
SProc.Queue.prototype.refresh = function(){
	//attention()
	//arrival()
}
