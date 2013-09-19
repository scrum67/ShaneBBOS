/* ----------------------------------
   DeviceDriverKeyboard.js
   
   Requires deviceDriver.js
   
   The Kernel Keyboard Device Driver.
   ---------------------------------- */

DeviceDriverKeyboard.prototype = new DeviceDriver;  // "Inherit" from prototype DeviceDriver in deviceDriver.js.

function DeviceDriverKeyboard()                     // Add or override specific attributes and method pointers.
{
    // "subclass"-specific attributes.
    // this.buffer = "";    // TODO: Do we need this?
    // Override the base method pointers.
    this.driverEntry = krnKbdDriverEntry;
    this.isr = krnKbdDispatchKeyPress;
    // "Constructor" code.
}

function krnKbdDriverEntry()
{
    // Initialization routine for this, the kernel-mode Keyboard Device Driver.
    this.status = "loaded";
    // More?
}

function krnKbdDispatchKeyPress(params)
{
    // Parse the params.    TODO: Check that they are valid and osTrapError if not.
    var keyCode = params[0];
    var isShifted = params[1];
    krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
    var chr = "";
    // Check to see if we even want to deal with the key that was pressed.
    if ( ((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
         ((keyCode >= 97 )&& (keyCode <= 123)) )   // a..z
    {
        // Determine the character we want to display.  
        // Assume it's lowercase...
        chr = String.fromCharCode(keyCode + 32);
        // ... then check the shift key and re-adjust if necessary.
        if (isShifted)
        {
            chr = String.fromCharCode(keyCode);
        }
        // TODO: Check for caps-lock and handle as shifted if so.
        _KernelInputQueue.enqueue(chr);        
    }
    else if (keyCode == 38)
        {
            _KernelInputQueue.enqueue('UP');
        }
    else if (keyCode == 40)
        {
            _KernelInputQueue.enqueue('DOWN');
        }
    else if ( ((keyCode >= 48) && (keyCode <= 57)) ||   // digits 
               (keyCode == 32)                     ||   // space
               (keyCode == 13)                     ||   // enter
               ((keyCode >= 188) && (keyCode <= 192)) ||   // comma, dash, period, backslash, tilde
               (keyCode == 186)                    ||   // colon
               ((keyCode >= 219) && (keyCode <= 222))   // [,], \, and apstrophe
           )
    {   
        chr = String.fromCharCode(keyCode);
        // check the shift key and re-adjust if necessary.
        if (isShifted)
        {
            if ((keyCode == 49) || (keyCode >= 51) && (keyCode <= 53))  // 1,3,4,5
                chr = String.fromCharCode(keyCode - 16);                // !,#,$,%
            else if (keyCode == 50)                                     // 2
                chr = String.fromCharCode(64)                           // @
            else if (keyCode == 54)                                     // 6
                chr = String.fromCharCode(94)                           // ^
            else if (keyCode == 55)                                     // 7
                chr = String.fromCharCode(38)                           // &
            else if (keyCode == 56)                                     // 8
                chr = String.fromCharCode(42)                           // *
            else if (keyCode == 57)                                     // 9
                chr = String.fromCharCode(40)                           // (
            else if (keyCode == 48)                                     // 0
                chr = String.fromCharCode(41)                           // )
            else if (keyCode == 188)                                    // ,
                chr = String.fromCharCode(60)                           // <
            else if (keyCode == 190)                                    // .
                chr = String.fromCharCode(62)                           // >
            else if (keyCode == 191)                                    // /
                chr = String.fromCharCode(63)                           // ?
            else if (keyCode == 186)                                    // ;
                chr = String.fromCharCode(58)                           // :
            else if ((keyCode >= 219) && (keyCode <= 221))              // [,],\
                chr = String.fromCharCode(keyCode - 96)                 // {,},|
            else if (keyCode == 222)                                    // '
                chr = String.fromCharCode(34)                           // "
            else if (keyCode == 192)                                    // `
                chr = String.fromCharCode(126)                          // ~
            else if (keyCode == 189)                                    // -
                chr = String.fromCharCode(95)                           // _
        }
        else {
            
            if (keyCode == 192) 
                chr = String.fromCharCode(96)                           // `
            else if (keyCode == 189) 
                chr = String.fromCharCode(45)                           // -
            else if (keyCode == 187) 
                chr = String.fromCharCode(61)                           // =
            else if (keyCode == 219) 
                chr = String.fromCharCode(91)                           // [
            else if (keyCode == 221) 
                chr = String.fromCharCode(93)                           // ]
            else if (keyCode == 220) 
                chr = String.fromCharCode(92)                           // \
            else if (keyCode == 186) 
                chr = String.fromCharCode(59)                           // ;
            else if (keyCode == 222) 
                chr = String.fromCharCode(39)                           // '
            else if (keyCode == 188) 
                chr = String.fromCharCode(44)                           // ,
            else if (keyCode == 190) 
                chr = String.fromCharCode(46)                           // .
            else if (keyCode == 191) 
                chr = String.fromCharCode(47)                           // /
        }
        _KernelInputQueue.enqueue(chr);      
    }
    else if (keyCode == 8)
    {
           _KernelInputQueue.enqueue('bck');
    }
    else
    {
        krnTrapError("Invalid Interrupt Request. irq=" + irq + " params=[" + params + "]");
    }

    
}