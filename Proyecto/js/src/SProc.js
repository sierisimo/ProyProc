
/* 
	SProc:

*/
var SProc = function(config){

};


SProc.prototype.getVersion = function(){
				return "Version: " + version;
};

/*
	System.prototype.draw = function(){
		var configs = this.canvas, width = configs.width || 400, 
			height = configs.height || 400,
			canvas = $(this.container)[0].getContext('2d');

		canvas.lineWidth = configs.lineWidth || 3;
		canvas.moveTo(0,height/2);
		canvas.lineTo(width/4,height/2);
		canvas.stroke();
		setLines(this.servers.length);
		
		function setLines(lines){
			canvas.moveTo(width/4,height/2);

		};

		function setRects(){
			
		};
	};

	SProc.System.prototype.clear = function(){

	};

	SProc.System.prototype.redraw =function(newConfig){
		
	};

	SProc.System.prototype.inDOM = function(){
		return $(this.container).length > 0;
			
	};

	SProc.System.prototype.play = function(){

	};

	SProc.System.prototype.pause = function(){

	};

	SProc.System.prototype.stop = function(){

	};

	SProc.System.prototype.addServer = function(serverConfig){
		this.servers.push(new SProc.Server(serverConfig));
	};



	SProc.Queue = function(config){
		this.waiting = config.waiting;
		this.arrivingTime = config.arrivingTime;
		this.Qsize = config.Qsize;
		this.System = config.System;
	};

	SProc.Queue.prototype.advance = function(){

	};

	//SProc.Queue.prototype.


	SProc.Server = function(config){
		this.busy = config.busy;
		this.capacity = config.capacity;
		this.attentionTime = config.attentionTime;
	};
*/