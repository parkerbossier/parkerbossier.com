<?php
$this->set('subtitle', 'Other Projects');
$this->Html->script('portfolio', array('block' => 'script'));
$this->Html->css('portfolio', null, array('block' => 'css'));
$this->Html->css('cards', null, array('block' => 'css'));
$this->Html->css('other-portfolio', null, array('block' => 'css'));
?>

<div class="row">
    <?php echo $this->element('campusair'); ?>
    <?php echo $this->element('stereopsis'); ?>
    <?php echo $this->element('sphere'); ?>
</div>

<div class="row">
    <?php echo $this->element('ios_lockscreens'); ?>
    <?php echo $this->element('turing'); ?>
    <?php echo $this->element('flash'); ?>
</div>