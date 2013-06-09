$(document).ready(function () {
    $('.tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $(".slider").noUiSlider({

            range: [0, 100],
            start: [50, 70],
            handles: 2,
            serialization: {
                to: [$("#exTO"), $("#exFR")]
            }

        });
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

            range: [0, 100],
            start: 0,
            step: .01,
            handles: 1,
            serialization: {
                to: $("#vmua")
            }
        });


    $("#delta").noUiSlider({

            range: [0, 100],
            start: 0,
            step: .01,
            handles: 1,
            serialization: {
                to: $("#vdelta")
            }
        });

    $("#velocidad").noUiSlider({

            range: [0, 100],
            start: 0,
            step: .01,
            handles: 1,
            serialization: {
                to: $("#vvelocidad")
            }
        });

    $("#general").noUiSlider({

            range: [0, 100],
            start: 0,
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

    var nservidor;
    var cola;
    var mua;
    var delta;
    var tmp = {};
    var velocidad;
    var general;

    $('#siguiente').click(function () {
        nservidor = $('#nservidor').val();
        cola = $('#cola').val();
        mua = $('#vmua').val();
        delta = $('#vdelta').val();

        $("#myTab  a.second").tab('show');

        for (var i = 1; i <= nservidor; i++) {
            $("#servidores").append(
                [
                    $('<span>', {
                            class: 'p',
                            html: '&mu;_s Servidor ' + i,
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
                    range: [0, 100],
                    start: 0,
                    step: .01,
                    handles: 1,
                    serialization: {
                        to: $("#vservidor" + i)
                    }
                });
        };

    });

    $('#crear').click(function () {
        $("#play").show('slow');
        $("#stop").show('slow');
        for (var i = 1; i <= nservidor; i++) {
            tmp[i - 1] = $('#vservidor' + i).val();
        };
        velocidad = $('#vvelocidad').val();
        general = $('#vgeneral').val();
    });

    $('#generar').click(function () {
        $("#myTab  a").tab('show');
        for (var i = 1; i <= nservidor; i++) {
            $('#infos').append([
                    $('<span>', {
                            class: 'p',
                            html: '&mu;_s Servidor' + i + ' : ' + tmp[i - 1],
                            id: 'lservidor' + i
                        }),
                    document.createElement('BR'),
                    document.createElement('BR'),
                ]);
        };
    });
});