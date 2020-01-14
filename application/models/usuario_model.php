<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Usuario_model extends CI_Model {

    public function crear_usuario($datos){
        $this->db->insert("usuario", $datos);
        return $this->db->insert_id();
        
    }

    public function login($usuario, $password){

        //validamos si el usuario envio el usuario o su email para ingresar
        $this->db->where('nombreUsuario', $usuario);
        $this->db->or_where('email', $usuario);
        $query = $this->db->get('usuario');
        
        //checamos que la consulta anterior nos haya dado algun resultado
        if($query->num_rows()){
            //si el password coindice el que mando el usuario y el de la consulta entonces
            //regresamos el resultado del query 
            if(md5($password) === $query->row('password')){
                return $query->row();
            }
            return false;
        }
        return false;
    }

}

/* End of file ModelName.php */

?>