<?php
$this->set('subtitle', 'Sphere Visualizer');
$this->Html->script(array('deployJava', 'sphere'), array('block' => 'script'));
$this->Html->css('sphere', null, array('block' => 'css'));
?>

<div class="container">
	<div class="row">
		<h1>Sphere Music Visualizer</h1>
	</div>

	<div class="row" style="text-align: center">
		<div class="span12" id="sphere"></div>
	</div>

	<div class="row">
		<div class="span6 offset3">
			<p class="well">
				The song is called Progression by <a href="http://gingerbeatman.com/" target="_blank">GingerBeatMan</a>.
			</p>
		</div>
	</div>
</div>