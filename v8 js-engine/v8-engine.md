# Google's V8 JS engine

NodeJS uses V8 JS engine, it is most critical component in node JS architecture.

-   How it works :

1. Parsing: It parses the code, in following phases
   A. Tokenization - code is converted to tokens
   B. Syntax analysis - tokens are converted to AST (Abstract Syntax Tree)
   To visualize AST's - astexplorer.net
2. Ignition interpretter - Interprets the code and converts it into Byte code, which then passed to get executed.
3. TurboFan compiler - It is used to optimize the code interpreted, so that when similar code is encountered, it can executes faster. It converts the code to optimised machine code, which then passed to get executed.
   It makes assumptions. Eg. sum(1,2) sum(2,3)_ sum(3,4)_ function with stars will be executed faster, but when sum("a","b") comes up it deoptimizes and then code executed using ignition -> bytecode -> execute.
4. Execution - Final phase where byte code / machine code is executed.
5. Garbage collector - While all above processes are running, garbage collector runs parallelly.
   It uses scavneger, oilFan, orinoco garbage collector, It uses Mark & sweep algorithm.

All above steps combinly is JIT compilation.

NodeJS utilizes both interpretter and compiler. which is called JIT (Just In Time) compilation
