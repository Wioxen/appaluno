//function boletimClick() {
//    var dataCodigo = $(this).attr('data-codigo');
//    console.log(dataCodigo);
//    if (dataCodigo != "") {
        
//        $.getJSON("http://www.sistema2.com.br/WebApiSae/api/alunomenu/" + dataCodigo + "", function (data) {
//            var _href = 'http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + $(".fotoAtual").attr("data-escola") + '&url=' + data.URL;
//            var isiPhone = / iphone/i.test(navigator.userAgent.toLowerCase());
//            if (isiPhone) {
//                if (vs === "1") {
//                    _href = data.URL;
//                    window.open(_href, '_blank');
//                    //window.location.href = _href;
//                }
//            } else {
//                window.open(_href, '_blank');
//            }
//            //window.open($('li.' + data.Id + ' > a').attr('href'));
            
//            //$('li.' + data.Id + ' > a').attr({
//            //    //'href': 'http://www.sistema2.com.br/appaluno/url.ashx?codEscola=' + $(".fotoAtual").attr("data-escola") + '&url=' + data.URL,
//            //    'href': _href,
//            //    'target': '_blank'
//            //});
            
//            //$('li.' + data.Id + ' > a').trigger('click');
//        })
//            .done(function (data) {
//                console.log(data);
//            })
//            .fail(function () {
//                console.log("error");
//            })
//            .always(function (data) {

//            });
//    }
//}