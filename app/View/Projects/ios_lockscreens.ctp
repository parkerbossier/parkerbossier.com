<?php
$this->set('subtitle', 'iOS Lockscreens');
$this->Html->css('ios-lockscreens', null, array('block' => 'css'));
$this->Html->script('ios_lockscreens', array('block' => 'script'));
?>

<div class="row">
    <div class="span4 offset4">
        <div class="well">
            <h1 class="pagination-centered">iOS Lockscreens</h1>
        </div>
    </div>
</div>

<div class="row">
    <div class="span6">
        <div class="well same-height">
            <h2 class="pagination-centered">
                <a href="http://modmyi.com/info/minimalistmomentofsilence.d.php" target="_blank">
                    Minimalist Moment of Silence
                </a>
            </h2>
            <div class="pagination-centered">
                (Cydia link <img src="/img/external-link.png" alt="External link" class="external-link"/>)
            </div>
            <br/>
            <p class="justified">
                I was digging into some Winterboard documentation, and I learned that Winterboard allows you to make Cydia lockscreen themes with HTML, CSS, and JS. I love it. Here's a screenshot to make you want to jailbreak if you haven't yet.
            </p>
        </div>

        <div class="well">
            <img src="/img/minimalist-moment-of-silence.png" alt="Minimalist Moment of Silence" class="img-rounded"/>
        </div>
    </div>

    <div class="span6">
        <div class="well same-height">
            <h2 class="pagination-centered">
                <a href="http://modmyi.com/info/scrollingtimedatelockscreenhd.d.php" target="_blank">
                    Scrolling Time/Date
                </a>
            </h2>
            <div class="pagination-centered">
                (Cydia link <img src="/img/external-link.png" alt="External link" class="external-link"/>)
            </div>
            <br/>
            <p class="justified">
                More JS this time. The seconds bar scrolls pretty smoothly across the screen, and the other bars update accordingly.
            </p>
        </div>

        <div class="well">
            <img src="/img/scrolling-time-date-lockscreen-hd.png" alt="Scrolling Time/Date Lockscreen" class="img-rounded"/>
        </div>
    </div>
</div>