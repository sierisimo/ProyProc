
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
