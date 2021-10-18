$(document).ready(function () {

    //page 1
    $(".close").on("click", function () {
        $(".cookie-banner").fadeOut(750);
        console.log("Cookie banner closed");
    });

})


$('#button').onClick(function(){
    $('#kitty').addClass('animate_jump');
});
