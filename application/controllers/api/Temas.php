<?php

require APPPATH . 'libraries/REST_Controller.php';

class Temas extends REST_Controller {

    public function __construct() {
        parent::__construct();
     }

    public function menu_get()
    {
        $this->load->model('Home_model','Home');
        
        $data['asignaturas'] = $this->Home->getAsignaturas();
        $data['temas'] = $this->Home->getTemas();
        $this->response($data, 200);
    }

}

/* End of file Controllername.php */


?>