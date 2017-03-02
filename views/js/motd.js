$(document).ready(function() {
    var motdDiv = document.getElementById("motd");
    
    var messages = [
    	'"Everything is better when it flies."',
    	'"Hell is other people."',
    	'"What does fashion lack? Microcontrollers."',
    	'"Peanut butter is the glue that holds my body together."',
    	'"Weeks of programming can save you hours of planning."'
    ];
    
    var htmlString = messages[Math.floor(Math.random()*messages.length)];
    motdDiv.innerHTML = "<p>" + htmlString + "</p>";
});