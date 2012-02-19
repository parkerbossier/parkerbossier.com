<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Resume extends CI_Controller {

    public function index() {
        ?>
        <html>
            <head>
                <title>Resume</title>
            </head>

            <body>
                <iframe src="/assets/pdfs/resume.pdf" style="width: 100%; height: 100%" frameborder="0"/>
            </body>
        </html>
        <?php
    }

}