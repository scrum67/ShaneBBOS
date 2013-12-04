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
		var input = document.getElementById('taProgramInput').value.trim();
		kfnFileSysDriver.createFile(filename);
		kfnFileSysDriver.writeFile(filename, input);
		process.inMemory = false;
		_StdIn.putText("PID: " + process.pid)
	}
	
	this.rollIn = function(process) {
		var filename = String(process.pid);
		var program = kfnFileSysDriver.readFile(filename);
		kfnFileSysDriver.deleteFile(filename);
		if(_ReadyQueue.length === 3) {
			var shifted = _ReadyQueue.shift(_ReadyQueue[_ReadyQueue.length-1]);
		} else {
			for(i in _ResidentList) {
				if(_ResidentList[i].inMemory === true) 
					break;
			}
			var shifted = _ResidentList[i];
		}
		var string = "";
		for(var i = shifted.base; i < shifted.limit; ++i) {
			string += _Memory[i] + " ";
		}
		
		var temp = program.split(" ");
		for(var i = 0; i < temp.length; ++i) {
			_Memory[i + shifted.base] =  temp[i];		
		}

		fname = String(shifted.pid);
		kfnFileSysDriver.createFile(fname);
		kfnFileSysDriver.writeFile(fname, string);
		_MemoryDisplay.updateMemoryDisplay();
	}
}