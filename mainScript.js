$(document).ready(function () {
    // banner
    $(".close").on("click", function () {
        $(".cookie-banner").fadeOut(750);
    });
    
    // submenus
    $('#nav li').hover(
    function () {
        //show drop down
        $('ul', this).slideDown("fast");
    }, function () {
        //hide drop down
        $('ul', this).slideUp("fast");
    });
    
    
    
    
    //update year "copyright"
    document.getElementById("year").innerHTML = new Date().getFullYear();
    
    
    
    // for the two first diologue button options
    var thanksButton = document.getElementById('thanksButton');
    var getLostButton = document.getElementById('getLostButton');
    
    thanksButton.addEventListener('click', function () {
        handleResponse('thanks weird girl');
    });

    getLostButton.addEventListener('click', function () {
        handleResponse('im definitely going to get lost');
    });
    
    function handleResponse(responseText) {    
        var items = [
          ["thanks weird girl", "you're welcome !!", "bye", "byeee"],
          ["im definitely going to get lost", "oh well. that just means you'll have to be with me forever :)", "that sounds awful", "that sounds great"],
        ];
                
        var conversationContainer = document.getElementById('conversation-container');
        
        var matchingSubarray = items.find(subarray => subarray[0] === responseText);
        
        // put chosen response into <p>
        var response = document.createElement('p');
        response.className = "codey-text-response";
        response.textContent = "> " + responseText;
        conversationContainer.appendChild(response);
        
        // del all button responses
        document.querySelectorAll('#conversation-container button').forEach(button => button.remove());

        // Create new <p> element with the amaice response
        var newParagraph = document.createElement('p');
        newParagraph.classList.add('codey-text');
        newParagraph.textContent = '> ' + matchingSubarray[1];
        conversationContainer.appendChild(newParagraph);

        // Add new buttons for the next response
        var newButton1 = document.createElement('button');
        newButton1.textContent = matchingSubarray[2];
        newButton1.onclick = function() {
            handleResponse(matchingSubarray[2]);
        };
        conversationContainer.appendChild(newButton1);

        // button 2
        var newButton2 = document.createElement('button');
        newButton2.textContent = matchingSubarray[3];
        newButton2.onclick = function() {
            handleResponse(matchingSubarray[3]);
        };
        conversationContainer.appendChild(newButton2);
    }
});