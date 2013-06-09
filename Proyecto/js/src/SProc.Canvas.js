
/*
	SProc.Canvas:
*/

/*
	TODO: check if canvas methods are needed
*/
SProc.Canvas = function(that){
	this.Parent = that;
};

SProc.Canvas.prototype.draw = function(id){
	var canvas = document.getElementById(id).getContext("2d"),//id && $('#'+id).getContext("2d") || $('canvas').attr('id'),
		width = canvas.canvas.width, height = canvas.canvas.height,
		linesEndPts = [], recEndPoints = [],//arrays of objects on the style {x:number,y:number}
		mainLine = {x:width*0.55,y:height/2},
		elements = this.Parent.system.servers.length, segments = height/elements,
		tasks = [];

	function setLines(){
		var len = elements, midlePoint = segments/2, 
			newWidth = width-mainLine.x, 
			space = {x:mainLine.x+newWidth*0.1};

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
			equis = linesEndPts[linesEndPts.length-1].x, widthR = mainLine.x-mainLine.x*.50;
		
		for(var i = 0 ; i< elements ; i++ ){
			canvas.rect(equis,step,widthR,stPoint*2);
			step += stPoint*4;
			recEndPoints.push({x:equis,y:step}); 
		}
		step=stPoint*2;
		canvas.moveTo(equis+widthR,step);
		for(var i = 0 ; i < elements ; i++){
			canvas.lineTo(width,step);
			step+=stPoint*4;
			canvas.moveTo(equis+widthR,step);
		}
		
	};
	// Configuration for the canvas, next version should take this from an config object.
	//canvas.fillStyle = "white";
	//canvas.strokeStyle = "white";
	canvas.lineWidth = 2;

	//Main line/Visible Queue
	canvas.moveTo(0,height/2);
	
	canvas.lineCap = "round";
	
	canvas.lineTo(mainLine.x,mainLine.y);
	
	linesEndPts.push({x:mainLine.x,y:mainLine.y});
	
	setLines();
	setRects();

	canvas.endPoints = {lines: linesEndPts, rects: recEndPoints};
	canvas.paintedTasks = tasks;
	canvas.stroke();
	this.canvas = canvas;
	this.canvas.elements = elements;
	this.inDOM = true;
};

// This method is still on doubt because we don't know if we need this method or a setInterval to draw().
SProc.Canvas.prototype.redraw = function(){

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

SProc.Canvas.prototype.createTask = function(task){
	var canvas = this.canvas,
		width = canvas.canvas.width, height = canvas.canvas.height,
		stHeight = height/2, stWidth = 0, 
		segments = height/this.canvas.elements, step = segments/8;
		
		canvas.fillStyle = task.color;

		canvas.moveTo(0, stHeight);
		canvas.fillRect(stWidth , stHeight-(step/2) , step , step);	

		canvas.lineTo(0,0);

		task.x = stWidth;
		task.y = stHeight;
		
		this.canvas.paintedTasks.push(task);

};