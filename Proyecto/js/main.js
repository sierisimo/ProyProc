$(document).ready(function(){
	var temp = new Object();
	temp.Mu_a = 1;
	temp.capacity = 10;

	var newQueue = new SProc.Queue(temp);

	var obj = new Object();
	obj.Mu_s = 3;
	obj.servers = [10,5,1];
	obj.queue = newQueue;
	obj.nservers = 5;

	var mySystem = new SProc.System(obj);

	var fSProc = new SProc({System:mySystem});
	window.fs = fSProc;
	for (var i = 0 ; i < 40 ;i++){
		console.log("Inicio de ciclo " + i);
		fs.system.refresh();
		fs.cycle();
		console.log("Fin de ciclo");
	}

	console.log(fSProc);
}
);