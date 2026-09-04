$(document).ready(function () {
    var amaice = $("#amaice");
    var amaiceDialogue = amaice.find(".dialogue");

    $('.dropdown').hide();
    amaice.hide();

    // toggle visibility 
    $('.dropdown-button').click(function(){
        // close
        if($(this).hasClass("open")){
            $(this).parent().find(".dropdown").slideUp();

            $(this).removeClass("open");
            amaice.hide();
        } 
        // open
        else{
            // close all others (only want one open at a time)
            $(".dropdown").slideUp();
            $('.dropdown-button').removeClass("open");

            $(this).parent().find(".dropdown").slideDown();
            $(this).addClass("open");
            // give div(.description) to amaice's dialogue
            var projectDescription = $(this).parent().find(".amaiceComment");
            amaice.show();

            let amaiceName = document.createElement("span");
            amaiceName.textContent = "amaice";
            amaiceName.classList.add("amaiceName");
            let seperator = document.createElement("span");
            seperator.textContent = " ~ ";


            amaiceDialogue.html(projectDescription.html());
            amaiceDialogue.prepend(seperator);
            amaiceDialogue.prepend(amaiceName);
        }
    });

    // style on hover over 
    $( ".dropdown-button" ).hover(
    function() {
        if(! $(this).parent().find(".dropdown").is(":visible")){
            $( this ).parent().addClass( "hover-hint" );
        } 
    }, function(){
        $( this ).parent().removeClass( "hover-hint" );
    });
});