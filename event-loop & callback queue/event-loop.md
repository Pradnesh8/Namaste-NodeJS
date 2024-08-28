# Event Loop in detail

Event loop is part of libuv, which helps in performing asynchornous IO / non-blocking IO.

Main task of Event loop is :

-   To check if call stack is empty
-   To check call back queue is empty

Major there are 4 phases and 2 priority phases in Event loop execution:
Priority phase: These phase queues are checked at first, then after each phase also. And moved to Main thread/Call stack/V8 engine for execution on priority. until these queues are empty the next phase is not considered

1. process.nextTick(): Highest priority
2. Promise callbacks: Any promise which is resolved

Phases: Each phases have different queues in callback queue

1. Timer phase : setTimeout, setInterval
2. Poll phase : http,file,etc IO operations
3. Check phase : setImmediate method
4. Close phase : socket.io("close") to clean up

# NOTE: Poll phase

after first iteration of event-loop, event-loop waits at Poll phase,and continues from poll phase
Eg. Check phase will be called after poll phase(Not before priority phases😅) and not Timer phase [which is first phase]

Because:

-   To save resources: It reduces the CPU resources to keep polling tasks to do than to wait for event to occur
-   Prioritization: It allows NodeJS to handle IO oprations efficiently, giving them precedence over timers and other tasks
    By waiting, Node.js ensures that I/O-bound tasks (which are often the bottleneck in I/O-heavy applications) are handled promptly, making efficient use of the system's resources.
