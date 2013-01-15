<?php
$this->set('subtitle', 'Half Baked');
$this->Html->css('half-baked', null, array('block' => 'css'));
$this->Html->script('half-baked', array('block' => 'script'));
?>

<div class="row">
    <div class="span5 offset1">
        <div class="well same-height">
            <h3>Description</h3>

            <p class="justified">
                <strong>Half Baked</strong> is my Interaction Design Fundamentals final group project. The concept's main influence started as a "mainstreamification" of <a href="http://en.wikipedia.org/wiki/Wet_and_messy_fetishism" target="_blank">sploshing (NSFW wiki link) <img src="/img/external-link.png" alt="External link" class="external-link"/></a>. We evolved this concept to become a light-hearted approach to cooking with pictures of the cooking process as centerpieces. These pictures don't look like professional photographs (except for the stock photos we used as place-holders). Instead, they depict the messy aspects of cooking &mdash; bowls overflowing, flour spilled everywhere, sticky fingers. We placed the recipes at the bottom of each cooking adventure so as to make the user experience each recipe before seeing the actual steps and ingredients involved. Below is an iPad simulation our finished proof-of-concept deliverable.
            </p>
        </div>
    </div>

    <div class="span5">
        <div class="well same-height justified">
            <h3>Instructions</h3>

            <p>
                You can interact with the simulator just as you would with an iPad. <span class="hidden-desktop">Mobile (touch) users, you will most likely encounter trouble with this simulator, as it relies on your screen being un-scrollable. I am working on this issue, and it will be resolved shortly.</span>
            </p>

            <ul>
                <li>
                    Click and drag to move the content around (the two recipes)
                </li>
                <li>
                    Click on buttons and navigation items (like Polaroid thumbnails and Nutella buttons) to use them
                </li>
                <li>
                    You can click on the clock to scroll to the top
                </li>
            </ul>
            <br/>

            <p>
                <strong>Note</strong>
                <br/>The only completed recipes are "Speak no see no cookies" and "Hot, sweet, and sticky".
            </p>
        </div>
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