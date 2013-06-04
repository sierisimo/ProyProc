
/*
	SProc.Canvas:
*/

/*
	TODO: check if canvas methods are needed
*/
SProc.Canvas = function(obj){
	if(obj.type == undefined)
		throw "Can't create from a undefined object";
	
	this.x = obj.x;
	this.y = obj.y;
	this.color = obj.color;
	switch(obj.type){
		case "Server":
			this.width = obj.width;
			this.height = obj.height;
			break;
		default:
			throw "Unknow type, cant create object.\nType can be: 'Server' or 'Task'";
	}
};

SProc.Canvas.draw = function(id){
	// Only one canvas... this should be changed in next version.
	//
	// context should come in a config object in future version.
	// with some initialization like these:

	var canvas = document.getElementById("l").getContext("2d"),
		width = canvas.canvas.width, height = canvas.canvas.height,	
		linesEndPts = [], recEndPoints = [], //arrays of objects on the style {x:number,y:number}
		mainLine = {x:width*0.45,y:height/2},
		elements = 5, segments = height/elements;

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
		var stPoint = segments/4, midlePoint = segments/2, 
			step = stPoint, equis = linesEndPts[linesEndPts.length-1].x,
			recWidth = (width-mainLine.x)-(equis/2);
		
		for(var i = 0 ; i< elements ; i++ ){
			canvas.rect(equis,step,recWidth,stPoint*2);
			recEndPoints.push({x:equis,y:step});
			step += stPoint*4; 
		}
		equis+=recWidth;
		step = recEndPoints[0].y + stPoint;
		for(var i = 0 ; i < elements ; i++){
			canvas.moveTo(equis,step);
			canvas.lineTo(width,step);
			step += stPoint*4;
		}
	};

	// Configuration for the canvas, next version should take this from an config object.
	// TO-DO:
	// 		Implement the option to make the lines visible or not.
	canvas.fillStyle = "white";
	canvas.strokeStyle = "white";
	canvas.lineWidth = 0.5;

	//Main line/Visible Queue
	canvas.moveTo(0,height/2);
	canvas.lineCap = "round";
	canvas.lineTo(mainLine.x,mainLine.y);
	linesEndPts.push({x:mainLine.x,y:mainLine.y});
	setLines();

	canvas.endPoints = {lines: linesEndPts, recs: recs};
	this.canvas = canvas;
	this.inDOM = true;

	/* 
		TO-DO: Implement the 
	*/
};

// This method is still on doubt because we don't know if we need this method or a setInterval to draw().
SProc.Canvas.redraw = function(){

};

// Should be changed in future version tod implement this.canvas
SProc.Canvas.clear = function(id){
	var canvas = document.getElementById(id).getContext("2d"), 
		width = canvas.canvas.width, height = canvas.canvas.height;
	canvas.clearRect(0,0,width,height)
};