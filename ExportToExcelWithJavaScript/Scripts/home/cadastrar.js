var CadastroCliente = {

    onCadastrarClick: function () {
        this.LimparMensagensErros();

        if (this.Validar()) {
            var $txtNome = $('#txtNome');
            var $txtTelefone = $('#txtTelefone');
            var $txtEmail = $('#txtEmail');
            var $txtDataNascimento = $('#txtDataNascimento');
            var $txtCep = $('#txtCep');
            var $txtEndereco = $('#txtEndereco');
            var $txtBairro = $('#txtBairro');
            var $txtNumero = $('#txtNumero');
            var $txtEstado = $('#txtEstado');
            var $txtCidade = $('#txtCidade');
            var $ckbAtivo = $('#ckbAtivo');

            // Declarando um objeto 
            var Cliente = {}; // === new Objct();

            Cliente.nome = $.trim($txtNome.val());
            Cliente.telefone = $.trim($txtTelefone.val());
            Cliente.email = $.trim($txtEmail.val());
            Cliente.dataNascimento = $.trim($txtDataNascimento.val());
            Cliente.cep = $.trim($txtCep.val());
            Cliente.endereco = $.trim($txtEndereco.val());
            Cliente.bairro = $.trim($txtBairro.val());
            Cliente.numeroEndereco = $.trim($txtNumero.val());
            Cliente.estado = $.trim($txtEstado.val());
            Cliente.cidade = $.trim($txtCidade.val());
            Cliente.isAtivo = $ckbAtivo.prop('checked'); //Pega a propriedade checked...

            // *** Após criar o 3º Js (index.js) vamos adicionar a linha abaixo:
            // Adicionando Cliente na lista de Cliente, só que... esse JS esta acima do index.js. Então, vamos organizar a ordem...
            // ** Falar sobre a forma de leitura do Navegador e a ordem interfere um com o outro...
            AdicionarCliente(Cliente);

            this.MensagemSucesso();
            this.LimparCampos();

            // Depois de criar o 4º JS:
            ListarCliente();
            return true;
        }

        return false;
    },

    Validar: function () {
        var $txtNome = $('#txtNome');
        var $txtTelefone = $('#txtTelefone');
        var $txtEmail = $('#txtEmail');
        var $txtDataNascimento = $('#txtDataNascimento');
        var $txtCep = $('#txtCep');
        var $ckbAtivo = $('#ckbAtivo');

        var isValido = true;

        // === : Igualdade de tipo e valor. Essa comparação não faz conversão de valores para saber o valor. Boa pratica utiliza-lo!
        // == : Igualdade de valor, somente. Ele converte um dos valores com base no outro, e assim faz a verificação dos valores.
        // http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons

        // $.trim() é do Jquery, faz a mesma função do .trim() do JavaScript mas, do jquery é Cross-Browser
        //if ($txtNome.val().trim() === '') {
        if ($.trim($txtNome.val()) === '') {
            isValido = false;
            $txtNome.addClass('errorInput');
        }

        if ($.trim($txtTelefone.val()) === '') {
            isValido = false;
            $txtTelefone.addClass('errorInput');
        }

        if ($.trim($txtEmail.val()) === '') {
            isValido = false;
            $txtEmail.addClass('errorInput');
        }

        if ($.trim($txtDataNascimento.val()) === '') {
            isValido = false;
            $txtDataNascimento.addClass('errorInput');
        }

        if ($.trim($txtCep.val()) === '') {
            isValido = false;
            $txtCep.addClass('errorInput');
        }

        if (isValido === false) {
            var mensagem = '<strong>Atenção: </strong>Preencha os campos em destaque abaixo.'
            this.MensagemErro(mensagem);
        }

        return isValido;
    },

    MensagemErro: function (mensagem) {
        $('#divAlert').html(mensagem).addClass('alert').addClass('alert-danger');
    },

    MensagemSucesso: function () {
        var mensagem = '<strong>Sucesso: </strong>Cliente cadastrado com sucesso!'
        $('#divAlert').html(mensagem).addClass('alert').addClass('alert-success');
        this.DesaparecerMensagemSucesso();
    },

    LimparMensagensErros: function () {
        var listClassErrorInput = $('.errorInput');
        listClassErrorInput.removeClass('errorInput');
        $('#divAlert').removeClass('alert').removeClass('alert-danger').html('');
    },

    LimparMensagem: function () {
        $('#divAlert').html('').removeClass('alert').removeClass('alert-success');
    },

    LimparCampos: function () {
        $('input[type="text"], input[type="tel"], input[type="email"], input[type="datetime"]').val('');
        $('input[type="checkbox"]').prop('checked', false);
    },

    DesaparecerMensagemSucesso: function () {
        window.setTimeout(this.LimparMensagem, 5000);
    },

    onCepBlur: function (objJquery) {
        var cep = objJquery.value;
        if ($.trim(cep) !== '') {
            this.GetEnderecoAjax(cep);
        }
    },

    GetEnderecoAjax: function (cep) {
        $.ajax({
            url: "http://api.postmon.com.br/v1/cep/" + cep,  // A URL da requisição
            dataType: "json",  // O tipo de Dado que você esta esperando voltar do servidor
            data: "", // Valor que vamos enviar para a requisição através da queryString, nesse exemplo não vamos utilizar
            async: true, // Se a requisição vai ser assincrona (quando não esperado o resultado) ou sincrona (quando esperado o resultado). Por Default é true.
            success: function (data) { // Sucess é uma função que será executada, por CallBack caso tenha sucesso.
                PreencheEndereco(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { // Error é uma função que será executada, por CallBack caso tenha erro na requisição.
                // Pegando a mensagem de erro que foi retornada no CallBack
                var mensagem = "<strong>Erro: </strong> Ocorreu erro ao tentar buscar o CEP, por favor informe um CEP válido. <p><i>" + jqXHR.statusText + "</i></p>";
                MensagemErro(mensagem);
                LimparEndereco();
            },
            // Função executada antes do Envio da requisição
            beforeSend: function (xhr) {
                // .show() para fazer o elemento aparecer.
                $('#imgLoading').show();
            },
            // Função executada logo que a requisição completar, tanto se for com sucesso ou erro.
            complete: function (xhr) {
                // .hide() para fazer o elemento sumir
                $('#imgLoading').hide();
            }
        });
    },

    PreencheEndereco: function (jsonEndereco) {
        this.LimparMensagensErros();
        $('#txtEndereco').val(jsonEndereco.logradouro);
        $('#txtBairro').val(jsonEndereco.bairro);
        $('#txtEstado').val(jsonEndereco.estado);
        $('#txtCidade').val(jsonEndereco.cidade);
    },

    LimparEndereco: function () {
        $('#txtEndereco, #txtBairro, #txtEstado, #txtCidade').val('');
    }
};