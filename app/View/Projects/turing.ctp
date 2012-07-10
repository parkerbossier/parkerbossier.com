<?php
	$this->set('subtitle_for_layout', 'Turing Machine');
	$this->Html->script('turing', array('block' => 'script'));
?>
<div class="container">
	<div class="row">
		<div class="span12">
			<h1 style="text-align: center;">JavaScript Turing Machine</h1>
		</div>
	</div>

	<div class="row">
		<div class="span4 offset4">
			<p style="text-align: center;">
				I took a CS course covering turing machines, and I though they were pretty cool and relatively easy to implement, so here it is.
			</p>
		</div>
	</div>

	<div class="row">
		<div class="span4 offset4">
			<div class="well">
				<label><h4>Blank symbol</h4></label>
				<input type="text" class="span1" id="blank_symbol" value="$"/>

				<label>
					<h4>Transition table</h4>
					<ul class="my-bypass">
						<li>Lines beginning with # are ignored</li>
						<li><strong>v</strong> - current state</li>
						<li><strong>w</strong> - current tape value</li>
						<li><strong>x</strong> - new state</li>
						<li><strong>y</strong> - new tape value</li>
						<li><strong>z</strong> - read advance direction (l|r)</li>
					</ul>
				</label>
				<div style="text-align: center;">
					<textarea rows="5" class="span3" id="transition_input">
#v   w   x   y   z
 q0  A   q0  B   r
 q0  B   q0  A   r</textarea>
				</div>

				<label>
					<h4>Starting tape</h4>
					<ul class="my-bypass">
						<li>The pipe character ('|') tells the machine to start at the tape value immediately to the right of the pipe</li>
						<li>If omitted, the machine starts at the first character</li>
					</ul>
				</label>
				<div style="text-align: center;">
					<input type="text" class="span3" id="tape" value="|AAAAAAABBBBBBB"/>
				</div>

				<label><h4>Iterations per second</h4></label>
				<input type="text" class="span1" id="iters_per_sec" value="6"/>

				<label><h4>Iterations completed</h4></label>
				<input type="text" class="span1" id="iterations" value="0"/>

				<hr/>
				<div class="btn" id="run">Run</div>
				<div class="btn btn-danger disabled" id="stop">Stop</div>
			</div>
		</div>
	</div>

</div>