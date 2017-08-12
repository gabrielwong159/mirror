//each page stores the functions that are called when entering, and leaving the page
//each page also stores the link to the next page, depending on the keypress

//it is now customary for the init function to declare the directories first
//followed by what is necessary for the page to load

//a stop function can be used to clear intervals, for instance

function Page(name, init, stop) {
	this.name = name;
	this.stop = stop;
	this.directory = {};
	this.globals = {};

	this.init = function() {
		currentPage = this;
		init();
	}
}