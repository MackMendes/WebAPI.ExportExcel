// $.ready reduzido
$(function () { Shared.ExecutarTodasFuncoes(); });

var Shared = {
    SetYearFooter: function () {
        $('#lblTimeYear').text(new Date().getFullYear().toString());
    },

    ExecutarTodasFuncoes: function () {
        this.SetYearFooter();
        this.AtribuiOnBlurCep();
    },

    AtribuiOnBlurCep: function () {
        $('#txtCep').blur(function () {
            CadastroCliente.onCepBlur(this);
        });
    },

    AtribuiOnClickCadastrar: function () {
        $('#btnCadastrar').on('click', CadastroCliente.onCadastrarClick)
    }
};