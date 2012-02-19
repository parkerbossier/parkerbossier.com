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
                <object data="myfile.pdf" type="application/pdf" width="100%" height="100%">
                    <p>
                        It appears you don't have a PDF plugin for this browser.
                        No big deal. You can <a href="/assets/pdfs/resume.pdf">click here</a>
                        to download the PDF.</a>
                    </p>
                </object>
            </body>
        </html>
        <?php
    }

}