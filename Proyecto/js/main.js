$(document).ready(function(){
	var temp = new Object();
	temp.Mu_a = .3;
	temp.capacity = 4;


	var newQueue = new SProc.Queue(temp);

	var obj = new Object();
	obj.Mu_s = 2.3;
	obj.servers = [4.3,1.2];

	obj.queue = newQueue;
	obj.nservers = 5;

	var mySystem = new SProc.System(obj);

	var fSProc = new SProc({System:mySystem,Delta:.1});	
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
	
		
		var html = {header:"<DOCTYPE html><html><head><head><body>",footer:"</body><html>"};
		html.table = "<h1>Tareas en el sistema</h1><table class='table table-hover'><tr><th>n</th><th>t</th><th>X(t)</th><th>X(w)</th><th>X(s)</th></tr>";
		
		for (i = 0 ; i < fSProc.system.logger.length; i++){
			html.table += "<tr>";
			
				html.table+="<td>" + Math.round(fSProc.system.logger[i].n * 100) / 100 + "</td>";
				html.table+="<td>" + Math.round(fSProc.system.logger[i].t * 100) / 100 + "</td>";
				html.table+="<td>" + Math.round(fSProc.system.logger[i].X_t * 100) / 100 + "</td>";
				html.table+="<td>" + Math.round(fSProc.system.logger[i].X_w * 100) / 100+ "</td>";
				html.table+="<td>" + Math.round(fSProc.system.logger[i].X_s * 100) / 100 + "</td>";
			
			html.table += "</tr>";
		}
		html.table += "</table>";
		html.table += "<h1>Tareas atendidas</h1>";
		html.table += "<table class='table table-hover'> <tr> <th>Tiempo de arribo</th><th>Inicio de servicio</th><th>Tiempo de Salida</th><th>Tiempo de Respuesta</th><th>Tiempo de espera</th>";
		for (i = 0 ; i < fSProc.system.taskLogger.length; i++){
			html.table += "<tr>";
		
				html.table+="<td>" + Math.round(fSProc.system.taskLogger[i].timeArrival* 100) / 100 + "</td>";
				html.table+="<td>" + Math.round(fSProc.system.taskLogger[i].timeStartService* 100) / 100 + "</td>";
				html.table+="<td>" + Math.round(fSProc.system.taskLogger[i].timeDeparture* 100) / 100 + "</td>";
				html.table+="<td>" + Math.round((fSProc.system.taskLogger[i].timeDeparture* 100) / 100 - fSProc.system.taskLogger[i].timeArrival) + "</td>";
				html.table+="<td>" + Math.round((fSProc.system.taskLogger[i].timeDeparture* 100) / 100 - fSProc.system.taskLogger[i].timeStartService) + "</td>";
			
			html.table += "</tr>";
		}
		html.table += "</table>";
		//var newWindow = window.open("empty.html");
		//$(OpenWindow.document.body).html(html.table);
		//$('#bd').innerHTML(html.table);
    	//newWindow.document.write(html.table);
    	//newWindow.document.close();
    	//$(OpenWindow.document.body).append(html.table);


		
		var a = window.open("","Resultados","height=500,width=400,location=no,menubar=no",false);
		var header = document.createElement('LINK'); 
		var bd = document.createElement('div');
		bd.innerHTML = html.table;

		header.href="css/bootstrap.css";
		header.type="text/css";
		header.rel="stylesheet";	
		a.document.head.appendChild(header);
		a.document.body.appendChild(bd);;	
}
);