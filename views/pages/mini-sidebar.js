function linearizeSidebar(o) {
	res = [];
	for (var i=1; i<=4; i++) {
		res.push(o.left[i]);
		res.push(o.right[i]);
	}
	return res;
}

function loadSidebar(pageType) {
	var $sidebar = document.getElementById("mini-sidebar");
	
	if (sidebars[pageType]) sidebar = sidebars[pageType];
	else sidebar = clearSidebar;

	sidebar = linearizeSidebar(sidebar);
	var htmlString = "";
	for (var i=0; i<6; i++) htmlString+= "<img class='sidebarIcon' src='" + (sidebar[i] ? sidebar[i] : '/img/icons/blank.png') + "'>";

	$sidebar.innerHTML = htmlString;
}