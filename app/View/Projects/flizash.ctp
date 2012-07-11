<?php
	$this->set('active_tab_for_layout', 'flash');
	$this->set('subtitle_for_layout', 'Flash Projects');
	$this->Html->css('flash', null, array('block' => 'css'));

	// return flash tags for the specified swf
	function flash_tags($index) {
		// sizes and names of SWFs
		$flash_array = array(
			array(550, 400, 'Curving%20Balls.swf'),
			array(450, 500, 'Fifteen%20Puzzle.swf'),
			array(550, 400, 'Binary%20Clock.swf'),
			array(550, 400, 'Clock%20Tick.swf'),
			array(550, 400, 'Fractal.swf'),
			array(550, 450, 'Guess-Word.swf')
		);

		if ($index == 0) $style = 'style="background-color: black;"';

		ob_start();
		?>
		<embed
			src="/files/flash/<?php echo $flash_array[$index][2]; ?>"
			width="<?php echo $flash_array[$index][0]; ?>"
			height="<?php echo $flash_array[$index][1]; ?>"
			type="application/x-shockwave-flash"
			wmode="transparent"
			<?php if (isset($style)) echo $style; ?>/>
			<?php
			return ob_get_clean();
		}
	?>

<div class="container">
	<div class="row">
		<h1>Flash Projects</h1>
	</div>

	<div class="row">
		<div class="span12">
			<div class="well">
				<p>
					Ahhh Flash. I took a summer course on Flash MX (if I remember correctly) at Stanford a long while back. Of course, now everything's in HTML/JS, but those were exciting times. The Flash IDE was the second IDE I'd ever used, actually - second to Blodshed Dev-C++ (yes I think I just dated myself).
				</p>
			</div>
		</div>
	</div>

	<div class="row">

		<div class="span3">
			<div class="well">
				<h2>Curving Balls</h2>
				I originally made this simple app as a screensaver. Mainly I was just testing out how to use ActionScript classes (for the balls). Drag the slider up and down to control the ball birth rate. The balls automatically die after a few seconds.
			</div>
		</div>

		<div class="span9">
			<?php echo flash_tags(0); ?>
		</div>
	</div>

	<div class="row">
		<div class="span3">
			<div class="well">
				<h2>Fifteen Puzzle</h2>
				Just a simple version of the classic fifteen puzzle. Click "shuffle" to randomize the board. Click a tile adjacent to an empty space to move the tile there. There's no scoring system, so congrats! You have 1,000,000 points.
			</div>
		</div>

		<div class="span9">
			<?php echo flash_tags(1); ?>
		</div>
	</div>

	<div class="row">
		<div class="span3">
			<div class="well">
				<h2>Binary Clock</h2>
				A very straight-forward binary clock. I went through a phase when I though everything binary was simply awesome. Hence this app.
			</div>
		</div>

		<div class="span9">
			<?php echo flash_tags(2); ?>
		</div>
	</div>

	<div class="row">
		<div class="span3">
			<div class="well">
				<h2>Clock Tick</h2>
				A simple analog clock that used to be my screensaver.
			</div>
		</div>

		<div class="span9">
			<?php echo flash_tags(3); ?>
		</div>
	</div>

	<div class="row">
		<div class="span3">
			<div class="well">
				<h2>Fractal Generator</h2>
				I made this app when I first learned about fractals. Use the on-screen controls to create a base segment. After you're finished, select a turn direction (dictates the angle that the next segment will start). When you're ready, click "Create Fractal." To iterate the fractal after it's drawn, press space. NOTE: iterating more than ~3 times will cause a MASSIVE performance hit.
			</div>
		</div>

		<div class="span9">
			<?php echo flash_tags(4); ?>
		</div>
	</div>

	<div class="row">
		<div class="span3">
			<div class="well">
				<h2>Guess-Word</h2>
				This was my first attempt at a word game. I probably wrote this 4 or 5 years ago, so keep that in mind when playing it.
			</div>
		</div>

		<div class="span9">
			<?php echo flash_tags(5); ?>
		</div>
	</div>

</div>