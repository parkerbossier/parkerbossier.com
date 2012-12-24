<?php

class AppController extends Controller {

    public $helpers = array('Html');

    public function beforeFilter() {
        // detect webkit
        // used for the shadow overlay div to fix the webkit border-radius/overflow: hidden bug
        $this->set('webkit', strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'webkit') !== false);

        // detect IE != 10
        // used to warn the user about IE < 10
        if (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'msie') !== false && strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'msie 10') === false)
            $ie10message = true;
        else
            $ie10message = false;

        $this->set('ie10message', $ie10message);
    }

}

?>
