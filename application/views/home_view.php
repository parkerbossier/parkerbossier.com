<?php
$flash_array = array(
    array(550, 400, 'Curving%20Balls.swf'),
    array(450, 500, 'Fifteen%20Puzzle.swf'),
    array(550, 400, 'Binary%20Clock.swf'),
    array(550, 400, 'Clock%20Tick.swf'),
    array(550, 400, 'Fractal.swf'),
    array(550, 450, 'Guess-Word.swf')
);

// return flash tags for the swf's
function flash_tags($index, &$flash_array) {
    ob_start();
    ?>
    <embed
        src="/assets/flash/<?php echo $flash_array[$index][2]; ?>"
        width="<?php echo $flash_array[$index][0]; ?>"
        height="<?php echo $flash_array[$index][1]; ?>"
        type="application/x-shockwave-flash" />
        <?php
        return ob_get_clean();
    }
    ?>

<!DOCTYPE html>

<html lang="en">
    <head>
        <title>
            Parker Bossier
        </title>

        <!-- CSS -->
        <link rel="stylesheet" type="text/css" href="/assets/css/home.css"/>

        <!-- jQuery and jQuery UI -->
        <script type="text/javascript" src="/assets/js/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="/assets/js/jquery-ui-1.8.16.min.js"></script>

        <!-- JS includes -->
        <script type="text/javascript" src="/assets/js/deployJava.js"></script>
        <script type="text/javascript" src="/assets/js/home.js"></script>
    </head>

    <body>
        <div id="wrapper">
            <div id="top_bar">
                <div id="contact_info">
                    Contact me at <i>parkerbossier</i> -at- <i>gmail</i> -dot- <i>com</i>.
                </div>
            </div>

            <!-- nav bar -->
            <ul id="nav_bar">
                <li class="nav_button selected" id="parkerbossier_nav" data-content="#parkerbossier">
                    parkerbossier
                </li>

                <li class="nav_button" id="projects_nav" data-content="#project_bar">
                    Projects
                </li>

                <li class="nav_button" id="resume_nav" data-link="/assets/pdfs/resume.pdf">
                    Resume
                </li>
            </ul>

            <!-- projects nav bar -->
            <ul id="project_bar">
                <li class="nav_button" data-content="#web">
                    Web
                </li>

                <li class="nav_button" data-content="#ios">
                    iOS
                </li>

                <li class="nav_button" data-content="#processing">
                    Processing
                </li>

                <li class="nav_button" data-content="#flash">
                    Flash
                </li>
            </ul>

            <!-- content pages -->
            <div id="content_wrapper">

                <!-- home -->
                <div id="parkerbossier" class="content" style="display: block;">
                    <h1>Welcome to parkerbossier.com</h1>

                    <img id="my_picture" src="/assets/images/profile.jpg" alt="Parker Bossier"/>

                    <div id="about_me_text">
                        <p>
                            A little about me and this site... I was born and raised in New Orleans, LA, and I recently graduated
                            Vanderbilt University with a BS in Computer Science and Math. This site hosts most of my side projects
                            and my resume, both of which can be accessed through the navigation bar above. FYI, I've been using
                            <a href="http://www.pagodabox.com/" target="_blank">PagodaBox</a> for my hosting, and it's a great
                            platform. Check it out if you're looking for some awesomely scalable PHP hosting.
                        </p>
                        <br/>

                        <p>
                            Head over to my blog on <a href="http://parkerbossier.blogspot.com/" target="_blank">Blogger</a>.
                            I'll eventually be making my own blog on this site, but Blogger is just too easy for now...
                            SPOILER: I'm not too active on Blogger.
                        </p>
                        <br/>

                        <p>
                            Too cool to view source? Go check out my <a href="https://github.com/parkerbossier/" target="_blank">GitHub account</a>,
                            and you can see the source, the WHOLE source, and nothing but the source... Amiright? It's usually
                            pretty current, but I primarily use my (private) PagodaBox Git repo, so sometimes my GitHub may be a little stale.
                        </p>
                    </div>
                </div>

                <!-- projects -->
                <div id="web" class="content">
                    <h1>Web Projects</h1>

                    <h2><a href="http://demo.planjar.com/" target="_blank">PlanJar</a></h2>
                    <p>
                        I co-wrote PlanJar with <a href="http://wellsjohnston.com/" target="_blank">Wells Johnston</a> during the summer
                        of 2011. It's since closed down, but there is a demo available to see the splash page (contact me for login information).
                    </p>

                    <h2><a href="http://thecampusair.com/" target="_blank">thecampusair</a></h2>
                    <p>
                        Another side project/networks final project written by <a href="http://wellsjohnston.com/" target="_blank">Wells Johnston</a>
                        and myself. We launched it as sort of a minimum viable product, and we plan to update it in the semi-near future (i.e.
                        a better mobile view and functionality to allow any college to have its own page instead of just Vanderbilt).
                    </p>

                    <h2><a href="/turing/" target="_blank">Turing machine</a></h2>
                    <p>
                        This is a simple Turing machine emulator I made with Javascript. Don't get me wrong, deterministic finite automata
                        are cool and all, but Turing machines can actually do things :D. Along those lines, there are no formal accept
                        states. Instead, upon termination, the app outputs the final state. This decision was purely to keep the app simple.
                    </p>
                </div>

                <!-- ios -->
                <div id="ios" class="content">
                    <h1>iOS Projects</h1>

                    <h2><a href="http://modmyi.com/info/minimalistmomentofsilence.d.php" target="_blank">Minimalist Moment of Silence</a></h2>

                    <p>
                        NOTE: animated screenshot coming soon.<br/><br/>
                        So I found out that Winterboard allows you to make Cydia lockscreen themes with HTML, CSS, and JS.
                        I love it. Here's a screenshot to make you want to jailbreak if you haven't yet.
                    </p>

                    <div style="text-align: center;">
                        <img src="/assets/images/Minimalist%20Moment%20of%20Silence.png" alt="Minimalist Moment of Silence.png"/>
                    </div>

                    <h2><a href="http://modmyi.com/info/scrollingtimedatelockscreenhd.d.php" target="_blank">Scrolling Time/Date Lockscreen</a></h2>
                    <p>
                        NOTE: animated screenshot coming soon.<br/><br/>
                        More JS this time. The seconds bar scrolls pretty smoothly across the screen, and the other bars update accordingly.
                    </p>

                    <div style="text-align: center">
                        <img src="/assets/images/Scrolling%20Time-Date%20Lockscreen%20HD.png" alt="Scrolling Time-Date Lockscreen HD.png"/>
                    </div>
                </div>

                <!-- processing -->
                <div id="processing" class="content">
                    <h1>Processing Projects</h1>

                    <h2><a href="/sphere" target="_blank">Sphere Visualizer</a></h2>

                    <p>
                        This is my only noteworthy Processing project as of yet. It's currently unfinished, but at some point I want to
                        make the camera fly around the visualizer spheres. I'm also waiting on Javascript support for the libraries I'm
                        using (as opposed to just Java support) so I can make everything more streamlined. The red, greed, and blue
                        lines represent the x, y, and z axes, respectively. Each sphere is a left/right graphical equalizer. The length of
                        the red, green, and blue bars represents the mean value of the signal buffer.
                    </p>
                </div>

                <!-- flash -->
                <div id="flash" class="content">
                    <h1>Flash Projects</h1>

                    <p>
                        Ahhh Flash. I took a summer course on Flash MX (if I remember correctly) at Stanford a long while back. Of course, now
                        everything's in HTML/JS, but those were exciting times. The Flash IDE was the second IDE I've ever used, actually - second
                        to Blodshed Dev-C++ (yes I just dated mysef).
                    </p>

                    <p>
                        <b>Curving balls.</b> I originally made this simple app as a screensaver. Mainly I was just testing out how to use
                        ActionScript classes (for the balls). Drag the slider up and down to control the ball birth rate. The balls automatically die
                        after a few seconds.
                    </p>
                    <div style="text-align: center;">
                        <?php echo flash_tags(0, $flash_array); ?>
                    </div>
                    <hr/>

                    <p>
                        <b>Fifteen puzzle.</b> Just a simple version of the classic fifteen puzzle. Click "shuffle" to randomize the board.
                        Click a tile adjacent to an empty space to move the tile there. There's no scoring system, so congrats! You have
                        1,000,000 points.
                    </p>
                    <div style="text-align: center;">
                        <?php echo flash_tags(1, $flash_array); ?>
                    </div>
                    <hr/>

                    <p>
                        <b>Binary clock.</b> A very straight-forward binary clock. I went through a phase when I though everything binary was simply
                        awesome. Hence this app.
                    </p>
                    <div style="text-align: center;">
                        <?php echo flash_tags(2, $flash_array); ?>
                    </div>
                    <hr/>

                    <p>
                        <b>Clock tick.</b> A simple analog clock that used to be my screensaver.
                    </p>
                    <div style="text-align: center;">
                        <?php echo flash_tags(3, $flash_array); ?>
                    </div>
                    <hr/>

                    <p>
                        <b>Fractal generator.</b> I made this app when I first learned about fractals. Use the on-screen controls to
                        create a base segment. After you're finished, select a turn direction (dictates the angle that the next segment
                        will start). When you're ready, click "Create Fractal." To iterate the fractal after it's drawn, press space. NOTE:
                        iterating more than ~3 times will cause a MASSIVE performance hit.
                    </p>
                    <div style="text-align: center;">
                        <?php echo flash_tags(4, $flash_array); ?>
                    </div>
                    <hr/>

                    <p>
                        <b>Guess-Word.</b> This was my first attempt at a word game. I probably wrote this 4 or 5 years ago, so keep that in mind when playing it.
                    </p>
                    <div style="text-align: center;">
                        <?php echo flash_tags(5, $flash_array); ?>
                    </div>
                </div>
            </div>
        </div>
    </body>

    <!--
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
                    <li class="nav_button selected" data-page="#about_me_page">
                        About me
                    </li>
    
                    <li class="nav_button no_select">
                        <a href="/assets/pdfs/resume.pdf" style="text-decoration: none; color: inherit;" target="_blank">
                            Resume
                        </a>
                    </li>
    
                    <li class="nav_button" data-page="#ios_page">
                        iOS
                    </li>
    
                    <li class="nav_button" data-page="#processing_page">
                        Processing
                    </li>
    
                    <li class="nav_button" data-page="#flash_page">
                        Flash
                    </li>
                </ul>
            </div>
    
            <div id="page_wrapper">
                <div id="about_me_page" class="page">
                    <div id="welcome_text">
                        Welcome to parkerbossier.com
                    </div>
                    <br/>
    
                    <img id="my_picture" src="/assets/images/profile.jpg" alt="Parker Bossier"/>
    
                    <div id="about_me_text">
                        <p>
                            A little about me and this site... I was born and raised in New Orleans, LA, and I'm currently a senior at Vanderbilt University
                            studying Computer Science and Math. This site hosts most of my side projects, which can be accessed through the navigation
                            bar above. Below is a list of websites I've worked on recently, so give 'em a look if you're interested. FYI, I've been using
                            <a href="http://www.pagodabox.com/" target="_blank">PagodaBox</a> for my hosting, and it's a great platform. Check it out if
                            you're looking for some scalable hosting.
                        </p>
    
                        <ul style="list-style: none;">
                            <li><a href="http://demo.planjar.com/" target="_blank">PlanJar</a> (contact me for more info)</li>
                            <li>
                                <a href="http://studentorgs.vanderbilt.edu/vsvs/" target="_blank">VSVS</a>
                                (more specifically, <a href="http://signupvsvs.com/home/" target="_blank">VSVS Sign Up</a>)
                            </li>
                            <li><a href="http://thecampusair.com" target="_blank">thecampusair</a> (try it on an iOS device, too)</li>
                        </ul>
    
                        <p>
                            Head over to my blog on <a href="http://parkerbossier.blogspot.com/" target="_blank">Blogger</a>. I'll eventually be making my own
                            blog on this site, but Blogger is just too easy for now...
                        </p>
    
                        <p>
                            Too cool to view source? Go check out my <a href="https://github.com/parkerbossier/" target="_blank">GitHub account</a>,
                            and you can see the source, the WHOLE source. (And nothing but the source... Amiright?)
                        </p>
                    </div>
                </div>
    
                <div id="ios_page" style="display: none;" class="page" data-setup_finc="">
                    <p>
                        I recently discovered that you can make Cydia lockscreen themes with HTML, CSS, and JS. I love it. Check out my
                        <a href="http://modmyi.com/info/minimalistmomentofsilence.d.php" target="_blank">first theme</a>. Here's a
                        screenshot to make you want to jailbreak if you haven't.
                    </p>
    
                    <div style="text-align: center">
                        <img src="/assets/images/Minimalist%20Moment%20of%20Silence.png" alt="Minimalist Moment of Silence.png"/>
                    </div>
    
                    <p>
                        Here's <a href="http://modmyi.com/info/scrollingtimedatelockscreenhd.d.php" target="_blank">another one</a>.
                        Scrolling Time-Date Lockscreen HD.
                    </p>
    
                    <div style="text-align: center">
                        <img src="/assets/images/Scrolling%20Time-Date%20Lockscreen%20HD.png" alt="Scrolling Time-Date Lockscreen HD.png"/>
                    </div>
    
                </div>
    
    
                <div id="processing_page" style="display: none;" class="page" data-setup_finc="processing_page_setup">
                    <p>
                        This applet is still a work in progress, but the fundamentals are there. The red, greed, and blue lines represent the x, y, and z axes, respectively.
                        Each sphere is a left/right graphical equalizer. The length of the red, green, and blue bars represents the mean value of the signal buffer.
                        I plan on making the camera rotate around the scene and having the spheres rotate to the beat. If you check out the source code, some of the camera
                        functionality is already there. I just need to flesh it out more when I have the time.
                    </p>
    
                    <p>
                        NOTE: It takes a while to load sometimes. Wait for it...
                    </p>
    
                    <div id="sphere_container"></div>
                </div>
    
                <div id="flash_page" style="display: none;" class="page">
                    <p>I haven't used Flash in a <i>long</i> time, but here are some of the projects I still have laying around...</p>
                    <hr/>
    
                    <p>
                        <b>Curving balls.</b> I originally made this simple Flash app as a screensaver. Mainly I was just testing out how to use
                        ActionScript classes (for the balls). Drag the slider up and down to control the ball birth rate. The balls automatically die
                        after a few seconds.
                    </p>
                    <div style="text-align: center;">
    <?php //echo flash_tags(0, $flash_array); ?>
                    </div>
                    <hr/>
    
                    <p>
                        <b>Fifteen puzzle.</b> Just a simple version of the classic fifteen puzzle. Click "shuffle" to randomize the board.
                        Click a tile adjacent to an empty space to move the tile there. There's no scoring system, so congrats! You have
                        1,000,000 points.
                    </p>
                    <div style="text-align: center;">
    <?php //echo flash_tags(1, $flash_array); ?>
                    </div>
                    <hr/>
    
                    <p>
                        <b>Binary clock.</b> A very straight-forward binary clock. I went through a phase when I though everything binary was simply
                        awesome. Hence this app.
                    </p>
                    <div style="text-align: center;">
    <?php //echo flash_tags(2, $flash_array); ?>
                    </div>
                    <hr/>
    
                    <p>
                        <b>Clock tick.</b> A simple analog clock that used to be my screensaver.
                    </p>
                    <div style="text-align: center;">
    <?php //echo flash_tags(3, $flash_array); ?>
                    </div>
                    <hr/>
    
                    <p>
                        <b>Fractal generator.</b> I made this app when I first learned about fractals. Use the on-screen controls to
                        create a base segment. After you're finished, select a turn direction (dictates the angle that the next segment
                        will start). When you're ready, click "Create Fractal." To iterate the fractal after it's drawn, press space. NOTE:
                        iterating more than ~3 times will cause a MASSIVE performance hit.
                    </p>
                    <div style="text-align: center;">
    <?php //echo flash_tags(4, $flash_array); ?>
                    </div>
                    <hr/>
    
                    <p>
                        <b>Guess-Word.</b> This was my first attempt at a word game. I probably wrote this 4 or 5 years ago, so keep that in mind when playing it.
                    </p>
                    <div style="text-align: center;">
    <?php //echo flash_tags(5, $flash_array); ?>
                    </div>
                </div>
            </div>
        </div>
    </body>
    -->
</html>