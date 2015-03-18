using System; 

namespace WebAPIExportExcel.Models
{
    public class Cliente
    {
        public int IdCliente { get; set; }

        public string Nome { get; set; }

        public string Fone { get; set; }

        public string Email { get; set; }

        public DateTime DataNascimento { get; set; }

        public string Endereco { get; set; }

        public string Cidade { get; set; }

        public bool IsAtivo { get; set; }

        public DateTime DataCadastro { get; set; }
    }
}