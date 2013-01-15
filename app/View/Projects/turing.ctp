<?php
$this->set('subtitle', 'Turing machine');
$this->Html->script(array('turing'), array('block' => 'script'));
$this->Html->css('turing', null, array('block' => 'css'));
?>

<div class="turing content-item">
    <div class="row-fluid centered-text">
        <h2>Turing Machine</h2>
    </div>



    <div class="row-fluid">
        <div class="span10 offset1">
            <p>
                I took an automata course in undergrad where we covered Turing machines among the various automatons we studied. I thought the concept was pretty interesting and relatively easy to implement, so I created a JavaScript version of one. There are no formal accept states. Instead, upon termination, the app alerts the final state. I did it this way to keep the app simple.
            </p>
        </div>
    </div>

    <br/>

    <div class="row-fluid">
        <div class="span4 offset4">
            <table class="table table-striped table-bordered">
                <tr>
                    <td>
                        <label>Transition table</label>
                        <ul>
                            <li>Lines beginning with # are ignored</li>
                            <li><strong>v</strong> - current state</li>
                            <li><strong>w</strong> - current tape value</li>
                            <li><strong>x</strong> - new state</li>
                            <li><strong>y</strong> - new tape value</li>
                            <li><strong>z</strong> - read advance direction (l | r)</li>
                        </ul>

                        <div style="text-align: center;">
                            <textarea rows="5" id="transition_input">
#v   w   x   y   z
 q0  A   q0  B   r
 q0  B   q0  A   r</textarea>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Blank symbol</label>
                        <div class="text-input-wrapper">
                            <input type="text" id="blank_symbol" value="$"/>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Iterations per second</label>
                        <div class="text-input-wrapper">
                            <input type="text" id="iters_per_sec" value="6">
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Starting tape</label>
                        <ul>
                            <li>The pipe character ('|') tells the machine to start at the tape value immediately to the right of the pipe</li>
                            <li>If omitted, the machine starts at the first character</li>
                        </ul>
                        <div class="text-input-wrapper">
                            <input type="text" id="tape" value="|AAAAAAABBBBBBB"/>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Iterations completed</label>
                        <div class="text-input-wrapper">
                            <input type="text" id="iterations" value="0"/>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div class="btn" id="run">Run</div>
                        <div class="btn btn-danger disabled" id="stop">Stop</div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>