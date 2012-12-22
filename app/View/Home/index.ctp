<?php
$this->set('activeTab', 'home');
$this->set('subtitle', 'Home');
$this->Html->script('home', array('block' => 'script'));
$this->Html->css('home', null, array('block' => 'css'));
?>

<div class="row main">
    <div class="span4 card card-rounded">
        <a href="/blog" target="_blank" class="color-bypass">
            <div class="inner-card" data-href="/blog" data-new-tab="true">
                <div class="card-header">
                    <h2 class="no-margin-bottom">Blog</h2>
                    <div class="pagination-centered">(click to view <img src="/img/external-link.png" alt="External link" class="external-link"/>)</div>
                    <hr/>
                </div>

                <img class="card-rounded preview" src="/img/blog-preview.png" alt="Blog preview image"/>
            </div>
        </a>
    </div>
    <?php if ($webkit) { ?>
        <div class="card-shadow card-rounded"></div>
    <?php } ?>

    <div class="span4 card card-rounded profile">
        <div class="inner-card">
            <div class="card-header">
                <h2 class="no-margin-bottom">Parker Bossier</h2>
                <div class="pagination-centered">(click to read the About section)</div>
            </div>

            <img class="card-rounded preview" src="/img/profile.png" alt="Parker Bossier profile picture"/>

            <h2 class="about-header no-margin-bottom">Parker Bossier</h2>
            <div class="pagination-centered">(click to close)</div>
            <p class="about">
                A little about me and this site... I was born and raised in New Orleans, LA, and I recently arrived in Pittsburgh, PA. I'm currently working on my Masters degree in Human-Computer Interaction from Carnegie Mellon. This site hosts my portfolio, my blog, and my resume, all of which can be accessed through the navigation bar above.
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
                    <h2 class="no-margin-bottom">Portfolio</h2>
                    <div class="pagination-centered">(click to view)</div>
                </div>

                <img class="card-rounded preview" src="/img/portfolio-preview.png" alt="Portfolio preview image"/>
            </div>
        </a>
    </div>
    <?php if ($webkit) { ?>
        <div class="card-shadow card-rounded"></div>
    <?php } ?>
</div>