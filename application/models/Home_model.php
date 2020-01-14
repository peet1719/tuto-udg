<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Home_model extends CI_Model {
    
    public function getTemas(){
        $data = $this->db->get('tema');

        return $data->result();
        
    }

    public function getAsignaturas(){
        $data = $this->db->get('asignatura');

        return $data->result();
    }
}




?>
