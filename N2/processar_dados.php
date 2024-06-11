<?php
require_once 'conect_server.php';

//Pega dados do form
$nome = $_POST['nome'];
$telefone = $_POST['telefone'];
$cpf = $_POST['cpf'];
$rg = $_POST['rg'];
$data_nasc = $_POST['data_nasc'];
$email = $_POST['email'];
$ident_genero = $_POST['sexo'];
$cep = $_POST['cep'];
$rua = $_POST['rua'];
$numero= $_POST['numero'];
$compl = $_POST['comp'];
$bairro = $_POST['bairro'];
$cidade = $_POST['cidade'];
$uf = $_POST['uf'];
$data_atual = date('d/m/Y');
$hora_atual = date('H:i:s');

$smtp = $conn->prepare("INSERT INTO cadastro_cliente (nome, telefone, cpf, rg, data_nasc, email, ident_genero, cep, rua, numero, complemento, bairro, cidade, uf, data, hora) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

$smtp->bind_param('ssssssssssssssss', $nome, $telefone, $cpf, $rg, $data_nasc, $email, $ident_genero, $cep, $rua, $numero, $compl, $bairro, $cidade, $uf, $data_atual, $hora_atual);

if ($smtp->execute()){
    echo "Mensagem enviada com sucesso!";
}else{
    echo "Erro no envio da mensagem: ".$smtp->error;
}

$smtp->close();
$conn->close();

?>