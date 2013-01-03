<?php
$this->set('activeTab', 'portfolio');
$this->set('subtitle', 'Portfolio');
$this->Html->script('portfolio', array('block' => 'script'));
$this->Html->css('portfolio', null, array('block' => 'css'));
$this->Html->css('cards', null, array('block' => 'css'));
?>

<div class="row">
    <?php echo $this->element('archdata'); ?>
    <?php echo $this->element('semi-charmed'); ?>
    <?php echo $this->element('planjar'); ?>
</div>

<div class="row">
    <?php echo $this->element('volnado'); ?>
    <?php echo $this->element('half-baked'); ?>
    <?php echo $this->element('other-stuff'); ?>
</div>