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