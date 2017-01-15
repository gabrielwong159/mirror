function introduction() {
var htmlString = "<p> Welcome to SUTD. Which Location would you like displayed? </p>");
mapsDiv.innerHTML = htmlString;


}

function printCanteen() {
  var htmlString = "<p> SUTD Canteen. 2.201 </p>";
  var img = 'img/canteen.png';
  locationDiv.innerHTML = htmlString;
  locationDiv.img = img;
}

function printIDC() {
  var htmlString = "<p> IDC SUTD. 3.101 </p>";
  var img = 'img/idc.png';
  locationDiv.innerHTML = htmlString;
  locationDiv.img = img;
}
