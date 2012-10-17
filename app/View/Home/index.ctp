<?php
$this->set('activeTab', 'home');
$this->set('subtitle', 'Home');
$this->Html->script('home', array('block' => 'script'));
?>
<div class="card larger-font">
	<div class="row-fluid">
		<div class="span3">
			<img src="/img/profile.png" id="profile-pic" alt="Parker Bossier"/>
		</div>

		<div class="span9" id="site-intro">
			<h3>Introduction</h3>
			<p>
				A little about me and this site... I was born and raised in New Orleans, LA, and I recently arrived in Pittsburgh, PA. I'm currently working on my Masters degree in Human-Computer Interaction from Carnegie Mellon. This site hosts my portfolio, my blog, and my resume, all of which can be accessed through the navigation bar above.
			</p>
		</div>
	</div>

	<div class="row-fluid">
		<div class="span12">
			<h3>Technologies</h3>
			<ul id="breakdown">
				<li>
					Hosted on <a href="http://www.pagodabox.com/" target="_blank">PagodaBox</a> - Awesomely scalable hosting. This site is running on it now, and PlanJar ran on it back in the day (see my <a href="/portfolio#planjar">portfolio</a> for more info). They're always updating their site with new features, and they have a free tier.
				</li>

				<li>
					Powered by <a href="http://www.cakephp.org" target="_blank">CakePHP</a> - The previous iteration of this site was written in <a href="http://www.codeigniter.com" target="_blank">CodeIgniter</a>. That worked just fine, but I was working with Cake recently, and I really like the stricter MVC design pattern, so I decided a rewrite was necessary.
				</li>

				<li>
					Powered by <a href="http://twitter.github.com/bootstrap" target="_blank">Twitter Bootstrap</a> - Until this summer, I hadn't used any CSS frameworks except for jQuery's themes (which I never really liked). Then, I was introduced to Twitter Bootstrap. It makes CSS and layout design so much quicker, cleaner, and visually attractive.
				</li>

				<li>
					Powered by <a href="http://wordpress.org/" target="_blank">WordPress</a> - I finally set up my own <a href="/blog">WordPress instance</a>. Goodbye Blogger.
				</li>

				<li>
					Accelerated with <a href="http://www.cloudflare.com/" target="_blank">CloudFlare</a> - My DNS is managed with CloudFlare. Awesome interface. Awesome features.
				</li>
			</ul>
		</div>
	</div>

	<div class="row-fluid">
		<div class="span12">
			<h3>Source</h3>
			<p>
				Want more? Go check out my <a href="https://github.com/parkerbossier/" target="_blank">GitHub account</a>, and you can see the source, the WHOLE source, and nothing but the source... Amiright? It's usually pretty current, but I primarily use my (private) PagodaBox Git repo, so sometimes my GitHub might not represent the latest updates.
			</p>
		</div>
	</div>
</div>