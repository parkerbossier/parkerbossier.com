<?php

class ElectricImpController extends AppController {

    public $uses = array('Rfid');

    public function recordRfid() {
        $this->autoRender = false;
        $time = $this->request->query['value'];
        pre_var_dump($time);
    }

}

