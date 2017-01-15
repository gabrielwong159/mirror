## Overview of files
This is quick explanation of the files in the repository.

##### views/index.ejs
Home page for the website, much like index.html

### views/js
Scripts for the information bar
##### clock.js
Update the current time every minute
##### motd.js
Prints a new random message at the bottom of the screen each time the document is loaded
##### skycons.js
Creates the nice little weather animation. Used by ```weather.js```
##### toggle.js
Handles the keyboard controls of the web page
##### weather.js
Updates the weather every 5 minutes

### views/js/vendor
Open source scripts

### views/pages
Contains the scripts for loading various pages. For example, ```bus.js``` contains scripts retrieve bus arrival timing, and load the information into the web page.