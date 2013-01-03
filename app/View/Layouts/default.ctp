<!DOCTYPE html>
<html>
    <head lang="en">
        <?php echo $this->Html->charset(); ?>

        <title>
            Parker Bossier
            <?php if (isset($subtitle)) echo ' | ' . @$subtitle; ?>
        </title>

        <?php
        echo $this->Html->meta('icon');
        echo $this->fetch('meta');

        echo $this->Html->css('bootstrap.min');
        echo $this->Html->css('global');
        echo $this->Html->css('bootstrap-responsive.min');
        //echo $this->Html->css('responsive-customizations');
        echo $this->fetch('css');
        ?>
        <link href='http://fonts.googleapis.com/css?family=Monda:400,700' rel='stylesheet' type='text/css'>
        <?php
        echo $this->Html->script('jquery-1.7.2');
        echo $this->Html->script('bootstrap.min');
        echo $this->Html->script('global');
        // set active tab
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
        <div class="navbar">
            <div class="navbar-inner">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>

                <a class="brand" href="/">Parker Holt Bossier</a>

                <div class="nav-collapse">
                    <ul class="nav nav-tabs">
                        <li><a href="/" data-name="home">Home</a></li>
                        <li><a href="/portfolio" data-name="portfolio">Portfolio</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Contact <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="mailto:parkerbossier@gmail.com" target="_blank">
                                        <img src="/img/gmail-icon.png" alt="Gmail icon" class="contact-icon"/> parkerbossier
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/parkerbossier" target="_blank">
                                        <img src="/img/github-icon.png" alt="GitHub icon" class="contact-icon"/> /parkerbossier
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/parkerbossier" target="_blank">
                                        <img src="/img/twitter-icon.png" alt="Twitter icon" class="contact-icon"/> @parkerbossier
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="divider-vertical"></li>

                        <li>
                            <a href="/blog" target="_blank">
                                Blog <img src="/img/external-link.png" alt="External link" class="external-link"/>
                            </a>
                        </li>
                        <li>
                            <a href="/files/pdfs/Parker%20Bossier.pdf" target="_blank">
                                Resume <img src="/img/external-link.png" alt="External link" class="external-link"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="container">
            <?php
            // IE < 10 warning message
            if ($ie10message) {
                ?>
                <div class="row ie-alert-row">
                    <div class="span6 offset3">
                        <div class="alert">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Hey there!</strong> You're using a version of IE less than 10. You still have access to most features of this site, but it's optimized for Chrome, Firefox, Opera, and IE 10+. If something looks broken in your browser, please let me know (contact link in the nav bar).
                        </div>
                    </div>
                </div>
                <?php
            }

            // page content
            echo $this->fetch('content');
            ?>
        </div>

        <!-- Google analytics -->
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-35749496-1']);
            _gaq.push(['_trackPageview']);

            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>
    </body>
</html>