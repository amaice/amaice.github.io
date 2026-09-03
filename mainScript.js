$(document).ready(function () {
    // Load navigation first
    $("#header-placeholder").load("/header.html", function () {});

    // Submenus
    $('#con .con-box > div').mouseenter(function () {
        $(this).find('ul').stop(true, true).slideDown("fast");
    }).mouseleave(function () {
        $(this).find('ul').stop(true, true).slideUp("fast");
    });

    // banner
    $(".close").on("click", function () {
        $(".cookie-banner").fadeOut(750);
    });

    //update year "copyright"
    document.getElementById("year").innerHTML = new Date().getFullYear();
});