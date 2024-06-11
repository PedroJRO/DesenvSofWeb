<?php
require_once 'conect_server.php';

$usuario = 'Admin';
$senhaConsulta = '123';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $usuario_digitado = $_POST['usuario'];
    $senha_digitada = $_POST['senha'];

    if ($usuario_digitado === $usuario && $senha_digitada === $senhaConsulta){
        $sql = "SELECT * FROM cadastro_cliente";
        $result = $conn->query($sql);
    }else{
        echo "<h1>Usuário e/ou Senha Incorreta!</h1>";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS\style.css">
    <title>Consulta ao Data Base</title>
</head>

<body>
    <div class="form">
        <form method="POST"><br>
            <fieldset>
                <legend>Acesso ao Banco de Dados</legend><br>
                <div class="inputBox">
                    <input type="text" name="usuario" id="usuario" class="inputUser" required>
                    <label for="usuario" class="labelInput">Usuário</label><br><br>
                </div>
                <div class="inputBox">
                    <input type="password" name="senha" id="senha" class="inputUser" required>
                    <label for="senha" class="labelInput">Senha</label><br><br>
                </div>
                <div class="acao"><br><br>
                    <input type="submit" id="Acessar" value="Acessar">
                </div>
            </fieldset><br><br><br>
        </form>
        <fieldset>
            <legend>Cadastros</legend><br>
            <div>
                <?php if(isset($result) && $result->num_rows >0): ?>
                <ul>
                    <?php while ($row = $result->fetch_assoc()): ?>
                    <li>
                        <strong>Nome: </strong>
                        <?php echo $row["NOME"];?> <br>
                        <strong>Telefone: </strong>
                        <?php echo $row["TELEFONE"];?> <br>
                        <strong>CPF: </strong>
                        <?php echo $row["CPF"];?> <br>
                        <strong>RG: </strong>
                        <?php echo $row["RG"];?> <br>
                        <strong>Data de Nascimento: </strong>
                        <?php echo $row["DATA_NASC"];?> <br>
                        <strong>E-mail: </strong>
                        <?php echo $row["EMAIL"];?> <br>
                        <strong>Sexo: </strong>
                        <?php echo $row["IDENT_GENERO"];?> <br>
                        <strong>CEP: </strong>
                        <?php echo $row["CEP"];?> <br>
                        <strong>Rua: </strong>
                        <?php echo $row["RUA"];?> <br>
                        <strong>Número: </strong>
                        <?php echo $row["NUMERO"];?> <br>
                        <strong>Complemento: </strong>
                        <?php echo $row["COMPLEMENTO"];?> <br>
                        <strong>Bairro: </strong>
                        <?php echo $row["BAIRRO"];?> <br>
                        <strong>Cidade: </strong>
                        <?php echo $row["CIDADE"];?> <br>
                        <strong>Estado: </strong>
                        <?php echo $row["UF"];?> <br>
                        <strong>Data e Hora: </strong>
                        <?php echo $row["DATA"]." às " .$row["HORA"];?> <br><br>
                    </li>
                    <?php endwhile; ?>
                </ul>
                <?php else: ?>
                <p>Nenhum Cadastro.</p>
                <?php endif;?>
            </div>
        </fieldset>
    </div>

</body>

</html>