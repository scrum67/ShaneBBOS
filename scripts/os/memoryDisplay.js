function MemoryDisplay() {
    
	// Two-dimensional array for the table display of memory
	var memoryDisplayArray = null;
	
	
	this.createMemoryTable = function() {
	    var memoryTable = document.getElementById("memoryTable");
	     
	    var rows = [];
	    var rowcolumns = [];
	    
	    // memory table has 32 rows
	    for (var i = 0; i < 32; i++) {
	        rows[i] = memoryTable.insertRow(i);
	        
	        rowcolumns[i] = [];
	        
	        // and 8 columns
	        for (var j = 0; j < 8; j++) {
	            rowcolumns[i][j] = rows[i].insertCell(-1);
	            rowcolumns[i][j].innerHTML = "00";
			}
	    }
	    memoryDisplayArray = rowcolumns;
	}
	
	// Function to display memory to the console
	this.updateMemoryDisplay = function() {
	    count = 0;
	    
	    // memory table has 32 rows
	    for (var i = 0; i < 32; i++) {
	        
	        // and 8 columns
	        for (var j = 0; j < 8; j++) {
	            memoryDisplayArray[i][j].innerHTML = _Memory[count];
	            count++;
	        }
	    }
	}
	
	this.hexDisplayPC = function(PC) {
	    PC = PC.toString(16).toUpperCase();
	    var padding = "$";
	    if(PC.length == 1) 
	        padding = "$000"
	    else if(PC.length == 2)
	        padding = "$00"
	    else if(PC.length == 3)
	        padding = "$0"
	    var output = padding + PC;
	    return output;
	}
}