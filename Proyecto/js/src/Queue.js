
/*
	SProc.Queue:
*/
SProc.Queue = function(configObject){
	if (!(configObject instanceof Object)) //configObject == {}
		throw "Se esperaba un objeto de configuración";
	this.Mu_a = (configObject && configObject.Mu_a) || -1;
	this.capacity = (configObject && 	configObject.capacity) || -1;
	this.tasks = (configObject && configObject.tasks ) || [];
	this.timeWithoutArrival = 0;
};

SProc.Queue.prototype.getMu_a = function(){
	return this.Mu_a;
};

SProc.Queue.prototype.getCapacity = function(){
	return this.capacity;
};

SProc.Queue.prototype.getNumberTask = function(){
	var count = 0;
	for (var i = 0; i < this.capacity && i < this.tasks.length ; i++){
		if (this.tasks[i] !== undefined)
			count++;
	}

	return count;
};

SProc.Queue.prototype.getFirstTask = function(){
	return this.tasks[this.capacity-1];
};
SProc.Queue.prototype.killFirstTask = function(){
	delete this.tasks[this.capacity-1];
};
SProc.Queue.prototype.setMu_a = function(newMu_a){	
	this.Mu_a = newMu_a;
};

SProc.Queue.prototype.setCapacity = function(newCapacity){
	this.capacity = newCapacity;
};

SProc.Queue.prototype.setTask = function(newTask){
	this.task = newTask;
};

SProc.Queue.prototype.attention = function(mysystem){
	var numberTask = this.getNumberTask();
	if(numberTask >= 1 && mysystem.tasksOnService() != mysystem.servers.length){
		switch (mysystem.attentionPolicy){
			case "primero":
				for(var i=0;i<mysystem.servers.length;i++){
					if(mysystem.servers[i].getState() == false){
						break; 		
					}
				}
			break;
			case "rapido":
				var menor = 0;
				for(var i=0;i<mysystem.servers.length;i++){
					if(mysystem.servers[i].getState() == false){
						break; 		
					}
				}
				menor = i;
				for(var j = 1;i<mysystem.servers.length;i++){
					if(mysystem.servers[menor] > mysystem.servers[j].Mu_s && !mysystem.servers[j].getState()){
						menor = j;
					}
				}
				i = menor;
			break;
			case "aleatorio":
				var i = Math.floor(Math.random() * (mysystem.servers.length));
			break;
		}		

		
		var firstTask = this.getFirstTask();
		firstTask.setTimeStartService(this.Parent.Parent.getTime()); 
		mysystem.servers[i].attend(firstTask);
		this.killFirstTask();
		console.log("Se mandó la tarea que llegó en ", mysystem.servers[i].task.timeArrival, " al servidor " + i);
		console.log("su tiempo de respuesta es de "+ mysystem.servers[i].Mu_s +".")
		if(numberTask > 1)
			this.step(mysystem.queue);

	}
	else if(numberTask>=1 && mysystem.tasksOnService() == mysystem.servers.length){
		console.log("Hay una tarea en espera pero no hay servidor disponible.");
	}
	else if(numberTask==0){
		console.log("Cola vacía, no hay tareas que atender");
	}

	else {
		console.log("Error, este if en Queue.attention() no debe de aparecer.");
	}
}
SProc.Queue.prototype.step = function(myqueue){
	for(var i = this.capacity - 2 ; i >= 0 ; i-- ){
		myqueue.tasks[i+1] = myqueue.tasks[i];
		delete myqueue.tasks[i];
	}
}
SProc.Queue.prototype.arrival = function(myqueue){
	var tasksCount = myqueue.getNumberTask();
	var capacity = myqueue.capacity;
	if (tasksCount == capacity){
		console.log("La cola está llena.");
	}
	else if(tasksCount < capacity){
		var configObject = new Object();
		configObject.timeArrival = this.Parent.Parent.getTime();
		var newTask = new SProc.Task(configObject);
		myqueue.tasks[capacity - tasksCount - 1] = newTask;
		this.timeWithoutArrival = -this.Parent.Parent.Delta;
		console.log("Ha llegado una tarea");
	}

}
SProc.Queue.prototype.refresh = function(){
	var mySystem = this.Parent;
	var t = this.Parent.Parent.getTime();
	this.attention(mySystem);
	if (this.timeWithoutArrival >= this.Mu_a){
		this.arrival(this);
		if (this.getNumberTask() == 1){
			this.attention(mySystem);
		}
	}
	this.timeWithoutArrival++;
}