<?php
$this->set('activeTab', 'portfolio');
$this->Html->script('portfolio', array('block' => 'script'));
$this->Html->script('turing', array('block' => 'script'));
$this->Html->css('portfolio', null, array('block' => 'css'));
?>
<div class="container">
	<div class="row">
		<div class="span2">
			<ul class="nav nav-pills nav-stacked">
				<li class="disabled"><a href="#" data-name="archdata">acrhDATA (coming soon)</a></li>
				<li class="active"><a href="#planjar" data-name="planjar">PlanJar</a></li>
				<li><a href="#volnado" data-name="volnado">Volnado</a></li>
				<li><a href="#campusair" data-name="campusair">theCampusAir</a></li>
				<li><a href="#sphere" data-name="sphere">Sphere Visualizer</a></li>
				<li><a href="#stereopsis" data-name="stereopsis">Depth From Stereopsis</a></li>
				<li><a href="#turing" data-name="turing">JavaScript Turing Machine</a></li>
				<li><a href="#ios" data-name="ios">iOS Lockscreens</a></li>
				<li><a href="#flash" data-name="flash">Flash</a></li>
			</ul>
		</div>

		<div id="content-container" class="span10 larger-font">
			<?php echo $this->element('planjar'); ?>
			<?php echo $this->element('volnado'); ?>
			<?php echo $this->element('sphere'); ?>
			<?php echo $this->element('stereopsis'); ?>
			<?php echo $this->element('campusair'); ?>
			<?php echo $this->element('ios'); ?>
			<?php echo $this->element('turing'); ?>
			<?php echo $this->element('flash'); ?>
		</div>
	</div>
</div>