function MemoryManager(){
    // Function to get the next location in memory
    this.getNextLocation = function() {
        _CPU.PC++;
        return _Memory[_CPU.PC];
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
        var decMemAddress = parseInt(hexMemAddress, 16)
        
        // validate the address to ensure that it is within memory
        if (decMemAddress >= _CurrentProcess.base  && decMemAddress <= _CurrentProcess.limit)
            return decMemAddress;
        else 
            _StdIn.putText("Error: Address is out of bounds")
	}
}