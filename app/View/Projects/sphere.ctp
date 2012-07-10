<?php
	$this->set('active_tab_for_layout', 'sphere');
	$this->set('subtitle_for_layout', 'Sphere (Processing)');
	$this->Html->script(array('deployJava', 'sphere'), array('block' => 'script'));
	$this->Html->css('sphere', null, array('block' => 'css'));
?>

<div class="container">
	<div class="row">
		<h1 style="text-align: center;">Sphere Music Visualizer</h1>
	</div>

	<div class="row">
		<div class="span6 offset3">
			<div class="well">
				<p>
					This is my only noteworthy Processing project as of yet. It's currently unfinished, but at some point I want to make the camera fly around the visualizer spheres. I'm also waiting on JavaScript support for the libraries I'm using (as opposed to just Java support) so I can make everything more streamlined. The red, greed, and blue lines represent the x, y, and z axes, respectively. Each sphere is a left/right graphical equalizer. The length of the red, green, and blue bars represents the mean value of the signal buffer.
				</p>
				<p>
					The song is called Progression by <a href="http://gingerbeatman.com/" target="_blank">GingerBeatMan</a>.
				</p>
			</div>
		</div>
	</div>

	<div class="row" style="text-align: center">
		<div class="span12" id="sphere"></div>
	</div>
</div>