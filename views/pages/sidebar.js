//sidebar entries are arranged by 'left' and 'right'
//followed by 1,2,3,4 from top to bottom

const mainSidebar = {
	left: {
		1: '/img/icons/home.png',
		2: '/img/icons/news.png',
		3: '/img/icons/calendar.png',
		4: ''
	},

	right: {
		1: '/img/icons/bus.png',
		2: '/img/icons/location.png',
		3: '',
		4: ''
	}
};

const newsSidebar = {
	left: {
		1: '/img/icons/home.png',
		2: '',
		3: '',
		4: ''
	},

	right: {
		1: '/img/icons/more.png',
		2: '',
		3: '',
		4: ''
	}
};

const directionsSidebar = {
	left: {
		1: '/img/icons/home.png',
		2: '/img/icons/canteen.png',
		3: '/img/icons/ahlt.png',
		4: ''
	},

	right: {
		1: '',
		2: '/img/icons/audi.png',
		3: '/img/icons/fablab.png',
		4: ''
	}
};

const clearSidebar = {
	left: {
		1: '',
		2: '',
		3: '',
		4: ''
	},

	right: {
		1: '',
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
	else if (pageType == "directions") sidebar = directionsSidebar;
	else sidebar = clearSidebar;

	for (var i=1; i<=4; i++) {
		leftHtml+= "<img class='sidebarIcon' src='" + (sidebar.left[i] ? sidebar.left[i] : '/img/icons/blank.png') + "'>";
		rightHtml+= "<img class='sidebarIcon' src='" + (sidebar.right[i] ? sidebar.right[i] : '/img/icons/blank.png') + "'>";
	}

	$leftSidebar.innerHTML = leftHtml;
	$rightSidebar.innerHTML = rightHtml;
}