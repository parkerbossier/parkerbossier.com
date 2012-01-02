<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Home extends CI_Controller
{

    public function index()
    {
        // Generate the ie_bypass variable
        if ($this->input->get('ie_bypass'))
        {
            $ie_bypass = $this->input->get('ie_bypass');
        } else
        {
            $ie_bypass = 'false';
        }

        $this->load->view('home_view', array('ie_bypass' => $ie_bypass));
    }

}