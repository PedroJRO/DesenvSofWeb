<?php
//Config de credenciais
$server = 'Localhost';
$usuario = 'root';  
$senha = '';
$banco = 'aula_forms';

//Conexão com banco de dados
$conn = new mysqli($server, $usuario, $senha,$banco);

if ($conn->connect_error) {
    die("Falha ao se comunicar com o Banco de dados".$conn->connect_error);
}
?>