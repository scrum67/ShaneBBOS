/* ------------  
   CPU.js

   Requires global.js.
   
   Routines for the host CPU simulation, NOT for the OS itself.  
   In this manner, it's A LITTLE BIT like a hypervisor,
   in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
   that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
   JavaScript in both the host and client environments.

   This code references page numbers in the text book: 
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */

function Cpu() {
    this.PC    = 0;     // Program Counter
    this.Acc   = 0;     // Accumulator
    this.Xreg  = 0;     // X register
    this.Yreg  = 0;     // Y register
    this.Zflag = 0;     // Z-ero flag (Think of it as "isZero".)
    this.isExecuting = false;
    
    this.init = function() {
        this.PC    = 0;
        this.Acc   = 0;
        this.Xreg  = 0;
        this.Yreg  = 0;
        this.Zflag = 0;      
        this.isExecuting = false;  
    };
    
    this.contextSwitch = function(pcb) {
        // save the current state into the current pcb
        if (_CurrentProcess != null) {
            _CurrentProcess.PC = this.PC;
            _CurrentProcess.Acc = this.Acc;
            _CurrentProcess.Xreg = this.Xreg;
            _CurrentProcess.Yreg = this.Yreg;
            _CurrentProcess.Zflag = this.Zflag;
        }
        // set the state to the new pcb
        this.PC    = pcb.PC;     
        this.Acc   = pcb.Acc;     
        this.Xreg  = pcb.Xreg;  
        this.Yreg  = pcb.Yreg;  
        this.Zflag = pcb.Zflag;
        
        _CurrentProcess = pcb;
    };
    
    this.cycle = function() {
        krnTrace("CPU cycle");
        // TODO: Accumulate CPU usage and profiling statistics here.
        // Do the real work here. Be sure to set this.isExecuting appropriately.
        
        this.executeInstruction(_MemoryManager.getLocation(_CPU.PC));
        updateCPUDisplay();
        _MemoryDisplay.updateMemoryDisplay();
    };
    
    this.executeInstruction = function(opcode){
    if (opcode == "A9")
        loadAccConstant();
    else if(opcode == "AD")
        loadAccMemory();
    else if(opcode == "8D")
        storeAccMemory();
    else if(opcode == "6D")
        addCarry();
    else if(opcode == "A2")
        loadXConstant();
    else if(opcode == "AE")
        loadXMemory();
    else if(opcode == "A0")
        loadYConstant();
    else if(opcode == "AC")
        loadYMemory();
    else if(opcode == "EA")
        noOp();
    else if(opcode == "00")
        systemBreak();
    else if(opcode == "EC")
        compareX();
    else if(opcode == "D0")
        branchXBytes();
    else if(opcode == "EE")
        incrementVal();
    else if(opcode == "FF")
        systemCall();
    };
}

function updateCPUDisplay() {
    document.getElementById('PCid').innerHTML = _MemoryDisplay.hexDisplayPC(_CPU.PC);
    document.getElementById('Accid').innerHTML = _CPU.Acc;
    document.getElementById('Xid').innerHTML = _CPU.Xreg;
    document.getElementById('Yid').innerHTML = _CPU.Yreg;
    document.getElementById('Zid').innerHTML = _CPU.Zflag;
}

// Function for A9
function loadAccConstant() {
    _CPU.Acc = parseInt(_MemoryManager.getNextLocation(), 16);
    _CPU.PC++;
}

// Function for AD
function loadAccMemory() {
    _CPU.Acc = parseInt(_Memory[_MemoryManager.getAddress()], 16);
    _CPU.PC++;
}

// Function for 8D
function storeAccMemory() {
    hexAcc = _CPU.Acc.toString(16).toUpperCase();
    if(hexAcc.length < 2)
        hexAcc = "0" + hexAcc;
    _Memory[_MemoryManager.getAddress()] = hexAcc;
    _CPU.PC++;
}

// Function for 6D
function addCarry() {
    _CPU.Acc += parseInt(_Memory[_MemoryManager.getAddress()], 16);
    _CPU.PC++;
}

// Function for A2
function loadXConstant() {
    _CPU.Xreg = parseInt(_MemoryManager.getNextLocation(), 16);
    _CPU.PC++;
}

// Function for AE
function loadXMemory() {
    _CPU.Xreg = parseInt(_Memory[_MemoryManager.getAddress()], 16);
    _CPU.PC++;
}

// Function for A0
function loadYConstant() {
    _CPU.Yreg = _MemoryManager.getNextLocation();
    _CPU.PC++;
}

// Function for AC
function loadYMemory() {
    _CPU.Yreg = parseInt(_Memory[_MemoryManager.getAddress()], 16);
    _CPU.PC++;
}

// Function for EA
function noOp() {
    _CPU.PC++;
}

// Function for 00
function systemBreak() {
	_ReadyQueue.shift();
    _KernelInterruptQueue.enqueue( new Interrupt(PROCESS_TERMINATED, "") );
}

// Function for EC
function compareX() {
    if(parseInt(_Memory[_MemoryManager.getAddress()]) == _CPU.Xreg)
        _CPU.Zflag = 1;
    else 
        _CPU.Zflag = 0;
    _CPU.PC++;
}


// Function for D0
function branchXBytes() {
    if(_CPU.Zflag == 0) {
        var branch = parseInt(_MemoryManager.getNextLocation(), 16)
        _CPU.PC += branch;
        
        // if value of PC becomes greater than the amount of memory, go back to the beginning of memory
        if (_CPU.PC >= 256) {
            _CPU.PC -= 256;
        }
        _CPU.PC++;
    } else {
        // else skip the branch completely
        _CPU.PC += 2;
    }
}

// Function for EE
function incrementVal() {
    // store address in a variable so that PC doesn't get incremented too many times
    var address = _MemoryManager.getAddress()
    // get the byte in decimal form
    var byte = parseInt(_Memory[address], 16);
    // increment the byte
    byte++;
    
    // convert the byte to hex
    var hexByte = byte.toString(16).toUpperCase();
    if(hexByte.length < 2)
        hexByte = "0" + hexByte;
        
    // put the incremented byte in memory
    _Memory[address] = hexByte;
    _CPU.PC++;
}

// Function for FF
function systemCall() {
    if (_CPU.Xreg === 1) {
        // output the integer in the Y register
        _StdIn.putText(String(parseInt(_CPU.Yreg)));
        _StdIn.advanceLine();
        _StdIn.putText(">");
    } else if (_CPU.Xreg == 2) {
		
		
        // get the decimal address of the hex value in the Y register
        var address = parseInt(_CPU.Yreg, 16) + _CurrentProcess.base;
        // the current address in memory (from Y register)
        var current = _Memory[address];
        
        var value = 0;
        var string = "";
        
        while (current != "00") {
            value = parseInt(current, 16);
            // convert unicode and add to the previous string
            string = string + String.fromCharCode(value);
            // increment address
            address++;
            // reset the current address to the next address in memory
            current = _Memory[address]
        }
        // output the string containing everything in the specified range
        _StdIn.putText(string);
        _StdIn.advanceLine();
        _StdIn.putText(">");
    }
    _CPU.PC++;
}