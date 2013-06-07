$(document).ready(function(){
	var temp = new Object();
	temp.Mu_a = 2;
	temp.capacity = 10;

	var newQueue = new SProc.Queue(temp);

	var obj = new Object();
	obj.Mu_s = 1;
	obj.servers = [.1,.2,.3];
	obj.queue = newQueue;

	var mySystem = new SProc.System(obj);

	var fSProc = new SProc({System:mySystem});
	window.fs = fSProc;
	for (var i = 0 ; i < 5 ;i++){
		console.log("Inicio de ciclo " + i);
		fs.system.refresh();
		fs.cycle();
		console.log("Fin de ciclo");
	}
}
);