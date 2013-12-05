function MemoryManager(){
    // Function to get the next location in memory
    this.getNextLocation = function() {
        _CPU.PC++;
        return _Memory[_CurrentProcess.base + _CPU.PC];
    }
    this.getLocation = function(location) {
        return _Memory[_CurrentProcess.base + location];
    }

	// Function to get the decimal address from a command with two parameters (ex. 8D 10 00)
	// NOTE: Be careful with this.  If used twice in one op code, it will increment the PC every time
	this.getAddress = function() {
	    // get first parameter (ex. 10)
    	var first = this.getNextLocation();
    	// get second parameter (ex. 00)
        var second = this.getNextLocation();
        // concatenate into one hexidecimal memory address (ex. 0010)
        var hexMemAddress = second + first;
        // convert to decimal memory address, because memory is an array
        var decMemAddress = parseInt(hexMemAddress, 16);
        
        // validate the address to ensure that it is within memory
        if (_CurrentProcess.base + decMemAddress >= _CurrentProcess.base  && _CurrentProcess.base + decMemAddress <= _CurrentProcess.limit)
            return _CurrentProcess.base + decMemAddress;
        else 
            _StdIn.putText("Error: Address is out of bounds");
	}
	this.memoryPartitions = {};
	// base of first partition, 0
	this.memoryPartitions.firstBase = 0;
	// limit of first partition, 255
	this.memoryPartitions.firstLimit = PARTITION_SIZE - 1;
	// if the first partition is open or not
	this.memoryPartitions.firstOpen = true;
	
	// base of second partition, 256
	this.memoryPartitions.secondBase = PARTITION_SIZE;
	// limit of second partition, 511
	this.memoryPartitions.secondLimit = PARTITION_SIZE * 2 - 1;
	// if the second partition is open or not
	this.memoryPartitions.secondOpen = true;
	
	// base of third partition, 512
	this.memoryPartitions.thirdBase = PARTITION_SIZE*2;
	// limit of third partition, 767
	this.memoryPartitions.thirdLimit = PARTITION_SIZE * 3 - 1;
	// if the third partition is open or not
	this.memoryPartitions.thirdOpen = true;
	
	
	this.rollOut = function(process) {
		var filename = String(process.pid);
		var string = "";
    	for(var i = process.base; i < (PARTITION_SIZE + process.base); ++i) {
    		string += _Memory[i] + " ";
    	}
		//var input = document.getElementById('taProgramInput').value.trim();
		kfnFileSysDriver.createFile(filename);
		kfnFileSysDriver.writeFile(filename, string);
		process.inMemory = false;
	}
	
	
	
	this.rollIn = function(process) {
		var filename = process.pid.toString();
		var program = kfnFileSysDriver.readFile(filename);
		program = program.split(" ");
		var memoryPart = _MemoryManager.getOpenPartition();

		if(memoryPart === null) {
		    //rollout a partition
		    var swapProcess = this.getLeastImportantProcess();
		    this.rollOut(swapProcess);
		    process.base = swapProcess.base;
		    process.limit = swapProcess.limit;
		    var string = "";
    		for(var i = process.base; i < program.length + process.base; ++i) {
    			string = program[i - process.base];
    			_Memory[i] = string.toUpperCase();
    		}
        }
		kfnFileSysDriver.deleteFile(filename);
		process.inMemory = true;
	}
	
	this.getOpenPartition = function() {
		    if(this.memoryPartitions.firstOpen === true)
		        return 1;
		    else if(this.memoryPartitions.secondOpen === true)
		        return 2;
		    else if(this.memoryPartitions.thirdOpen === true)
		        return 3;
		return null;
	}
	
	
	this.getLeastImportantProcess = function() {
	    var lowestProc = _ResidentList[0];
	    for(i in _ResidentList) {
	        if(_ResidentList[i].inMemory)
	            lowestProc = _ResidentList[i];
	    }
	    return lowestProc;
	}
	
	this.clearPartition = function(process) {
        for(var i = process.base; i < process.limit; i++) {
            Memory[i] = "00";
        }
        if(process.base === this.memoryPartitions.firstBase)
            this.memoryPartitions.firstOpen = true;
        else if(process.base === this.memoryPartitions.secondBase)
            this.memoryPartitions.secondBase = true;
        else if(process.base === this.memoryPartitions.thirdBase)
            this.memoryPartitions.thirdBase = true;
    };
}