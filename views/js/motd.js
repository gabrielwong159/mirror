$(document).ready(function() {
    var motdDiv = document.getElementById("motd");
    
    var messages = [
        '"Weeks of programming can save you hours of planning."',
    	'"Everything is better when it flies."',
    	'"Hell is other people."',
    	'"What does fashion lack? Microcontrollers."',
    	'"Peanut butter is the glue that holds my body together."',
        '"It\'s over Anakin, I have the high ground."'
    ];
    
    var htmlString = "";
    if (motdDiv.classList.contains("hide-motd")) htmlString = messages[0];
    else htmlString = messages[Math.floor(Math.random()*messages.length)];
    motdDiv.innerHTML = "<p>" + htmlString + "</p>";
});