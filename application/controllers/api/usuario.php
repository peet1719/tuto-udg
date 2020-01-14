<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Usuario extends REST_Controller {

    
    public function __construct()
    {
        parent::__construct();
        //Cargamos el modelo usuario, el segundo parametro es un alias
        $this->load->model('usuario_model','usuario');
    }
    

    public function registrar_post(){
        
        //convertir los datos (JSON) recibidos a un objeto
        $request = $this->input->raw_input_stream;
        $data_request = json_decode($request);

        $data_array = (array) $data_request;
                
        $this->form_validation->set_data($data_array);

        //reglas paa validar el formulario
        $this->form_validation->set_rules(
            'nombreUsuario','nombre_usuario', 
             'required|max_length[45]|is_unique[usuario.nombreUsuario]',
                array(
                 'is_unique' => 'Este usuario ya existe por favor ingrese uno diferente',
                 'required' => 'Ingrese el nombre de usuario'
             )
            );

        $this->form_validation->set_rules(
            'email', 'Email', 
            'required|max_length[45]|is_unique[usuario.email]',
            array(
                'is_unique' => 'Este email ya existe por favor ingrese uno diferente',
                 'required' => 'Ingrese el email'
            )
            );

        $this->form_validation->set_rules('password', 'Password',
         'required|max_length[45]',
            array(
                'required' => 'Ingrese el password'
            ));
        $this->form_validation->set_rules('nombre', 'Nombre', 
        'required|max_length[45]',
            array(
                'required' => 'Ingrese nombre'
            ));
        $this->form_validation->set_rules('apellido', 'Apellido', 
        'required|max_length[45]',
            array('required' => 'Ingrese apellido'
            ));
        

        //verica que no se hayan mandado los datos correctamente
        if( $this->form_validation->run() == FALSE){
            
            $mensaje = array(
                'status' => false,
                'error' => $this->form_validation->error_array(),
                'mensaje' => validation_errors()
            );
            $this->response($mensaje, 400);
        }else{
            //Arreglo con los datos del nuevo usuario
            $insert = array(
                'nombreUsuario' => $data_array['nombreUsuario'],
                'password' => md5($data_array['password']),
                'email' => $data_array['email'],
                'nombre' => $data_array['nombre'],
                'apellido' => $data_array['apellido'],
                'fechaCreacion' => date('Y-m-d')
            );

            //inserta los datos a la base de datos
            $respuesta = $this->usuario->crear_usuario($insert);

            //Nos aseguramos que no haya problemas al insertar
            //$respuesta regresa el numero de id del usuario nuevo
            if($respuesta > 0 && !empty($respuesta)){
                //se agrego el usuario correctamente
                $mensaje = [
                    'status' => true,
                    'mensaje' => 'Usuario registrado'
                ];
                $this->response($mensaje,200);
            } else {
                $mensaje = [
                    'status' => false,
                    'mensaje' => 'Error al registrar el usuario'
                ];
                $this->response($mensaje,400);
            }
            
        }


    }

    public function login_post(){

        $this->load->library('Authorization_Token');
        header("Access-Control-Allow-Origin: *");

        //convertir los datos (JSON) recibidos a un objeto
        $request = $this->input->raw_input_stream;
        $data_request = json_decode($request);

        $data_array = (array) $data_request;
                
        $this->form_validation->set_data($data_array);
        
        
        $this->form_validation->set_rules('nombreUsuario','NombreUsuario',
        'required',
            array('required' => 'Ingresa nombre de usuario o correo')
        );
        $this->form_validation->set_rules('password', 'Password',
         'required|max_length[45]',
            array(
                'required' => 'Ingrese el password'
            ));

        if($this->form_validation->run() == false){
            $mensaje = array(
                'status' => false,
                'error' => $this->form_validation->error_array(),
                'enviados' => $_POST,
                'mensaje' => validation_errors()
            );

            $this->response($mensaje,403);
        }else{
            $nombreUsuario = $data_array['nombreUsuario'];
            $password = $data_array['password'];

            $respuesta = $this->usuario->login($nombreUsuario,$password);
            
            if($respuesta != false && !empty($respuesta)){
                //se agrego el usuario correctamente

                //generar token
                $token_data['idUsuario'] = $respuesta->idUsuario;
                $token_data['nombreUsuario'] = $respuesta->nombreUsuario;
                $token_data['password'] = $respuesta->password;
                $token_data['email'] = $respuesta->email;
                $token_data['nombre'] = $respuesta->nombre;
                $token_data['apellido'] = $respuesta->apellido;
                $token_data['fechaCreacion'] = $respuesta->fechaCreacion;
                $token_data['fechaActualizacion'] = $respuesta->fechaActualizacion;
                $token_data['time'] = time();

                $user_token = $this->authorization_token->generateToken($token_data);


                $datos = [
                    'nombreUsuario' => $respuesta->nombreUsuario,
                    'email' => $respuesta->password,
                    'nombre' => $respuesta->nombre,
                    'apellido' => $respuesta->apellido,
                    'fechaCreacion' => $respuesta->fechaCreacion,
                    'token' => $user_token
                ];

                $mensaje = [
                    'status' => true,
                    'data' => $datos,
                    'mensaje' => 'inicio de sesión exitoso'
                ];
                $this->response($mensaje,200);
            } else {
                $mensaje = [
                    'status' => false,
                    'mensaje' => 'usuario o password invalido'
                ];
                $this->response($mensaje,400);
            }

        }

    }

}

/* End of file Controllername.php */

?>