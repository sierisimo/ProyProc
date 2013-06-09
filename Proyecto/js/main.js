$(document).ready(function(){
	var temp = new Object();
	temp.Mu_a = 1;
	temp.capacity = 4;


	var newQueue = new SProc.Queue(temp);

	var obj = new Object();
	obj.Mu_s = 6;
	obj.servers = [6,10];

	obj.queue = newQueue;
	obj.nservers = 2;

	var mySystem = new SProc.System(obj);

	var fSProc = new SProc({System:mySystem,Delta:.5});	
	for (var i = 0 ; i < 200 ;i++){
		console.log("*****Inicio de ciclo " + fSProc.getTime());
		fSProc.system.refresh();
		fSProc.cycle();
		console.log("*****Fin de ciclo");
	}
	window.fs = fSProc;
	for (i = 0; i < fSProc.system.servers.length ; i++){
		console.log("El servidor " , i ,"atendió " ,fSProc.system.servers[i].attendedTasks ," tareas");
	}
	console.log("Las tareas atendidas fueron las siguientes: ", fSProc.system.taskLogger);
	console.log("El registro de actividades queda como sigue: ",fSProc.system.logger);

}
);