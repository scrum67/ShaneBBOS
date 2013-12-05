function MemoryDisplay() {
	
	// Two-dimensional array for the table display of memory
	var memoryDisplayArray = null;
	
	var fileSysDisplayArray = null;
	
	this.createMemoryTable = function() {
		
			memoryDisplayOn = true;
			
    	    var memoryTable = document.getElementById("memoryTable");
    	     
    	    var rows = [];
    	    var rowcolumns = [];
    	    
    	   var colcount = 0;
    	    
    	    // one partition memory table has 32 rows
    	    for (var i = 0; i < 96; i++) {
    	        rows[i] = memoryTable.insertRow(i);
    	        
    	        rowcolumns[i] = [];
    	        
    	        // and 8 columns
    	        for (var j = 0; j < 9; j++) {
    	            rowcolumns[i][j] = rows[i].insertCell(-1);

    	            if(j === 0)
    	                rowcolumns[i][j].innerHTML = String(colcount);
    	            else 
        	            rowcolumns[i][j].innerHTML = "00";
        	       colcount++;
    			}
    			colcount -= 1;
    	    }
    	    memoryDisplayArray = rowcolumns;
	}
	
	// Function to display memory to the console
	this.updateMemoryDisplay = function() {
		var count = 0;
		for (var i = 0; i < 96; i++) {
    		for (var j = 1; j < 9; j++) {
            	memoryDisplayArray[i][j].innerHTML = _Memory[count];
				count++;
			}
		}	
	}
	
	this.hexDisplayPC = function(PC) {
	    PC = PC.toString(16).toUpperCase();
	    var padding = "$";
	    if(PC.length === 1) 
	        padding = "$000"
	    else if(PC.length === 2)
	        padding = "$00"
	    else if(PC.length === 3)
	        padding = "$0"
	    var output = padding + PC;
	    return output;
	}
	
	this.updateRQDisplay = function() {
	        if(_ReadyQueue.length > 2)
	            this.updateRQDisplayThree(_ReadyQueue[2]);
	       else
	            this.updateRQDisplayThree(null);
	       if(_ReadyQueue.length > 1)
	            this.updateRQDisplayTwo(_ReadyQueue[1]);
	       else
	            this.updateRQDisplayTwo(null);
	       if(_ReadyQueue.length > 0)
	            this.updateRQDisplayOne(_ReadyQueue[0]);
	       else
	            this.updateRQDisplayOne(null);
	}
	
    this.updateRQDisplayOne = function(pcb) {
        if(pcb !== null) {
            document.getElementById('PID0').innerHTML = pcb.pid;
            document.getElementById('Base0').innerHTML = pcb.base;
            document.getElementById('Limit0').innerHTML = pcb.limit;
            document.getElementById('InMem0').innerHTML = pcb.inMemory;
    		document.getElementById('Priority0').innerHTML = pcb.priority;
        } else {
            document.getElementById('PID0').innerHTML = "---";
            document.getElementById('Base0').innerHTML = "---";
            document.getElementById('Limit0').innerHTML = "---";
            document.getElementById('InMem0').innerHTML = "---";
    		document.getElementById('Priority0').innerHTML = "---";
        }
    }
    
    this.updateRQDisplayTwo = function(pcb) {
        if(pcb !== null) {
            document.getElementById('PID1').innerHTML = pcb.pid;
            document.getElementById('Base1').innerHTML = pcb.base;
            document.getElementById('Limit1').innerHTML = pcb.limit;
            document.getElementById('InMem1').innerHTML = pcb.inMemory;
    		document.getElementById('Priority1').innerHTML = pcb.priority;
        } else {
            document.getElementById('PID1').innerHTML = "---";
            document.getElementById('Base1').innerHTML = "---";
            document.getElementById('Limit1').innerHTML = "---";
            document.getElementById('InMem1').innerHTML = "---";
    		document.getElementById('Priority1').innerHTML = "---";
        }
    }
    
    this.updateRQDisplayThree = function(pcb) {
        if(pcb !== null) {
            document.getElementById('PID2').innerHTML = pcb.pid;
            document.getElementById('Base2').innerHTML = pcb.base;
            document.getElementById('Limit2').innerHTML = pcb.limit;
            document.getElementById('InMem2').innerHTML = pcb.inMemory;
    		document.getElementById('Priority2').innerHTML = pcb.priority;
        } else {
            document.getElementById('PID2').innerHTML = "---";
            document.getElementById('Base2').innerHTML = "---";
            document.getElementById('Limit2').innerHTML = "---";
            document.getElementById('InMem2').innerHTML = "---";
    		document.getElementById('Priority2').innerHTML = "---";
        }
    }

	this.createFileSystemTable = function() {
		var memoryDisplayOn = false;
		var fileSysTable = document.getElementById("fileSystemTable");
		
		var rows = [];
		var rowcolumns = [];
		
		// localStorage.length is 256
		for(var i = 0; i < localStorage.length; ++i) {
			rows[i] = fileSysTable.insertRow(i);
			
			rowcolumns[i] = [];
			
			for(var j = 0; j < 2; ++j) {
				rowcolumns[i][j] = rows[i].insertCell(-1);
				
    	        if(j === 0)
    	            rowcolumns[i][j].innerHTML = localStorage.key(i);
    	        else {
        	        rowcolumns[i][j].innerHTML = "";
				}
			}
		}
		fileSysDisplayArray = rowcolumns;
	}
	
	this.updateFileSystemTable = function() {
		var row = 0;
		for(key in localStorage) {
			fileSysDisplayArray[row][1].innerHTML = localStorage[key];
			row++;
		}
	}
	
}