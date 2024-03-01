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
    
    
    
    
    // delete convo and reset to starting state (slightly hard coded teehee)
    function resetConversation(){
        var amaiceHelloText = document.getElementById('amaice-hello').textContent;         

        // delete all in conversation-container
        document.querySelectorAll('#conversation-container *').forEach(obj => obj.remove());
        
        var conversationContainer = document.getElementById('conversation-container');        
        
        //<p id="conversation" class="codey-text">> Hi all. Welcome to my domain of fun colors and wacky things! Please enjoy yourself and don't get lost</p>
        var hello = document.createElement('p');
        hello.className = "codey-text";
        hello.id = "amaice-hello";
        hello.textContent = amaiceHelloText;
        conversationContainer.appendChild(hello);
                
        //<button id="thanksButton" onclick="handleResponse('thanks weird girl')">thanks weird girl</button>
        var thanksButton = document.createElement('button');
        thanksButton.textContent = 'thanks weird girl';
        thanksButton.addEventListener('click', function () {
            handleResponse('thanks weird girl');
        });
        conversationContainer.appendChild(thanksButton);
        
        //<button id="getLostButton" onclick="handleResponse('im definitely going to get lost')">im definitely going to get lost</button>
        var getLostButton = document.createElement('button');
        getLostButton.textContent = 'im definitely going to get lost';
        getLostButton.addEventListener('click', function () {
            handleResponse('im definitely going to get lost');
        });
        conversationContainer.appendChild(getLostButton);
    }
    
    var resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', function () { resetConversation(); });
    
    
    
        
    function handleResponse(responseText) { 
        // hey stop looking at the dialogue
        let items = [
            ["thanks weird girl", "you're welcome !!", "sorry for calling you weird, it was just a dialogue option", "bye"],
            ["im definitely going to get lost", "oh well. that just means you'll have to be with me forever :)", "that sounds awful", "that sounds great"],
            
            ["that sounds awful","do you mean that o(╥﹏╥)o", "i do", "i was just teasing, sorry", "convince me otherwise"],
            ["i do", "well i know a witch thatll break your fridge so dont make me tattle", "you look like a rat"],
            ["you look like a rat", "I AM VERY CUTE DONT SAY THAT", "rat"],
            ["rat", "IM TELLING MY WITCH GIRLFRIEND ๐·°(⋟﹏⋞)°·๐", "hahahahaha"],
            
            ["convince me otherwise", "<img src='michael.jpg", "what is that"],
            ["what is that", "proof that im cool?? hes so funny", "..."],
            ["...", "???", "im never talking to you again"],
            
            ["i was just teasing, sorry", "i appreciate the honesty, as such, i bestow onto you a great honor, choose a color", "#d95455", "#f6bd60", "#5ec6ba", "#ffb4c5", "oh thats cool thanks"],
            ["oh thats cool thanks", "you're welcome \(*T▽T*)/"],
            
            ["that sounds great","yea! ill look for some pillows", "cool :) ill just wait for you to come back"],
            
            ["sorry for calling you weird, it was just a dialogue option", "that's okay! i was the one who wrote it sooo", "why did you write that?"],
            ["why did you write that?", "well aren't you FULL of questions huh, i could ask the same of you", "i didn't write it"],
            ["i didn't write it", "SHUT UP SHUT UP SHUT UP", "sorry?", "SHUT UP"],
            ["SHUT UP", "SHUSH YOURSELF", "sorry?", "SHUT UP"],
            ["sorry?", "its okay (^_^)", "you seem unstable"],
            ["you seem unstable", "what ?! how ?!?! im super cute and ceo of a cool artsy studio tho!! ", "that doesn't mean much, i mean look at miyazaki"],
            ["that doesn't mean much, i mean look at miyazaki", "who", "HOW DO YOU HAVE THIS JOB"],
            
            ["bye", "wait!!! before you leave, have this gift", "what is it?"],
            ["what is it?", "ummmm i can only put stuff in this text box so i dont know", "think of something"],
            ["think of something", "ummmmmmmmmmmmm", "you liar, you said you had a gift"],
            ["you liar, you said you had a gift", "IM SORRY OKay I have it", "show"],
            ["show", "a poem by amaice: i saw a frog and named it raine / it threw a guitar at me and ran away", "that was awful"],
            ["that was awful", "IM SOBBING"]
        ];
        
        // responses that start with '#' WILL try to change the color to that string and then break
        if(responseText.charAt(0) === '#'){
            document.documentElement.style.setProperty('--response-color', responseText);
            return
        }
         
        var conversationContainer = document.getElementById('conversation-container');        
        var matchingSubarray = items.find(subarray => subarray[0] === responseText);

        // append chosen response to <p> conversation
        let response = document.createElement('p');
        response.className = "codey-text-response";
        response.textContent = "> " + responseText;
        conversationContainer.appendChild(response);
        
        // del all button responses
        document.querySelectorAll('#conversation-container button').forEach(button => button.remove());

        // append amaice response to <p> conversation
        var newParagraph = document.createElement('p');
        newParagraph.classList.add('codey-text');
        newParagraph.textContent = '> ' + matchingSubarray[1];
        
        // responses that start with <img'
        if(matchingSubarray[1].substr(0,4) === "<img"){
            let newImg = document.createElement('img');
            newImg.src = '/media/' + matchingSubarray[1].substr(10,responseText.length - 10);
            conversationContainer.appendChild(newImg);
            newParagraph.textContent += "'>"
        }
        conversationContainer.appendChild(newParagraph);


        let i = 2;
        while (i < matchingSubarray.length) {
            // Use a closure to capture the value of i
            (function (index) {
                let newButton = document.createElement('button');
                newButton.textContent = matchingSubarray[index];
                newButton.addEventListener('click', function () {
                    handleResponse(matchingSubarray[index]);
                });
                conversationContainer.appendChild(newButton);
            })(i);

            i++;
        }
    }
    
    // for the two first diologue button options
    var thanksButton = document.getElementById('thanksButton');
    var getLostButton = document.getElementById('getLostButton');

    thanksButton.addEventListener('click', function () {
        handleResponse('thanks weird girl');
    });

    getLostButton.addEventListener('click', function () {
        handleResponse('im definitely going to get lost');
    });
});