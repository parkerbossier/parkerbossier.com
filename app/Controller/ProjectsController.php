<?php

class ProjectsController extends AppController {

    public function index() {
        $this->redirect('/');
    }

    public function flizash() {

    }

    public function sphere() {

    }

    public function halfbaked() {
        $this->view = 'half-baked';
    }

}

