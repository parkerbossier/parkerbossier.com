<!DOCTYPE html>

<html lang="en">
    <head>
        <title>
            Parker Bossier | Turing Machine
        </title>

        <!-- CSS -->
        <link rel="stylesheet" type="text/css" href="/assets/css/turing.css"/>

        <!-- jQuery and jQuery UI -->
        <script type="text/javascript" src="/assets/js/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="/assets/js/jquery-ui-1.8.16.min.js"></script>

        <!-- JS includes -->
        <script type="text/javascript" src="/assets/js/turing.js"></script>
    </head>

    <body>
        <div id="wrapper">
            <h1>A Javascript Turing Machine</h1>

            <p>
                I took a CS course covering turing machines, and I though they were pretty cool and relatively
                easy to implement, so here it is.
            </p>

            <p><b>Instructions:</b></p>
            <ul>
                <li>
                    (1) Enter the desired blank symbol (the default is already populated).
                </li>
                <li>
                    (2) Each line you enter in the input box represents a state transition definition.
                </li>
                <li>
                    (3) Values should be delimited by spaces and lines by returns.
                </li>
                <li>
                    (4) Enter the desired number of iterations per second.
                </li>
                <li>
                    (5) Enter the desired start tape.
                </li>
                <li>
                    (6) Run!
                </li>
            </ul>
            <br/>

            <label for="blank_symbol">Blank symbol</label>
            <input type="text" id="blank_symbol" value="$"/>
            <br/>

            <label for="iters_per_sec">Iterations per second</label>
            <input type="text" id="iters_per_sec" value="6"/>
            <br/><br/>

            <label for="transition_input">Transition entry format:
                <b>currentState currentInput newState replacementValue advanceDirection(l|r)</b>
                <br/>Note that the first currentState will be used as the start state. (Debug tip: line numbers are 0-based.)
            </label>
            <br/>
            <textarea id="transition_input" cols="30" rows="5">
q0 A q0 B r
q0 B q0 A r</textarea>
            <br/><br/>

            <label for="tape">Tape</label>
            <input type="text" id="tape" value="AAAAAAABBBBBBB"/>
            <button id="run">Run</button>
            <br/>

            <label for="iterations">Iterations</label>
            <input type="text" id="iterations" value="0"/>
        </div>
    </body>
</html>