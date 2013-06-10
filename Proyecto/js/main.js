$('#play').click(function(){
	
	var  i = 0, a = setInterval(function(){
		console.log("*****Inicio de ciclo " + mSProc.getTime());
		mSProc.system.refresh();
		mSProc.cycle();
		console.log("*****Fin de ciclo",i);
		i++;
		if(i>=30){
			clearInterval(a);
			b();
		}
	},1000);
		
	function b(){
		for (i = 0; i < mSProc.system.servers.length ; i++){
			console.log("El servidor " , i ,"atendió " ,mSProc.system.servers[i].attendedTasks ," tareas");
		}
		console.log("Las tareas atendidas fueron las siguientes: ", mSProc.system.taskLogger);
		console.log("El registro de actividades queda como sigue: ",mSProc.system.logger);
		
			
			var html = {header:"<DOCTYPE html><html><head><head><body>",footer:"</body><html>"};
			html.table = "<h1>Tareas en el sistema</h1><table class='table table-hover'><tr><th>n</th><th>t</th><th>X(t)</th><th>X(w)</th><th>X(s)</th></tr>";
			
			for (i = 0 ; i < mSProc.system.logger.length; i++){
				html.table += "<tr>";
				
					html.table+="<td>" + Math.round(mSProc.system.logger[i].n * 100) / 100 + "</td>";
					html.table+="<td>" + Math.round(mSProc.system.logger[i].t * 100) / 100 + "</td>";
					html.table+="<td>" + Math.round(mSProc.system.logger[i].X_t * 100) / 100 + "</td>";
					html.table+="<td>" + Math.round(mSProc.system.logger[i].X_w * 100) / 100+ "</td>";
					html.table+="<td>" + Math.round(mSProc.system.logger[i].X_s * 100) / 100 + "</td>";
				
				html.table += "</tr>";
			}
			html.table += "</table>";
			html.table += "<h1>Tareas atendidas</h1>";
			html.table += "<table class='table table-hover'> <tr> <th>Tiempo de arribo</th><th>Inicio de servicio</th><th>Tiempo de Salida</th><th>Tiempo de Respuesta</th><th>Tiempo de espera</th>";
			for (i = 0 ; i < mSProc.system.taskLogger.length; i++){
				html.table += "<tr>";
			
					html.table+="<td>" + Math.round(mSProc.system.taskLogger[i].timeArrival* 100) / 100 + "</td>";
					html.table+="<td>" + Math.round(mSProc.system.taskLogger[i].timeStartService* 100) / 100 + "</td>";
					html.table+="<td>" + Math.round(mSProc.system.taskLogger[i].timeDeparture* 100) / 100 + "</td>";
					
					mSProc.system.taskLogger[i].timeResponse = Math.round((mSProc.system.taskLogger[i].timeDeparture - mSProc.system.taskLogger[i].timeArrival)* 100)/100;
					mSProc.system.taskLogger[i].timeWait = Math.round((mSProc.system.taskLogger[i].timeDeparture - mSProc.system.taskLogger[i].timeStartService)* 100)/100

					html.table+="<td>" + mSProc.system.taskLogger[i].timeResponse + "</td>";
					html.table+="<td>" + mSProc.system.taskLogger[i].timeWait + "</td>";

					//html.table+="<td>" + Math.round((mSProc.system.taskLogger[i].timeDeparture - mSProc.system.taskLogger[i].timeArrival)* 100)/100 + "</td>";
					//html.table+="<td>" + Math.round((mSProc.system.taskLogger[i].timeDeparture - mSProc.system.taskLogger[i].timeStartService)* 100)/100 + "</td>";
					
					
				html.table += "</tr>";
			}
			html.table += "</table>";

			document.getElementById("generar").disabled = false;


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
	}
);