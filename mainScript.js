$(document).ready(function () {

    //page 1
    $(".close").on("click", function () {
        $(".cookie-banner").fadeOut(750);
        console.log("Cookie banner closed");
    });

})
/*I'm not sure if this is bad practice but I put each page into a separate document.ready so I can minimize it*/
$(document).ready(function () {

    //page 3
    var debate = "hate";
    $("#more").hide();
    $(".switch-debate").click(function () {
        if (debate == "hate") {
            $("body").css("font-family", "Comic Sans MS");
            $(".row > div").css("color", "pink");
            $(".div2").css("background-image", "repeating-linear-gradient(palegoldenrod, hotpink)");
            $(".div2").css("text-shadow", "3px 3px 3px #333");

            $("#hate-love-header").html("Pangolin Love Page");
            $("#hate-love-paragraph").html("I was NOT forced to make this page. If you're not familiar with Pangolins, they're like the Pokemon, sandshrew, but better! Hope that explains things.")
            $("#less").hide();
            $("#more").show();

            debate = "love";
            return;
        }
        if (debate == "love") {
            $("body").css("font-family", "Adobe Myungjo Std");
            $(".row > div").css("color", "white");
            $("#hate-love-header").html("Pangolin Hate Page");
            $(".div2").css("text-shadow", "none");

            $(".div2").css("background-image", "repeating-linear-gradient(#050a24, black)");
            $("#hate-love-paragraph").html("I was forced to make this page.If you're not familiar with Pangolins, they're like the Pokemon, sandshrew, but worse. Hope that explains things.");
            $("#less").show();
            $("#more").hide();
            debate = "hate";
            return;
        }

    });
})

$(document).ready(function () {
    //chess page 5

    //make chessboard
    for (var file = 0; file < 8; file++) {
        $("#chessboard").append(`<div id="file-${(file + 10).toString(36)}"></div>`);
        for (var rank = 8; rank >= 1; rank--) {
            $(`#file-${(file + 10).toString(36)}`).append(`<div class="square" id="${(file + 10).toString(36)}${rank}"></div>`);
        }
    }
    $("#a1, #h1").append(`<img draggable="true" class="item" src="MEDIA/chesss/WR.png" />`)
    $("#b1, #g1").append(`<img draggable="true" class="item" src="MEDIA/chesss/WN.png" />`)
    $("#c1, #f1").append(`<img draggable="true" class="item" src="MEDIA/chesss/WB.png" />`)
    $("#d1").append(`<img draggable="true" class="item" src="MEDIA/chesss/WQ.png" />`)
    $("#e1").append(`<img draggable="true" class="item" src="MEDIA/chesss/WK.png" />`)
    $("#a2, #b2, #c2, #d2, #d2, #e2, #f2, #g2, #h2").append(`<img draggable="true" class="item" src="MEDIA/chesss/WP.png" />`)

    $("#a8, #h8").append(`<img draggable="true" class="item" src="MEDIA/chesss/BR.png" />`)
    $("#b8, #g8").append(`<img draggable="true" class="item" src="MEDIA/chesss/BN.png" />`)
    $("#c8, #f8").append(`<img draggable="true" class="item" src="MEDIA/chesss/BB.png" />`)
    $("#d8").append(`<img draggable="true" class="item" src="MEDIA/chesss/BQ.png" />`)
    $("#e8").append(`<img draggable="true" class="item" src="MEDIA/chesss/BK.png" />`)
    $("#a7, #b7, #c7, #d7, #e7, #f7, #g7, #h7").append(`<img draggable="true" class="item" src="MEDIA/chesss/BP.png" />`)


    //ui - the clock
    var blacktime = 600;
    var blackminute;
    var blacksecond;
    var whitetime = 600;
    var whiteminute;
    var whitesecond;
    var whosturn = 'nobody';

    $("#whitebutton").click(function () {
        if (whosturn == 'white') {
            whosturn = 'black';
            $("#whitetimertext").css("background-color", "#f2e9ec");
            $("#whitetimertext").css("font-weight", "normal");
            $("#blacktimertext").css("background-color", "#785d3d");
            $("#blacktimertext").css("font-weight", "bold");
            callblack();
        }
        else {
            alert("Either an error occured or you pressed your clock when it was not your turn.");
        }
    });
    $("#blackbutton").click(function () {
        if (whosturn == 'black' || 'nobody') {
            whosturn = 'white';
            $("#whitetimertext").css("background-color", "#a88254");
            $("#whitetimertext").css("font-weight", "bold");
            $("#blacktimertext").css("background-color", "#26211b");
            $("#blacktimertext").css("font-weight", "normal");
            callwhite();
        }

        else {
            alert("Either an error occured or you pressed your clock when it was not your turn.");
        }
    });


    function callwhite() {
        var whiteclock = setInterval(function () {
            whiteminute = floor(whitetime / 60);
            whitesecond = whitetime - (whiteminute * 60);

            /* if ((whitesecond + "").length === 1) {
                    hours = "0" + whitesecond;
            if ((whiteminute + "").length === 1) {
                hours = "0" + whiteminute;
            }*/

            document.getElementById("whitetimertext").innerHTML = whiteminute + ":" + whitesecond;


            /*document.getElementById("whitetimertext").innerHTML = whitetime;*/
            whitetime--;
            if (whosturn == 'black') {
                clearInterval(whiteclock);
            }
            if (whitetime <= 0) {
                clearInterval(whiteclock);
                clearInterval(blackclock);
                whosturn = 'gameover';
                document.getElementById("whitetimertext").innerHTML = 'Lose';
                document.getElementById("blacktimertext").innerHTML = 'Win';

            }
        }, 1000)
    }

    function callblack() {
        var blackclock = setInterval(function () {
            /*blackminute = floor(blacktime / 60);
            blacksecond = blacktime - (blackminute * 60);
            document.getElementById("blacktimertext").innerHTML = blackminute + ":" + blacksecond;*/

            /*if ((blackminute + "").length === 1) {
                hours = "0" + blackminute;
            if ((blacksecond + "").length === 1) {
                hours = "0" + blacksecond;
            }
            */
            document.getElementById("blacktimertext").innerHTML = blacktime;
            blacktime--;
            if (whosturn == 'white') {
                clearInterval(blackclock);
            }
            if (blacktime <= 0) {
                clearInterval(blackclock);
                document.getElementById("blacktimertext").innerHTML = 'Lose';
                document.getElementById("whitetimertext").innerHTML = 'Win';
                whosturn = 'gameover';

            }
        }, 1000)
    }


})
$(document).ready(function () {

    //drag drop api
    var $draggedItem;

    $(function () {
        $('.item').on('dragstart', dragging);
        $('.item').on('dragend', dragend);
        $('.square').on('dragenter', allowDragging);
        $('.square').on('dragover', allowDragging);
        $('.square').on('drop', dropping);


        function allowDragging(e) {
            e.preventDefault();
        }

        function dropping(e) {
            var hole = $(e.target);

                
            if (hole.hasClass('item')) {
                hole.hide();
                dropping(); //but, its still there, else is never called
            }
            else {
                $draggedItem.detach();
                $draggedItem.appendTo($(e.target));
            }
/*            $.when(capture()).done(function(){
                $draggedItem.detach();
                $draggedItem.appendTo($(e.target));
            })*/
        }

        function dragging(e) {
            $(e.target).addClass('drag');
            $draggedItem = $(e.target);
        }

        function dragend(e) {
            $(e.target).removeClass('drag');
        }

    })

    //form
    $("#btnRegister").on("click", function () {
        //alert("Register clicked");
        array();
    });

    function array() {
        var formValues = document.getElementById("frmRegister");
        var userValues = "";
        for (var i = 0; i < formValues.length; i++) {
            if (formValues[i].value == "") {
                document.getElementById("errorMessage").innerHTML = "Please complete all form fields";
                return;
            }
            else {
                document.getElementById("errorMessage").innerHTML = "";
                $("body").css("background-color", "black");
                $("body").css("color", "white");
                $("#registerText").hide();
                $("#frmRegister").hide();
                $("#rr").css("display", "block");
                return;
            }

        }
        /*        document.getElementById('displayuservalues').innerHTML = userValues;*/
    }

})
