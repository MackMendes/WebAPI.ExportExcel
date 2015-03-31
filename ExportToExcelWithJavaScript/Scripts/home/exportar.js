var Exportar = {
    OnExportarClick: function () {
        $.ajax({
            url: "http://localhost:51816/Home/DownloadExcel",
            type: 'POST',
            data: JSON.stringify(objectRequest),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                var createA = document.createElement('a');
                createA.setAttribute('id', 'linkDownload');
                createA.setAttribute('href', 'data:application/vnd.ms-excel;base64,' + data);
                document.body.appendChild(createA);
                createA.download = 'download_teste.xls';

                var selectorHref = document.getElementById('linkDownload');
                selectorHref.click();
                selectorHref.remove();
            }
        });
    },
    DownloadExcel: function () {

    }
};
