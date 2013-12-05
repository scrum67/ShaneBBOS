/* ------------
   Shell.js
   
   The OS Shell - The "command line interface" (CLI) for the console.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

// default user is "Shane"
var user = "Shane";

function Shell() {
    // Properties
    this.promptStr   = ">";
    this.commandList = [];
    this.curses      = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
    this.apologies   = "[sorry]";
    // Methods
    this.init        = shellInit;
    this.putPrompt   = shellPutPrompt;
    this.handleInput = shellHandleInput;
    this.execute     = shellExecute;
}

function shellInit() {
    var sc = null;
    //
    // Load the command list.

    // ver
    sc = new ShellCommand();
    sc.command = "ver";
    sc.description = "- Displays the current version data.";
    sc.function = shellVer;
    this.commandList[this.commandList.length] = sc;
    
    // help
    sc = new ShellCommand();
    sc.command = "help";
    sc.description = "- This is the help command. Seek help.";
    sc.function = shellHelp;
    this.commandList[this.commandList.length] = sc;
    
    // shutdown
    sc = new ShellCommand();
    sc.command = "shutdown";
    sc.description = "- Shuts down the virtual OS but leaves the underlying hardware simulation running.";
    sc.function = shellShutdown;
    this.commandList[this.commandList.length] = sc;

    // cls
    sc = new ShellCommand();
    sc.command = "cls";
    sc.description = "- Clears the screen and resets the cursor position.";
    sc.function = shellCls;
    this.commandList[this.commandList.length] = sc;

    // man <topic>
    sc = new ShellCommand();
    sc.command = "man";
    sc.description = "<topic> - Displays the MANual page for <topic>.";
    sc.function = shellMan;
    this.commandList[this.commandList.length] = sc;
    
    // trace <on | off>
    sc = new ShellCommand();
    sc.command = "trace";
    sc.description = "<on | off> - Turns the OS trace on or off.";
    sc.function = shellTrace;
    this.commandList[this.commandList.length] = sc;

    // rot13 <string>
    sc = new ShellCommand();
    sc.command = "rot13";
    sc.description = "<string> - Does rot13 obfuscation on <string>.";
    sc.function = shellRot13;
    this.commandList[this.commandList.length] = sc;

    // prompt <string>
    sc = new ShellCommand();
    sc.command = "prompt";
    sc.description = "<string> - Sets the prompt.";
    sc.function = shellPrompt;
    this.commandList[this.commandList.length] = sc;

    // date
    sc = new ShellCommand();
    sc.command = "date";
    sc.description = "- Displays the current date and time.";
    sc.function = shellDate;
    this.commandList[this.commandList.length] = sc;

    // whereami
    sc = new ShellCommand();
    sc.command = "whereami";
    sc.description = "- Displays your current location";
    sc.function = shellWhere;
    this.commandList[this.commandList.length] = sc;
    
    // user
    sc = new ShellCommand();
    sc.command = "user";
    sc.description = "- Displays the user";
    sc.function = shellUser;
    this.commandList[this.commandList.length] = sc;

    // status
    sc = new ShellCommand();
    sc.command = "status";
    sc.description = "- Update the status of the OS";
    sc.function = shellStatus;
    this.commandList[this.commandList.length] = sc;
    
    // bsod
    sc = new ShellCommand();
    sc.command = "bsod";
    sc.description = "- Throws an interrupt and breaks everthing";
    sc.function = shellBsod;
    this.commandList[this.commandList.length] = sc;
    
    // load
    sc = new ShellCommand();
    sc.command = "load";
    sc.description = "- Check \"User Program Input\" for valid commands";
    sc.function = shellLoad;
    this.commandList[this.commandList.length] = sc;
    
    // run
    sc = new ShellCommand();
    sc.command = "run";
    sc.description = "- Runs a loaded program";
    sc.function = shellRun;
    this.commandList[this.commandList.length] = sc;
    
    // runall
    sc = new ShellCommand();
    sc.command = "runall";
    sc.description = "- Runs all loaded programs";
    sc.function = shellRunAll;
    this.commandList[this.commandList.length] = sc;
    
    // quantum
    sc = new ShellCommand();
    sc.command = "quantum";
    sc.description = "- Sets the quantum";
    sc.function = shellQuantum;
    this.commandList[this.commandList.length] = sc;
    
    // kill
    sc = new ShellCommand();
    sc.command = "kill";
    sc.description = "- Kills an active process";
    sc.function = shellKill;
    this.commandList[this.commandList.length] = sc;
    
    // processes
    sc = new ShellCommand();
    sc.command = "processes";
    sc.description = "- List the running processes and their IDs";
    sc.function = shellProcesses;
    this.commandList[this.commandList.length] = sc;
	
	// create
	sc = new ShellCommand();
    sc.command = "create";
    sc.description = "- Creates a new file";
    sc.function = shellCreate;
    this.commandList[this.commandList.length] = sc;
    
	// read
	sc = new ShellCommand();
    sc.command = "read";
    sc.description = "- Reads the contents of a file";
    sc.function = shellRead;
    this.commandList[this.commandList.length] = sc;
    
	
	// write
	sc = new ShellCommand();
    sc.command = "write";
    sc.description = "- Writes to a file";
    sc.function = shellWrite;
    this.commandList[this.commandList.length] = sc;
	
	// delete
	sc = new ShellCommand();
    sc.command = "delete";
    sc.description = "- Deletes a file";
    sc.function = shellDelete;
    this.commandList[this.commandList.length] = sc;
	
	// format
	sc = new ShellCommand();
    sc.command = "format";
    sc.description = "- Formats a file";
    sc.function = shellFormat;
    this.commandList[this.commandList.length] = sc;
	
	// ls
	sc = new ShellCommand();
    sc.command = "ls";
    sc.description = "- Lists current files on disk";
    sc.function = shellls;
    this.commandList[this.commandList.length] = sc;
	
	// setschedule
	sc = new ShellCommand();
    sc.command = "setschedule";
    sc.description = "- Sets the scheduling algorithm";
    sc.function = shellSetSchedule;
    this.commandList[this.commandList.length] = sc;
	
	// getschedule
	sc = new ShellCommand();
    sc.command = "getschedule";
    sc.description = "- Gets the current scheduling algorithm";
    sc.function = shellGetSchedule;
    this.commandList[this.commandList.length] = sc;
	
    // Display the initial prompt.
    this.putPrompt();
}

function shellPutPrompt()
{
    _StdIn.putText(this.promptStr);
}

function shellHandleInput(buffer)
{
    krnTrace("Shell Command~" + buffer);
    // 
    // Parse the input...
    //
    var userCommand = new UserCommand();
    userCommand = shellParseInput(buffer);
    // ... and assign the command and args to local variables.
    var cmd = userCommand.command;
    var args = userCommand.args;
    //
    // Determine the command and execute it.
    //
    // JavaScript may not support associative arrays in all browsers so we have to
    // iterate over the command list in attempt to find a match.  TODO: Is there a better way? Probably.
    var index = 0;
    var found = false;
    while (!found && index < this.commandList.length)
    {
        if (this.commandList[index].command === cmd)
        {
            found = true;
            var fn = this.commandList[index].function;
        }
        else
        {
            ++index;
        }
    }
    if (found)
    {
        this.execute(fn, args);
    }
    else
    {
        // It's not found, so check for curses and apologies before declaring the command invalid.
        if (this.curses.indexOf("[" + rot13(cmd) + "]") >= 0)      // Check for curses.
        {
            this.execute(shellCurse);
        }
        else if (this.apologies.indexOf("[" + cmd + "]") >= 0)      // Check for apologies.
        {
            this.execute(shellApology);
        }
        else    // It's just a bad command.
        {
            this.execute(shellInvalidCommand);
            
        }
    }
}


function shellParseInput(buffer)
{
    var retVal = new UserCommand();

    // 1. Remove leading and trailing spaces.
    buffer = trim(buffer);

    // 2. Lower-case it.
    buffer = buffer.toLowerCase();

    // 3. Separate on spaces so we can determine the command and command-line args, if any.
    var tempList = buffer.split(" ");

    // 4. Take the first (zeroth) element and use that as the command.
    var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript.  See the Queue class.
    // 4.1 Remove any left-over spaces.
    cmd = trim(cmd);
    // 4.2 Record it in the return value.
    retVal.command = cmd;

    // 5. Now create the args array from what's left.
    for (var i in tempList)
    {
        var arg = trim(tempList[i]);
        if (arg != "")
        {
            retVal.args[retVal.args.length] = tempList[i];
        }
    }
    return retVal;
}

function shellExecute(fn, args)
{
    // We just got a command, so advance the line...
    _StdIn.advanceLine();
    // ... call the command function passing in the args...
    fn(args);
    // Check to see if we need to advance the line again
    if (_StdIn.CurrentXPosition > 0)
    {
        _StdIn.advanceLine();
    }
    // ... and finally write the prompt again.
    this.putPrompt();
}


//
// The rest of these functions ARE NOT part of the Shell "class" (prototype, more accurately), 
// as they are not denoted in the constructor.  The idea is that you cannot execute them from
// elsewhere as shell.xxx .  In a better world, and a more perfect JavaScript, we'd be
// able to make then private.  (Actually, we can. have a look at Crockford's stuff and Resig's JavaScript Ninja cook.)
//

//
// An "interior" or "private" class (prototype) used only inside Shell() (we hope).
//
function ShellCommand()     
{
    // Properties
    this.command = "";
    this.description = "";
    this.function = "";
}

//
// Another "interior" or "private" class (prototype) used only inside Shell() (we hope).
//
function UserCommand()
{
    // Properties
    this.command = "";
    this.args = [];
}


//
// Shell Command Functions.  Again, not part of Shell() class per se', just called from there.
//
function shellInvalidCommand()
{
    _StdIn.putText("Invalid Command. ");
    if (_SarcasticMode)
    {
        _StdIn.putText("Duh. Go back to your Speak & Spell.");
    }
    else
    {
        _StdIn.putText("Type 'help' for, well... help.");
    }
}

function shellCurse()
{
    _StdIn.putText("Oh, so that's how it's going to be, eh? Fine.");
    _StdIn.advanceLine();
    _StdIn.putText("Bitch.");
    _SarcasticMode = true;
}

function shellApology()
{
   if (_SarcasticMode) {
      _StdIn.putText("Okay. I forgive you. This time.");
      _SarcasticMode = false;
   } else {
      _StdIn.putText("For what?");
   }
}

function shellVer(args)
{
    _StdIn.putText(APP_NAME + " version " + APP_VERSION);    
}

function shellHelp(args)
{
    _StdIn.putText("Commands:");
    for (var i in _OsShell.commandList)
    {
        _StdIn.advanceLine();
        _StdIn.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
    }    
}

function shellShutdown(args)
{
     _StdIn.putText("Shutting down...");
     // Call Kernel shutdown routine.
    krnShutdown();   
    // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
}

function shellCls(args)
{
    _StdIn.clearScreen();
    _StdIn.resetXY();
}

function shellMan(args)
{
    if (args.length > 0)
    {
        var topic = args[0];
        switch (topic)
        {
            case "help": 
                _StdIn.putText("Help displays a list of (hopefully) valid commands.");
                break;
            default:
                _StdIn.putText("No manual entry for " + args[0] + ".");
        }        
    }
    else
    {
        _StdIn.putText("Usage: man <topic>  Please supply a topic.");
    }
}

function shellTrace(args)
{
    if (args.length > 0)
    {
        var setting = args[0];
        switch (setting)
        {
            case "on": 
                if (_Trace && _SarcasticMode)
                {
                    _StdIn.putText("Trace is already on, dumbass.");
                }
                else
                {
                    _Trace = true;
                    _StdIn.putText("Trace ON");
                }
                
                break;
            case "off": 
                _Trace = false;
                _StdIn.putText("Trace OFF");                
                break;                
            default:
                _StdIn.putText("Invalid arguement.  Usage: trace <on | off>.");
        }        
    }
    else
    {
        _StdIn.putText("Usage: trace <on | off>");
    }
}

function shellRot13(args)
{
    if (args.length > 0)
    {
        _StdIn.putText(args[0] + " = '" + rot13(args[0]) +"'");     // Requires Utils.js for rot13() function.
    }
    else
    {
        _StdIn.putText("Usage: rot13 <string>  Please supply a string.");
    }
}

function shellPrompt(args)
{
    if (args.length > 0)
    {
        _OsShell.promptStr = args[0];
    }
    else
    {
        _StdIn.putText("Usage: prompt <string>  Please supply a string.");
    }
    
}

function shellDate(args)
{
    _StdIn.putText("" + new Date());    
}

function shellWhere(args)
{
    _StdIn.putText("/chrome/os/generic_directory/generic_filename");    
}

function shellUser(args)
{
    if (args.length > 0) {
        user = args[0];
        _StdIn.putText(String(user));  
    } 
    else
    _StdIn.putText(String(user));
    //_StdIn.putText("Usage: user <name>");  
}

function shellStatus(args)
{
    status = "";
    if (args.length > 0)
        {
            for (i = 0; i < args.length; i++)
                {
                    status += args[i] + " ";
                }
				
			status = status.charAt(0).toUpperCase() + status.slice(1);
            document.getElementById("status").innerHTML = status;
        }
    else
    _StdIn.putText("Usage: status <update>");    
}

function shellBsod()
{
    _KernelInterruptQueue.enqueue( new Interrupt(10 , "") );
}


function shellLoad()
{
    var input = document.getElementById('taProgramInput').value.trim();
    var bool = true;
    if(input.length <= 0) {
            _StdIn.putText("No input");    
        }
        else {
        var commands = input.split(" ");
        for(var i = 0; i < commands.length; i++)
            {
                if(commands[i].length > 2)
                    bool = false;
                else if (commands[i].match(/[0-9a-f]+/i) === "")
                    bool = false;
            }
            var pcb = new ProcessControlBlock(_PID);

            
            if (bool) {
                if(_MemoryManager.getOpenPartition() === null) {
					_ResidentList[pcb.pid] = pcb;
					kfnFileSysDriver.createFile(String(pcb.pid));
					kfnFileSysDriver.writeFile(String(pcb.pid), input);
					pcb.inMemory = false;
					_StdIn.putText("PID: " + _PID);
					_PID++;
					_MemoryDisplay.updateMemoryDisplay();
				}
                else {
                    // put commands in memory

                        //TODO: add partition size to j, (relocation value?)
                        if(_MemoryManager.memoryPartitions.firstOpen === true) {
                            for(var j = 0; j < commands.length; j++) {
                                _Memory[j] = commands[j];
                            }
                            pcb.base = _MemoryManager.memoryPartitions.firstBase;
                            pcb.limit = _MemoryManager.memoryPartitions.firstLimit;
                            _MemoryManager.memoryPartitions.firstOpen = false;
                        }
                        else if(_MemoryManager.memoryPartitions.secondOpen === true) {
                            for(var j = 0; j < commands.length; j++) {
                            _Memory[j + PARTITION_SIZE] = commands[j];
                            }
                            pcb.base = _MemoryManager.memoryPartitions.secondBase;
                            pcb.limit = _MemoryManager.memoryPartitions.secondLimit;
                            _MemoryManager.memoryPartitions.secondOpen = false;
                        }
                        else if(_MemoryManager.memoryPartitions.thirdOpen === true) {
                            for(var j = 0; j < commands.length; j++) {
                            _Memory[j + (PARTITION_SIZE * 2)] = commands[j];
                            }
                            pcb.base = _MemoryManager.memoryPartitions.thirdBase;
                            pcb.limit = _MemoryManager.memoryPartitions.thirdLimit;
                            _MemoryManager.memoryPartitions.thirdOpen = false;
                        }

                        // increment global _PID for next program
                        _PID++;
					    _ResidentList[pcb.pid] = pcb;

                        _StdIn.putText("PID: " + String(pcb.pid));
                        _MemoryDisplay.updateMemoryDisplay();
                }
            }
            else
                _StdIn.putText("Invalid");  
    }
}

function shellRun(args) {
    if (args.length > 0) {
            // add specified process to ready queue
            var bool = false;
			
            for(i in _ResidentList) {
                if((_ResidentList[i].pid + "") === args.toString()) {
                    bool = true;
                }
            }
			if(_ResidentList[args].inMemory === false && bool) {
				_KernelInterruptQueue.enqueue(new Interrupt(CONTEXT_SWITCH, _ResidentList[args]));
			}
			if(bool) {
                _ReadyQueue.push(_ResidentList[args]);
                _CPU.isExecuting = true;
            } else 
                _StdIn.putText("Invalid PID specified");
    } else
        _StdIn.putText("Usage: run <pid>");
}

function shellRunAll(args) {
	for(i in _ResidentList) {
    	shellRun(i + "");
	}
	for(i in _ReadyQueue) {
	   console.log(_ReadyQueue[i]);
	}
}

function shellQuantum(args) {
    if(args.length()) {
        QUANTUM = args;
    } else {
        _StdIn.putText("Usage: quantum <int>");
    }
}

function shellKill(args) {
    krnKillProcess(_ResidentList[parseInt(args)]);
    /**
        // look through ready queue and take processes off
        for(var i = 0; i < _ReadyQueue.length; ++i) {
            var process = _ReadyQueue.shift();

			// if the process is not the specified one, put it back
            if(process.pid !== parseInt(args[0])) {
                _ReadyQueue.push(process);
            } else 
				_KernelInterruptQueue.enqueue( new Interrupt(PROCESS_TERMINATED, "") );
        }
        
        delete _ResidentList[parseInt(args)];*/
}

function shellProcesses(args) {
    var numProcesses = 0;
	for(i in _ResidentList) {
		numProcesses++;
	}
	
	if( numProcesses > 0 ) {
		_StdIn.putText("Active Processes: ");
		
		for(i in _ResidentList) {
			_StdIn.putText(String(_ResidentList[i].pid) + " ");
		}
	} else {
		_StdIn.putText("There are currently no active processes...");
	}
}

function shellCreate(args) {
	var filename = args[0];

	if(	kfnFileSysDriver.createFile(filename) === true)
		_StdIn.putText("File created successfully.");
}

function shellRead(args) {
	var filename = args[0];
	
	_StdIn.putText(kfnFileSysDriver.readFile(filename));
}

function shellWrite(args) {
	var filename = args[0];
	var fileData = 	args[1]
	
	
	if(kfnFileSysDriver.writeFile(filename, fileData) === true)
		_StdIn.putText("Write to file completed successfully.");
	else
		_StdIn.putText("Error in writing to file.");
}



function shellDelete(args) {
	var filename = args[0];
	if(kfnFileSysDriver.deleteFile(filename) === true)
		_StdIn.putText("File deleted successfully.");
	else
		_StdIn.putText("Error in deleting file.");
}

function shellFormat(args) {
	kfnFileSysDriver.formatFile();
}

function shellls(args) {
	kfnFileSysDriver.listFiles();
}

function shellSetSchedule(args) {
	var schedule = args[0];
	
	if(schedule === 'fcfs') {
		_CurrentSchedule = _Scheduler.fcfs();
		_StdIn.putText("Current scheduling algorithm: First-Come First-Serve")
	} else if(schedule === 'rr') {
		_CurrentSchedule = _Scheduler.roundrobin();
		_StdIn.putText("Current scheduling algorithm: Round Robin")
	} else if(schedule === 'priority') {
		_CurrentSchedule = _Scheduler.priority();
		_StdIn.putText("Current scheduling algorithm: Priority")
	} else 
		_StdIn.putText("Usage: setschedule <fcfs | rr | priority>");
}

function shellGetSchedule(args) {
	_StdIn.putText(_CurrentSchedule);
}