<?php

class HomeController extends AppController {

    public function index() {
        // detect webkit
        // used for the shadow overlay div to fix the webkit border-radius/overflow: hidden bug
        $this->set('webkit', strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'webkit') !== false);
    }

}

