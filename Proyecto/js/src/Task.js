//codigo abierto
/*
	Task: Class example. 
*/
SProc.Task = function(config){
	this.name = "Tarea";
	this.atributo = config.atributo;
	this.edad = 10;
};

SProc.Task.prototype.getName = function(){
	return this.name;
};

SProc.Task.prototype.setName = function(newName){
	function nombre(){
		console.log("se escribe el nuevo nombre en la tarea " + this.name);
	};
	nombre();
	this.name = newName;
}

SProc.Task.prototype.bornAge = function(){
	var today = new Date();
	return today.getYear() - this.edad;
}
