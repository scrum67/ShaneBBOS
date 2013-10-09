function Memory(){
    var memoryArray = new Array();
	for(var i = 0; i < 256; i++)
	{
		memoryArray[i] = "00";
	}
	
	return memoryArray;
}