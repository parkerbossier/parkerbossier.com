<?php

class ElectricImpController extends AppController {

    public $uses = array('Rfid');

    public function recordRfid() {
        $this->autoRender = false;

        $this->Rfid->save(array(
            'Rfid' => array(
                'value' => $this->request->query['value']
            )
        ));
    }

}

