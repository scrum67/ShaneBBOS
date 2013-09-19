/* ------------
   Console.js

   Requires globals.js

   The OS Console - stdIn and stdOut by default.
   Note: This is not the Shell.  The Shell is the "command line interface" (CLI) or interpreter for this console.
   ------------ */

function CLIconsole() {
    // Properties
    this.CurrentFont      = _DefaultFontFamily;
    this.CurrentFontSize  = _DefaultFontSize;
    this.CurrentXPosition = 0;
    this.CurrentYPosition = _DefaultFontSize;
    this.buffer = "";
    this.outputLines = [];
    var commandEntered = 0;
    var textSave = "";
    
    // Methods
    this.init = function() {
       this.clearScreen();
       this.resetXY();
    };

    this.clearScreen = function() {
       _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
    };

    this.resetXY = function() {
       this.CurrentXPosition = 0;
       this.CurrentYPosition = this.CurrentFontSize;
    };

    this.handleInput = function() {
       while (_KernelInputQueue.getSize() > 0)
       {
           // Get the next character from the kernel input queue.
           var chr = _KernelInputQueue.dequeue();

           // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
           if (chr == String.fromCharCode(13))  //     Enter key
           {
               this.storeLine(this.buffer);
               // The enter key marks the end of a console command, so ...
               // ... tell the shell ...
               _OsShell.handleInput(this.buffer);
               // ... and reset our buffer.
               this.buffer = "";
           }
           // TODO: Write a case for Ctrl-C.
           
           // backspace to delete last character
           else if (chr == 'bck')
               {
                   // execute backspace() on last element of buffer
                   this.backspace(this.buffer.slice(-1));
                   // edit the actual buffer to no longer include last element
                   this.buffer = this.buffer.substring(0, this.buffer.length - 1)                   
               }
            
        else if (chr == 'UP')
               {
                   this.backspace(this.buffer);
                   this.buffer = "";
                   
                   this.putText(this.outputLines[this.outputLines.length - 1 - commandEntered]);
                   this.buffer += this.outputLines[this.outputLines.length - 1 - commandEntered];
                   
                   commandEntered += 1;
                   
               }
        else if (chr == 'DOWN')
            {
                this.backspace(this.buffer);
                this.buffer = "";
                if(commandEntered != 0){
                   commandEntered = commandEntered - 1;
                   
                   this.putText(this.outputLines[this.outputLines.length - 1 - commandEntered]);
                   this.buffer += this.outputLines[this.outputLines.length - 1 - commandEntered];
                }
            }
        else
           {
               // This is a "normal" character, so ...
               // ... draw it on the screen...
               this.putText(chr);
               // ... and add it to our buffer.
               this.buffer += chr;
           }
       }
    };
    

    this.putText = function(text) {
       // My first inclination here was to write two functions: putChar() and putString().
       // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
       // between the two.  So rather than be like PHP and write two (or more) functions that
       // do the same thing, thereby encouraging confusion and decreasing readability, I
       // decided to write one function and use the term "text" to connote string or char.
       if (text !== "")
       {
           // Draw the text at the current X and Y coordinates.
           _DrawingContext.drawText(this.CurrentFont, this.CurrentFontSize, this.CurrentXPosition, this.CurrentYPosition, text);
         // Move the current X position.
           var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           this.CurrentXPosition = this.CurrentXPosition + offset;
           this.textSave += text;
       }
    };

    this.advanceLine = function() {
       this.CurrentXPosition = 0;
       this.CurrentYPosition += _DefaultFontSize + _FontHeightMargin;
       commandEntered = 0;
       this.scrollhandling();
       this.textSave += "\n";
    }
    
    // store a line into outputLines
    this.storeLine = function(line) {
        this.outputLines.push(line);
    }
    
    this.scrollhandling = function () {
        // The maximum number of lines in the canvas
       var maxNumOfLines = Math.floor(_Canvas.height / (_DefaultFontSize + _FontHeightMargin))
   
                   // lines is an array where each element is each line, delimiter is /n
                   var lines = this.textSave.match(/[^\r\n]+/g);
                   if(lines.length > maxNumOfLines) {
                       console.log(lines.length);
                       // reset x,y coords and clear screen
                       this.resetXY();
                       this.clearScreen();
                       // get the amount by which to move the page
                       var difference = lines.length - maxNumOfLines;
                       // off by 1
                       difference += 1;
                       // splice between 0 and the difference
                       lines.splice(0, difference);
                       // this must be referenced inside the function, save as infunc
                       var infunc = this;
                       // reset saved text
                       this.textSave = "";
                       lines.forEach(function(line) {
                           // output the lines to the screen
                           infunc.putText(line);
                           // re-add the "\n"
                           infunc.textSave += "\n";
                           // next line
                           infunc.CurrentXPosition = 0;
                           infunc.CurrentYPosition += _DefaultFontSize + _FontHeightMargin;
                       });
                   } 

    }
    
    
    this.backspace = function(text) {
        // get the with of the text input
        var width = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
        // go back to position of beginning of letter on x-axis
        this.CurrentXPosition = this.CurrentXPosition - width;
        // get the height of the text input
        var height = (_DefaultFontSize + _FontHeightMargin) + 7;
        // starting y position, taking into account letters that go below the line
        var ypos = this.CurrentYPosition - height + 11;
        // draw over the letter
        _DrawingContext.clearRect(this.CurrentXPosition, ypos, width, height);
    }
}
