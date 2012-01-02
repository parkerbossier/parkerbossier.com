<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class No_navigator extends CI_Controller
{

    public function index()
    {
        $this->load->view('no_navigator_view');
    }

}