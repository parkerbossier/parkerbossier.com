<?php
$this->set('subtitle', 'Other Projects');
$this->Html->script('portfolio', array('block' => 'script'));
$this->Html->css('portfolio', null, array('block' => 'css'));
$this->Html->css('cards', null, array('block' => 'css'));

// campusair, flash, ios (2), sphere, stereopsis, turing

// campusair, stereopsis, sphere, ios 1, ios 2, 
?>

<div class="row">
    <?php echo $this->element('campusair'); ?>
    <?php echo $this->element('flash'); ?>
    <?php echo $this->element('planjar'); ?>
</div>

<div class="row">
    <?php echo $this->element('volnado'); ?>
    <?php echo $this->element('half-baked'); ?>
    <?php echo $this->element('other-stuff'); ?>
</div>