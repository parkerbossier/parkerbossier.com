<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Accel extends CI_Controller {

    public function index() {
        ?>

        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html>
            <head>
                <title>Sleek Time Date Bars HD</title>
                <meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>
                <style type="text/css">
                    body {
                        margin: 0px;
                        width: 320px;
                        height: 480px;
                        position: relative;
                        font-family: "Lucida Console", Monaco, monospace;
                        font-size: 1em;
                        color: black;
                        overflow: hidden;
                        background-color: white;
                    }
                    #bg_image {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                    }
                </style>
                <script type="text/javascript" src="/assets/js/jquery-1.7.1.min.js"></script>
                <script type="text/javascript">
                    $(function() {
                        window.ondevicemotion = function(event) {
                            $('#bg_image').html('x: ' + event.accelerationIncludingGravity.x);
                        }
                    });

                </script>
            </head>

            <body>
                <div id="bg_image">
                    <!--<img src="BG.png" style="width: 100%; height: 100%"/>-->

                </div>
            </body>
        </html>



        <?php
    }

}