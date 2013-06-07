<?php

class HomeController extends AppController {

    public function index() {

    }

    public function foo() {
        $this->autoRender = false;
        echo newrelic_get_browser_timing_header();
    }

}

