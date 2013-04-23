<?php

class ElectricImpController extends AppController {

    public $uses = array('Rfid');

    public function recordRfid() {
        $this->autoRender = false;

        pre_var_dump($this->request->query['value']);
        $json = json_decode($this->request->query['value']);
        pre_var_dump($json);

        $this->Rfid->save(array(
            'Rfid' => array(
                'value' => $this->request->query['value']
            )
        ));
    }

}

