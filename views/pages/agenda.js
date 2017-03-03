var agdDirectory = {

};

var agendaPage = new Page("agenda", agdInit, null, agdDirectory);

function agdInit() {
	loadAgenda();
}

function loadAgenda() {
  var dayta = new Date();
	var agdDate = dayta.getDate() + ' ' + dayta.getMonthName()+ ' ' + dayta.getFullYear();
  var htmlString = "<div id = agdHeader> Agenda <br />"+ agdDate + "</div>";
  htmlString += "<div id = agdTable><table id='agTable'><tr><th class='time'>Time</th><th class='event'>Event</th></tr>";
  //content
  htmlString += "<tr><th class='times' id='a1'></th><th class='events' id='a11'></th></tr>"
  htmlString += "<tr><th class='times' id='a2'></th><th class='events' id='a22'></th></tr>"
  htmlString += "<tr><th class='times' id='a3'></th><th class='events' id='a33'></th></tr>"
  htmlString += "<tr><th class='times' id='a4'></th><th class='events' id='a44'></th></tr>"
  htmlString += "<tr><th class='times' id='a5'></th><th class='events' id='a55'></th></tr>"
  htmlString += "<tr><th class='times' id='a6'></th><th class='events' id='a66'></th></tr>"
  htmlString += "<tr><th class='times' id='a7'></th><th class='events' id='a77'></th></tr>"
  htmlString += "<tr><th class='times' id='a8'></th><th class='events' id='a88'></th></tr>"
  //endcontent
  htmlString += "</tr></div>"
  $display.innerHTML = htmlString;
	agdDirectory[KEY_1] = mainPage.init.bind(mainPage);
}
