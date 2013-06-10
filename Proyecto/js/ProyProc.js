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
	
	this.Canvas = new SProc.Canvas(this);
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
SProc.Canvas = function(that){
	this.Parent = that;
	this.positionQ = this.Parent.system.x;
};

SProc.Canvas.prototype.draw = function(id){
	if(this.inDOM == true)
		throw "Este sistema ya se encuentra en el DOM, no se pintara dos veces maldito bastardo sin alma."

	var canvas = document.getElementById(id).getContext("2d"),//id && $('#'+id).getContext("2d") || $('canvas').attr('id'),
		width = canvas.canvas.width, height = canvas.canvas.height,
		linesEndPts = [], recEndPoints = [],//arrays of objects on the style {x:number,y:number}
		mainLine = {x:width*0.55,y:height/2},
		elements = this.Parent.system.servers.length, segments = height/elements,
		tasks = [], self = this;

	function setLines(){
		var len = elements, midlePoint = segments/2, 
			newWidth = width-mainLine.x, 
			space = {x:mainLine.x+newWidth*0.1};

		self.Parent.system.queue.x = mainLine.x;
		self.Parent.system.queue.y = mainLine.y;

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
			equis = linesEndPts[linesEndPts.length-1].x, widthR = mainLine.x-mainLine.x*.50,
			Servers = self.Parent.system.servers;

		for(var i = 0 ; i< elements ; i++ ){
			Servers[i].x = equis;
			Servers[i].y = step;
			Servers[i].width = widthR;
			Servers[i].height = stPoint*2;
			canvas.rect(equis,step,widthR,stPoint*2);
			step += stPoint*4;
			recEndPoints.push({x:equis,y:step,width:widthR,height:stPoint*2}); 
		}

		step=stPoint*2;
		canvas.moveTo(equis+widthR,step);

		for(var i = 0 ; i < elements ; i++){
			canvas.lineTo(width,step);
			step+=stPoint*4;
			canvas.moveTo(equis+widthR,step);
		}
		
	};
	canvas.lineWidth = .4;
	canvas.globalAlpha = .5;

	//Main line/Visible Queue
	canvas.moveTo(0,height/2);
	
	canvas.lineCap = "round";
	
	canvas.lineTo(mainLine.x,mainLine.y);
	
	linesEndPts.push({x:mainLine.x,y:mainLine.y});
	
	setLines();
	canvas.closePath();
	setRects();

	canvas.endPoints = {lines: linesEndPts, rects: recEndPoints};
	canvas.paintedTasks = tasks;
	canvas.stroke();

	this.Parent.system.x = mainLine.x;
	this.Parent.system.y = mainLine.y;
	this.canvas = canvas;
	this.canvas.elements = elements;
	this.inDOM = true;
};

// This method is still on doubt because we don't know if we need this method or a setInterval to draw().
SProc.Canvas.prototype.redraw = function(id){
	this.clear(id);
	this.draw(id);
};

// Should be changed in future version tod implement this.canvas
SProc.Canvas.prototype.clear = function(id){
	if(!this.inDOM){
		throw "Elemento: " + id + " no existe en el DOM";
	}
	var canvas = document.getElementById(id).getContext("2d"), 
		width = canvas.canvas.width, height = canvas.canvas.height;

	canvas.clearRect(0,0,width,height);

	this.inDOM = false;
};

SProc.Canvas.prototype.arrival = function(task){
	var Queue = this.Parent.system.queue,
		taskWidth = Queue.x/Queue.capacity,
		taskHeight = this.Parent.system.servers[0].height*.8,
		canvas = this.canvas, color = task.color;

	if(Queue.tasks.length >= 1){
		task.x = Queue.x-taskWidth;
		for(var i = 0; i < Queue.tasks.length ; i++){
			task.x-=taskWidth;
		}
		task.y = Queue.y-(taskHeight/2);
		task.width = taskWidth;
		task.height = taskHeight;
		canvas.fillStyle = color;
		canvas.fillRect(task.x,task.y,taskWidth,taskHeight);
	}else{
		canvas.fillStyle = color;
		canvas.fillRect(Queue.x-taskWidth,Queue.y-(taskHeight/2),taskWidth,taskHeight);	
		task.x = Queue.x-taskWidth;
		task.y = Queue.y-(taskHeight/2);
		task.width = taskWidth;
		task.height = taskHeight;
	}

};

SProc.Canvas.prototype.attend = function(){
	
};

SProc.Canvas.prototype.step = function(){
	var Queue = this.Parent.system.queue,
		tasks = Queue.tasks, canvas = this.canvas,
		taskWidth = Queue.x/Queue.capacity;
	for(var i = 0; i<tasks.length ; i++){
		if(tasks[i] != undefined){
			canvas.fillStyle = tasks[i].color;
			if(tasks[i].x==Queue.x-taskWidth){
				canvas.clearRect(tasks[i].x,tasks[i].y,tasks[i].width,tasks[i].height);
			}else if(tasks[i].x<Queue.x-taskWidth){
				canvas.clearRect(tasks[i].x,tasks[i].y,tasks[i].width,tasks[i].height);
				tasks[i].x+=taskWidth;
				canvas.fillRect(tasks[i].x,tasks[i].y,tasks[i].width,tasks[i].height);
			}
		}
	}
};



SProc.Canvas.prototype.serverChange = function(Server){
	var x = Server.x, y = Server.y, width = Server.width, height = Server.height;
	this.canvas.fillStyle = Server.color;
	this.canvas.fillRect(x+this.canvas.lineWidth,y+this.canvas.lineWidth,width-this.canvas.lineWidth,height-this.canvas.lineWidth);
};
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
	this.taskLogger = [];
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
SProc.System.Result.prototype.printResult = function(){
	var logs = this.Parent.logger
	console.log("n\tt\tX(t)\tX_w(t)\tX_s(t)");
	for(var row = 0; row < logs.length;row++){
		console.log(JSON.stringify(logs[row]));
	}
}

/*
	SProc.Queue:
*/
SProc.Queue = function(configObject){
	if (!(configObject instanceof Object)) //configObject == {}
		throw "Se esperaba un objeto de configuración";
	this.Mu_a = (configObject && configObject.Mu_a) || -1;
	this.capacity = (configObject && configObject.capacity) || -1;
	this.tasks = (configObject && configObject.tasks ) || [];
	this.timeWithoutArrival = 0;
	this.x = 0;
	this.y = 0;

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

SProc.Queue.prototype.attention = function (mysystem) {
    var numberTask = this.getNumberTask();
    if (numberTask >= 1 && mysystem.tasksOnService() != mysystem.servers.length) {
        switch (mysystem.attentionPolicy) {
        case "primero":
            for (var i = 0; i < mysystem.servers.length; i++) {
                if (mysystem.servers[i].getState() == false) {
                    break;
                }
            }
            break;
        case "rapido":
            var menor = 0;
            for (var i = 0; i < mysystem.servers.length; i++) {
                if (mysystem.servers[i].getState() == false) {
                    break;
                }
            }
            menor = i;
            for (var j = 1; i < mysystem.servers.length; i++) {
                if (mysystem.servers[menor] > mysystem.servers[j].Mu_s && !mysystem.servers[j].getState()) {
                    menor = j;
                }
            }
            i = menor;
            break;
        case "aleatorio":
            var i;
            do{
            	i = Math.floor(Math.random() * (mysystem.servers.length));
            }while(mysystem.servers[i].getState() == true);
            break;
        }

        var firstTask = this.getFirstTask();
        firstTask.setTimeStartService(this.Parent.Parent.getTime());
        mysystem.servers[i].attend(firstTask);
        this.killFirstTask();
        console.log("Se mandó la tarea que llegó en ", mysystem.servers[i].task.timeArrival, " al servidor " + i);
        console.log("su tiempo de respuesta es de " + mysystem.servers[i].Mu_s + ".")
        if (numberTask > 1){
            this.step(mysystem.queue);
            this.Parent.Parent.Canvas.step();
        }

    } else if (numberTask >= 1 && mysystem.tasksOnService() == mysystem.servers.length) {
        console.log("Hay una tarea en espera pero no hay servidor disponible.");
    } else if (numberTask == 0) {
        console.log("Cola vacía, no hay tareas que atender");
    } else {
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
		this.Parent.Parent.Canvas.arrival(newTask);
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
	this.color = "#" + Math.random().toString(16).slice(2, 8);
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
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
})("0.1.0");