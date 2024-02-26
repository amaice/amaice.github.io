$(document).ready(function () {
    //page 1
    $(".close").on("click", function () {
        $(".cookie-banner").fadeOut(750);
        console.log("Cookie banner closed");
    });
    
    // submenu
    $('#nav li').hover(
    function () {
        //show submenu
        $('ul', this).slideDown("fast");
    }, function () {
        //hide submenu
        $('ul', this).slideUp("fast");
    });
    
    $('#nav > li > ul > li').hover(
    function () {
        //show submenu
        $('ul', this).slideDown("fast");
    }, function () {
        //hide submenu
        $('ul', this).slideUp("fast");
    });
    
    //update year "copyright"
    document.getElementById("year").innerHTML = new Date().getFullYear();
})
