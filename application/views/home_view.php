<!DOCTYPE html>

<html>
    <head>
        <title>
            Parker Bossier
        </title>

        <!-- meta -->
        <meta http-equiv="content-language" content="en">

        <!-- CSS -->
        <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/home.css'); ?>"></link>

        <!-- jQuery and jQuery UI -->
        <script type="text/javascript" src="<?php echo base_url('assets/js/jquery-1.7.1.min.js'); ?>"></script>
        <script type="text/javascript" src="<?php echo base_url('assets/js/jquery-ui-1.8.16.min.js'); ?>"></script>

        <!-- Capture the base_url from CI -->
        <script type="text/javascript">
            var base_url = '<?php echo base_url(); ?>';
        </script>

        <!-- Main JS include -->
        <script type="text/javascript" src="<?php echo base_url('assets/js/home.js'); ?>"></script>
    </head>

    <body>
        <div id="top_bar">
            <div id="contact_info">
                Contact me at <i>parkerbossier</i> -at- <i>gmail</i> -dot- <i>com</i>.
            </div>
        </div>

        <div id="wrapper">
            <div id="title_and_nav">
                <div id="title_dropdown">parkerbossier</div>

                <ul id="nav_bar">
                    <li id="about_me_link" class="nav_button selected" page="#about_me_page">
                        About me
                    </li>
                    <li id="processing_link" class="nav_button" page="#processing_page">
                        Processing
                    </li>
                    <li id="flash_link" class="nav_button" page="#flash_page">
                        Flash
                    </li>
                </ul>
            </div>

            <div id="page_wrapper">
                <div id="about_me_page" class="page">
                    <div id="welcome_wrapper">
                        <div id="my_picture">
                            <img src="/assets/images/profile.jpg" alt="Parker Bossier"/>
                        </div>

                        <div id="welcome_text">
                            Welcome to parkerbossier.com
                        </div>
                    </div>

                    <div id="about_me_text">
                        <p>
                            About little about me and this site... I was born and raised in New Orleans, LA, and I'm currently a senior at Vanderbilt University
                            studying Computer Science and Math. I've worked on <a href="http://www.planjar.com/">PlanJar</a> and
                            <a href="http://studentorgs.vanderbilt.edu/vsvs/">VSVS</a> recently, and this site serves mainly as a repository for my side projects.
                            FYI, I've been using <a href="http://www.pagodabox.com/">PagodaBox</a> for my hosting, and it's a great platform. Check it out if
                            you're looking for some scalable hosting.
                        </p>

                        <p>
                            Head over to my blog at <a href="http://parkerbossier.blogspot.com/">Blogger</a>. Also, feel free to contact me at <i>parkerbossier</i> -at- <i>gmail</i> -dot- <i>com</i>.
                            P.S. When does the narwhal bacon? <a href="http://reddit.com/">reddit</a>.
                        </p>
                    </div>
                </div>

                <div id="processing_page" style="display: none;" class="page" setup_func="processing_page_setup">
                    <p>
                        This applet is still a work in progress, but the fundamentals are there. The red, greed, and blue lines represent the x, y, and z axes, respectively.
                        Each sphere is a left/right graphical equalizer. The length of the red, green, and blue bars represents the mean value of the signal buffer.
                        I plan on making the camera rotate around the scene and having the spheres rotate to the beat. If you check out the source code, some of the camera
                        functionality is already there. I just need to flesh it out more when I have the time.

                        <script type="text/javascript" src="http://www.java.com/js/deployJava.js"></script>
                    </p>

                    <div id="sphere_container"></div>
                </div>

                <div id="flash_page" style="display: none;" class="page">
                    <p>I haven't used Flash in a long time, but here are some of the projects I still have laying around...</p>
                    <hr/>

                    <p>
                        <b>Curving balls.</b> I originally made this simple Flash app as a screensaver. Mainly I was just testing out how to use
                        ActionScript classes (for the balls). Drag the slider up and down to control the ball birth rate. The balls automatically die
                        after a few seconds.
                    </p>

                    <!-- Markup to embed a SWF -->
                    <div id="curving_balls_wrapper">
                        <OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" WIDTH=550 HEIGHT=400>
                            <PARAM NAME=movie VALUE="http://parkerbossier.com/assets/flash/Curving Balls.swf">
                            <PARAM NAME=quality VALUE=best> <PARAM NAME=wmode VALUE=>
                            <PARAM NAME=bgcolor VALUE=#000000>
                            <EMBED src="http://parkerbossier.com/assets/flash/Curving Balls.swf" quality=best bgcolor=#000000 WIDTH=550 HEIGHT=400 TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">
                            </EMBED>
                        </OBJECT>
                    </div>
                    <hr/>

                    <p>
                        <b>Fifteen puzzle.</b> Just a simple version of the classic fifteen puzzle. Click shuffle to randomize the board.
                        Click a tile adjacent to an empty space to move the tile there. There's no scoring system, so congrats! You have
                        1,000,000 points.
                    </p>

                    <!-- Markup to embed a SWF -->
                    <div id="fifteen_puzzle_wrapper">
                        <OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" WIDTH=450 HEIGHT=500>
                            <PARAM NAME=movie VALUE="http://parkerbossier.com/assets/flash/Fifteen Puzzle.swf">
                            <PARAM NAME=quality VALUE=best> <PARAM NAME=wmode VALUE=>
                            <PARAM NAME=bgcolor VALUE=#FFFFFF>
                            <EMBED src="http://parkerbossier.com/assets/flash/Fifteen Puzzle.swf" quality=best bgcolor=#FFFFF WIDTH=450 HEIGHT=500 TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">
                            </EMBED>
                        </OBJECT>
                    </div>
                    <hr/>

                    <p>
                        <b>Binary clock.</b> A very straight-forward binary clock. I went through a phase when I though everything binary was simply
                        awesome. Hence this app.
                    </p>

                    <!-- Markup to embed a SWF -->
                    <div id="flash_wrapper">
                        <OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" WIDTH=550 HEIGHT=400>
                            <PARAM NAME=movie VALUE="http://parkerbossier.com/assets/flash/Binary Clock.swf">
                            <PARAM NAME=quality VALUE=best> <PARAM NAME=wmode VALUE=>
                            <PARAM NAME=bgcolor VALUE=#FFFFFF>
                            <EMBED src="http://parkerbossier.com/assets/flash/Binary Clock.swf" quality=best bgcolor=#FFFFF WIDTH=550 HEIGHT="400 "TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">
                            </EMBED>
                        </OBJECT>
                    </div>
                    <hr/>

                    <p>
                        <b>Clock tick.</b> A simple analog clock that used to be my screensaver.
                    </p>

                    <!-- Markup to embed a SWF -->
                    <div id="flash_wrapper">
                        <OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" WIDTH=550 HEIGHT=400>
                            <PARAM NAME=movie VALUE="http://parkerbossier.com/assets/flash/Clock Tick.swf">
                            <PARAM NAME=quality VALUE=best> <PARAM NAME=wmode VALUE=>
                            <PARAM NAME=bgcolor VALUE=#FFFFFF>
                            <EMBED src="http://parkerbossier.com/assets/flash/Clock Tick.swf" quality=best bgcolor=#FFFFF WIDTH=550 HEIGHT="400 "TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">
                            </EMBED>
                        </OBJECT>
                    </div>
                    <hr/>

                    <p>
                        <b>Fractal generator.</b> I made this app when I first learned about fractals. Use the on-screen controls to
                        create a base segment. After you're finished, select a turn direction (dictates the angle that the next segment
                        will start). When you're ready, click "Create Fractal." To iterate the fractal after it's drawn, press space. NOTE:
                        iterating more than ~3 times will cause a MASSIVE performance hit.
                    </p>

                    <!-- Markup to embed a SWF -->
                    <div id="flash_wrapper">
                        <OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" WIDTH=550 HEIGHT=400>
                            <PARAM NAME=movie VALUE="http://parkerbossier.com/assets/flash/Fractal.swf">
                            <PARAM NAME=quality VALUE=best> <PARAM NAME=wmode VALUE=>
                            <PARAM NAME=bgcolor VALUE=#FFFFFF>
                            <EMBED src="http://parkerbossier.com/assets/flash/Fractal.swf" quality=best bgcolor=#FFFFF WIDTH=550 HEIGHT="400 "TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">
                            </EMBED>
                        </OBJECT>
                    </div>
                    <hr/>

                    <p>
                        <b>Guess-Word.</b> This was my first attempt at a word game. I probably wrote this 4 or 5 years ago, so keep that in mind when playing it.
                    </p>

                    <!-- Markup to embed a SWF -->
                    <div id="flash_wrapper">
                        <OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" WIDTH=550 HEIGHT=450>
                            <PARAM NAME=movie VALUE="http://parkerbossier.com/assets/flash/Guess-Word.swf">
                            <PARAM NAME=quality VALUE=best> <PARAM NAME=wmode VALUE=>
                            <PARAM NAME=bgcolor VALUE=#FFFFFF>
                            <EMBED src="http://parkerbossier.com/assets/flash/Guess-Word.swf" quality=best bgcolor=#FFFFF WIDTH=550 HEIGHT="450 "TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">
                            </EMBED>
                        </OBJECT>
                    </div>

                </div>
            </div>
    </body>
</html>