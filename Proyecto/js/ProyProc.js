(function(version){
	

/* 
	SProc:
	t = tiempo virtual del sistema
	n = ciclo 
	delta = momento de vision del sistema

	al setear n se cambia la velocidad con la que avansa el sistema
*/

/*
		TO-DO:
			Implement a Class called config, which is a factory for configs.
*/
var SProc = function(config){
	if(config == null)
		throw "You need to set a config object for creation of SProc.";

	if(!config.System)
		throw "You cannot create a new SProc whitout a System.";

	this.system = config.System instanceof SProc.System && config.System;

	if(!this.system)
		throw "System provided its not an SProc.System object.";
	
	this.system.Parent = this;
	
	this.Cycle = 0;
	this.Delta = config && config.Delta || 1;

	this.Parent = this;

	this.Canvas = SProc.Canvas;
};

SProc.prototype.getVersion = function(){
	return "Version: " + version;
};

SProc.prototype.getCycle = function() {
	return this.Cycle;
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
	var newRow = new Object()
	newRow.n = this.getCycle();
	newRow.t = this.getTime();
	newRow.X_s = this.system.tasksOnService();
	newRow.X_w = this.system.queue.getNumberTask();
	newRow.X_t = newRow.X_s + newRow.X_w;
	newRow.Parent = this.system;
	var newResult = new SProc.System.Result(newRow);
	this.system.logger.push(newResult);
	this.Cycle++;
};
/*
	SProc.Canvas:
*/

/*
	TODO: check if canvas methods are needed
*/
SProc.Canvas = function(obj){
	if(obj.type == undefined)
		throw "Can't create from a undefined object";
	
	this.x = obj.x;
	this.y = obj.y;
	this.color = obj.color;
	switch(obj.type){
		case "Server":
			this.width = obj.width;
			this.height = obj.height;
			break;
		default:
			throw "Unknow type, cant create object.\nType can be: 'Server' or 'Task'";
	}

	this.Parent = this;
};

SProc.Canvas.draw = function(id){
	// Only one canvas... this should be changed in next version.
	//
	// context should come in a config object in future version.
	// with some initialization like these:

	var canvas = id && $('#'+id)[0].getContext("2d") || $('canvas').attr('id'),
		width = canvas.width, height = canvas.height,
		linesEndPts = [], recs = [], //arrays of objects on the style {x:number,y:number}
		mainLine = {x:width*0.55,y:height/2}, //0.35 == 35%
		elements = this.System.server.length, segments = height/elements;

	function setLines(){
		var len = elements, midlePoint = segments/2, 
			newWidth = width-mainLine.x, 
			space = {x:mainLine.x+newWidth*0.1};

		for(var i = 0; i<elements;i++){
			canvas.moveTo(mainLine.x,mainLine.y);
			canvas.lineTo(space.x,midlePoint);
			linesEndPts.push({x:space.x,y:midlePoint});
			midlePoint += segments;
		}
		canvas.moveTo(space.x,midlePoint);
	};

	function setRects(){
		var stPoint = segments/4, midlePoint = segments/2, step = stPoint;
			equis = linesEndPts[linesEndPts.length-1].x,widthR = mainLine.x-mainLine.x*.50;
		
		for(var i = 0 ; i< elements ; i++ ){
			canvas.rect(equis,step,100,stPoint*2);
			step += stPoint*4; 
		}
		step=stPoint*2;
		canvas.moveTo(equis+widthR,step);
		for(var i = 0 ; i < elements ; i++){
			canvas.lineTo(width,step);
			step+=stPoint*4;
			canvas.moveTo(equis+widthR,step);
		}
	};

	// Configuration for the canvas, next version should take this from an config object.
	// TO-DO:
	// 		Implement the option to make the lines visible or not.
	canvas.fillStyle = "white";
	canvas.strokeStyle = "white";
	canvas.lineWidth = 0.5;

	//Main line/Visible Queue
	canvas.moveTo(0,height/2);
	canvas.lineCap = "round";
	canvas.lineTo(mainLine.x,mainLine.y);
	linesEndPts.push({x:mainLine.x,y:mainLine.y});
	setLines();

	canvas.endPoints = {lines: linesEndPts, recs: recs};
	this.canvas = canvas;
	this.inDOM = true;

	/* 
		TO-DO: Implement the 
	*/
};

// This method is still on doubt because we don't know if we need this method or a setInterval to draw().
SProc.Canvas.redraw = function(){

};

// Should be changed in future version tod implement this.canvas
SProc.Canvas.clear = function(id){
	var canvas = document.getElementById(id).getContext("2d"), 
		width = canvas.canvas.width, height = canvas.canvas.height;
	canvas.clearRect(0,0,width,height)
};
/*
SProc.Canvas.prototype.createTask = function(config){
	var config = config && config.length ? 
	if () {};
};
*/
SProc.System = function(config){
	if (!config.queue){
		throw "No puedes crear un sistema sin una cola.";
	}
	if (!config.Mu_s){
		throw "Debes especificar un tiempo promedio de servicio por defecto";
	}
	if (config.nservers < 1){
		throw "No puedes crear un sistema sin servidores";
	}
	if (config.servers.length > config.nservers){
		throw "El arreglo de servidores debe ser igual o menor al número de servidores";
	}
	if (!config.queue.Mu_a){
		throw "Debes especificar un tiempo promedio de arribo";
	}
	if (!config.queue.capacity){
		throw "Debes especificar una capacidad máxima para la cola";
	}

	this.Parent = {};
	this.Mu_s = config.Mu_s;
	this.servers = new Array();
	this.attentionPolicy = (config && config.attentionPolicy) || "rapido" ;
	//primero || rapido || aleatorio
	//Añade servidores personalizados
	for (var i = 0; i < config.servers.length ; i++){
		var tempObject = new Object();
		tempObject.Mu_s = config.servers[i];
		this.servers[i] = new SProc.Server(tempObject);
		this.servers[i].Parent = this;
		console.log("Servidor añadido");
		delete tempObject;	
	}
	//Añade servidores por default
	if(config.servers.length < config.nservers){
		for(;i< config.nservers; i++){
			var tempObject = new Object();
			tempObject.Mu_s = this.Mu_s;
			this.servers[i] = new SProc.Server(tempObject);
			this.servers[i].Parent = this;
			console.log("Servidor añadido");
			delete tempObject;		
		}
	}

	this.queue = config.queue;
	this.queue.Parent = this;
	this.logger = [];
	this.taskLogger=[];
};

SProc.System.prototype.tasksOnService = function(){
	var servs = this.servers;
	var count = 0;
	for (var i = 0; i < servs.length ; i++){
		if (servs[i].getState()){
			count++;
		}
	}
	return count;
}

SProc.System.prototype.refresh = function(){
	for (var i = 0; i < this.servers.length ; i++){
		this.servers[i].refresh();
	}
	this.queue.refresh();
};
SProc.System.prototype.totalDepartures = function(){
	var count = 0;
	for (var i = 0; i < this.server.length ; i++){
		count += this.server[i];
	}
	return count;
}

/*
	System.Result: Module generador de logs a.k.a ProyLogger.js
*/
SProc.System.Result = function(config){
	this.n = config.n;
	this.t = config.t;
	this.X_s = config.X_s;
	this.X_w = config.X_w;
	this.X_t = config.X_t;
	this.Parent = config.Parent;
}
/*SProc.System.Result.prototype.printResult = function(){
	var logs = this.Parent.logger
	console.log("n\tt\tX(t)\tX_w(t)\tX_s(t)");
	for(var row = 0; row < logs.length;row++){
		console.log(JSON.stringify(logs[row]));
	}
}*/
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
		for(var i=0;i<mysystem.servers.length;i++){
			if(mysystem.servers[i].getState() == false){
				break; //Change this to a better sustitution
					//policy in next version
			}
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
};

SProc.Server.prototype.free = function(){
	this.setState();
	this.task.timeDeparture = this.Parent.Parent.getTime();
	this.attendedTasks++;

	/*
		TO-DO
			Implementar llamada a Chichona
	*/

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
/*
	Task: Class example. 
*/
/*
	Class: Task 
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
	window.SProc = SProc;
})("0.0.1");