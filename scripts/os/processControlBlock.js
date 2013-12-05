function ProcessControlBlock (pid){
   // this.state = state;     // Process state
    this.pid = pid;         // Process ID

    this.base = 0;
    this.limit = 255;
    this.PC    = 0;     // Program Counter
    this.Acc   = 0;     // Accumulator
    this.Xreg  = 0;     // X register
    this.Yreg  = 0;     // Y register
    this.Zflag = 0;     // Z-ero flag (Think of it as "isZero".)
	this.inMemory = true;
	this.priority = 0;
}
