var calDirectory = {

};

var calPage = new Page("calendar", calInit, null, calDirectory);

//sub-button functions. have to be BEFORE calInit
function leftMonth() {
  //goes to the previous month, eg. Feb -> Jan
  var htmlString = "<p class = 'header'> SUTD Canteen. 2.201 </p>";
  var img = "<img src = '/img/canteen.png'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;
}

function rightMonth() {
  //goes to the next month, eg. Feb -> Mar
  var htmlString = "<p class = 'header'> IDC SUTD. 3.101 </p>";
  var img = "<img src = '/img/idc.png'>";
  display.innerHTML = htmlString;
  display.innerHTML += img;

}

function select() {
  //Selects date cursor is currently hovering over, enters DAY SCREEN
}
//end of page-specific functions

function calInit() {
	loadCalendar();
}

function loadCalendar() {
  hideBox("info");
  hideBox("main");
  hideBox("motd");
  showBox("caldiv");
  var htmlString = "<?php <br />$your_google_calendar='https://calendar.google.com/calendar/embed?src=uniquosity%40gmail.com&ctz=Asia/Singapore'; <br />$url= parse_url($your_google_calendar);<br />$google_domain = $url['scheme'].'://'.$url['host'].dirname($url['path']).'/';<br />$dom = new DOMDocument;<br />$dom->loadHTMLfile($your_google_calendar);<br />$css = $dom->getElementByTagName('link')->item(0);<br />$css_href = $css->getAttributes('href');<br />$css->setAttributes('href', $google_domain . $css_href);<br />$scripts = $dom->getElementByTagName('script')->item(0);<br />foreach ($scripts as $script) {<br />$js_src = $script->getAttributes('src');<br />if ($js_src) $script->setAttributes('src', $google_domain . $js_src);<br />}<br />$element = $dom->createElement('link');<br />$element->setAttribute('type', 'text/css');<br />$element->setAttribute('rel', 'stylesheet');<br />$element->setAttribute('href', '/css/custom_calendar.css');<br />$head = $dom->getElementByTagName('head')->item(0);<br />$head->appendChild($element);<br />echo $dom->saveHTML();<br />?>"

  //var htmlString = '<iframe src="https://calendar.google.com/calendar/embed?src=uniquosity%40gmail.com&ctz=Asia/Singapore" class = "calendar"></iframe> <link rel="stylesheet" href="/css/calendar.css">';
  //var img = "<img src = '/img/school.png'>";
  caldiv.innerHTML = htmlString;
  //display.innerHTML += img;
	calDirectory[KEY_1] = mainPage.init.bind(mainPage);
	calDirectory[KEY_2] = leftMonth;
	calDirectory[KEY_3] = rightMonth;
  calDirectory[KEY_4] = leftDay;
  calDirectory[KEY_5] = rightDay;
  calDirectory[KEY_6] = upDay;
  calDirectory[KEY_7] = downDay;
  calDirectory[KEY_8] = select;
}

//I HAVENT EDITED THIS PAGE YET. JUST USED DIRECTIONS.JS AS A TEMPLATE.
