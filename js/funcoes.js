function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

function sortList() {
    var $list = $("#id01");

    $list.children().detach().sort(function (a, b) {
        return $(a).text().localeCompare($(b).text());
    }).appendTo($list);
}

function aguarda() {
    //$('body').loadingModal({ text: '' }).loadingModal('animation', 'threeBounce');
    $('#exampleModal1').modal('show');
    $('#exampleModal1').find('modal-header').empty();
    $('#imgModal').attr('src', './images/' + vEscola + '.png');
//    $("#exampleModal1 > div > div > div.modal-footer.text-center").empty();
//    $("#exampleModal1 > div > div > div.modal-footer.text-center").html("<h4 class='alert-heading animate__animated animate__backInLeft text-center'>Aguarde...</h4>");
/*    setTimeout(function () {
        // after 1000ms, call the `setTimeout` callback
        // In the meantime, continue executing code below
        setTimeout(function () {
            setTimeout(function () {
                $("#exampleModal1 > div > div > div.modal-footer.text-center").html("<h4 class='alert-heading animate__animated animate__backInLeft text-center'>Aguarde...</h4><h4 class='animate__animated animate__backInLeft text-center'>Estamos preparando o ambiente</b><h4>");
            }, 4000)
            //function1() //runs second after 1100ms
        }, 4000)
        $("#exampleModal1 > div > div > div.modal-footer.text-center").html("<h4 class='alert-heading animate__animated animate__backInLeft text-center'>Aguarde...</h4><h4 class='animate__animated animate__backInLeft text-center'>Concluindo o processo</b><h4>");
        //function2() //runs first, after 1000ms
    }, 2000);*/
}

function aguarda2() {
    //$('body').loadingModal({ text: '' }).loadingModal('animation', 'threeBounce');

    $('#exampleModal2').modal('show');
    $('#exampleModal2').find('modal-header').empty();
    $('#imgModal2').attr('src', './images/' + vEscola + '.png');
    //$("#exampleModal2 > div > div > div.modal-footer.text-center").empty();
//    $("#exampleModal2 > div > div > div.modal-footer.text-center").html("<h4 class='alert-heading animate__animated animate__backInLeft text-center'>Aguarde...</h4>");
    /*setTimeout(function () {
        // after 1000ms, call the `setTimeout` callback
        // In the meantime, continue executing code below
        setTimeout(function () {
            setTimeout(function () {
                $("#exampleModal2 > div > div > div.modal-footer.text-center").html("<h4 class='alert-heading animate__animated animate__backInLeft text-center'>Aguarde...</h4><h4 class='animate__animated animate__backInLeft text-center'>Estamos preparando o ambiente</b><h4>");
            }, 4000)
            //function1() //runs second after 1100ms
        }, 4000)
        $("#exampleModal2 > div > div > div.modal-footer.text-center").html("<h4 class='alert-heading animate__animated animate__backInLeft text-center'>Aguarde...</h4><h4 class='animate__animated animate__backInLeft text-center'>Concluindo o processo</b><h4>");
        //function2() //runs first, after 1000ms
    }, 2000);*/
}

function exibeErro(e) {
    $("#exampleModal1 > div > div > div.modal-header > button").trigger('click');
    $("#content").empty();
    $("#content").html('<div class="row box-body"><div class="col-md-6"><div class="alert alert-warning alert-dismissible">' +
        '<h4><i class="icon fa fa-warning"></i> Oops!</h4>' +
        'Nenhum registro foi encontrado.' +
        '</div></div></div>');
    //$('body').loadingModal('destroy');
}

function exibeErro080() {
    $('#exampleModal1').modal('hide');
    $("#myModal2 .modal-header").find('h4').html('<i class="fa fa-info-circle margin-r-5"></i> AVISO');
    $('#myModal2 .modal-foto').attr('src', $('#imgfoto').attr('src'));
    $('#myModal2 .modal-header').addClass('bg-' + $("#cor").val());
    $('#myModal2 .modal-body').html('<ul class="list-group list-group-flush">' +
        '<li class="list-group-item" style="text-align: justify;text-justify: inter-word; font-family: Times New Roman, Times, serif;"><strong>Prezado aluno! não foi possível seu ACESSO. Necessário efetuar renovação de sua matrícula. Qualquer dúvida ou dificuldade, entre em contato através dos seguintes canais de comunicação:</strong></li>' +
        '<li class="list-group-item"><strong style="font-style: italic;">Secretaria</strong></li>' +
        '<li class="list-group-item"><a href="tel:+5571991654976"><i class="fa fa-phone"/> +55 71 99165-4976</a></li>' +
        '<li class="list-group-item"><a href="mailto:secretaria@fortesformacaotecnica.com.br"><i class="fa fa-envelope"/> secretaria@fortesformacaotecnica.com.br</a></li>' +
        '<li class="list-group-item"><strong style="font-style: italic;">Setor Financeiro</strong></li>' +
        '<li class="list-group-item"><a href="tel:+5571991298016"><i class="fa fa-phone"/> 71 99129-8016</a></li>' +
        '<li class="list-group-item"><a href="tel:+5571991985224"><i class="fa fa-phone"/> 71 99198-5224</a></li>' +
        '<li class="list-group-item"><a href="mailto:acordo@fortesformacaotecnica.com.br"><i class="fa fa-envelope"/> acordo@fortesformacaotecnica.com.br</a></li>' +
        '<li class="list-group-item"><strong style="font-style: italic;">Fixo/Geral</strong></li>' +
        '<li class="list-group-item"><a href="tel:+557133227926"><i class="fa fa-phone"/> 71 3322-7926</a></li>' +
        '<li class="list-group-item"><a href="tel:+557133220317"><i class="fa fa-phone"/> 71 3322-0317</a></li>' +
        '</ul>');

    $('#myModal2').modal('show');
}

function zMesExtenso(zDia) {
    switch (zDia) {
        case "01": return "Janeiro";
            break;
        case "02": return "Fevereiro";
            break;
        case "03": return "Março";
            break;
        case "04": return "Abril";
            break;
        case "05": return "Maio";
            break;
        case "06": return "Junho";
            break;
        case "07": return "Julho";
            break;
        case "08": return "Agosto";
            break;
        case "09": return "Setembro";
            break;
        case "10": return "Outubro";
            break;
        case "11": return "Novembro";
            break;
        case "12": return "Dezembro";
            break;
    }
}

function GetTodayDate() {
    var tdate = new Date();
    var dd = tdate.getDate(); //yields day
    var MM = tdate.getMonth(); //yields month
    var yyyy = tdate.getFullYear(); //yields year
    var currentDate = dd + "-" + (MM + 1) + "-" + yyyy;

    return currentDate;
}
function GetTodayDate1() {
    var tdate = new Date();
    var dd = tdate.getDate(); //yields day
    var MM = tdate.getMonth(); //yields month
    var yyyy = tdate.getFullYear(); //yields year

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (MM < 10) {
        MM = (MM + 1);
        MM = '0' + MM;
    }
    var currentDate = yyyy + "-" + MM + "-" + dd;

    return currentDate;
}

function getUrlParameter(search_param) {
    // get string of paramters
    var url_part = window.location.search.substring(1);
    // decode string
    var decoded_url_part = decodeURIComponent(url_part);
    // split on the basis of "&"
    var params = decoded_url_part.split('&');

    //iterate throw each param and find if it matches required component
    for (i = 0; i < params.length; i++) {
        param = params[i].split('=');
        if (search_param == param[0]) {
            return param[1];
        }
    }
    // console.log(splitted);
}	