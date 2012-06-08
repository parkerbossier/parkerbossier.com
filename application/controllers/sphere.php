<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Sphere extends CI_Controller
{

    public function index()
    {
        $this->load->view('sphere_view');
    }

}