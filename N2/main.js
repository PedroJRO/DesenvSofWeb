const telefone = document.querySelector("#telefone");
telefone.addEventListener('keypress', () => {
    let inputlength = telefone.value.length;

    if (inputlength === 0) {
        telefone.value += "(";
    } else if (inputlength === 3) {
        telefone.value += ")";
    } else if (inputlength === 9) {
        telefone.value += "-";
    }
})

const cep = document.querySelector("#cep");
const rua = document.querySelector("#rua");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const uf = document.querySelector("#uf");

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    rua.value = ("");
    bairro.value = ("");
    cidade.value = ("");
    uf.value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        rua.value = conteudo.logradouro;
        bairro.value = conteudo.bairro;
        cidade.value = conteudo.localidade;
        uf.value = conteudo.uf;
    } else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

cep.addEventListener("focusout", function () {
    pesquisacep(cep.value);
});


function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    const cepValor = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cepValor != "") {
        //Expressão regular para validar o CEP.
        const validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if (validacep.test(cepValor)) {
            //cep.value = cep.substring(0, 5)
            //   + "-"
            //    + cep.substring(5);
            //Preenche os campos com "..." enquanto consulta webservice.
            rua.value = "...";
            bairro.value = "...";
            cidade.value = "...";
            uf.value = "...";
            //Cria um elemento javascript.
            const script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cepValor + '/json/?callback=meu_callback';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}


cep.addEventListener('keypress', () => {
    let inputlength = cep.value.length;

    if (rua !== "") {
        if (inputlength === 2) {
            cep.value += ".";
        } else if (inputlength === 6) {
            cep.value += "-";
        }
    }
})

document.addEventListener('DOMContentLoaded', function () {
    const emailField = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailValid = document.getElementById('emailValid');
    const cpfField = document.getElementById('cpf');
    const cpfError = document.getElementById('cpfError');
    const cpfValid = document.getElementById('cpfValid');

    emailField.addEventListener('focusout', function () {
        validarEmail();
    });

    emailField.addEventListener('input', function () {
        emailError.style.display = 'none';
        emailValid.style.display = 'none';
    });

    cpfField.addEventListener('focusout', function () {
        validarCpfCnpj();
    });

    cpfField.addEventListener('input', function () {
        cpfError.style.display = 'none';
        cpfValid.style.display = 'none';
        aplicarMascaraCpfCnpj(cpfField);
    });

    function validarEmail() {
        const email = emailField.value;

        // Expressão regular para validar o formato do e-mail e garantir que termine com .com ou .com.br
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|com\.br)$/;

        if (!emailRegex.test(email)) {
            emailError.style.display = 'block';
            emailValid.style.display = 'none';
        } else {
            emailError.style.display = 'none';
            emailValid.style.display = 'block';
        }
    }

    function validarCpfCnpj() {
        const cpfCnpj = cpfField.value;

        if (validarCPF(cpfCnpj) || validarCNPJ(cpfCnpj)) {
            cpfError.style.display = 'none';
            cpfValid.style.display = 'block';
        } else {
            cpfError.style.display = 'block';
            cpfValid.style.display = 'none';
        }
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf.charAt(10));
    }

    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj.length !== 14) return false;
        if (/^(\d)\1+$/.test(cnpj)) return false;
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0))) return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        return resultado === parseInt(digitos.charAt(1));
    }

    function aplicarMascaraCpfCnpj(campo) {
        let valor = campo.value.replace(/\D/g, '');

        if (valor.length <= 11) { // CPF
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else { // CNPJ
            valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
            valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
        }

        campo.value = valor;
    }
});