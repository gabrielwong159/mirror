<<<<<<< HEAD
=======

>>>>>>> origin/master
$(document).ready(function() {
	document.addEventListener("keydown", keyPressed);
	mainPage.init();
});

function keyPressed(event) {
	busPage.stop();
<<<<<<< HEAD
=======
	// debugger;
>>>>>>> origin/master
	currentPage.directory[event.which]();
	console.log(`Current Page: ${currentPage.name}`)
}
