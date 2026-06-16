/* tarefa.js — versão 20260516b
   Marcador para confirmar no DevTools/Network qual versão está carregando.
   Procure no Console por: console "tarefa.js v20260516b carregado". */
console.log('tarefa.js v20260516b carregado');

function zMesExt(zdata) {
    var vMes = zdata.split('/')[1];
    var semana = [
        "DOMINGO",//0
        "SEGUNDA-FEIRA",//1
        "TERCA-FEIRA",//2
        "QUARTA-FEIRA",//3
        "QUINTA-FEIRA",//4
        "SEXTA-FEIRA",//5
        "SABADO"];//6
    var data = zdata;
    var arr = data.split("/").reverse();
    var teste = new Date(arr[0], arr[1] - 1, arr[2]);
    var dia = teste.getDay();
    // Obtém a data/hora atual
    var data = new Date();

    // Guarda cada pedaço em uma variável
    var xdia = data.getDate();           // 1-31
    var dia_sem = data.getDay();            // 0-6 (zero=domingo)
    var mes = data.getMonth();          // 0-11 (zero=janeiro)
    var ano2 = data.getYear();           // 2 dígitos
    var ano4 = data.getFullYear();       // 4 dígitos
    var hora = data.getHours();          // 0-23
    var min = data.getMinutes();        // 0-59
    var seg = data.getSeconds();        // 0-59
    var mseg = data.getMilliseconds();   // 0-999
    var tz = data.getTimezoneOffset(); // em minutos

    if (xdia < 10) {
        xdia = '0' + xdia;
    }
    if (mes < 10) {
        mes = (mes + 1);
        mes = '0' + mes;
    }

    // Formata a data e a hora (note o mês + 1)
    var str_data = xdia + '-' + (mes) + '-' + ano4;
    var str_data1 = (((xdia - 1) < 10) ? '0' + (xdia - 1) : (xdia - 1)) + '-' + (mes) + '-' + ano4;
    var str_data2 = (xdia + 1) + '-' + (mes) + '-' + ano4;
    var str_hora = hora + ':' + min + ':' + seg;

    // Mostra o resultado
    if (str_data == zdata.split('/')[0] + '-' + zdata.split('/')[1] + '-' + zdata.split('/')[2]) {
        semana[dia] = "HOJE";
    } else {

        if (str_data1 == zdata.split('/')[0] + '-' + zdata.split('/')[1] + '-' + zdata.split('/')[2]) {
            semana[dia] = "ONTEM";
        } else {
            if (str_data2 == zdata.split('/')[0] + '-' + zdata.split('/')[1] + '-' + zdata.split('/')[2]) {
                semana[dia] = "AMANHÃ";
            } else {
                //console.log(str_data2 + zdata.split('/')[0] + '-' + zdata.split('/')[1] + '-' + zdata.split('/')[2]);
            }
        }
    }

    switch (vMes) {
        case "01": vMes = "janeiro"; break;
        case "02": vMes = "fevereiro"; break;
        case "03": vMes = "março"; break;
        case "04": vMes = "abril"; break;
        case "05": vMes = "maio"; break;
        case "06": vMes = "junho"; break;
        case "07": vMes = "julho"; break;
        case "08": vMes = "agosto"; break;
        case "09": vMes = "setembro"; break;
        case "10": vMes = "outubro"; break;
        case "11": vMes = "novembro"; break;
        case "12": vMes = "dezembro"; break;
        default:
    }

    return semana[dia] + '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + zdata.split('/')[0] + ' DE ' +
        vMes.toUpperCase().substr(0, 3) + ' DE ' +
        zdata.split('/')[2];
}

function tarefaClick(e) {
    e.preventDefault();

    var vEscola = $(".fotoAtual").attr("data-escola");
    var vCodigo = $(".fotoAtual").attr("data-codigo");
    window.open(`https://alunoapp.sistema2.com.br/url.php?codescola=${vEscola}&url=https://alunoapp.sistema2.com.br/tarefa.php?codescola=${vEscola}&codigo=${vCodigo}&pagina=1`);
}
