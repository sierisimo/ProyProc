
SProc.System = function(config){
	if (!config.queue){
		throw "No puedes crear un sistema sin una cola.";
	}
	if (!config.Mu_s){
		throw "Debes especificar un tiempo promedio de servicio por defecto";
	}
	if (!config.servers || config.servers.length < 1){
		throw "No puedes crear un sistema sin servidores";
	}
	if (!config.queue.Mu_a){
		throw "Debes especificar un tiempo promedio de arribo";
	}
	if (!config.queue.capacity){
		throw "Debes especificar una capacidad máxima para la cola";
	}
	this.Mu_s = config.Mu_s;
	this.servers = new Array();
	/*TO DO: Discuss how are we going to set de Mu_s for
			each server. I'm assumig that config has an
			array (config.servers[]) such as every element
			is the Mu_s of said server.*/

	for (var i = 0; i < config.servers.length ; i++){
		var tempObject = new Object();
		tempObject.Mu_s = config.servers[i];
		this.servers[i] = new SProc.Server(tempObject);
		console.log("Servidor añadido");
		delete tempObject;	
	}

	this.queue = config.queue;

};

SProc.System.prototype.tasksOnService = function(){
	var servs = this.server;
	var count = 0;
	for (var i = 0; i < servs.length ; i++){
		if (servs[i].getState()){
			count++;
		}
	}
	return count;
}

SProc.System.prototype.refresh = function(){
	for (var i = 0; i < this.server.length ; i++){
		this.server[i].refresh();
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