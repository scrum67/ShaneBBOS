function MemoryDisplay() {
    
	// Two-dimensional array for the table display of memory
	var memoryDisplayArray = null;
	
	
	this.createMemoryTable = function() {
    	    var memoryTable = document.getElementById("memoryTable");
    	     
    	    var rows = [];
    	    var rowcolumns = [];
    	    
    	   var colcount = 0;
    	    
    	    // one partition memory table has 32 rows
    	    for (var i = 0; i < 96; i++) {
    	        rows[i] = memoryTable.insertRow(i);
    	        // if that row is 0, 32, or 64, change color of the row to signify a new partition starts 
    	        // NOTE: would use  _MemoryManager.memoryPartitions.firstBase / 8, but _MemoryManager is out of scope
    	       //// if(i === 0 || i === 32 || i === 64)
    	        
			    // rows[i].style.backgroundColor = "green";
    	        
    	        //rows[i] = memoryTable.insertRow(i);
    	        
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
    			colcount  -=  1;
    	    }
    	    memoryDisplayArray = rowcolumns;
	}
	
	// Function to display memory to the console
	this.updateMemoryDisplay = function() {
	    //  Check which partition you're in and put contents of memory in that partition
    	    var count = 0;
    	    if(_ResidentList.length === 1) {
    	            for (var i = 0; i < 32; i++) {
    	                for (var j = 1; j < 9; j++) {
            	            memoryDisplayArray[i][j].innerHTML = _Memory[count];
            	            count++;
    	                   }
    	            }
    	    } else if(_ResidentList.length === 2) {
    	            for (var i = 33; i < 64; i++) {
    	                for (var j = 1; j < 9; j++) {
            	            memoryDisplayArray[i][j].innerHTML = _Memory[count];
            	            count++;
    	                   }
    	            }
    	    } else if(_ResidentList.length=== 3) {
    	        for (var i = 65; i < 96; i++) {
    	                for (var j = 1; j < 9; j++) {
            	            memoryDisplayArray[i][j].innerHTML = _Memory[count];
            	            count++;
    	                   }
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
}