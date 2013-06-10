
/*
	SProc.Canvas:
*/

/*
	TODO: check if canvas methods are needed
*/
SProc.Canvas = function(that){
	this.Parent = that;
	this.positionQ = this.Parent.system.x;
};

SProc.Canvas.prototype.draw = function(id){
	if(this.inDOM == true)
		throw "Este sistema ya se encuentra en el DOM, no se pintara dos veces maldito bastardo sin alma."

	var canvas = document.getElementById(id).getContext("2d"),//id && $('#'+id).getContext("2d") || $('canvas').attr('id'),
		width = canvas.canvas.width, height = canvas.canvas.height,
		linesEndPts = [], recEndPoints = [],//arrays of objects on the style {x:number,y:number}
		mainLine = {x:width*0.55,y:height/2},
		elements = this.Parent.system.servers.length, segments = height/elements,
		tasks = [], self = this;

	function setLines(){
		var len = elements, midlePoint = segments/2, 
			newWidth = width-mainLine.x, 
			space = {x:mainLine.x+newWidth*0.1};

		self.Parent.system.queue.x = mainLine.x;
		self.Parent.system.queue.y = mainLine.y;

		for(var i = 0; i<elements;i++){
			canvas.moveTo(mainLine.x,mainLine.y);
			canvas.lineTo(space.x,midlePoint);
			linesEndPts.push({x:space.x,y:midlePoint});
			midlePoint += segments;
		}
		canvas.moveTo(space.x,midlePoint);
	};		

	function setRects(){
		var stPoint = segments/4, midlePoint = segments/2, step = stPoint;
			equis = linesEndPts[linesEndPts.length-1].x, widthR = mainLine.x-mainLine.x*.50,
			Servers = self.Parent.system.servers;

		for(var i = 0 ; i< elements ; i++ ){
			Servers[i].x = equis;
			Servers[i].y = step;
			Servers[i].width = widthR;
			Servers[i].height = stPoint*2;
			canvas.rect(equis,step,widthR,stPoint*2);
			step += stPoint*4;
			recEndPoints.push({x:equis,y:step,width:widthR,height:stPoint*2}); 
		}

		step=stPoint*2;
		canvas.moveTo(equis+widthR,step);

		for(var i = 0 ; i < elements ; i++){
			canvas.lineTo(width,step);
			step+=stPoint*4;
			canvas.moveTo(equis+widthR,step);
		}
		
	};
	canvas.lineWidth = .4;
	canvas.globalAlpha = .5;

	//Main line/Visible Queue
	canvas.moveTo(0,height/2);
	
	canvas.lineCap = "round";
	
	canvas.lineTo(mainLine.x,mainLine.y);
	
	linesEndPts.push({x:mainLine.x,y:mainLine.y});
	
	setLines();
	canvas.closePath();
	setRects();

	canvas.endPoints = {lines: linesEndPts, rects: recEndPoints};
	canvas.paintedTasks = tasks;
	canvas.stroke();

	this.Parent.system.x = mainLine.x;
	this.Parent.system.y = mainLine.y;
	this.canvas = canvas;
	this.canvas.elements = elements;
	this.inDOM = true;
};

// This method is still on doubt because we don't know if we need this method or a setInterval to draw().
SProc.Canvas.prototype.redraw = function(id){
	this.clear(id);
	this.draw(id);
};

// Should be changed in future version tod implement this.canvas
SProc.Canvas.prototype.clear = function(id){
	if(!this.inDOM){
		throw "Elemento: " + id + " no existe en el DOM";
	}
	var canvas = document.getElementById(id).getContext("2d"), 
		width = canvas.canvas.width, height = canvas.canvas.height;

	canvas.clearRect(0,0,width,height);

	this.inDOM = false;
};

SProc.Canvas.prototype.arrival = function(task){
	var Queue = this.Parent.system.queue,
		taskWidth = Queue.x/Queue.capacity,
		taskHeight = this.Parent.system.servers[0].height*.8,
		canvas = this.canvas, color = task.color;

	if(Queue.tasks.length >= 1){
		task.x = Queue.x-taskWidth;
		for(var i = 0; i < Queue.tasks.length ; i++){
			task.x-=taskWidth;
		}
		task.y = Queue.y-(taskHeight/2);
		task.width = taskWidth;
		task.height = taskHeight;
		canvas.fillStyle = color;
		canvas.fillRect(task.x,task.y,taskWidth,taskHeight);
	}else{
		canvas.fillStyle = color;
		canvas.fillRect(Queue.x-taskWidth,Queue.y-(taskHeight/2),taskWidth,taskHeight);	
		task.x = Queue.x-taskWidth;
		task.y = Queue.y-(taskHeight/2);
		task.width = taskWidth;
		task.height = taskHeight;
	}

};

SProc.Canvas.prototype.attend = function(){
	
};

SProc.Canvas.prototype.step = function(){
	var Queue = this.Parent.system.queue,
		tasks = Queue.tasks, canvas = this.canvas,
		taskWidth = Queue.x/Queue.capacity;
	for(var i = 0; i<tasks.length ; i++){
		if(tasks[i] != undefined){
			canvas.fillStyle = tasks[i].color;
			if(tasks[i].x==Queue.x-taskWidth){
				canvas.clearRect(tasks[i].x,tasks[i].y,tasks[i].width,tasks[i].height);
			}else if(tasks[i].x<Queue.x-taskWidth){
				canvas.clearRect(tasks[i].x,tasks[i].y,tasks[i].width,tasks[i].height);
				tasks[i].x+=taskWidth;
				canvas.fillRect(tasks[i].x,tasks[i].y,tasks[i].width,tasks[i].height);
			}
		}
	}
};



SProc.Canvas.prototype.serverChange = function(Server){
	var x = Server.x, y = Server.y, width = Server.width, height = Server.height;
	this.canvas.fillStyle = Server.color;
	this.canvas.fillRect(x+this.canvas.lineWidth,y+this.canvas.lineWidth,width-this.canvas.lineWidth,height-this.canvas.lineWidth);
};
