//sidebar entries are arranged by 'left' and 'right'
//followed by 1,2,3,4 from top to bottom

const mainSidebar = {
	left: {
		1: '',
		2: 'News',
		3: 'Calendar',
		4: ''
	},

	right: {
		1: 'Bus',
		2: 'Directions',
		3: '',
		4: ''
	}
};

const newsSidebar = {
	left: {
		1: 'Back',
		2: '',
		3: '',
		4: ''
	},

	right: {
		1: 'More',
		2: '',
		3: '',
		4: ''
	}
};


var $leftSidebar = document.getElementById("leftSidebar");
var $rightSidebar = document.getElementById("rightSidebar");

function loadSidebar(pageType) {
	var sidebar = null;
	var leftHtml = "";
	var rightHtml = "";

	if (pageType == "main") sidebar = mainSidebar;
	else if (pageType == "news") sidebar = newsSidebar;

	for (var i=1; i<=4; i++) {
		leftHtml+= "<p>" + sidebar.left[i] + "</p>";
		rightHtml+= "<p>" + sidebar.right[i] + "</p>";
	}

	$leftSidebar.innerHTML = leftHtml;
	$rightSidebar.innerHTML = rightHtml;
}