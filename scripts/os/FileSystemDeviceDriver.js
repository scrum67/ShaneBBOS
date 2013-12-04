
FileSystemDeviceDriver.prototype = new DeviceDriver;

function FileSystemDeviceDriver () {
	
    this.driverEntry = fileSysDevDriverEntry;

	this.createFile = createFile;
	this.readFile	= readFile;
	this.writeFile	= writeFile;
	this.deleteFile = deleteFile;
	this.formatFile = formatFile;
	this.listFiles = listFiles;
}

function fileSysDevDriverEntry() {
	this.status = "loaded";
	
	formatFile();
}

function createFile(filename) {
	var availDir = getAvailDir();
	var availFile = getAvailFile();
		
	if(availDir !== null && availFile !== null && filename.length <= 60) {
		localStorage[availDir] = setToOccupied(availFile, filename);
		
		localStorage[availFile] = setToOccupied("0,0,0", "");
		return true;
	} else if(availDir === null) {
		_StdIn.putText("There are no available directory blocks remaining.");
		return false;
	} else if(availFile === null) {
		_StdIn.putText("There are no available file blocks remaining.");
		return false;
	} else if(filename.length > 60) {
		_StdIn.putText("File name is too large.");
		return false;
	}
	
}

function readFile(filename) {
	var directory = getFilename(filename);
	var values = localStorage[directory].split(",");;
	
	var file = [values[1], values[2], values[3]];
	file = file.join();

	// Associated files, files that are continuations of file
	var assocFiles = getAssociatedFiles(file);
	// An array to keep track of all data from multiple blocks
	var dataArray = [];
	
	for(i in assocFiles) {
		var vals = localStorage[assocFiles[i]].split(",");;
		var fileData = vals[4];
		if(fileData.indexOf("~") !== -1) {
			fileData = fileData.substring(0, fileData.indexOf("~"));
		}
		dataArray.push(fileData);
	}
	dataArray = dataArray.join();
	return dataArray;
	
}


function writeFile(filename, fileData) {
	var directory = getFilename(filename);
	if(directory !== null) {
		var values = localStorage[directory].split(",");;
		var file = [values[1], values[2], values[3]];
		file = file.join();
		if(fileData.length <= 60) {
			localStorage[file] = "1,0,0,0," + fillRemaining(fileData);
		} else {
			var blocks = [];
			var blocksNeeded = Math.ceil(fileData.length / 60);
			
			for(var i = 0; i < blocksNeeded; ++i) {
				blocks[i] = fileData.substring((i * 60), ((i + 1) * 60));
			}
			
			localStorage[file] = setToOccupied("0,0,0", blocks[0]);
			
			var current;
			var nextFile = file;
			
			for(var i = 1; i <blocks.length; ++i) {
				current = nextFile;
				
				nextFile = getAvailFile();
				
				localStorage[nextFile] = setToOccupied("0,0,0", blocks[i]);
				
				// connect the current file to the next one to keep track of everything
				var currentArray = localStorage[current];
				
				// keep data seperate
				var data = currentArray.substring(8, currentArray.length);
				//substring starting at 8 filename.substring(0, filename.indexOf("~"));
				var nextArray = nextFile.split(",");
				// change used bit, nextArray[0] is track, nextArray[1] is sector, nextArray[2] is block
				var tempArray = [1, nextArray[0], nextArray[1], nextArray[2], data];
				localStorage[current] = tempArray;
			}
		}
		return true;
	} else {
		return false;
	}
}


function deleteFile(filename) {
	var directory = getFilename(filename);
	if(directory !== null) {
		var values = localStorage[directory].split(",");
		var file = [values[1], values[2], values[3]];
		file = file.join();
		
		// Reset the value at the directory location
		var temp = [0, 0, 0, 0, fillRemaining("")];
		localStorage[directory] = temp;
		
		// Associated files, files that are continuations of file
		var assocFiles = getAssociatedFiles(file);		
		
		for (i in assocFiles) {
			var tempTwo = [0, 0, 0, 0, fillRemaining("")];
			localStorage[assocFiles[i]] = tempTwo;
		}
		return true;
	} else {
		return false;
	}
}




function listFiles() {
	filesArray = [];
	for(key in localStorage) {
		// get the key as a number
		var keyNum = key[0] + key[2] + key[4];
		parseInt(keyNum);
		// Only look at directory for this part (0-77)
		if(keyNum >= 0 && keyNum <= 77) {
			// values[0] will give us the used/unused bit			
			var values = localStorage[key].split(",");
			// if used/unused bit is zero, it's available
			if(values[0] === "1") {
				filename = values[4];
				if(filename.indexOf("~") != -1) {
					filename = filename.substring(0, filename.indexOf("~"));
				}
				filesArray.push(filename);
			}
		}
	}
	
	if(filesArray.length !== 0) {
		// start at 1 to avoid MBR
		for(var i = 1; i< filesArray.length; ++i) {
			_StdIn.putText(filesArray[i]);
			_StdIn.advanceLine();
		}
	} else
		_StdIn.putText("No files found.")	
}


function formatFile() {
	document.getElementById("innerFile").style.width="381px";
	localStorage.clear();
	var key = "";
	var value = "";
	
	// 4 tracks, 0-3
	for(var i = 0; i < 4; ++i) {
		// 8 sectors, 0-7
		for(var j = 0; j < 8; ++j) {
			// 8 blocks, 0-7
			for(var k = 0; k < 8; ++k) {
				key = [i, j, k];
				key = key.join();
				value =  [0, 0, 0, 0, fillRemaining("")];
				value = value.join();
				localStorage[key] = value;
			}
		}
	}
	// Initialize the MBR
	temp = [1, 0, 0, 0, fillRemaining("MBR")];
	localStorage["0,0,0"] = temp.join();
}




// Set a specified block to occupied, dir or file
function setToOccupied (key, fileData) {
	var values = key.split(",");
	var temp = [];
	
	temp[0] = 1;
	temp[1] = values[0];
	temp[2] = values[1];
	temp[3] = values[2];
	temp[4] = fillRemaining(fileData);
	
	temp = temp.join()
	
	return temp;
}

// Get the next available directory
function getAvailDir() {
	for(key in localStorage) {
		// get the key as a number
		var keyNum = key[0] + key[2] + key[4];
		parseInt(keyNum);
		
		// Only look at directory for this part (0-77)
		if(keyNum >= 0 && keyNum <= 77) {
			// values[0] will give us the used/unused bit			
			var values = localStorage[key].split(",");
			// if used/unused bit is zero, it's available
			if(values[0] === "0") {
				return key;
			}
		}
	}
	return null;
}

// Get the next available file
function getAvailFile() {
	
	var values;
	for(key in localStorage) {
		// get the key as a number
		var keyNum = key[0] + key[2] + key[4];
		parseInt(keyNum);
		
		// Only look at files for this part (100-377)
		if(keyNum >= 100 && keyNum <= 377) {
			// values[0] will give us the used/unused bit			
			var values = localStorage[key].split(",");
			// if used/unused bit is zero, it's available
			if(values[0] === "0") {
				return key;
			}
		}
	}
	return null;
}

// get a file name from directory
function getFilename(filename) {
	for(key in localStorage) {
		// get the key as a number
		var keyNum = key[0] + key[2] + key[4];
		keyNum = parseInt(keyNum);

		// Only look at directory for this part (0-77)
		if(keyNum >= 0 && keyNum <= 77) {
			// values[0] will give us the used/unused bit			
			var values = localStorage[key].split(",");;

			var fileData = values[4];
			// if used/unused bit is 1, it might be the one we're looking for
			if(values[0] === "1") {
				// get just the name part
				var fname = fileData.substring(0, fileData.indexOf("~"));
				// check if its the one we're looking for
				if(fname === filename) {
					return key;	
				}
			}
		}
	}
	return null;
}


// Fill everything after data with tilde (~)
function fillRemaining(fileData) {
	var length = fileData.length;
	
	// first four are MBR, otherwise start from end of data and fill up to 64
	for(var i = length; i < 60; ++i) {
		fileData += "~";
	}
	return fileData;
}



function getAssociatedFiles(file) {
	var current = file;
	// Array to keep track of the files for later use, starting with the input file
	var connectedFiles = [file];
	var values;
	
	while(current !== "0,0,0") {

		values = localStorage[current].split(",");;
		var assocFile = [values[1], values[2], values[3]];
		assocFile = assocFile.join();

		if(assocFile !== "0,0,0") {
			connectedFiles.push(assocFile);
		}
		current = assocFile;
	}
	return connectedFiles;
}


