$(document).ready(function(){
	var temp = new Object();
	temp.Mu_a = .5;
	temp.capacity = 10;

	var newQueue = new SProc.Queue(temp);
	console.log("Se creo la cola");
	console.log(newQueue);
	var obj = new Object();
	obj.Mu_s = .2;
	obj.servers = [.1,.2,.3];
	console.log(newQueue);
	obj.queue = newQueue;
	var mySystem = new SProc.System(obj);
	console.log("Se creo el sistema");
	window.mySystem = mySystem;
	}
);