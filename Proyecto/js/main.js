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
	
		var newWindow = window.open("","Test","width=300,height=300");
		var html = {header:"<DOCTYPE html><html><head><head><body>",footer:"</body><html>"};
		html.table = "<table><tr><th>n</th><th>t</th><th>X(t)</th><th>X(w)</th><th>X(s)</th></tr>";
		
		for (i = 0 ; i < fSProc.system.logger.length; i++){
			html.table += "<tr>";
			
				html.table+="<td>" + fSProc.system.logger[i].n + "</td>";
				html.table+="<td>" + fSProc.system.logger[i].t + "</td>";
				html.table+="<td>" + fSProc.system.logger[i].X_t + "</td>";
				html.table+="<td>" + fSProc.system.logger[i].X_w + "</td>";
				html.table+="<td>" + fSProc.system.logger[i].X_s + "</td>";
			
			html.table += "</tr>";
		}
		html.table += "</table>";
		newWindow.document.open()
    	newWindow.document.write(html.table);
    	newWindow.document.getElementById($('head').append('<link rel="stylesheet" href="..css/" type="text/css" />'))
});