<?php
$this->set('activeTab', 'home');
$this->set('subtitle', 'Home');
$this->Html->script('home', array('block' => 'script'));
$this->Html->css('home', null, array('block' => 'css'));
$this->Html->css('cards', null, array('block' => 'css'));
?>

<div class="row card-row">
    <div class="span4 card card-rounded">
        <a href="/blog" target="_blank" class="color-bypass">
            <div class="inner-card" data-href="/blog" data-new-tab="true">
                <div class="card-header">
                    <h2>Blog</h2>
                    <div class="card-click-to-view">(click to view <img src="/img/external-link.png" alt="External link" class="external-link"/>)</div>
                </div>

                <img class="card-rounded card-preview" src="/img/blog-preview.png" alt="Blog preview image"/>
            </div>
        </a>
    </div>

    <?php if ($webkit) { ?>
        <div class="card-shadow card-rounded"></div>
    <?php } ?>

    <div class="span4 card card-rounded profile">
        <div class="inner-card">
            <img class="card-rounded card-preview" src="/img/profile.png" alt="Parker Bossier profile picture"/>

            <div class="card-header">
                <h2>Parker Bossier</h2>
                <h4 class="subheading">User Interface Designer</h4>
            </div>

            <p class="description">
                A little about me and this site&hellip; I was born and raised in New Orleans, LA, and I recently arrived in Pittsburgh, PA. I graduated from Vanderbilt University in May 2012 with a BS in computer science and math, and I'm currently working on my Masters of Human-Computer Interaction degree from Carnegie Mellon. This site hosts my portfolio, my blog, and my resume, all of which can be accessed through the navigation bar above.
            </p>
        </div>
    </div>

    <?php if ($webkit) { ?>
        <div class="card-shadow card-rounded"></div>
    <?php } ?>

    <div class="span4 card card-rounded">
        <a href="/portfolio" class="color-bypass">
            <div class="inner-card" data-href="/portfolio">
                <div class="card-header">
                    <h2>Portfolio</h2>
                    <div class="card-click-to-view">(click to view)</div>
                </div>

                <img class="card-rounded card-preview" src="/img/portfolio-preview.png" alt="Portfolio preview image"/>
            </div>
        </a>
    </div>

    <?php if ($webkit) { ?>
        <div class="card-shadow card-rounded"></div>
    <?php } ?>
</div>