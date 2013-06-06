$(document).ready(function(){
	var temp = new Object();
	temp.Mu_a = .5;
	temp.capacity = 10;

	var newQueue = new SProc.Queue(temp);

	var obj = new Object();
	obj.Mu_s = .2;
	obj.servers = [.1,.2,.3];
	obj.queue = newQueue;

	var mySystem = new SProc.System(obj);

	var fSProc = new SProc({System:mySystem});

	window.fs = fSProc;
	}
);