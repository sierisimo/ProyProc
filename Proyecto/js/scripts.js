$(document).ready(function () {

    var velocidad, general, creator = {System: {servers:[], queue:{}}};
        $('.tabs a').click(function(e){e.preventDefault();$(this).tab('show');});

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

        $(function () {$('#myTab a:first').tab('show');});

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

        $('#generar').click(function(){$("#myTab a:last").tab('show');});

        $('#siguiente').click(function () {
            creator.System.nservers = $('#nservidor').val(); //nservidor
            creator.System.Delta = $('#vdelta').val();
            creator.System.queue.capacity = $('#cola').val();
            creator.System.queue.Mu_a = $('#vmua').val();
            creator.System.queue = new SProc.Queue(creator.System.queue);
            console.log(creator.System.queue);
            $("#myTab  a.second").tab('show');

            for (var i = 1; i <= creator.System.nservers; i++) {
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

            for (var i = 1; i <= creator.System.nservers; i++) {
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
            
            for (var i = 1; i <= creator.System.nservers; i++) {
                creator.System.servers.push($('#vservidor' + i).val());
            };
            velocidad = $('#vvelocidad').val();
            creator.System.Mu_s = $('#vgeneral').val();

            var mSproc = new SProc({System: new SProc.System(creator.System),Delta:creator.System.Delta});
            mSproc.Canvas.draw('main');
            
            $('#play').click(function(){
                console.log("sier");
            });
        });
        $('#generar').click(function () {
            $("#myTab  a").tab('show');
            for (var i = 1; i <= creator.System.nservers; i++) {
                $('#infos').append([
                        $('<span>', {
                                class: 'p',
                                html: '&mu;_s Servidor' + i + ' : ' + creator.System.servers[i - 1],
                                id: 'lservidor' + i
                            }),
                        document.createElement('BR'),
                        document.createElement('BR'),
                    ]);
            }
        });

    window.sl = creator;
});