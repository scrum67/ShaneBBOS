function Memory(){
    var memoryArray = [];
	for(var i = 0; i < TOTAL_MEMORY; i++)
	{
		memoryArray[i] = "00";
	}
	
	return memoryArray;
}