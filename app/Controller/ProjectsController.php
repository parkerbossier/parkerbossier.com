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

    public function ios_lockscreens() {

    }

    public function turing() {

    }

    public function dashboard_get_data() {
        $this->autoRender = false;

        // deal with CORS
        $referer = $this->request->referer();
        if ($referer == 'http://local.chartjs-dashboard.com/')
            1;//$this->response->header('Access-Control-Allow-Origin', 'http://local.chartjs-dashboard.com');
        elseif ($referer == 'http://chartjs-dashboard.gopagoda.com/')
            1;//$this->response->header('Access-Control-Allow-Origin', 'http://chartjs-dashboard.gopagoda.com');
        $this->response->header('Access-Control-Allow-Origin', '*');

        // do login
        $ch = curl_init('https://jawbone.com/user/signin/login_action');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array(
            'jawbone-login-email' => 'parkerbossier@gmail.com',
            'jawbone-login-password' => $_SERVER['UP_PASS'],
            'jawbone-login-remember' => '0'
        ));
        $json = curl_exec($ch);
        curl_close($ch);

        // extract the token
        $json = json_decode($json, true);
        $token = json_decode($json['body'], true);
        $token = $token['token'];

        // create the cookie
        $cookie = 'jbsession=' . $token;

        // get the csv file using the cookie
        $ch = curl_init('https://jawbone.com/user/settings/download_up_data?year=' . date('Y'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_COOKIE, $cookie);
        $result = curl_exec($ch);
        curl_close($ch);

        // parse the csv
        $rows = explode("\n", $result);
        $columns = str_getcsv($rows[0]);
        unset($rows[0]);
        $csv = array();
        foreach ($rows as $row) {
            $row = str_getcsv($row);
            if ($row[0] == NULL)
                continue;

            $tempRow = array();
            foreach ($columns as $key => $value) {
                $tempRow[$value] = floatval($row[$key]);
            }
            $date = $tempRow['DATE'];
            unset($tempRow['DATE']);

            // humanize the date
            $date = substr($date, 4, 2) . '-' . substr($date, 6, 2) . '-' . substr($date, 0, 4);

            // add the row
            $csv[$date] = $tempRow;
        }

        return json_encode($csv);
    }

}

