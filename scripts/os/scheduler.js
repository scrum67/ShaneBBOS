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
     	return "RR";
	}
	
	this.fcfs = function() {
		QUANTUM = Number.MAX_VALUE;
		return "FCFS";
	}
	
	this.priority = function() {
        return "PRIORITY"
	}
	
	this.updateRQ = function() {
	    if(_CurrentSchedule === "PRIORITY") {
    	    _ReadyQueue = _ReadyQueue.sort(function(x, y) {
              return y.priority - x.priority;
            });
	    }
	    if(_ReadyQueue.length > 0) {
            var process = _ReadyQueue[0];
            if (_ReadyQueue.length > 0 && _CurrentProcess !== process) {
                _KernelInterruptQueue.enqueue(new Interrupt(CONTEXT_SWITCH, process));
            }
	    }
	}
}
