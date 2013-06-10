$(function () {
    $("#nservidor").keydown(function (event) {
        if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 9 && event.keyCode != 8) {
            return false;
        }
    });
});

$(function () {
    $("#cola").keydown(function (event) {
        if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 9 && event.keyCode != 8) {
            return false;
        }
    });
});

$(function () {
    $('#myTab a:first').tab('show');
});

function goBack() {
    location.reload()
}

$("#mua").noUiSlider({

    range: [0.01, 100],
    start: 0.01,
    step: .01,
    handles: 1,
    serialization: {
        to: $("#vmua")
    }
});


$("#delta").noUiSlider({

    range: [0.001, 2],
    start: 0.01,
    step: .01,
    handles: 1,
    serialization: {
        to: $("#vdelta")
    }
});

$("#velocidad").noUiSlider({

    range: [0.01, 100],
    start: 0.01,
    step: .01,
    handles: 1,
    serialization: {
        to: $("#vvelocidad")
    }
});

$("#general").noUiSlider({

    range: [0.01, 100],
    start: 0.01,
    step: .01,
    handles: 1,
    serialization: {
        to: $("#vgeneral")
    }
});

$('#generar').click(function () {
    $("#myTab a:last").tab('show');
});

//Declaración de variables

var nservidor, cola, mua, delta, tmp = [],
    velocidad, general;

$('#siguiente').click(function () {

    nservidor = parseFloat($('#nservidor').val());
    cola = parseFloat($('#cola').val());
    mua = parseFloat($('#vmua').val());
    delta = parseFloat($('#vdelta').val());
    if (nservidor < 1 || cola < 1 || isNaN(nservidor)  || isNaN(cola)) {
        alert("Llene correctamente los datos, no se acepta 0, ni un valor nulo.");
        return;
    };

    $("#myTab  a.second").tab('show');

    for (var i = 1; i <= nservidor; i++) {
        $("#servidores").append(
            [
                $('<span>', {
                    class: 'p',
                    html: '&mu;<sub>S</sub> Servidor ' + i,
                    id: 'lservidor' + i
                }),
                document.createElement('BR'),
                document.createElement('BR'),
                $('<div>', {
                    class: "noUiSlider",
                    style: "width: 200px;",
                    id: 'servidor' + i
                }),
                document.createElement('BR'),
                $('<input>', {
                    type: "text",
                    id: 'vservidor' + i,
                    style: "height:20px; width: 40px;"
                }),
                document.createElement('BR')
            ]);
    };

    for (var i = 1; i <= nservidor; i++) {
        $("#servidor" + i).noUiSlider({
            range: [0.00, 100],
            start: 0.00,
            step: .01,
            handles: 1,
            serialization: {
                to: $("#vservidor" + i)
            }
        });
    };

    var politica = $("input:radio[name='politica']:checked").val();

});

$('#crear').click(function () {

    $("#play").show('slow');
    $("#stop").show('slow');
    $('#generar').show('slow');
    for (var i = 1; i <= nservidor; i++) {
        if (parseFloat($('#vservidor' + i).val()) > 0)
            tmp[i - 1] = parseFloat($('#vservidor' + i).val());
    };
    velocidad = parseFloat($('#vvelocidad').val());
    general = parseFloat($('#vgeneral').val());
    var mSproc = new SProc({
        System: new SProc.System({
            servers: tmp,
            nservers: nservidor,
            Mu_s: general,
            queue: new SProc.Queue({
                capacity: cola,
                Mu_a: mua
            }),
        }),
        Delta: delta
    });

    mSproc.Canvas.draw('main');
    window.mSProc = mSproc;
});

$('#generar').click(function () {
    if (mSProc.system.taskLogger != undefined && mSProc.system.taskLogger[0].timeResponse == undefined){
        alert("Simulación en proceso. Por favor, espere a que concluya.");
        return;
    }
    $("#myTab  a").tab('show');
    for (var i = 1; i <= nservidor; i++) {
        var temp;
        if (tmp[i-1] == undefined)
            temp = general;
        else
            temp = tmp[i-1];
        console.log("--------------", temp, "------------");
        $('#infos').append([
            $('<span>', {
                class: 'p',
                html: '<strong>&mu;<sub>S</sub> Servidor </strong>' + i + ' : ' + temp ,
                id: 'lservidor' + i
            }),
            document.createElement('BR'),
            document.createElement('BR'),
        ]);
    };

    var la = 1 / mua;
    var ls = 1 / general;
    var r = la / ls;
    var ver = general / (1 - r);
    var er = ver === Infinity ? 'Indeterminado' : ver;
    var vew = (general * r) / (1 - r);
    var ew = vew === Infinity ? 'Indeterminado' : vew;
    var vex = r / (1 - r);
    var ex = vex === Infinity ? 'Indeterminado' : vex;
    var vexw = (r * r) / (1 - r);
    var exw = vexw === Infinity ? 'Indeterminado' : vexw;


    $('#div1').append(
        [
            $('<span>', {
                class: 'p',
                html: nservidor,
            })
        ]);

    $('#div2').append(
        [
            $('<span>', {
                class: 'p',
                html: cola,
            })
        ]);

    $('#div3').append(
        [
            $('<span>', {
                class: 'p',
                html: mua,
            })
        ]);

    $('#div4').append(
        [
            $('<span>', {
                class: 'p',
                html: delta,
            })
        ]);

    $('#div5').append(
        [
            $('<span>', {
                class: 'p',
                html: general,
            })
        ]);

    $('#div6').append(
        [
            $('<span>', {
                class: 'p',
                html: ls,
            })
        ]);

    $('#div7').append(
        [
            $('<span>', {
                class: 'p',
                html: la,
            })
        ]);

    $('#div8').append(
        [
            $('<span>', {
                class: 'p',
                html: r,
            })
        ]);

    $('#div9').append(
        [
            $('<span>', {
                class: 'p',
                html: er,
            })
        ]);

    $('#div10').append(
        [
            $('<span>', {
                class: 'p',
                html: ew,
            })
        ]);

    $('#div11').append(
        [
            $('<span>', {
                class: 'p',
                html: ex,
            })
        ]);

    $('#div12').append(
        [
            $('<span>', {
                class: 'p',
                html: exw,
            })
        ]);

});