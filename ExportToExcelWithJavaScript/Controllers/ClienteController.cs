using FizzWare.NBuilder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebAPIExportExcel.Models;
 
namespace WebAPIExportExcel.Controllers
{
    public class ClienteController : ApiController
    {
        private static IList<Cliente> listCliente = new List<Cliente>();

        [HttpGet]
        public IEnumerable<Cliente> GetClientes()
        {
            if (listCliente.Count() == 0)
                listCliente = Builder<Cliente>.CreateListOfSize(4).Build();

            return listCliente;
        }

        [HttpGet]
        public Cliente GetCliente(int idCliente)
        {
            return listCliente.FirstOrDefault(x => x.IdCliente == idCliente);
        }

        [HttpPut]
        public HttpResponseMessage PutCliente(int id, Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (cliente.IdCliente != id || !listCliente.Any(x => x.IdCliente == id))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            var clienteOld = listCliente.FirstOrDefault(x => x.IdCliente == id);
            listCliente.Remove(clienteOld);

            listCliente.Add(cliente);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage PostCliente(Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (!listCliente.Any(x => x.IdCliente == cliente.IdCliente))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            var clienteOld = listCliente.FirstOrDefault(x => x.IdCliente == cliente.IdCliente);
            listCliente.Remove(clienteOld);

            listCliente.Add(cliente);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, cliente);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = cliente.IdCliente }));

            return response;
        }

        [HttpDelete]
        public HttpResponseMessage DeleteCliente(int id)
        {
            var cliente = listCliente.Where(x => x.IdCliente == id).FirstOrDefault();

            if (cliente == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            listCliente.Remove(cliente);
            return Request.CreateResponse(HttpStatusCode.OK, cliente);
        }

        [HttpGet]
        public string DownloadExcel()
        {
            return BuildeExcel();
        }

        private string BuildeExcel()
        {
            StringBuilder table = new StringBuilder();
            table.Append("<table border=`" + "1px" + "`b>");
            table.Append("<tr>");
            table.Append("<td><b><font face=Arial Narrow size=3>ID Cliente</font></b></td>");
            table.Append("<td><b><font face=Arial Narrow size=3>Nome</font></b></td>");
            table.Append("<td><b><font face=Arial Narrow size=3>E-mail</font></b></td>");
            table.Append("</tr>");
            foreach (var item in listCliente)
            {
                table.Append("<tr>");
                table.Append("<td><font face=Arial Narrow size=" + "14px" + ">" + item.IdCliente.ToString() + "</font></td>");
                table.Append("<td><font face=Arial Narrow size=" + "14px" + ">" + item.Nome.ToString() + "</font></td>");
                table.Append("<td><font face=Arial Narrow size=" + "14px" + ">" + item.Email.ToString() + "</font></td>");
                table.Append("</tr>");
            }
            table.Append("</table>");
            byte[] temp = System.Text.Encoding.UTF8.GetBytes(table.ToString());
            return System.Convert.ToBase64String(temp);

        }
    }
}
