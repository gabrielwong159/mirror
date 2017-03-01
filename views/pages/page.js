//each page stores the functions that are called when entering, and leaving the page
//each page also stores the link to the next page, depending on the keypress

var init;
var stop;

function Page(name, init, stop, directory = defaultDirectory) {
	this.name = name;
	this.stop = stop;
	this.directory = directory;

	this.init = function() {
		currentPage = this;
		init();
	}

	this.setDirectory = function(directory) {
		this.directory = directory;
	}
}