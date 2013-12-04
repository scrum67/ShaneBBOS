function Scheduler() {
	this.roundrobin = function() {
		QUANTUM = 6;
		if(counter >= QUANTUM) {
			counter = 0;
       	if(_ReadyQueue.length != 0) {
        	var pcb = _ReadyQueue.shift();
			_ReadyQueue.push(pcb);
			_KernelInterruptQueue.enqueue(new Interrupt(CONTEXT_SWITCH, _ReadyQueue[0]));
            hostLog("Scheduling change", "OS");
         	}
     	}
	}
	
	
	
	
	this.fcfs = function() {
		QUANTUM = Number.MAX_VALUE;
	}
	
	this.priority = function() {
		
	}
}
