function updateDate() {
    var date = moment(new Date());
    var htmlString = '<p>' + date.format('dddd, MMMM Do') + '</p>';
    htmlString+= '<p id="time">' + date.format('HH:mm') + '</p>';
    document.getElementById("date").innerHTML = htmlString;
};

$(document).ready(function() {
    updateDate();
    setInterval(updateDate, 60000);
});