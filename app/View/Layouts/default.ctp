<!DOCTYPE html>
<head lang="en">
	<?php echo $this->Html->charset(); ?>
	
	<title>
		Parker Bossier
		<?php if (isset($subtitle)) echo ' | ' . @$subtitle; ?>
	</title>

	<meta name="viewport" content="width = device-width">
	<meta name = "viewport" content = "initial-scale = 1.0">
	<meta name="google-site-verification" content="7Y3B58eNeR5cz0zex1JR8eLZ-TNfd_7MGcQZ01BsXMI" />
	
	<?php
	echo $this->Html->meta('icon');
	echo $this->fetch('meta');

	echo $this->Html->css('bootstrap.min');
	echo $this->Html->css('main');
	echo $this->Html->css('bootstrap-responsive.min');
	echo $this->Html->css('responsive-customizations');
	echo $this->fetch('css');

	echo $this->Html->script('jquery-1.7.2');
	echo $this->Html->script('bootstrap.min');

	// tab selected
	if (isset($activeTab)) {
		?>
		<!-- selects the correct tab -->
		<script type="text/javascript">
			$(function() {
				var activeTab = '<?php echo $activeTab; ?>';
				$('.nav-tabs [data-name="' + activeTab + '"]').parent().addClass('active');
			});
		</script>
		<?php
	}

	echo $this->fetch('script');
	?>
</head>

<body>
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container my-bypass">
				<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</a>

				<a class="brand" href="/">Parker Holt Bossier</a>

				<div class="nav-collapse">
					<ul class="nav nav-tabs">
						<li><a href="/" data-name="home">Home</a></li>

						<li class="divider-vertical"></li>
						<li><a href="/portfolio" data-name="portfolio">Portfolio</a></li>
						<li><a href="/blog" target="_blank">Blog</a></li>
						<li><a href="/files/pdfs/Parker%20Bossier.pdf" target="_blank">Resume</a></li>

						<li class="divider-vertical"></li>
						<li><a href="mailto:parkerbossier@gmail.com" target="_blank">Contact</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>


	<?php echo $this->fetch('content'); ?>
</body>
</html>