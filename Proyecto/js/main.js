$(document).ready(function(){
	var temp = new Object();
	temp.Mu_a = 1;
	temp.capacity = 4;

	var newQueue = new SProc.Queue(temp);

	var obj = new Object();
	obj.Mu_s = 6;
	obj.servers = [6];
	obj.queue = newQueue;

	var mySystem = new SProc.System(obj);

	var fSProc = new SProc({System:mySystem});
	
	for (var i = 0 ; i < 20 ;i++){
		console.log("*****Inicio de ciclo " + fSProc.getTime());
		fSProc.system.refresh();
		fSProc.cycle();
		console.log("*****Fin de ciclo");
	}
	window.fs = fSProc;
}
);