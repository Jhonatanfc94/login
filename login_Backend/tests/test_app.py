import unittest
import json
from unittest.mock import patch
from app import app 

class TestAutenticacion(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()

    @patch('app.save_users')
    @patch('app.get_users')
    def test_registro_usuario_exitoso(self, mock_get_users, mock_save_users):
        mock_get_users.return_value = []
        
        datos_nuevo_usuario = {
            "username": "usuario_demo",
            "password": "Password123"
        }

        respuesta = self.client.post(
            '/register',
            data=json.dumps(datos_nuevo_usuario),
            content_type='application/json'
        )
        self.assertEqual(respuesta.status_code, 201)
        
        datos_respuesta = json.loads(respuesta.data)
        self.assertEqual(datos_respuesta['message'], 'Usuario registrado con éxito')
        
        mock_save_users.assert_called_once()
    
    @patch('app.save_users')
    @patch('app.get_users')
    def test_registro_usuario_existente(self, mock_get_users, mock_save_users):
        mock_get_users.return_value = [
            {'username': 'usuario_demo', 'password': 'un_password_hasheado_cualquiera'}
        ]
        
        datos_nuevo_usuario = {
            "username": "usuario_demo", 
            "password": "OtraPasswordDiferente456"
        }

        respuesta = self.client.post(
            '/register',
            data=json.dumps(datos_nuevo_usuario),
            content_type='application/json'
        )

        self.assertEqual(respuesta.status_code, 400)
        
        datos_respuesta = json.loads(respuesta.data)
        self.assertEqual(datos_respuesta['message'], 'El usuario ya existe')
        
        mock_save_users.assert_not_called()

if __name__ == '__main__':
    unittest.main()