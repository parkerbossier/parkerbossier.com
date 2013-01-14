<?php
$this->set('subtitle', 'Half Baked');
$this->Html->css('half-baked', null, array('block' => 'css'));
$this->Html->script('half-baked', array('block' => 'script'));
?>

<div class="row">
    <div class="span4 offset2">
        <p class="well">
            <strong>Half Baked</strong> is my Interaction Design Fundamentals group final project. Below is an iPad simulation our finished proof-of-concept deliverable.
        </p>
    </div>

    <div class="span4">
        <p class="well">
            <strong>How to use</strong>
            <br/>You can interact with the simulator just as you would with a real iPad. <span class="hidden-desktop">Mobile (touch) users, you will most likely encounter trouble with this simulator, as it relies on your screen being un-scrollable. I am working on this issue, and it will be resolved shortly. </span><strong>Click and drag</strong> to move the content around (the two recipes), and simply <strong>click</strong> on buttons and navigation items (like Polaroid thumbnails and Nutella buttons) to use them. You can also click on the <strong>clock</strong> to scroll to the top. Note that the only completed recipes are "Speak no see no cookies" and "Hot, sweet, and sticky".
        </p>
    </div>
</div>

<div class="row loading">
    <div class="span4 offset4 alert alert-success">
        The iPad simulation is loading. This can take a while (~15MB download)...
    </div>
</div>

<div class="row simulator" style="display: none;">
    <div class="span12">
        <img src="/img/ipad-template.png" alt="iPad template" class="ipad"/>
        <div class="clock"></div>
        <div class="screen">
            <div class="touch"></div>
            <img src="/img/half-baked-toc.png" alt="Half Baked table of contents" class="toc"/>
            <img src="/img/half-baked-recipe-1.png" alt="Half Baked recipe 1" class="recipe-1"/>
            <div class="recipe-2-preview"></div>
            <img src="/img/half-baked-recipe-2.png" alt="Half Baked recipe 2" class="recipe-2"/>
            <img src="/img/half-baked-fridge.png" alt="Half Baked fridge" class="fridge"/>
        </div>
    </div>
</div>