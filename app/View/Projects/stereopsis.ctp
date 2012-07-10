<?php
	$this->set('active_tab_for_layout', 'stereopsis');
	$this->set('subtitle_for_layout', 'Stereopsis (Matlab)');
?>

<div class="container">
	<div class="row">
		<h1 style="text-align: center">Stereopsis | A Matlab Project</h1>
	</div>

	<div class="row">
		<div class="span6 offset3">
			<div class="well">
				<p>
					This <a href="/pdfs/Computer%20Vision%20Final%20Project.pdf" target="_blank">PDF</a> is the write-up of my final project in computer vision at Vanderbilt. In a nutshell, it uses Matlab and depth-through-stereopsis techniques to zoom a Firefox window based on the distance of my head to the screen. Below is the introduction.
				</p>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="span8 offset2">
			<blockquote>
				<p>
					This paper describes the approach and results of a Matlab program, face_zoom.m, which changes the zoom setting within a Firefox browser based on my distance from the screen. Note that this program uses an already-captured video as its input as opposed to a live stream. To accomplish this task, two Logitech webcams were affixed to the monitor about five inches apart and as coplanar as possible. A 2x2” blue paper square was attached to the user’s forehead to serve as a tracker. The per-frame change in depth of the marker (computed with stereopsis as described later) was used to scale the browser window so as to assure a relatively constant apparent text size. All Matlab code can be found in the appendix at the end of this document.
				</p>
			</blockquote>
		</div>
	</div>
</div>