<?php
	$this->set('active_tab_for_layout', 'home');
	$this->set('subtitle_for_layout', 'Home');
	$this->Html->script('valign_site_intro', array('block' => 'script'));
?>
<div class="container larger-font">
	<div class="row">
		<div class="span3">
			<img src="/img/profile.jpg" id="profile-pic" alt="Parker Bossier"/>
		</div>

		<div class="span9" id="site-intro">
			<p>
				A little about me and this site... I was born and raised in New Orleans, LA, and I recently graduated from Vanderbilt University with a BS in Computer Science and Math. I'm currently in NOLA working for the summer and then moving up to Pittsburgh for a year to get a Masters in Human-Computer Interaction from the Carnegie Mellon HCII. This site hosts most of my side projects and my resume, all of which can be accessed through the navigation bar above.
			</p>
		</div>
	</div>

	<div class="row">
		<div class="span12">
			<p>Site breakdown</p>
			<ul id="breakdown">
				<li>
					Hosted on <a href="http://www.pagodabox.com/" target="_blank">PagodaBox</a> - Check it out if you're looking for awesomely scalable hosting. This site is running on it now, and PlanJar ran on it back in the day (see <a href="/projects/web">Web projects</a> for more info). They're always updating their site with new features, and they even have a free tier. Obviously, I'm a fan.
				</li>

				<li>
					Powered by <a href="http://www.cakephp.org" target="_blank">CakePHP</a> - The previous iteration of this site was written in <a href="http://www.codeigniter.com" target="_blank">CodeIgniter</a>. That worked just fine, but I was working with Cake recently, and I really like the design pattern, so I decided a rewrite was necessary.
				</li>

				<li>
					Powered by <a href="http://twitter.github.com/bootstrap" target="_blank">Twitter Bootstrap</a> - Until this summer, I hadn't used any CSS frameworks except for jQuery's themes (which I never really liked). Then, I was introduced to Twitter Bootstrap. It makes CSS/layout design so much quicker, cleaner, and visually attractive. I highly recommend it.
				</li>

				<li>
					Powered by <a href="http://wordpress.org/" target="_blank">WordPress</a> - I just set up my own WordPress instance. Goodbye Blogger.
				</li>

				<li>
					Accelerated with <a href="http://www.cloudflare.com/" target="_blank">CloudFlare</a> - My DNS is managed with CloudFlare. Awesome interface. Awesome features.
				</li>
			</ul>
			<br/>
			<br/>

			<p>
				Too cool to view source? Go check out my <a href="https://github.com/parkerbossier/" target="_blank">GitHub account</a>	and you can see the source, the WHOLE source, and nothing but the source... Amiright? It's usually pretty current, but I primarily use my (private) PagodaBox Git repo, so sometimes my GitHub "might be a little dry". (Yes, I used a South Park reference.)
			</p>
		</div>
	</div>
</div>