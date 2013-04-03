// ==UserScript==
// @name        OTO Mousehunt
// @author      GaCon
// @version    	2.1
// @namespace   GaCon
// @description Bugatti Veyron for Mousehunt. Many gears, rocket speed !
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @run-at      document-start
// @include     http://mousehuntgame.com/*
// @include     https://mousehuntgame.com/*
// @include     http://www.mousehuntgame.com/*
// @include     https://www.mousehuntgame.com/*
// ==/UserScript==

// The public prefix for this script is UOP_ . All of the outside variable and function will have this prefix.
/**************INIT THE SCRIPT****************
 * Attach the init function to DOMContentLoaded
 * And check if the page fail to load in 15 sec.
 */
var documentLoadCounter = 0;
checkDocumentState();
window.addEventListener('DOMContentLoaded',initialization,false);
function checkDocumentState() {
	if (document.readyState == "loading")
	{
		if (documentLoadCounter > 15) location.reload();
		++documentLoadCounter;
		setTimeout(checkDocumentState,1000);
	}
}

/**************VARIABLES*****************/
//==========Constants==========
//Setting Constants
var C_version = "2.1";
var C_versionCompatibleCode = "1";
var C_ForceNonHTTPS = 1;
var C_SecondInterval = 1;
var C_MinuteInterval = 60;
var C_ShortInterval = 5;
var C_ModerateInterval= 30;
var C_autoInterval = 1;

//Constants
var C_LOCATION_TIMES = [
	{
		name: 'Seasonal Garden',
		shortname: 'SG',
		id: 'UOP_locationTimerSeasonalGarden',
		base: 1283328000,
		totaltime: 1152000,
		length: [288000, 288000, 288000, 288000],
		state: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'],
		shortstate: ['SPR','SUM','FALL','WIN'],
		color: ['LightGreen', 'Yellow', 'Orange', 'LightBlue']
	},
	{
		name: "Balack's Cove",
		shortname: "BC",
		id: 'UOP_locationTimerBalacksCove',
		base: 1294680060,
		totaltime: 67200,
		length: [57600, 3600, 2400, 3600],
		state: ['LOW', 'MEDIUM', 'HIGH', 'MEDIUM'],
		shortstate: ['LOW','MED','HIGH','MED'],
		color: ['#E1C7E1', 'Orange', 'Red', 'Orange']
	},
	{
		name: 'Forbidden Grove',
		shortname: "FG",
		id: 'UOP_locationTimerForbiddenGrove',
		base: 1285704000,
		totaltime: 72000,
		length: [57600, 14400],
		state: ['OPEN', 'CLOSED'],
		shortstate: ['OPEN','CLOSED'],
		color: ['LightGreen', 'Red']
	},
	{
		name: 'Relic Hunter',
		shortname: "RH",
		id: 'UOP_locationTimerRelicHunter',
		base: 1346284800,
		totaltime: 604800,
		length: [86400, 86400, 86400, 86400, 86400, 86400, 86400],
		state: ['Mountain', 'Town of Digby', 'Laboratory', 'S. S. Huntington III', 'Seasonal Garden', 'Slushy Shoreline', 'Muridae Market'],
		shortstate: ['Mt.', 'ToD', 'Lab', 'SSH', 'SG', 'SS', 'MM'],
		color: ['#CD853F', '#8B4513', 'Skyblue', 'Blue', 'Green', 'Silver', '#B22222']
	}
];
//CallbackFunctions

//==========Variables==========
//Setting Variables
var S_skin,S_auto,S_schedule,S_solve,S_server;
var S_ads,S_pause,S_aggressive,S_delaymin,S_delaymax,S_alarm,S_alarmSrc,S_alarmStop,S_alarmStopTime,S_trapCheck,S_trapCheckTime,S_numScript;
var S_cacheKRstr,S_serverUrl;
var S_settingGroupsLength = [415,0];

//Object Variables
var O_titleBar,O_titlePercentage,O_huntTimer,O_locationTimerParent;
var O_mode;
var O_imageBox,O_imagePhoto;

//Variables
var user;
var template = new Array;
var cX = 0,cY = 0;

/*******************INITIALIZATION********************/
function initialization() { //~~~~
	//==========CHECK THE BROWSER LOCATIONS. Ex: login, turn, https, mobile, loaded with error,...==========
	if (checkBrowser() == 1) return;
	
	//==========LOAD SETTINGS==========
	loadSettings();
	
	//==========INIT VARIABLES & TEMPLATE==========
	createTemplate();
	addControlPanel();
	O_hornHeader = document.getElementById('header');
	UOP_huntTimer = document.createElement('div');//~~~~
	
	//==========CALL THE MAIN FUNCTION==========
	main();
}
function checkBrowser() {
	if (window.location.pathname.indexOf('/login.php') != -1) //at login.php
	{
		if (document.getElementsByClassName('login').length == 0) // && logged in
		location.href = "/";
		return 1;
	}
	else if (window.location.pathname.indexOf('/turn.php') != -1) //at turn.php
	{
		location.href = "/";
		return 1;
	}
	else if (getCookie("switch_to") == "mobile") //mobile mode
	{
		return 1;
	}
	else if ((location.pathname == "/index.php")|| (location.pathname == "/")) //at camp
	{
		if ((location.protocol == "https:") && (S_ForceNonHTTPS == 1)) //HTTPS
		{
			location.replace("http"+location.href.substr(5)); //force NON-HTTPS
			return 1;
		}
		if (document.getElementById('campButton') == null) // no camp button aka error
		{
			setTimeout(function () {location.reload();},10000);
			return 1;
		}
	}
}
function createTemplate() { //~~~~
	template[0] = document.getElementById('userGreeting').cloneNode(true);
	template[0].className = "hgMenu";
	template[0].style.paddingTop = "0px";
	template[0].style.paddingLeft = "0px";
	template[0].style.paddingRight = "8px";
	template[0].style.cursor = "pointer";
	template[0].style.height = "35px";
	template[0].firstChild.style.cssFloat = "left";
	template[0].firstChild.style.width = "40px";
	template[0].firstChild.style.position = "relative";
	
	template[0].firstChild.firstChild.removeAttribute('href');
	template[0].firstChild.firstChild.removeAttribute('onclick');
	
	template[0].firstChild.firstChild.removeChild(template[0].firstChild.firstChild.firstChild);
	
	template[0].firstChild.firstChild.firstChild.style.width = "29px";
	template[0].firstChild.firstChild.firstChild.style.height = "29px";
	template[0].firstChild.firstChild.firstChild.style.position = "relative";
	template[0].firstChild.firstChild.firstChild.style.top = "3px";
	template[0].firstChild.firstChild.firstChild.style.left = "0px";
	template[0].firstChild.firstChild.firstChild.style.paddingLeft = "5px";
	template[0].firstChild.firstChild.style.textDecoration = "none";
	template[0].firstChild.firstChild.firstChild.removeAttribute('src');
	
	template[0].lastChild.style.cssFloat = "right";
	template[0].lastChild.style.paddingTop = "10px";
	template[0].lastChild.style.fontSize = "12px";
	template[0].lastChild.style.color = "#64696D";
	template[0].lastChild.style.fontFamily = '"lucida grande",tahoma,verdana,arial,sans-serif';
	template[0].lastChild.style.fontWeight = "bold";
}
/*******************MAIN********************/
function main() { //~~~~
	syncTime(); //~~~~
	
	if (S_ads != 0 || S_skin == 2) removeAds();
	switch (S_skin)
	{
		case 1: defaultSkin();break;
		case 2: simpleSkin();break;
		default: break;
	}
	
	updateHud();
	
	if (S_auto == 0) initAuto();
}
/*******************CONTROL PANEL & SETTINGS*****************/
function loadSettings() {
	if ((!window.localStorage.UOP_versionCompatibleCode) || (window.localStorage.UOP_versionCompatibleCode != C_versionCompatibleCode))
	{
		window.localStorage.UOP_versionCompatibleCode = C_versionCompatibleCode;
		window.localStorage.UOP_skin = 1;
		window.localStorage.UOP_auto = 0;
		window.localStorage.UOP_schedule = 1;
		window.localStorage.UOP_solve = 0;
		window.localStorage.UOP_server = 1;
		
		window.localStorage.UOP_pause = 0;
		window.localStorage.UOP_ads = 1;
		window.localStorage.UOP_aggressive = 2;
		window.localStorage.UOP_delaymin = 5;
		window.localStorage.UOP_delaymax = 60;
		window.localStorage.UOP_alarm = 0;
		window.localStorage.UOP_alarmSrc = "";
		window.localStorage.UOP_alarmStop = 1;
		window.localStorage.UOP_alarmStoptime = 600;
		window.localStorage.UOP_trapCheck = 1;
		window.localStorage.UOP_trapCheckTime = 3600;
		window.localStorage.UOP_script = "";
		
		window.localStorage.UOP_cacheKRstr = "";
		window.localStorage.UOP_serverUrl = "";
	}
	else if (window.localStorage.UOP_cacheKRstr == undefined) //better safe than sorry
	{
		window.localStorage.UOP_cacheKRstr = "";
	}

	S_skin = Number(window.localStorage.UOP_skin);
	S_auto = Number(window.localStorage.UOP_auto);
	S_schedule = Number(window.localStorage.UOP_schedule);
	S_solve = Number(window.localStorage.UOP_solve);
	S_server = Number(window.localStorage.UOP_server);
	
	S_pause = Number(window.localStorage.UOP_pause);
	S_ads = Number(window.localStorage.UOP_ads);
	S_aggressive = Number(window.localStorage.UOP_aggressive);
	S_delaymin = Number(window.localStorage.UOP_delaymin);
	S_delaymax = Number(window.localStorage.UOP_delaymax);
	S_alarm = Number(window.localStorage.UOP_alarm);
	S_alarmSrc = window.localStorage.UOP_alarmSrc;
	S_alarmStop = Number(window.localStorage.UOP_alarmStop);
	S_alarmStopTime = Number(window.localStorage.UOP_alarmStoptime);
	S_trapCheck = Number(window.localStorage.UOP_trapCheck);
	S_trapCheckTime = Number(window.localStorage.UOP_trapCheckTime);
	S_script = window.localStorage.UOP_script;
	
	S_cacheKRstr = window.localStorage.UOP_cacheKRstr;
	S_serverUrl = window.localStorage.UOP_serverUrl;
}
function UOP_addControlPanel() {
	var hgRow = document.getElementById('hgRow');
	var separator_left = hgRow.getElementsByClassName('hgSeparator left')[0];
	
	var controlpanel = UOP_global.UOP_objects.UOP_leftPanelTemplate.cloneNode(true);
	controlpanel.id = "UOP_appControlPanel";
	controlpanel.setAttribute('onclick','UOP_global.UOP_loadControlPanel(); return false;');
	controlpanel.style.cssFloat = "left";
	controlpanel.style.paddingRight = "4px";

	controlpanel.firstChild.firstChild.firstChild.src = "data:image/png;base64,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";

	UOP_removeObject(controlpanel.lastChild,controlpanel);

	document.getElementById('userGreeting').getElementsByClassName('userText')[0].style.paddingRight = "8px";

	hgRow.appendChild(separator_left.cloneNode(true));
	hgRow.appendChild(controlpanel);
	hgRow.appendChild(separator_left.cloneNode(true));
}
function UOP_initAndLoadSettings() {
	UOP_global.UOP_settingCommand[0] = UOP_saveSettings;
	UOP_global.UOP_settingCommand[1] = UOP_clearSettings;
	UOP_global.UOP_settingCommand[2] = UOP_tabSettings;
	UOP_global.cpcontent = '\
<style type="text/css">\
#UOP_iframe, #UOP_settingdiv, .UOPdrawertaskbar {\
	font-family: "Segoe UI";\
	font-size: 12px;\
	color: #323232;\
	text-shadow: none;\
}\
.UOPdrawertaskbar {\
	background-color: #3c454f;\
	height: 60px;\
	position: relative;\
	text-align: center;\
	color: #fff;\
}\
.UOPbutton {\
	background-color: transparent;\
	border: 0;\
	width: 85px;\
	height: 60px;\
	font-size: 9px;\
	color: #fff;\
	cursor: pointer;\
	text-decoration: none;\
	display:inline-block;\
}\
.UOPbuttonseparator {\
	background-color: transparent;\
	border: 0;\
	width: 85px;\
	display: inline-block;\
}\
.UOPbutton:hover {\
	background-color: #505861;\
}\
.UOPbuttoniconwrapper {\
	padding-top: 2px;\
}\
.UOPbuttonicon {\
	position: relative;\
	overflow: hidden;\
	width: 32px;\
	height: 32px;\
	margin: 0 auto;\
	padding: 4px 0 0;\
}\
.UOPbuttontext {\
	text-align: center;\
	text-transform: uppercase;\
	line-height: 1em;\
	word-wrap: break-word;\
	padding: 0 2px;\
}\
.UOPsection h2 {\
	border: 0;\
	float: left;\
	margin-bottom: 0;\
	padding-bottom: 5px;\
	font-size: 20px;\
	border-bottom: 2px solid #88b9e3;\
	margin: 10px 0 22px 0;\
	font-family: "Segoe UI Light";\
	font-weight: normal;\
	min-width: 100%;\
}\
.UOPsettinggroup {\
	transition: all 0.7s ease-in-out;\
	-moz-transition: all 0.7s ease-in-out;\
	-webkit-transition: all 0.7s ease-in-out;\
	-o-transition: all 0.7s ease-in-out;\
	opacity: 1;\
	overflow: hidden;\
}\
.UOPsetting >label {\
	display: block;\
	padding-top: 10px;\
	font-size: 11px;\
	font-family: "Segoe UI Semibold";\
	text-transform: uppercase;\
	float: left;\
	width: 158px;\
	word-wrap: break-word;\
}\
.UOPsetting ul {\
	list-style-type: none;\
}\
.UOPsetting {\
	position: relative;\
	border-bottom: 1px solid #d8d8d8;\
	padding-bottom: 18px;\
	margin-top: 18px;\
	min-height: 37px;\
	display: block;\
	clear: both;\
	display: block;\
}\
.UOPsettingvalue {\
	display: inline-block;\
}\
.UOPsettingvalue ul {\
	display: block;\
	float: left;\
	margin-top: 0px;\
	margin-bottom: 0px;\
	padding-left: 0px;\
}\
.UOPsettingvalue li {\
	float:left;\
	border:2px solid #ccc;\
	margin-right:-2px\
}\
.UOPsettingvalue li:hover {\
	background-color:#ddd\
}\
.UOPsettingvalue li[aria-checked="true"] {\
	position:relative;\
	background-color:#4f9dd7;\
	border-color:#434343;\
	color:#fff\
}\
.UOPsettingvalue.editted li[aria-checked="true"] {\
	background-color:#c84fd7\
}\
.UOPsettingvalue li {\
	min-width:46px;\
	line-height:20px;\
	padding:5px;\
	text-align:center;\
	text-transform:uppercase;\
	color:#535353;\
	cursor:default\
}\
.UOPsettingvalue input[type="text"] {\
	vertical-align: bottom;\
	width: 36px;\
}\
</style>\
<div id="UOP_settting_general" class="UOPsettingtab">\
	<div class="UOPsection"><h2>General</h2></div>\
	<div class="UOPsetting">\
		<label class="UOPlabel">Skin</label>\
		<div class="UOPsettingvalue">\
			<ul id="UOP_skin" role="radiogroup" aria-labelledby="">\
				<li class="UOPsettingli" value="0" tabindex="0" aria-checked="false">NONE</li>\
				<li class="UOPsettingli" value="1" tabindex="-1" aria-checked="false">DEFAULT</li>\
				<li class="UOPsettingli" value="2" tabindex="-1" aria-checked="false">SIMPLE</li>\
			</ul>\
		</div>\
	</div>\
	<div class="UOPsetting">\
		<label class="UOPlabel">Advertisement</label>\
		<div class="UOPsettingvalue">\
			<ul id="UOP_ads" role="radiogroup" aria-labelledby="">\
				<li class="UOPsettingli" value="0" tabindex="0" aria-checked="false">ON</li>\
				<li class="UOPsettingli" value="1" tabindex="-1" aria-checked="false">REMOVE</li>\
				<li class="UOPsettingli" value="2" tabindex="-1" aria-checked="false">REPLACE</li>\
			</ul>\
		</div>\
	</div>\
	<div class="UOPsetting">\
		<label class="UOPlabel">Server</label>\
		<div class="UOPsettingvalue">\
			<div class="UOPsettingvalue">\
				<ul id="UOP_server" role="radiogroup" aria-labelledby="">\
					<li class="UOPsettingli" value="0" tabindex="0" aria-checked="false">ON</li>\
					<li class="UOPsettingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
				</ul>\
			</div>\
			<div>\
				<label>Server url: </label>\
				<input id="UOP_serverStr" type="text" style="width:128px;">\
			</div>\
		</div>\
	</div>\
	<div class="UOPsetting">\
		<label class="UOPlabel">Version</label>\
		<div class="UOPsettingvalue">\
			<label>Version </label>\
			<span id="UOP_version"></span>\
			<br>\
			<div id="UOP_update_available" style="display:none"><img style="top: 3px;position: relative;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACQklEQVR4XqWRu2sUURSHv3vnkdndbB4bgxIDUVZUhFRW2in+AWIhFoKgpU0K6zQGLERQsYogCNYKWsfOQggYCxEECRgUVUKy67CbzOMes4fLTrCxcODHucw58/HdM0ZE+N/HPFtohsZwfbxh7k83bS2JACMgIA6teh7EiT9rpdPt3505v7QYJjGtKODO0emgdnjKEAfVh67IcXmOscFeYsQ5DzYK6kbFrZkzV16FSWiiJKY53YRaCM6pCFlR0Mkn2Q1nCXd/0pQfJLHVPiI6MxpjJOsesdaI7KUM7H5lId3qEp28SfvaG8bPPWJzM6XMRfuuBFcIlACEVhyq6LQKGhGKDGxjFoCRiTn6PSHbdaAzDqcVELDDxZVAKVql9AOuAKDMdwZHNfEzVaWCqI54GxwoTAxoW/xVQQ00VCb+xdAAXy1Q7GwBkPe2KHNA+/gZb40QVlStw+3X6yN01pb5/PU9nS8fsBJhjZpoqEwIRbxeaYd0J2BtRLn5ie31AcDQmkiwuia9Gsj+nTg81SkAJ5p0O2Xk9ALzS10OXXxI1u8P94W3xv0Nqe6pkCIDqR/EJE2CVps0hSIXkAqgs4KxWa9HWbrAGwyMVLlWj+mvLrP+9CobLxZxLtT+8O94GCJj5vvH1413jy89OTHWuTyegAj4JlkffncgK6AxupcEEI0CggPHfrVurNwzImK+rb08lb598GgqSudDa6xCAFy1RPBwBCkLY5LWzuiF2yvx3NnnA0gETAJt4DjQ4N+P9U4bwOofNUe978m0puEAAAAASUVORK5CYII="/> New update available !</div>\
			<div id="UOP_is_uptodate" style="display:none"><img style="top: 3px;position: relative;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAC2klEQVR4XqWQTWhcVRTHf/e+9+bDmaRmkklDasdYq0A0FaiCGFqFUQzuROjGXd24dCVdFRGkQqlUW2xB7Eq3FQoBCn6ViJW2SCyWtNAPtYVgbJPpy8vMvJl3z3F4F0J2Al74cQ5wz+H/O0ZV+b/PvHdsLDSGg5WqPT5Us+WoCAZQBVFFN8FXBFFQB3G8cbS558PD5v2T9fEgNEsTjbA2OmEJQjYHBvhF+L7b6ZEmIUExo1CytFotffeVWy/bMCIqlhgarhnCAmA0R1FEBdCcOF5nWGd5Y+ZranY/yXpKoWxMmq1PWWPQAW4AoLTbG6S9NFdwThER4ocxpf40c8+dYPfkazRGmtxf6dDPHBgNraDkqBCvZVSzWVw8wUbSBaN0Oiku2c7rez5lZGiK+2vX+WHxFN1uiIgCEKooKLQ7G4yX9jE38yVx+x7fXH6bTvoX2ivSfOYIjfGX6KcJ53/9gDsrSzSmHtm8nfUNgKHTWwWEHfW9NJ89SpY8yvONQ8w0DoAoF6+fZuG3s9TGClS3gfhZrKjgxBFGRVZ7i4OPn4HA7okmb77wFXt3HcSoZXn1MuevnEKjjNF6gL8ZXkdEEQGXOSrVMleXz/DU5Bw7x17kifp+RPu00xXmL33E8tptdu4qEUYgIojDJ1EV8jROADDFh1z4/WOc65NlXVQyFq59zsLVc16jonlyJ4ofUayoIsoAJXOOqBCynPzELzdO4yTlz5Wf+XbxBKUhy0jdICgiivq5rTrez4mCWqJqysXbn3Dj3o/c/fsacbvF9sdCgkDIcgV/Uac+vG13Epxzgajknm6ADUIoP+Bma57E/MH4joBimVxZZAsOBB02S3e+r3wx/9aZbZOtA6UqPqqAACKguom/gYLi+3r18X/e2XfhmFFVs3jz3PSlW8dPhtX1GRtYq94ZD1uq4BeoKUfD3Venj3zXGJ09a1Q1AkaAJ4GngQr//SygwF3gyr8kYdUGNVTZGQAAAABJRU5ErkJggg=="/> Mousehunt Assistant is up to date.</div>\
			<div id="UOP_cannot_update" style="display:none"><img style="top: 3px;position: relative;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACKElEQVR4XqWTu2tUQRTGv3Mf+8jdh3E3KyYGBNEiEGwsI1H8A8TGxkYCVhZWNhECqUWwsLewFMw/YFDQQjSFSiSKoIWlRTZr9pXcmfHMOXDHFUHBgY+Znbnnd858e4acc/jfQau3rydEWMmmKvebzXq1VEoAB3i4ddYv/Lr47eTMwhqH3o/e3aXly2u0fudGJ46jnbnZ9tF26wh4rUEArLGAwhRibYAxZHev666trC0nSRKnnL3eqGfgdfGhStYFIEB0LpcSOhiPTkZEcERkQKRlWpWxRmX+oFxnyyJwbk/U4CDAZ1M5zR7OdU+qMXqGxFqGiKzQe70exuODCQAcGGAEQESoVqsAQb73gytRKmPQ7e5iYfECzp67BILEKggshsAZfPzwCs+fbmCqVlOPPCRcw2E0HKHdmUealjA5xuIDIUbn+Dz2+wNQEiMm6YUAyfND1BtNvHj2GJ92XqsfJoexOc9aLRHh65fP3B991Bo1GGfgECDeaangcLCP7XcvMeSq1EBM/M1EEdqtaaRxLN7BQY1VWSmZmwbtmWMCZbj65c8VAkCBvFd4EhXX+a0XfvVKQSprRJpUoKBoOBz4oFhhEvzvMsb3WCO5eWt979HDexuD/uCqsykDQpNJueHRhbb3UOPtmdnvlUpWJt6k7fdvFt5ubT4op1gkfoEeAgkKLxhQ73iCMTmVq9no/MUrm3MnTj/xkBTANOsU6wwrw99HJFTgG2vrJ5n2SP74Fl6MAAAAAElFTkSuQmCC"/> Fail to check for new update</div>\
		</div>\
	</div>\
</div>\
<div id="UOP_settting_bot" class="UOPsettingtab" style="display:none;">\
	<div class="UOPsection"><h2>Bot Settings</h2></div>\
	<div class="UOPsetting">\
		<label class="UOPlabel">BOT</label>\
		<div class="UOPsettingvalue">\
			<ul id="UOP_auto" role="radiogroup" aria-labelledby="" onclick="UOP_global.UOP_callbackFunctions.UOP_toggleGroup(0);return true;">\
				<li class="UOPsettingli" value="0" tabindex="0" aria-checked="false">ON</li>\
				<li class="UOPsettingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
			</ul>\
		</div>\
	</div>\
	<div class="UOPsettinggroup">\
		<div class="UOPsetting">\
			<label class="UOPlabel">Aggressive Mode</label>\
			<div class="UOPsettingvalue">\
				<div class="UOPsettingvalue">\
					<ul id="UOP_aggressive" role="radiogroup" aria-labelledby="">\
						<li class="UOPsettingli" value="0" tabindex="0" aria-checked="false">ON</li>\
						<li class="UOPsettingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
						<li class="UOPsettingli" value="2" tabindex="-1" aria-checked="false">TOUR</li>\
					</ul>\
				</div>\
				<div>\
					<label>Delay </label>\
					<input id="UOP_delaymin" type="text">\
					<label style="font-weight: bold;"> &rArr; </label>\
					<input id="UOP_delaymax" type="text">\
					<label> seconds</label>\
				</div>\
			</div>\
		</div>\
		<div class="UOPsetting">\
			<label class="UOPlabel">Solve King Reward</label>\
			<div class="UOPsettingvalue">\
				<div class="UOPsettingvalue">\
					<ul id="UOP_KRsolve" role="radiogroup" aria-labelledby="">\
						<li class="UOPsettingli" value="0" tabindex="0" aria-checked="false">ON</li>\
						<li class="UOPsettingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
					</ul>\
				</div>\
				<div>\
					<label>Saved KR: </label>\
					<input id="UOP_cacheKRstr" type="text" style="width:56px;">\
					<button onclick="UOP_global.UOP_callbackFunctions.UOP_loadSettingKRimage();return;">Load</button>\
				</div>\
				<div>\
					<img id="UOP_loadKRimage"></img>\
				</div>\
			</div>\
		</div>\
		<div class="UOPsetting">\
			<label class="UOPlabel">Alarm</label>\
			<div class="UOPsettingvalue">\
				<div class="UOPsettingvalue">\
					<ul id="UOP_KRsound" role="radiogroup" aria-labelledby="">\
						<li class="UOPsettingli" value="0" tabindex="0" aria-checked="false">OFF</li>\
						<li class="UOPsettingli" value="1" tabindex="-1" aria-checked="false">HTML5</li>\
						<li class="UOPsettingli" value="2" tabindex="-1" aria-checked="false">POPUP</li>\
					</ul>\
				</div>\
				<div>\
					<label>Data/URL: </label>\
					<input id="UOP_KRsoundsrc" type="text" style="width:108px;">\
					<button onclick="UOP_global.UOP_callbackFunctions.UOP_alarmTest();return;">Test</button>\
				</div>\
			</div>\
		</div>\
		<div class="UOPsetting">\
			<label class="UOPlabel">Stop Alarm</label>\
			<div class="UOPsettingvalue">\
				<div class="UOPsettingvalue">\
					<ul id="UOP_alarmStop" role="radiogroup" aria-labelledby="">\
						<li class="UOPsettingli" value="0" tabindex="0" aria-checked="false">ON</li>\
						<li class="UOPsettingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
					</ul>\
				</div>\
				<div>\
					<label>Stop after </label>\
					<input id="UOP_alarmStoptime" type="text">\
					<label> seconds</label>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>\
<div id="UOP_settting_shedule" class="UOPsettingtab" style="display:none;">\
	<div class="UOPsection"><h2>Schedule Settings</h2></div>\
	<div class="UOPsetting">\
		<label class="UOPlabel">Schedules</label>\
		<div class="UOPsettingvalue">\
			<ul id="UOP_schedule" role="radiogroup" aria-labelledby="" onclick="UOP_global.UOP_callbackFunctions.UOP_toggleGroup(1);return true;">\
				<li class="UOPsettingli" tabindex="0" aria-checked="false">ON</li>\
				<li class="UOPsettingli" tabindex="-1" aria-checked="false">OFF</li>\
			</ul>\
		</div>\
	</div>\
	<div class="UOPsettinggroup">\
		<div class="UOPsetting">\
			<label class="UOPlabel">Refresh Interval</label>\
			<div class="UOPsettingvalue">\
				<div class="UOPsettingvalue">\
					<ul id="UOP_refresh" role="radiogroup" aria-labelledby="">\
						<li class="UOPsettingli" value="0" tabindex="0" aria-checked="false">ON</li>\
						<li class="UOPsettingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
					</ul>\
				</div>\
				<div>\
					<label>each </label>\
					<input id="UOP_refreshtime" type="text">\
					<label> seconds</label>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>\
';
	UOP_global.cpprefix = '\
<style>\
#overlayPopup .jsDialogContainer .prefix {\
	background-color: #3c454f;\
}\
</style>\
<div class="UOPdrawertaskbar">\
	<div class="UOPbutton" onclick="UOP_global.UOP_settingCommand[2](0)">\
		<div class="UOPbuttoniconwrapper">\
			<div class="UOPbuttonicon">\
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTBENTVBOTA4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTBENTVBOTE4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMEQ1NUE4RThEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMEQ1NUE4RjhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlEc8wYAAAHGSURBVHja7JbNSsNAFIWbpnWhKBRcdlGLVXwFdSsqCBURcefGhUtxLT6C+AC+QMGlUKg7se7V1IUt1J+df1RREWs7nsFbGa6TNIkpXZgLH+k9mc4ckjt3YgghIt2MaKTLERoIDcQ02hDLqx40z2FotmGd5XEHzQBma66gnoBXrakx+CcDbuMVXIK838dvZ+DcpbYFdsELGAQp5d47uAMNPzWQYXmZaXLnXNEi8vcCWAcTypgS2AF7oOboQBpgvDF02hiQ5jdAU3xHDTzStRU5ENOs8YNO5MG1IoiCOdAg7QDMgkm6FpTxK0EbGCftmPJDkGBzJEiXcQ1MLwZKDFUraIxmbSbPKmOG7QzodsG8g6b7eLi3KS9VT4KK2214wvJeRZPdro+aj6A8DYqaedJ0/QS3XnZBuxpIkXZEuQVGlPdsUm7R/WrQRbhGi8yAD8XEKliiq6WMvwEZLwaqDK7tgwHSt8GDcA7ZJ07pqfxaT9cJ45rTUdUM0gR1wmmwSe+8h9pvmc6KKeV/Z2ARXLRrxX7PlCTxTGdHP8gxE3Lx0XZFGCQJ1hWf3NRAJ0zkqX6W3dRAJ8Kkeqm7OY7Dz/LQwP8y8CXAAOQNDNLkrjsHAAAAAElFTkSuQmCC">\
			</div>\
		</div>\
		<div class="UOPbuttontext">General</div>\
	</div>\
	<div class="UOPbutton" onclick="UOP_global.UOP_settingCommand[2](1)">\
		<div class="UOPbuttoniconwrapper">\
			<div class="UOPbuttonicon">\
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM5QUQ3MDg4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM5QUQ3MDk4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QzlBRDcwNjhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QzlBRDcwNzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrRjG84AAAIBSURBVHja7JdPKMNhGMc3k79z0Ka5KJMTB1xIK5KLrK3c/D2gleIwV8WRpLg4jbubxEEOigPCRaspZXESzTAutPj5vvUsj7ff/H77bSy1pz71e9/3eZ/32/s+7/NuZkVRTNm0PFOWLesC8tOYawdxEGN9XlAArsEleNKMInIgRUpABwiAeWCn/lbly0KgV088IzvQBQLARu1ycAjGmE8dYfqNHRhX9NkG7U4hcGZyB8IqfS8gCqyUG8LcYBbcgQawRnwzs846UEaBRYLNgR7qfwN7YIeEOYALtINqKUYENIIbI0cwCjbBLtviOJgGRSr+XnClciwDsq9eAUGVYKsac7wkMmFnoNmoANliwKFj3gGb06Tmo7cSiuS5YO0QJZeW7bNvSzqluJ/ueTSRvEn8PMDJk5x9L1OlTKsOhGk770GpNOYGj5Ssieo4CD6k4zOUA1bgkwL5JZ8pNhZgIpaYiAejArpVEvEWeCS/RfDORNiYCHEtF4wK6ExSbiNgArhAJfmKRaI0vgJq2LWsNSpAsA6ewSnBTeTEMPmJ6nrOxvp+ipuKAPGgTIJ64kR6fttAHuXGK/VvgapMCZCZoUVElWwBFhKosMUrtOKkI8DPFhftoVQXN/ocJ2wbHIFjahdToRKv3Qi9fppmzvDPch8IMlF/LiD3vyAnICfg/wn4FGAAfkF8N/5zo2sAAAAASUVORK5CYII=">\
			</div>\
		</div>\
		<div class="UOPbuttontext">Bot</div>\
	</div>\
 	<div class="UOPbutton" onclick="UOP_global.UOP_settingCommand[2](2)">\
		<div class="UOPbuttoniconwrapper">\
			<div class="UOPbuttonicon">\
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTA1MjM3MzU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTA1MjM3MzY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDUyMzczMzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDUyMzczNDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsYb0WAAAADcSURBVHja7JdNCsIwEIWbqivFa7QrceH9T6D79hqiK39iAhEiTvMKb7AWZiCb+dLhkXmZUOe9r6aMupo4TMBSyDVhbYT8JaxegX+EE0z4lDamwrUChwJiwgkF3nmWwxbE2IPWsbx4Asek9mtvWAcFDgW0A7cj9rZT4FDAHdwalkMPLEDbWP7/g+gEvmH5KBOuhb3XzGQMH2XCTijQZiZjuE3CeUzCrVDgnJmM4VDArfCcrhT4PEy4A95hefEE+vRySWO7UeBQgBt4UB7ZMTIcCrD/AhNgAn4aLwEGAMI5iydTaCarAAAAAElFTkSuQmCC">\
			</div>\
		</div>\
		<div class="UOPbuttontext">Schedule</div>\
	</div>\
</div>\
';
	UOP_global.cpsuffix = '\
<style>\
#overlayPopup .jsDialogContainer .suffix {\
	background-color: #3c454f;\
}\
</style>\
<div class="UOPdrawertaskbar">\
	<div class="UOPbutton" onclick="UOP_global.UOP_settingCommand[0]()">\
		<div class="UOPbuttoniconwrapper">\
			<div class="UOPbuttonicon">\
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTVEOEJDRkU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTVEOEJDRkY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTU0REIyNDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NUQ4QkNGRDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr3Wrw0AAAEQSURBVHjaYvz//z/DQAImhgEGow4YcAewEKkuCogDybRjMRBvwikLygUEcBQQP/1PPrgPxDq4zGckIhs+BWIpKBvkk/VA/IWAHgkgdgViPyj/IBA7YFNIjAOQFegB8WUig14XiC8h20UNBzCSGP8E9Q65bMhCbbNJdQCxWZEDiLOIUUhqGrgHxFeA+BcBPbxAbATEotROhJSA4ZEIB6wuQAbHgXgWntKQB4jTgNiSuJKCcF2ADgKJ0BOIRR/ZdQG6Ak4g/kFENvxOTCIkxwEwg1YjiYWSoI9kB1yEVkLoBhEq55HlQZWSPrm5YBIVEvskSnLBKiD+iEU8lIA+ZPmdlBTFo63iUQeMOmB4OwAgwAA4DRkrSEfzrgAAAABJRU5ErkJggg==">\
			</div>\
		</div>\
		<div class="UOPbuttontext">Save</div>\
	</div>\
	<div class="UOPbutton" onclick="UOP_global.UOP_settingCommand[1]()">\
		<div class="UOPbuttoniconwrapper">\
			<div class="UOPbuttonicon">\
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTU1NERCMUU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTU1NERCMUY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTU0REIxQzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NTU0REIxRDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgDrifwAAAGwSURBVHja7NY9SwMxAAbgtvhNq2JLaScVdNDqoCBWnIqDOugguvkbnPwBLg7FLuLSSRShgovgIKhYENTZRVFUKujaKoJUUDnfwCuEox+XM+VQGnhIm8sl79EmF7dhGC4ni8flcPnzAYIQcCqAmHwDupwI8DP5JNT9JkCNjXv6Ic7JRRmCeriDjOpgbsVlOAprMCC1PUEesnAPp5C0PKIIoCBtlC9Z2IGglTFVA8zBuWnCZZiHFchI7fsQ0h1AiMCuNNEw270QhaR0bb0SAYR2SHCSmOmaH7Z47RMGKxFA8MEC9BW4FoYcQ8R1BOikVlO7WEUNRe7ZZoCLUmNb3YhSNGteRPBe5J5r1r06NqIo67TCnvHFulbHVnzD2qsQoIP1o44Ae6xnoNlCfx9M8/OZjp2wh0tKlCUL/RPSXhDTtQxXOeALQzQW6NMEi5Bn3yPwlBpX5WUU4E8xAh9wAgd8C4oSggkY439FvBnH4Vbnyyhi2mrf4IGepfZDbstlx3TbOBX7+ZRT1ML2V7iCTTgu++Q2zwNyCUM3tPF7jmeCy0oeSKrH8mqAaoD/F+BbgAEAp4jNfsnaJiYAAAAASUVORK5CYII=">\
			</div>\
		</div>\
		<div class="UOPbuttontext">Reset</div>\
	</div>\
</div>\
';
	
	if (!window.localStorage.UOP_settings)
	{
		window.localStorage.UOP_settings = "UOP_storage";
		window.localStorage.UOP_skin = 1;
		window.localStorage.UOP_auto = 0;
		window.localStorage.UOP_schedule = 1;
		window.localStorage.UOP_ads = 1;
		window.localStorage.UOP_aggressive = 2;
		window.localStorage.UOP_delaymin = 5;
		window.localStorage.UOP_delaymax = 60;
		window.localStorage.UOP_KRsolve = 0;
		window.localStorage.UOP_KRsound = 0;
		window.localStorage.UOP_alarmStop = 1;
		window.localStorage.UOP_alarmStoptime = 600;
		window.localStorage.UOP_cacheKRstr = "";
		window.localStorage.UOP_KRsoundsrc = "";
		window.localStorage.UOP_server = 1;
		window.localStorage.UOP_serverStr = "";
		window.localStorage.UOP_refresh = 1;
		window.localStorage.UOP_refreshtime = 3600;
		window.localStorage.UOP_scheduleTable = "";
	}
	else if (window.localStorage.UOP_cacheKRstr == undefined) //better safe than sorry
	{
		window.localStorage.UOP_cacheKRstr = "";
	}
	
	UOP_global.settings.UOP_skin = Number(window.localStorage.UOP_skin);
	UOP_global.settings.UOP_auto = Number(window.localStorage.UOP_auto);
	UOP_global.settings.UOP_schedule = Number(window.localStorage.UOP_schedule);
	UOP_global.settings.UOP_ads = Number(window.localStorage.UOP_ads);
	UOP_global.settings.UOP_aggressive = Number(window.localStorage.UOP_aggressive);
	UOP_global.settings.UOP_delaymin = Number(window.localStorage.UOP_delaymin);
	UOP_global.settings.UOP_delaymax = Number(window.localStorage.UOP_delaymax);
	UOP_global.settings.UOP_KRsolve = Number(window.localStorage.UOP_KRsolve);
	UOP_global.settings.UOP_KRsound = Number(window.localStorage.UOP_KRsound);
	UOP_global.settings.UOP_alarmStop = Number(window.localStorage.UOP_alarmStop);
	UOP_global.settings.UOP_alarmStoptime = Number(window.localStorage.UOP_alarmStoptime);
	UOP_global.settings.UOP_cacheKRstr = window.localStorage.UOP_cacheKRstr;
	UOP_global.settings.UOP_KRsoundsrc = window.localStorage.UOP_KRsoundsrc;
	UOP_global.settings.UOP_server = Number(window.localStorage.UOP_server);
	UOP_global.settings.UOP_serverStr = window.localStorage.UOP_serverStr;
	UOP_global.settings.UOP_refresh = Number(window.localStorage.UOP_refresh);
	UOP_global.settings.UOP_refreshtime = Number(window.localStorage.UOP_refreshtime);
	UOP_global.settings.UOP_scheduleTable = window.localStorage.UOP_scheduleTable;
}
function UOP_clearSettings() {
	delete window.localStorage.UOP_settings;
	
	location.reload();
}
function UOP_saveSettings() {
	UOP_global.settings.UOP_skin = document.getElementById("UOP_skin").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_auto = document.getElementById("UOP_auto").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_schedule = document.getElementById("UOP_schedule").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_ads = document.getElementById("UOP_ads").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_aggressive = document.getElementById("UOP_aggressive").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_refresh = document.getElementById("UOP_refresh").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_KRsolve = document.getElementById("UOP_KRsolve").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_KRsound = document.getElementById("UOP_KRsound").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_server = document.getElementById("UOP_server").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_alarmStop = document.getElementById("UOP_alarmStop").getElementsByClassName("tick")[0].value;
	UOP_global.settings.UOP_delaymin = document.getElementById("UOP_delaymin").value;
	UOP_global.settings.UOP_delaymax = document.getElementById("UOP_delaymax").value;
	UOP_global.settings.UOP_KRsoundsrc = document.getElementById("UOP_KRsoundsrc").value;
	UOP_global.settings.UOP_cacheKRstr = document.getElementById("UOP_cacheKRstr").value;
	UOP_global.settings.UOP_serverStr = document.getElementById("UOP_serverStr").value;
	UOP_global.settings.UOP_refreshtime = document.getElementById("UOP_refreshtime").value;
	UOP_global.settings.UOP_alarmStoptime = document.getElementById("UOP_alarmStoptime").value;
	
	window.localStorage.UOP_skin = UOP_global.settings.UOP_skin;
	window.localStorage.UOP_auto = UOP_global.settings.UOP_auto;
	window.localStorage.UOP_schedule = UOP_global.settings.UOP_schedule;
	window.localStorage.UOP_ads = UOP_global.settings.UOP_ads;
	window.localStorage.UOP_aggressive = UOP_global.settings.UOP_aggressive;
	window.localStorage.UOP_delaymin = UOP_global.settings.UOP_delaymin;
	window.localStorage.UOP_delaymax = UOP_global.settings.UOP_delaymax;
	window.localStorage.UOP_refresh = UOP_global.settings.UOP_refresh;
	window.localStorage.UOP_refreshtime = UOP_global.settings.UOP_refreshtime;
	window.localStorage.UOP_KRsolve = UOP_global.settings.UOP_KRsolve;
	window.localStorage.UOP_KRsound = UOP_global.settings.UOP_KRsound;
	window.localStorage.UOP_alarmStop = UOP_global.settings.UOP_alarmStop;
	window.localStorage.UOP_alarmStoptime = UOP_global.settings.UOP_alarmStoptime;
	window.localStorage.UOP_scheduleTable = UOP_global.settings.UOP_scheduleTable;
	window.localStorage.UOP_KRsoundsrc = UOP_global.settings.UOP_KRsoundsrc;
	window.localStorage.UOP_cacheKRstr = UOP_global.settings.UOP_cacheKRstr;
	window.localStorage.UOP_server = UOP_global.settings.UOP_server;
	window.localStorage.UOP_serverStr = UOP_global.settings.UOP_serverStr;

	location.reload();
}
function UOP_tabSettings(tab) {
	var x = document.getElementsByClassName('UOPsettingtab');
	for (var i = 0;i < x.length;++i) x[i].style.display = "none";
	x[tab].style.display = "block";
}
function initControlPanel() {
	allLi = document.getElementsByClassName("UOPsettingli");
	for (i = 0;i < allLi.length;++i) allLi[i].setAttribute("onclick","UOP_global.UOP_checkLi(this);");
	tmp = document.getElementById("UOP_skin").childNodes[UOP_global.settings.UOP_skin];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_auto").childNodes[UOP_global.settings.UOP_auto];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_schedule").childNodes[UOP_global.settings.UOP_schedule];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_ads").childNodes[UOP_global.settings.UOP_ads];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_aggressive").childNodes[UOP_global.settings.UOP_aggressive];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_refresh").childNodes[UOP_global.settings.UOP_refresh];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_KRsolve").childNodes[UOP_global.settings.UOP_KRsolve];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_KRsound").childNodes[UOP_global.settings.UOP_KRsound];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_alarmStop").childNodes[UOP_global.settings.UOP_alarmStop];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_server").childNodes[UOP_global.settings.UOP_server];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	document.getElementById("UOP_cacheKRstr").value = UOP_global.settings.UOP_cacheKRstr;
	document.getElementById("UOP_KRsoundsrc").value = UOP_global.settings.UOP_KRsoundsrc;
	document.getElementById("UOP_serverStr").value = UOP_global.settings.UOP_serverStr;
	document.getElementById("UOP_delaymin").value = UOP_global.settings.UOP_delaymin;
	document.getElementById("UOP_delaymax").value = UOP_global.settings.UOP_delaymax;
	document.getElementById("UOP_refreshtime").value = UOP_global.settings.UOP_refreshtime;
	document.getElementById("UOP_alarmStoptime").value = UOP_global.settings.UOP_alarmStoptime;
	
	document.getElementById("UOP_version").innerHTML = UOP_version;
	if ((UOP_version == window.localStorage.UOP_newversion) || (UOP_version == "Limited Edition") || (UOP_version == "Platinum Edition")) document.getElementById("UOP_is_uptodate").style.display = "block";
	else if (window.localStorage.UOP_newversion == "error") document.getElementById("UOP_cannot_update").style.display = "block";
	else document.getElementById("UOP_update_available").style.display = "block";
	
	var len;
	tmp = document.getElementsByClassName('UOPsettinggroup');
	UOP_global.UOP_objects.UOPsettinggroup = tmp;
	i = 0;
	len = UOP_global.UOP_settinggrouplength[i] = 415;
	if (UOP_global.settings.UOP_auto == 1) len = 0;
	tmp[i].style.height = len + "px";
	i = 1;
	len = UOP_global.UOP_settinggrouplength[i] = 0;
	if (UOP_global.settings.UOP_schedule == 1) len = 0;
	tmp[i].style.height = len + "px";
}
function UOP_checkLi(obj) {
	var parent = obj.parentNode;
	for (i = 0;i < parent.childElementCount;++i)
	{
		parent.childNodes[i].setAttribute("aria-checked","false");
		parent.childNodes[i].className = "";
	}
	obj.setAttribute("aria-checked","true");
	obj.className = "tick";
	if (obj.getAttribute("origin") == "true")
	{
		parent.parentNode.className = "UOPsettingvalue";
	}
	else
	{
		parent.parentNode.className = "UOPsettingvalue editted";
	}
}
function UOP_toggleGroup(num) {
	var state;
	switch (num) {
		case 0: state = "UOP_auto";break;
		case 1: state = "UOP_schedule";break;
		default: break;
	}
	state = document.getElementById(state).getElementsByClassName("tick")[0].value;
	if (state == 1) //1 = OFF
	{
		UOP_global.UOP_objects.UOPsettinggroup[num].style.height = "0px";
		UOP_global.UOP_objects.UOPsettinggroup[num].style.opacity = "0";
	}
	else
	{
		UOP_global.UOP_objects.UOPsettinggroup[num].style.height = UOP_global.UOP_settinggrouplength[num] + "px";
		UOP_global.UOP_objects.UOPsettinggroup[num].style.opacity = "1";
	}
}
function UOP_loadControlPanel() {
	var popup = new jsDialog();
	popup.setTemplate('ajax');
	popup.addToken('{*prefix*}', UOP_global.cpprefix);
	popup.addToken('{*content*}', '<div id="UOP_iframe"></div>');
	popup.addToken('{*suffix*}', UOP_global.cpsuffix);
	popup.show();
	
	var iframe = document.getElementById('UOP_iframe');
	iframe.width = 646;
	iframe.innerHTML = UOP_global.cpcontent;
	initControlPanel();
	
	delete popup;
}
/*******************TOOLS********************/
function getCookie(c_name) {
	if (document.cookie.length > 0)
	{
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return null;
}
function formatMinute(sec) {
	var min = Math.floor(sec / 60);
	sec = sec % 60;
	var textTime = min+":"+(sec < 10 ? '0'+sec : sec);
	return textTime;
}
function formatHour(sec) {
	var hour = Math.floor(sec / 3600); 
	var min = Math.floor(sec / 60) % 60;
	sec = sec % 60;
	var textTime = hour + ":" + (min<10?"0"+min:min) + ":" + (sec<10?"0"+sec:sec);
	return textTime;
}
/*******************SYNC********************/
function syncUser(callbackFunction) {
	var request = new XMLHttpRequest();
	request.open("GET", "managers/ajax/abtest.php", true);
	request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
	request.setRequestHeader("Pragma","no-cache");
	request.setRequestHeader("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				user = JSON.parse(request.responseText);
				if (callbackFunction != null) callbackFunction();
			}
			else
			{
				location.reload();
			}
		}
	};
	request.send(null);
}
function soundHorn() {
	//please take note that the phrase is: "hornwaiting => hornready => hornsounding => hornsounded => hornwaiting"
	if (O_hornHeader.className.indexOf('hornsounding') != -1)
	{
		soundHornSounding();
		setTimeout(soundHorn, 100);
		return;
	}
	else if (O_hornHeader.className.indexOf('hornsounded') != -1)
	{
		soundHornSounded();
		setTimeout(soundHorn, 100);
		return;
	}

	syncUser(soundHornWaiting);
}
function soundHornSounding() {//~~~~
	UOP_global.UOP_callbackFunctions.UOP_autosounding();
}
function soundHornSounded() {//~~~~
	UOP_global.UOP_callbackFunctions.UOP_autosounded();
}
function soundHornWaiting() {//~~~~
	UOP_global.UOP_callbackFunctions.UOP_syncTime();
	UOP_global.UOP_callbackFunctions.UOP_autohornwaiting();
	
	switch (UOP_global.settings.UOP_skin)
	{
		case 1:UOP_global.UOP_callbackFunctions.UOP_updateJounal();break;
		default: break;
	}
	
	UOP_global.UOP_callbackFunctions.UOP_updateHud();
}
function UOP_secondTimerTasks() {
	//update sound timer
	if (UOP_global.settings.UOP_auto == 1)
	{
		if (UOP_global.UOP_user.user.has_puzzle) document.title = "King's Reward";
		else
		{
			nextTurnSeconds = UOP_global.UOP_nextTurnTimestamp - new Date().getTime();
			if (nextTurnSeconds > 0)
			{
				nextTurnSeconds = Math.ceil(nextTurnSeconds / 1000);
				if (nextTurnSeconds > 1000) location.reload();  //if nextHorn is too high, something is wrong
				var textTime = UOP_formatTime(nextTurnSeconds);
				UOP_huntTimer.textContent = textTime;
				document.title = textTime;
			}
			else
			{
				UOP_huntTimer.textContent = "Ready";
				document.title = "Ready";
			}
		}
	}

	//set the second time interval
	setTimeout(function () { (UOP_secondTimerTasks)() }, UOP_S_SecondTimer * 1000);
}
function UOP_minuteTimerTasks() {
	//update precious title advancing
	UOP_titlePercentage.textContent = UOP_global.UOP_user.user.title_percentage.toString();
		
	//update location timer
	var locationTimerObject,states,hour,min,timetmp;
	var currentTime = Math.floor(new Date().getTime() / 1000);
	var i,j;
	for (i = 0;i < UOP_C_LOCATION_TIMES.length;++i)
	{
		timetmp = (currentTime - UOP_C_LOCATION_TIMES[i].base) % UOP_C_LOCATION_TIMES[i].totaltime;
		for (j = 0;j < UOP_C_LOCATION_TIMES[i].length.length;++j)
		{
			timetmp -= UOP_C_LOCATION_TIMES[i].length[j];
			if (timetmp < 0) break;
			else if (timetmp == 0)
			{
				j = (j + 1) % UOP_C_LOCATION_TIMES[i].length.length;
				timetmp = -UOP_C_LOCATION_TIMES[i].length[j];
				break;
			}
		}
		timetmp = -timetmp;
		hour = Math.floor(timetmp / 3600);
		min = Math.floor((timetmp % 3600) / 60);
		
		locationTimerObject = document.getElementById(UOP_C_LOCATION_TIMES[i].id);
		locationTimerObject.innerHTML = "<span style='color: " + UOP_C_LOCATION_TIMES[i].color[j] + "; font-weight: bold;'>" + UOP_C_LOCATION_TIMES[i].state[j]+ "</span>" + " - " + hour + ":" + (min < 10 ? "0"+min : min);
	}
	
	//set the minute time interval
	setTimeout(function () { (UOP_minuteTimerTasks)() }, UOP_S_MinuteTimer * 1000);
}
function UOP_shortTimerTasks() {
	UOP_syncUser(false,null);
	setTimeout(function () { (UOP_shortTimerTasks)() }, UOP_S_ShortTimer * 1000);
}
function UOP_moderateTimerTasks() {
	UOP_updateHud();
	setTimeout(function () { (UOP_moderateTimerTasks)() }, UOP_S_ModerateTimer * 1000);
}
function UOP_updateTime() {
	UOP_global.UOP_nextTurnTimestamp = UOP_global.UOP_user.user.next_activeturn_seconds * 1000 + new Date().getTime();
}

/*******************ADS AREA********************/
function removeAds() {
	//remove mousehunt ads
	var rightCol = document.getElementById('hgSideBar'); //mousehunt ads
	if (rightCol != null)
	{
		while (rightCol.childElementCount > 1)
			rightCol.removeChild(rightCol.lastChild);//rightCol.style.display = "none";
	}
}
/*******************SKIN AREA********************/
//TOOLS
function UOP_travelcontentLoad() {
	var UOP_traveltarget = new XMLHttpRequest();
	var UOP_freeTravel,UOP_freeTravelMeadow;
	var UOP_travelcontentChild = UOP_global.UOP_objects.UOP_travelcontentChild;
	UOP_traveltarget.open("GET", "travel.php?quick=1", true);
	UOP_traveltarget.onreadystatechange = function()
	{
		if (UOP_traveltarget.readyState === 4)
		{
			if (UOP_traveltarget.status == 200)
			{
				UOP_cleanObject(UOP_travelcontentChild);
				UOP_travelcontentChild.innerHTML = UOP_traveltarget.responseText.substring(UOP_traveltarget.responseText.indexOf("<h2 style='margin-bottom:12px;'>Select a location to travel to</h2>"),UOP_traveltarget.responseText.indexOf("</div></div><div class='inactive' id='tabbarContent_page_1'>"));
				if (UOP_traveltarget.responseText.indexOf("travel.php?freeTravel=true") != -1)
				{
					appendbefore = UOP_travelcontentChild.firstChild.nextSibling;
					UOP_freeTravel = appendbefore.cloneNode(true);
					UOP_freeTravel.textContent = "Free Travel";
					UOP_freeTravelMeadow = appendbefore.nextSibling.cloneNode(true);
					UOP_cleanObject(UOP_freeTravelMeadow);
					UOP_freeTravelMeadow.innerHTML = "<a href='" + UOP_traveltarget.responseText.substring(UOP_traveltarget.responseText.indexOf("travel.php?freeTravel=true"),UOP_traveltarget.responseText.indexOf("'>Follow Larry back to the Meadow")) + "'>Meadow</a> (0 gold)";
					UOP_travelcontentChild.insertBefore(UOP_freeTravel,appendbefore);
					UOP_travelcontentChild.insertBefore(UOP_freeTravelMeadow,appendbefore);
					UOP_travelcontentChild.insertBefore(document.createElement("br"),appendbefore);
				}
				var UOP_travelcontentChildArr = UOP_travelcontentChild.childNodes;
				for (var _UOP_i = 0;_UOP_i < UOP_travelcontentChildArr.length;++_UOP_i)
				if (UOP_travelcontentChildArr[_UOP_i].nodeName == "DIV")
				{
					UOP_travelcontentChildArr[_UOP_i].firstChild.target = "_blank";
					UOP_travelcontentChildArr[_UOP_i].firstChild.setAttribute('onclick','UOP_global.UOP_callbackFunctions.UOP_travel(this.href); return false;');
				}
			}
			else
			{
				UOP_cleanObject(UOP_travelcontentChild);
				UOP_travelcontentChild.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	UOP_traveltarget.send(null);
	return false;
}
function UOP_shopcontentLoad() {
	if (UOP_global.UOP_shopLoaded == false)
	{
		var cssArr = ["css/views/en/ItemPurchaseView.css"];
		var jsArr = ["js/views/en/ItemPurchaseView.js"];
		
		var css,js;
		
		for (i = 0;i < cssArr.length;++i)
		{
			css = document.createElement('link');
			css.rel = 'stylesheet';
			css.href = cssArr[i];
			document.head.appendChild(css);
		}
		for (i = 0;i < jsArr.length;++i)
		{
			js = document.createElement('script');
			js.type = 'text/javascript'; 
			js.src = jsArr[i];
			document.head.appendChild(js);
		}
		
		css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".itempurchase .purchasecontrol {width: 200px;}";
		document.head.appendChild(css);
		
		UOP_global.UOP_shopLoaded = true;
	}
	var UOP_shoptarget = new XMLHttpRequest();
	var UOP_shopdiv = UOP_global.UOP_objects.UOP_shopcontentChild;
	UOP_shoptarget.open("GET", "shops.php", true);
	UOP_shoptarget.onreadystatechange = function()
	{
		if (UOP_shoptarget.readyState === 4)
		{
			if (UOP_shoptarget.status == 200)
			{
				var HTMLText = UOP_shoptarget.responseText.substring(UOP_shoptarget.responseText.indexOf("<div class='pagetabbartop'>"),UOP_shoptarget.responseText.indexOf("</div></div><a href='#' name='hudbottom'></a>"));
				HTMLText += UOP_shoptarget.responseText.substring(UOP_shoptarget.responseText.indexOf("<div class='contentcontainer'>"),UOP_shoptarget.responseText.indexOf("<div class='footer'>"));
				var JSText = UOP_shoptarget.responseText.substring(UOP_shoptarget.responseText.indexOf("app.views.ItemPurchaseView"),UOP_shoptarget.responseText.indexOf("user = {"));
				
				eval(JSText);
				HTMLText = HTMLText.replace(/app.views.TabBarView.page.show/g,'UOP_global.UOP_callbackFunctions.UOP_SimulateTabBar');
				HTMLText = HTMLText.replace(/tabbarContent_page/g,'UOP_tabbarContents_page');
				HTMLText = HTMLText.replace(/tabbarControls_page/g,'UOP_tabbarControls_page');
				
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				
				var tmp = HTMLdiv.getElementsByClassName('deets');while(tmp.length > 0) UOP_removeObject(tmp[0],null);
				tmp = HTMLdiv.getElementsByClassName('flexibleDialog');while(tmp.length > 0) UOP_removeObject(tmp[0],null);
				tmp = HTMLdiv.getElementsByClassName('subtabheading');while(tmp.length > 0) UOP_removeObject(tmp[0],null);
				tmp = HTMLdiv.getElementsByClassName('tradable');while(tmp.length > 0) UOP_removeObject(tmp[0],null);
				tmp = HTMLdiv.getElementsByClassName('anchorLink');while(tmp.length > 0) UOP_removeObject(tmp[0],null);
				tmp = HTMLdiv.getElementsByClassName('journalContainer');while(tmp.length > 0) UOP_removeObject(tmp[0],null);
				tmp = HTMLdiv.getElementsByClassName('control');tmp[tmp.length - 1].parentNode.style.display = "inline-block";
				
				UOP_cleanObject(UOP_shopdiv);
				UOP_shopdiv.appendChild(HTMLdiv);
			}
			else
			{
				UOP_cleanObject(UOP_shopdiv);
				UOP_shopdiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	UOP_shoptarget.send(null);
	return false;
}
function UOP_potcontentLoad() {
	if (UOP_global.UOP_potLoaded == false)
	{
		var cssArr,jsArr;
		if (UOP_mode == 0)
		{
			cssArr = ["css/views/en/InventoryItemView.css"];
			jsArr = ["js/views/en/InventoryItemView.js","platform/js/jquery/en/jquery.tmpl.min.js","platform/js/classes/en/radioSelector.js"];
			
		}
		else
		{
			cssArr = ["css/views/en/InventoryItemView.css","platform/css/classes/en/jsDialog.css","platform/css/classes/en/default.css"];
			jsArr = ["js/views/en/InventoryItemView.js","platform/js/jquery/en/jquery.tmpl.min.js","platform/js/classes/en/radioSelector.js","platform/js/classes/en/jsDialog.js"];				
		}
		
		var css,js;
		
		for (i = 0;i < cssArr.length;++i)
		{
			css = document.createElement('link');
			css.rel = 'stylesheet';
			css.href = cssArr[i];
			document.head.appendChild(css);
		}
		for (i = 0;i < jsArr.length;++i)
		{
			js = document.createElement('script');
			js.type = 'text/javascript'; 
			js.src = jsArr[i];
			document.head.appendChild(js);
		}
		
		css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".inventoryitemview .potion .rightcol {margin-left: 98px;} .inventoryitemview .potion .leftcol {margin-left: 0px;} .inventoryitemview .potion .rightcol .radioContainer .radioItem {width:auto;}";
		if (UOP_mode == 1) css.innerHTML += "#overlayPopup {width: 375px;margin: auto;}";
		document.head.appendChild(css);
		
		UOP_global.UOP_potLoaded = true;
	}
	var UOP_pottarget = new XMLHttpRequest();
	var UOP_potdiv = UOP_global.UOP_objects.UOP_potcontentChild;
	UOP_pottarget.open("GET", "/inventory.php?tab=3", true);
	UOP_pottarget.onreadystatechange = function()
	{
		if (UOP_pottarget.readyState === 4)
		{
			if (UOP_pottarget.status == 200)
			{
				var HTMLText = UOP_pottarget.responseText.substring(UOP_pottarget.responseText.indexOf("<div id='tabbarContent_page'"),UOP_pottarget.responseText.indexOf("</script></div></div>"));
				var JSText = "inventoryItemView1 = new ViewInventoryItem(1);" + UOP_pottarget.responseText.substring(UOP_pottarget.responseText.indexOf("inventoryItemView1.setValidItemClassifications"),UOP_pottarget.responseText.indexOf("inventoryItemView1.render();") + 28);

				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				UOP_cleanObject(UOP_potdiv);
				UOP_potdiv.appendChild(HTMLdiv);
				
				eval(JSText);
			}
			else
			{
				UOP_cleanObject(UOP_potdiv);
				UOP_potdiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	UOP_pottarget.send(null);
	return false;
}
function UOP_craftcontentLoad() {
	if (UOP_global.UOP_craftLoaded == false)
	{
		var cssArr,jsArr;
		
		if (UOP_mode == 0)
		{
			cssArr = ["css/views/en/CraftingView.css","platform/css/views/en/FlexibleDialogBoxView.css"];
			jsArr = ["js/views/en/RecipeView.js", "js/views/en/CraftingView.js","platform/js/views/en/FlexibleDialogBoxView.js","platform/js/jquery/en/jquery.scrollTo-min.js"];
			
		}
		else
		{
			cssArr = ["css/views/en/CraftingView.css","platform/css/classes/en/default.css","platform/css/views/en/FlexibleDialogBoxView.css","platform/css/classes/en/jsDialog.css"];
			jsArr = ["js/views/en/RecipeView.js", "js/views/en/CraftingView.js","platform/js/views/en/FlexibleDialogBoxView.js","platform/js/jquery/en/jquery.scrollTo-min.js","platform/js/classes/en/jsDialog.js"];
		}
		
		var css,js;
		
		for (i = 0;i < cssArr.length;++i)
		{
			css = document.createElement('link');
			css.rel = 'stylesheet';
			css.href = cssArr[i];
			document.head.appendChild(css);
		}
		for (i = 0;i < jsArr.length;++i)
		{
			js = document.createElement('script');
			js.type = 'text/javascript'; 
			js.src = jsArr[i];
			document.head.appendChild(js);
		}
		
		css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".recipeitemdetails {height: auto;padding: auto;width: auto;} #recipeClippingMask, #recipeContentContainer {width:auto;} #recipeClippingMask .classification {width: 350px;}";
		if (UOP_mode == 1) css.innerHTML += ".ingredientsdiv {width: auto;} #overlayPopup {width: 375px;margin: auto;}";
		document.head.appendChild(css);
		
		UOP_global.UOP_craftLoaded = true;
	}
	var UOP_crafttarget = new XMLHttpRequest();
	var UOP_craftdiv = UOP_global.UOP_objects.UOP_craftcontentChild;
	UOP_crafttarget.open("GET", "/inventory.php?tab=2", true);
	UOP_crafttarget.onreadystatechange = function()
	{
		if (UOP_crafttarget.readyState === 4)
		{
			if (UOP_crafttarget.status == 200)
			{
				var HTMLText = '<div id="recipeContainer" class="craftingContainer"><div class="top"><div class="loading"></div></div></div><div id="craftingContainer" class="craftingContainer" style="display:none;"><div class="top"><div class="loading"></div></div></div>';
				var JSUnknownStringStart = UOP_crafttarget.responseText.indexOf("app.views.RecipeView.");
				var JSUnknownStringEnd = UOP_crafttarget.responseText.indexOf(" =",JSUnknownStringStart);
				var JSUnknownString = UOP_crafttarget.responseText.substring(JSUnknownStringStart,JSUnknownStringEnd);
				var JSUnknownRenderString = JSUnknownString + ".render();";
				var JSText = "app.views.CraftingView.CraftingInstance = new hg.views.CraftingView(); " + JSUnknownString + " = new hg.views.RecipeView();";
				JSText += UOP_crafttarget.responseText.substring(UOP_crafttarget.responseText.indexOf(JSUnknownString + ".addRecipe"),UOP_crafttarget.responseText.indexOf(JSUnknownRenderString) + JSUnknownRenderString.length);
				JSText += UOP_crafttarget.responseText.substring(UOP_crafttarget.responseText.indexOf("app.views.CraftingView.CraftingInstance.init"),UOP_crafttarget.responseText.indexOf("app.views.CraftingView.CraftingInstance.render();"));
				JSText += JSUnknownString + ".clippingMaskWidth = 350;";
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				UOP_cleanObject(UOP_craftdiv);
				UOP_craftdiv.appendChild(HTMLdiv);
				
				eval(JSText);
				tmp = HTMLdiv.getElementsByClassName('recipeitemnamediv');
				for (i = tmp.length - 1;i >= 0;--i)
				{
					UOP_removeObject(tmp[i]);
				}
			}
			else
			{
				UOP_cleanObject(UOP_craftdiv);
				UOP_craftdiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	UOP_crafttarget.send(null);
	return false;
}
function UOP_travelToTabBar() {
	//travel => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if (tabbar.length > 0)
	{
		tabbar = tabbar[0].firstChild;
		
		var travelbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
		travelbar.className = "inactive";
		var travelbarChild = travelbar.firstChild.firstChild;

		var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
		travelbarChild.setAttribute('onclick',travelbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")").replace("return false;","UOP_global.UOP_callbackFunctions.UOP_travelcontentLoad();return false;"));
		
		travelbarChild = travelbarChild.childNodes[1];
		travelbarChild.id = "UOP_travelCampTab";
		travelbarChild.textContent = "Travel";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(travelbar);
		
		var travelcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		travelcontent.appendChild(document.getElementById('huntingTips').cloneNode(true));
		travelcontent.id = travelcontent.id.substring(0,travelcontent.id.length - 1) + numOfTabbar;
		var travelcontentChild = travelcontent.lastChild;
		UOP_global.UOP_objects.UOP_campTravel = travelcontentChild;
		UOP_global.UOP_objects.UOP_campTravelcontent = travelcontentChild.getElementsByClassName('content')[0];
		travelcontentChild.id = "UOP_campTravel";
		travelcontentChild.style.background = "transparent url('images/ui/camp/trap/head_larry.png') no-repeat scroll left top";
		travelcontentChild.firstChild.style.height = "50px";
		travelcontentChild.firstChild.style.marginBottom = "4px";
		travelcontentChild.firstChild.style.padding = "25px 0 8px 90px";
		travelcontentChild.firstChild.firstChild.style.fontSize = "16px";
		travelcontentChild.firstChild.firstChild.style.fontWeight = "bold";
		travelcontentChild.firstChild.firstChild.innerHTML = '<a href="travel.php">Travel</a> to Location';
		travelcontentChild.firstChild.lastChild.style.padding = "1px 0 2px";
		travelcontentChild.firstChild.lastChild.innerHTML = 'Traveling Service by <a href="profile.php?snuid=larry">Larry</a>';
		travelcontentChild.lastChild.style.marginTop = "0px";
		travelcontentChild.lastChild.style.background = "transparent url('images/ui/camp/trap/content_foot.png') 0 0 no-repeat";
		travelcontentChild = travelcontentChild.firstChild.nextSibling;
		travelcontentChild.style.background = "transparent url('images/ui/camp/trap/content_body.png') 0 0 repeat-y";
		travelcontentChild.style.padding = "1px 15px 2px";
		travelcontentChild.id = "UOP_travelcontentChild";
		UOP_global.UOP_objects.UOP_travelcontentChild = travelcontentChild;
		travelcontentChild.innerHTML = '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
		tabbar.getElementsByClassName('tabbody')[0].appendChild(travelcontent);
	}
}
function UOP_shopToTabBar() {
	//shop => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if (tabbar.length > 0)
	{
		tabbar = tabbar[0].firstChild;
		
		var shopbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
		shopbar.className = "inactive";
		shopbar.style.display = "inline-block";
		var shopbarChild = shopbar.firstChild.firstChild;
		
		var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
		UOP_global.UOP_shopLoaded = false;
		shopbarChild.setAttribute('onclick',shopbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")").replace("return false;","UOP_global.UOP_callbackFunctions.UOP_shopcontentLoad();return false;"));
		
		shopbarChild = shopbarChild.childNodes[1];
		shopbarChild.id = "UOP_shopCampTab";
		shopbarChild.textContent = "Shop";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(shopbar);
		
		var shopcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		shopcontent.appendChild(document.createElement("div"));
		shopcontent.id = shopcontent.id.substring(0,shopcontent.id.length - 1) + numOfTabbar;
		var shopcontentChild = shopcontent.lastChild;
		shopcontentChild.id = "UOP_shopcontentChild";
		UOP_global.UOP_objects.UOP_shopcontentChild = shopcontentChild;
		shopcontentChild.innerHTML = '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
		tabbar.getElementsByClassName('tabbody')[0].appendChild(shopcontent);
	}
}
function UOP_potToTabBar() {
	//pot => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if (tabbar.length > 0)
	{
		tabbar = tabbar[0].firstChild;
		
		var potbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
		potbar.className = "inactive";
		potbar.style.display = "inline-block";
		var potbarChild = potbar.firstChild.firstChild;
		
		var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
		UOP_global.UOP_potLoaded = false;
		potbarChild.setAttribute('onclick',potbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")").replace("return false;","UOP_global.UOP_callbackFunctions.UOP_potcontentLoad();return false;"));
		
		potbarChild = potbarChild.childNodes[1];
		potbarChild.id = "UOP_potCampTab";
		potbarChild.textContent = "Potion";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(potbar);
		
		var potcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		potcontent.appendChild(document.createElement("div"));
		potcontent.id = potcontent.id.substring(0,potcontent.id.length - 1) + numOfTabbar;
		var potcontentChild = potcontent.lastChild;
		potcontentChild.id = "UOP_potcontentChild";
		UOP_global.UOP_objects.UOP_potcontentChild = potcontentChild;
		potcontentChild.innerHTML = '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
		tabbar.getElementsByClassName('tabbody')[0].appendChild(potcontent);
	}
}
function UOP_craftToTabBar() {
	//craft => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if (tabbar.length > 0)
	{
		tabbar = tabbar[0].firstChild;
		
		var craftbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
		craftbar.className = "inactive";
		craftbar.style.display = "inline-block";
		var craftbarChild = craftbar.firstChild.firstChild;
		
		var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
		UOP_global.UOP_craftLoaded = false;
		craftbarChild.setAttribute('onclick',craftbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")").replace("return false;","UOP_global.UOP_callbackFunctions.UOP_craftcontentLoad();return false;"));
		
		craftbarChild = craftbarChild.childNodes[1];
		craftbarChild.id = "UOP_craftCampTab";
		craftbarChild.textContent = "Craft";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(craftbar);
		
		var craftcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		craftcontent.appendChild(document.createElement("div"));
		craftcontent.id = craftcontent.id.substring(0,craftcontent.id.length - 1) + numOfTabbar;
		var craftcontentChild = craftcontent.lastChild;
		craftcontentChild.id = "UOP_craftcontentChild";
		UOP_global.UOP_objects.UOP_craftcontentChild = craftcontentChild;
		craftcontentChild.innerHTML = '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
		tabbar.getElementsByClassName('tabbody')[0].appendChild(craftcontent);
	}
}
function UOP_updateHud() {
	if (UOP_global.UOP_objects.UOP_baitnum != null) UOP_global.UOP_objects.UOP_baitnum.innerText = UOP_global.UOP_user.user.bait_quantity;
	if ((UOP_global.settings.UOP_skin == 2) && (UOP_global.UOP_objects.UOP_hud != null)) UOP_global.UOP_callbackFunctions.UOP_updateSimpleHud();
}
function UOP_travel(url) {
	var travelTab;
	if (UOP_mode == 0) travelTab = UOP_global.UOP_objects.UOP_campTravel.getElementsByClassName('content')[0]; else travelTab = UOP_global.UOP_objects.UOP_travelcontentChild;
	UOP_cleanObject(travelTab);
	travelTab.innerHTML = "Travelling...";
	var target = new XMLHttpRequest();
	target.open("GET", url, true);
	target.onreadystatechange = function()
	{
		if (target.readyState === 4)
		{
			if (target.status == 200)
			{
				travelTab.innerHTML = "Travel successful, refreshing....";
				travelTab.innerHTML += '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
				if (UOP_mode == 0) document.getElementById('UOP_travelCampTab').parentNode.click(); else UOP_global.UOP_objects.UOP_tab.childNodes[3].click();
				UOP_cleanObject(UOP_global.UOP_objects.UOP_shopcontentChild);
				UOP_global.UOP_objects.UOP_shopcontentChild.innerHTML = '<div style="background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;"></div>';
				UOP_global.UOP_callbackFunctions.UOP_syncUser(true,null);
			}
			else
			{
				travelTab.innerHTML = "Something is wrong, please <a href='#' onclick='reload()'>refresh</a> the page. Automatic refresh page in 5 sec";
				setTimeout(function(){location.reload();}, 5000);
			}
		}
	};
	target.send(null);
}
//SIMPLE skin
function UOP_simpleSkin() { //~~~~
	//=======================add things============================
	//add mobile button
	var hgRow = document.getElementById('hgRow');
	var separator_left = hgRow.getElementsByClassName('hgSeparator left')[0];
	var mobile = document.getElementById('UOP_appControlPanel').cloneNode(true);
	mobile.id = "UOP_appMobile";
	mobile.className = "hgMenu";
	mobile.removeAttribute('onclick');
	mobile.firstChild.firstChild.href = document.getElementsByClassName('switch')[0].firstChild.href;
	mobile.firstChild.firstChild.firstChild.src = "data:image/png;base64,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";
	hgRow.appendChild(mobile);
	hgRow.appendChild(separator_left.cloneNode(true));
	
	//add hud
	var UOP_hud = document.createElement('div');
	UOP_hud.id = "UOP_hud";
	UOP_global.UOP_objects.UOP_hud = UOP_hud;
	var tmp = document.getElementById('tabbarContent_page');
	tmp.parentNode.insertBefore(UOP_hud,tmp);
	
	//add journal
	var cleanup;
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if (tabbar.length > 0)
	{
		cleanup = 1;
		tabbar = tabbar[0].firstChild;
		var journalbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
		journalbar.className = "inactive";

		var journalbarChild = journalbar.firstChild.firstChild;
		var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
		journalbarChild.setAttribute('onclick',journalbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
		journalbarChild = journalbarChild.childNodes[1];
		journalbarChild.id = "UOP_journalCampTab";
		journalbarChild.textContent = "Journal";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(journalbar);
		
		var journalcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		var campRight = document.getElementsByClassName('campRight')[0];
		if (campRight != null)
		{
			campRight.parentNode.removeChild(campRight);
			journalcontent.appendChild(campRight);
			journalcontent.style.width = "375px";
		}
		journalcontent.id = journalcontent.id.substring(0,journalcontent.id.length - 1) + numOfTabbar;
		var journalcontentChild = journalcontent.lastChild;
		journalcontentChild.id = "UOP_campjournal";
		tabbar.getElementsByClassName('tabbody')[0].appendChild(journalcontent);
		
		//add travel
		UOP_travelToTabBar();
		
		//add shop tab
		UOP_shopToTabBar();
		
		//add pot tab
		UOP_potToTabBar();
		
		//add craft tab
		UOP_craftToTabBar();
		
		//remove them
		tmp = tabbar.getElementsByClassName('tabbody')[0];
		UOP_removeObject(tmp.firstChild.nextSibling,tmp);
		UOP_removeObject(tmp.firstChild.nextSibling,tmp);
		tmp = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive'); //delete 0 1
		UOP_removeObject(tmp[0],null);
		UOP_removeObject(tmp[0],null);
		tmp = document.getElementById('UOP_journalCampTab').parentNode;
		tmp.setAttribute('onclick',tmp.getAttribute('onclick').replace("show(3)","show(1)"));
		tmp = document.getElementById('UOP_campjournal').parentNode;
		tmp.id = tmp.id.substring(0,tmp.id.length - 1) + "1";
		tmp = document.getElementById('UOP_travelCampTab').parentNode;
		tmp.setAttribute('onclick',tmp.getAttribute('onclick').replace("show(4)","show(2)"));
		tmp = UOP_global.UOP_objects.UOP_campTravel.parentNode;
		tmp.id = tmp.id.substring(0,tmp.id.length - 1) + "2";
		tmp = document.getElementById('UOP_shopCampTab').parentNode;
		tmp.setAttribute('onclick',tmp.getAttribute('onclick').replace("show(5)","show(3)"));
		tmp = document.getElementById('UOP_shopcontentChild').parentNode;
		tmp.id = tmp.id.substring(0,tmp.id.length - 1) + "3";
	}
	
	//clean up king reward
	var tmp2;
	tmp2 = document.getElementsByClassName('puzzle');
	if (tmp2.length > 0)
	{
		tmp2 = tmp2[0];
		cleanup = 1;
		tmp = document.getElementsByClassName('puzzleImageContainer')[0].nextSibling;
		UOP_removeObject(tmp.firstChild,tmp);
		UOP_removeObject(tmp.firstChild,tmp);
		tmp.insertBefore(tmp2,tmp.firstChild);
		tmp2 = document.createElement("div");
		tmp2.id = "pagemessage";
		tmp.insertBefore(tmp2,tmp.firstChild);
		tmp = document.getElementsByClassName('puzzleImageContainer')[0];
		UOP_removeObject(tmp,null);
	}
	tmp = document.getElementById('pagemessage');
	if (tmp != null) tmp.style.width = "375px";
	
	//cleanup heading
	tmp = document.getElementById('hgbar');
	UOP_removeObject(document.getElementById('appRow'),tmp);
	UOP_removeObject(document.getElementById('newsRowHolder'),tmp);
	
	if (cleanup == 1)
	{
		//cleanup hud
		tmp = document.getElementsByClassName('gameinfo')[0];if(tmp != null) UOP_removeObject(tmp,null);
		tmp = document.getElementsByClassName('gamelogo')[0];if(tmp != null) UOP_removeObject(tmp,null);
		tmp = document.getElementsByClassName('donatebuttonarea')[0];if(tmp != null) UOP_removeObject(tmp,null);
		tmp = document.getElementsByClassName('campbutton')[0];if(tmp != null) UOP_removeObject(tmp,null);
		tmp = document.getElementsByClassName('dropdownmenu')[0];if(tmp != null) UOP_removeObject(tmp,null);
		tmp = document.getElementsByClassName('marblesplash')[0];if(tmp != null) UOP_removeObject(tmp,null);
		tmp = document.getElementsByClassName('switch')[0];if(tmp != null) {tmp=tmp.parentNode;UOP_removeObject(tmp,null);}
		tmp = document.getElementById('trapSpecialBar');if(tmp != null) UOP_removeObject(tmp,null);
		tmp = document.getElementById('questBar');if(tmp != null) UOP_removeObject(tmp,null);
		tmp = document.getElementById('huntingTips');if(tmp != null) UOP_removeObject(tmp,null);
		tmp = document.getElementById('journalContainer');if(tmp != null) UOP_removeObject(tmp.nextSibling,null);
		tmp = document.getElementById('overlayContainer');if(tmp != null) 
		for (i=0;i < 3;)
		{
			if ((tmp.lastChild.tagName != null) && (tmp.lastChild.tagName.toUpperCase() == "A")) ++i;
			UOP_removeObject(tmp.lastChild,tmp);
		}
		
		//==========================cleanup things=================
		tmp = document.getElementById('hgSideBar');
		if (tmp != null)
		{
			tmp.style.margin = "auto";
			tmp.style.display = "inline-block";
			tmp2 = 170;
		}
		else tmp2 = 0;
		tmp = document.getElementById('hgAppContainer');
		tmp.style.width = "375px";
		tmp.parentNode.style.width = (tmp2 + 375) + "px";
		document.getElementsByClassName('container')[0].style.width = "inherit";
		document.getElementsByClassName('headertop')[0].style.height = "auto";
		var headercontrol = document.getElementsByClassName('headercontrols')[0];
		headercontrol.style.width = "inherit";
		headercontrol.style.cssFloat = "none";
		headercontrol.style.height = "auto";
		headercontrol.style.backgroundColor = "white";
		document.getElementById('huntTimer').style.margin = "auto";
	}
	
	//cleanup hgRow
	var rightbanner = hgRow.getElementsByClassName('rightBanners')[0];//remove rightbanner (levylight....) and change it to rightedge
	UOP_cleanObject(rightbanner); //rightbanner.innerHTML = "";
	rightbanner.setAttribute('class','rightEdge');
	
	UOP_removeObject(document.getElementById('appLogo'),hgRow);
	UOP_removeObject(document.getElementById('communityMenu'),hgRow); 
	UOP_removeObject(document.getElementById('supportMenu'),hgRow);
	var userGreeting = document.getElementById('userGreeting');
	UOP_removeObject(userGreeting.nextSibling,hgRow); 
	UOP_removeObject(userGreeting,hgRow); 
	
	separator_right = hgRow.getElementsByClassName('hgSeparator right');
	for (i = 1;i < separator_right.length;++i)
		UOP_removeObject(separator_right[i],hgRow); 
	
	//cleanup journal
	tmpArr = document.getElementsByClassName('journalimage');
	for (i = 0;i < tmpArr.length;++i)
	{
		tmp = tmpArr[i].getElementsByTagName('img')[0];
		if (tmp != null)
		{
			UOP_removeObject(tmpArr[i].firstChild,tmpArr[i]);
			tmpArr[i].appendChild(tmp);
		}
	}
	
	//detailed timer
	UOP_huntTimer = document.getElementById('huntTimer').cloneNode(true);
	document.getElementById('hornArea').appendChild(UOP_huntTimer);
	document.getElementById('huntTimer').style.display = "none";
	UOP_huntTimer.id = "UOP_huntTimerParent";
	UOP_huntTimer.innerHTML = "<span class='timerlabel'>Next Hunt:</span> <span id='UOP_huntTimer'></span>";
	UOP_huntTimer = document.getElementById('UOP_huntTimer');
	if (UOP_global.UOP_objects.UOP_hornbutton == undefined)
	{
		var hornbutton = document.getElementsByClassName('hornbutton')[0].firstChild;
		hornbutton.setAttribute("onclick",hornbutton.getAttribute("onclick").replace("return false;","UOP_global.UOP_callbackFunctions.UOP_sound(); return false;"));
		UOP_global.UOP_objects.UOP_hornbutton = hornbutton;
	}

	//start the timers
	UOP_secondTimerTasks();
}
function UOP_updateSimpleHud() { //~~~~
	var UOP_hud = UOP_global.UOP_objects.UOP_hud;
	UOP_cleanObject(UOP_hud); //UOP_hud.innerHTML = "";
	
	//=================add hud=====================
	//gold point
	var userObj = UOP_global.UOP_user.user;
	UOP_hud.innerHTML += "<span class='hudstatlabel'>Gold:</span> " + userObj.gold + " ";
	//timer
	var locationTimerObject,states,hour,min,timetmp;
	var currentTime = Math.floor(new Date().getTime() / 1000);
	for (var i = 0;i < UOP_C_LOCATION_TIMES.length;++i)
	{
		timetmp = (currentTime - UOP_C_LOCATION_TIMES[i].base) % UOP_C_LOCATION_TIMES[i].totaltime;
		for (j = 0;j < UOP_C_LOCATION_TIMES[i].length.length;++j)
		{
			timetmp -= UOP_C_LOCATION_TIMES[i].length[j];
			if (timetmp < 0) break;
			else if (timetmp == 0)
			{
				j = (j + 1) % UOP_C_LOCATION_TIMES[i].length.length;
				timetmp = -UOP_C_LOCATION_TIMES[i].length[j];
				break;
			}
		}
		timetmp = -timetmp;
		hour = Math.floor(timetmp / 3600);
		min = Math.floor((timetmp % 3600) / 60);
		
		UOP_hud.innerHTML += "<span style='color: " + UOP_C_LOCATION_TIMES[i].color[j] + "; font-weight: bold;'>" + UOP_C_LOCATION_TIMES[i].shortstate[j]+ "</span>" + " - " + hour + ":" + (min < 10 ? "0"+min : min) + " ";
	}
	UOP_hud.innerHTML += "<br>";
	
	//add tour
	if(userObj.viewing_atts.hasOwnProperty('tournament')){
		var secleft,minleft,hourleft;
		var timeleft = userObj.viewing_atts.tournament.seconds_remaining;
		var huntsleft = Math.floor((timeleft - userObj.next_activeturn_seconds)/900)+1;
		hourleft = Math.floor(timeleft / 3600);
		minleft = Math.floor(timeleft / 60) % 60;
		secleft = timeleft % 60;
		var textTime = hourleft +":"+(minleft < 10 ? '0'+minleft : minleft)+":"+(secleft < 10 ? '0'+secleft : secleft);
		UOP_hud.innerHTML += "<a href=\"tournament.php?tid=" + userObj.viewing_atts.tournament.tournament_id + "\" data-ajax=\"false\" target=\"_blank\" style='font-weight: bold;'>Tournament</a>" + " : " + userObj.viewing_atts.tournament.status[0].toUpperCase() + userObj.viewing_atts.tournament.status.slice(1) + " - " + textTime + " <span class='hudstatlabel'>Rank:</span> " + userObj.viewing_atts.tournament.rank + " <span class='hudstatlabel'>Score:</span> " + userObj.viewing_atts.tournament.score + "<br>";
		UOP_hud.innerHTML += '<a href=\"team.php\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Team</a> online:' + userObj.viewing_atts.tournament.team_members_online + ' <a href=\"team.php?tab=2\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Journals</a>' + " - Hunts left: " + huntsleft + ' <a href=\"team.php?invite=true\" data-ajax=\"false\" target=\"_blank\"  style="font-weight: bold;">Invite</a><br>'; 
	}
	//SG: Amplifier
	if (userObj.environment_id == 31){
		UOP_hud.innerHTML += "<span class='hudstatlabel'>Amplifier:</span> " + userObj.viewing_atts.zzt_amplifier + "<br>";
	}
	
	//ZT: piece
	if (userObj.environment_id == 32){
		var piece = ['None','Pawn1','Pawn2','Pawn3','Pawn4','Pawn5','Pawn6','Pawn7','Pawn8','Kight1','Kight2','Bishop1','Bishop2','Rook1','Rook2','Queen','King']; 
		UOP_hud.innerHTML += "<span class='hudstatlabel'>Amplifier: </span>" + userObj.viewing_atts.zzt_amplifier + " - <span class='hudstatlabel'>Tech:</span> " + piece[userObj.viewing_atts.zzt_tech_progress] + " - <span class='hudstatlabel'>Mystic:</span> " + piece[userObj.viewing_atts.zzt_mage_progress] + "<br>";
	}
	
	//Iceberg: Phase, ft
	if (userObj.environment_id == 40){
		UOP_hud.innerHTML += "<span class='hudstatlabel'>Phase:</span> " + userObj.quests.QuestIceberg.current_phase + " - " + userObj.quests.QuestIceberg.user_progress + " ft - " + userObj.quests.QuestIceberg.turns_taken + " hunts<br>";
	}
	
	//FW
	if (userObj.environment_id == 33){
		var fwObj = userObj.viewing_atts.desert_warpath;
		UOP_hud.innerHTML += "<span class='hudstatlabel'>Victories:</span> " + fwObj.victories + " - <span class='hudstatlabel'>Friends:</span> " + fwObj.friends_in_area + " - <span class='hudstatlabel'>Wave " + fwObj.wave + ":</span><br>";
		
		for (var wp in fwObj.wave_population)
		UOP_hud.innerHTML += "<p style=\"text-align:right;\">" + fwObj.wave_population[wp].name + " - <b style=\"color:blue;\">" + fwObj.wave_population[wp].population + "</b> [" + fwObj.wave_population[wp].status + "]<br>";
		
		for (var wp in fwObj.common_population)
		UOP_hud.innerHTML += fwObj.common_population[wp].name + " [" + fwObj.common_population[wp].status + "]<br>";
		
		UOP_hud.innerHTML += "<span class='hudstatlabel'>Streak:</span> - " + fwObj.streak.mouse_type + " - <b style=\"color:green;\">" + fwObj.streak.quantity + "</b><br>";
		
		UOP_hud.innerHTML += JSON.stringify(userObj.viewing_atts.desert_warpath.streak,null,'\t') ;
	}
	
	//LG
	if ((userObj.environment_id == 35)||(userObj.environment_id == 41)||(userObj.environment_id == 42)){
		for (var key in userObj.quests){
			if (userObj.quests[key].hasOwnProperty('essences')) {
				UOP_hud.innerHTML += '<em style=\"font-size:1.1em;color:limegreen;\" >Petals : ' + userObj.quests[key].loot_drops.dewthief_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.dreamfluff_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.duskshade_petal_crafting_item.quantity + ']-' + userObj.quests[key].loot_drops.graveblossom_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.plumepearl_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.lunaria_petal_crafting_item.quantity + ']</em><br>';
				i=8;
				while (userObj.quests[key].essences[i].quantity==0) i--;
				var sum=0;
				for (var j=0; j<9; j++){// j<=i
					if (j<=i) UOP_hud.innerHTML += '<em style=\"color:dodgerblue;\" >['+String.fromCharCode(j+65) + ':'+userObj.quests[key].essences[j].quantity + ']&emsp;</em>';
					if (j<7) sum = sum/3 + userObj.quests[key].essences[j].quantity;//Gur
				}
				UOP_hud.innerHTML += '<br>= ' + sum + '&emsp;<em style=\"color:dodgerblue;\" >' +  userObj.quests[key].essences[6].name + '<br></em>';//Gur
				UOP_hud.innerHTML += '<em style=\"font-size:0.8em;color:grey;\">' + JSON.stringify(userObj.quests[key].minigame ,null,'\t') + '</em><br>';
			} 
			break;
		}
		
		//Living Garden
		if (userObj.environment_id == 35){
			var smallObj = userObj.quests.QuestLivingGarden;
			if (smallObj.is_normal){
				if (smallObj.minigame.bucket_state == "filling"){
					if (smallObj.minigame.estimate == 35){
						UOP_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
						UOP_alarm(null,null);
						}else{// <35
						if (userObj.trinket_item_id != 1020){//sponge id
							UOP_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****20 charms only****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							UOP_alarm(null,null);
						}
					}
				}
				}else{
				if (smallObj.minigame.vials_state == "filling"){
					if (smallObj.minigame.estimate == 35){
						UOP_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
						UOP_alarm(null,null);
						}else{// <35
						if ((userObj.trinket_item_id != 1017) && (userObj.trinket_item_id != 1022)){
							UOP_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****10 charms each****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							UOP_alarm(null,null);
						}
					}
				}
			}
		}
		//Lost City
		if (userObj.environment_id == 41){
			var smallObj = userObj.quests.QuestLostCity;
			if (smallObj.is_normal){
				if (smallObj.minigame.curses[0].active && !smallObj.minigame.curses[0].charm.equipped){
					UOP_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
					UOP_alarm(null,null);
				}
				}else{
				if (smallObj.minigame.is_cursed && !((smallObj.minigame.curses[0].active && smallObj.minigame.curses[0].charm.equipped) || (smallObj.minigame.curses[1].active && smallObj.minigame.curses[1].charm.equipped) || (smallObj.minigame.curses[2].active && smallObj.minigame.curses[2].charm.equipped) )){
					UOP_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
					UOP_alarm(null,null);
				}
			}
		}
		//Sand Dunes
		if (userObj.environment_id == 42){
			var smallObj = userObj.quests.QuestSandDunes;
			if (smallObj.is_normal){
				if (smallObj.minigame.has_stampede && (userObj.trinket_item_id != 1016)){
					UOP_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
					UOP_alarm(null,null);
				}
				}else{
				var salt = window.localStorage.getItem("KGSalt");
				if (salt == undefined || salt == null){
					window.localStorage.setItem("KGSalt", 20);
					salt = 20;
				}
				UOP_hud.innerHTML += 'min Salt to alert : <input type="number" id="SaltInput" name="Salt" value="' + salt.toString() + '"/>';
				UOP_hud.innerHTML += '&emsp;&emsp;&emsp;&emsp;<input type="button" value="Save" onclick="window.localStorage.setItem(\'KGSalt\', document.getElementById(\'SaltInput\').value);window.location.href=\'/\';"/><br>';
				UOP_hud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
				if ((smallObj.minigame.salt_charms_used >= salt)&&(userObj.trinket_item_id != 1015)) UOP_alarm(null,null);
				if ((smallObj.minigame.salt_charms_used == 0)&&(userObj.trinket_item_id == 1015)) UOP_alarm(null,null);
			}
		}
	}
}
function UOP_UpdateCursorPosition(e) { UOP_global.UOP_cX = e.pageX; UOP_global.UOP_cY = e.pageY; }
function UOP_addEvent(c) {
	if (document.body.addEventListener) {document.body.addEventListener(c, UOP_UpdateCursorPosition, false)}
	else {
		if (window.attachEvent) {document.body.attachEvent("on" + c, UOP_UpdateCursorPosition)}
		else {document.body["on" + c] = UOP_UpdateCursorPosition}
	}
}
function UOP_HideContent() {
	UOP_global.UOP_imageBox.style.display = "none";
}
function UOP_ShowContent(img) {
	var rX = 0, rY = 0,	vW, vH;
	UOP_global.UOP_imagePhoto.src = img;
	
	if (self.innerWidth) vW = self.innerWidth;
	else if (document.documentElement && document.documentElement.clientWidth) vW = document.documentElement.clientWidth;
	else if (document.body) vW = document.body.clientWidth;
	if (self.innerWidth) vH = self.innerHeight;
	else if (document.documentElement && document.documentElement.clientHeight) vH = document.documentElement.clientHeight;
	else if (document.body) vH = document.body.clientHeight;
	if (self.pageYOffset) {rX = self.pageXOffset;rY = self.pageYOffset;}
	else if (document.documentElement && document.documentElement.scrollTop) {rX = document.documentElement.scrollLeft;rY = document.documentElement.scrollTop;}
	else if (document.body) {rX = document.body.scrollLeft;rY = document.body.scrollTop;}
	vW += rX;vH -= rY;
	
	var oW = UOP_global.UOP_imageBox.offsetWidth;
	var oH = UOP_global.UOP_imageBox.offsetHeight;
	if (UOP_global.UOP_cX + 10 + oW > vW) UOP_global.UOP_imageBox.style.left = (UOP_global.UOP_cX - 10 - oW) + "px";
	else UOP_global.UOP_imageBox.style.left = (UOP_global.UOP_cX+10) + "px";
	UOP_global.UOP_imageBox.style.top = (UOP_global.UOP_cY - Math.floor(oH / 2) + 10) + "px";
	
	UOP_global.UOP_imageBox.style.display = "block";
}
function UOP_updateJounal() {
	journalimages = document.getElementsByClassName('journalimage');
	for (var i = 0;i < journalimages.length;++i)
	{
		if ((journalimages[i].firstChild == null) || (journalimages[i].firstChild.tagName.toUpperCase() == "IMG")) continue;
		if (journalimages[i].firstChild.getAttribute('onmouseover') == null)
		{
			journalimages[i].firstChild.setAttribute('onmousemove','UOP_global.UOP_callbackFunctions.UOP_ShowContent(this.href); return true;');
			journalimages[i].firstChild.setAttribute('onmouseover','UOP_global.UOP_callbackFunctions.UOP_ShowContent(this.href); return true;');
			journalimages[i].firstChild.setAttribute('onmouseout','UOP_global.UOP_callbackFunctions.UOP_HideContent(); return true;');
		}
		else break;
	}
}
//DEFAULT skin
function UOP_defaultSkin() { //~~~~
	//===========Change the top row of mousehunt=================
	var hgRow = document.getElementById('hgRow');
	var separator_right = hgRow.getElementsByClassName('hgSeparator right')[0];
	var separator_left = hgRow.getElementsByClassName('hgSeparator left')[0];
	
	var rightbanner = hgRow.getElementsByClassName('rightBanners')[0];//remove rightbanner (levylight....) and change it to rightedge
	UOP_cleanObject(rightbanner); //rightbanner.innerHTML = "";
	rightbanner.setAttribute('class','rightEdge');
	hgRow.insertBefore(separator_right.cloneNode(true),document.getElementById('supportMenu'));//end of remove rightbanner
	
	UOP_removeObject(document.getElementById('appLogo'),hgRow); //remove leftbanner (mousehunt)
	//fix the banners dropdown
	document.getElementById('hgDropDownCommunity').style.right = "91px";
	document.getElementById('hgDropDownSupport').style.right = "5px";
	
	//add SB+ and Inbox and mobile
	var sbplus = UOP_global.UOP_objects.UOP_leftPanelTemplate.cloneNode(true);
	sbplus.id = "UOP_appTabSuperBrie";
	sbplus.setAttribute('onclick','showCheckout("donatebutton"); return false;');
	sbplus.style.cssFloat = "right";
	
	sbplus.firstChild.firstChild.firstChild.src = "images/items/bait/d3bb758c09c44c926736bbdaf22ee219.gif";
	
	sbplus.lastChild.firstChild.style.textDecoration = "none"
	
	sbplus.lastChild.firstChild.removeAttribute('href');
	sbplus.lastChild.firstChild.textContent = document.getElementById('appTabSuperBrie').getElementsByClassName('appTabMiddle')[0].childNodes[1].textContent;		
	
	var inbox = document.getElementById('communityMenu').cloneNode(true);
	var oldinbox = document.getElementById('appInboxTab');
	var inboxnotification = document.getElementById('appInboxTab').getElementsByClassName('alerts')[0].cloneNode(true);
	oldinbox.id = "appoldInbox";
	inbox.id = "appInboxTab";
	UOP_removeObject(inbox.lastChild,inbox);
	inbox.appendChild(inboxnotification);
	inbox.setAttribute('onclick',"javascript:messenger.UI['notification'].showPopup(); return false;");
	inbox.style.marginLeft = "0px";
	inbox.style.cursor = "pointer";
	inbox.firstChild.style.color = "#4DA55A";
	inbox.firstChild.style.backgroundImage = "url(images/ui/hgbar/hgrow_middle_blue.png)";
	inbox.firstChild.style.cursor = "pointer";
	inbox.firstChild.textContent = "INBOX";
	inboxnotification.style.backgroundImage = "url(images/ui/hgbar/alert_badge.png)";
	inboxnotification.style.position = "absolute";
	inboxnotification.style.right = "0px";
	inboxnotification.style.top = "0px";
	inboxnotification.style.zIndex = "10";
	inboxnotification.style.width = "22px";
	inboxnotification.style.height = "20px";
	inboxnotification.style.paddingTop = "2px";
	inboxnotification.style.color = "white";
	inboxnotification.style.textAlign = "center";
	inboxnotification.style.fontWeight = "bold";
	inboxnotification.style.margin = "5px 205px 0px 0px";
	inboxnotification.style.cursor = "pointer";

	var mobile = document.getElementById('UOP_appControlPanel').cloneNode(true);
	mobile.id = "UOP_appMobile";
	mobile.className = "hgMenu";
	mobile.removeAttribute('onclick');
	mobile.firstChild.firstChild.href = document.getElementsByClassName('switch')[0].firstChild.href;
	mobile.firstChild.firstChild.firstChild.src = "data:image/png;base64,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";
	
	var freeSB = null;
	tmp = document.getElementsByClassName('freeoffers_button');
	if (tmp.length > 0)
	{
		tmp = tmp[0];
		freeSB = document.getElementById('UOP_appControlPanel').cloneNode(true);
		freeSB.id = "UOP_freeSB";
		freeSB.className = "hgMenu";
		freeSB.setAttribute('onclick',tmp.getAttribute('onclick'));
		var freeSBchild = freeSB.firstChild;
		freeSB.firstChild.style.width = "65px";
		freeSBchild = freeSBchild.firstChild.firstChild;
		freeSBchild.src = "images/ui/buttons/free_sb_offers_btn.gif";
		freeSBchild.style.width = "54px";
		UOP_removeObject(tmp,null);
	}
	
	var appendbefore = document.getElementById('communityMenu').nextSibling.nextSibling;
	hgRow.insertBefore(inbox,appendbefore);
	hgRow.insertBefore(separator_right.cloneNode(true),appendbefore);
	hgRow.insertBefore(sbplus,appendbefore);
	hgRow.insertBefore(separator_right.cloneNode(true),appendbefore);
	hgRow.appendChild(mobile);
	hgRow.appendChild(separator_left.cloneNode(true));
	if (freeSB != null)
	{
		hgRow.appendChild(freeSB);
		hgRow.appendChild(separator_left.cloneNode(true));
	}

	//wiki => community; livedevchat => Support; news => community
	var community = document.getElementById('hgDropDownCommunity').getElementsByClassName('hgDropdownMiddle')[0];
	var support = document.getElementById('hgDropDownSupport').getElementsByClassName('hgDropdownMiddle')[0];

	var hgdropdownitem = community.firstChild.cloneNode(true);
	hgdropdownitem.className = "hgDropDownItem";
	hgdropdownitem.firstChild.href = "http://mhwiki.hitgrab.com/wiki/";
	hgdropdownitem.firstChild.firstChild.src = "images/ui/hgbar/icon_game_rules.png"
	hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "Hunter's Wiki";
	hgdropdownitem.firstChild.lastChild.innerHTML = "Contribute the knowledge<br>for the benefit of the community.";
	community.insertBefore(hgdropdownitem,community.lastChild);
	
	hgdropdownitem = support.firstChild.cloneNode(true);
	hgdropdownitem.className = "hgDropDownItem first";
	var lore = document.getElementById('nav1.lore').childNodes;
	for (i = lore.length - 1;i >= 0;--i) //because Live dev chat is near the end of the list, we just find it from the end for a bit faster ^^
	{
		if (lore[i].firstChild.textContent == "Live Dev Chat")
		{
			hgdropdownitem.firstChild.href = lore[i].firstChild.href;
			break;
		}
	}
	hgdropdownitem.firstChild.firstChild.src = "images/ui/hgbar/icon_forums.png"
	hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "Live Dev Chat";
	hgdropdownitem.firstChild.lastChild.innerHTML = "Chat with the devs<br>on each friday.";
	support.firstChild.className = "hgDropDownItem";
	support.insertBefore(hgdropdownitem,support.firstChild);
	
	hgdropdownitem = community.firstChild.cloneNode(true);
	hgdropdownitem.className = "hgDropDownItem first";
	var news = document.getElementById('nav1.boards').childNodes;
	for (i = news.length - 1;i >= 0;--i)
	{
		if (news[i].firstChild.textContent == "News")
		{
			hgdropdownitem.firstChild.href = news[i].firstChild.href;
			break;
		}
	}
	hgdropdownitem.firstChild.firstChild.src = "images/ui/hgbar/icon_offense_appeals.png"
	hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "News";
	hgdropdownitem.firstChild.lastChild.innerHTML = "Get all the latest<br>news and updates!";
	community.firstChild.className = "hgDropDownItem";
	community.insertBefore(hgdropdownitem,community.firstChild);
	
	hgdropdownitem = community.firstChild.cloneNode(true);
	hgdropdownitem.className = "hgDropDownItem first";
	for (i = news.length - 1;i >= 0;--i)
	{
		if (news[i].firstChild.textContent == "Chat Room")
		{
			hgdropdownitem.firstChild.href = news[i].firstChild.href;
			break;
		}
	}
	hgdropdownitem.firstChild.firstChild.src = "images/ui/hgbar/icon_forums.png"
	hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "Chat room";
	hgdropdownitem.firstChild.lastChild.innerHTML = "Join the Mousehunt<br>Chat room";
	community.firstChild.className = "hgDropDownItem";
	community.insertBefore(hgdropdownitem,community.firstChild);
	
	//move announcement to the Larry hunting tips
	var huntingTips = document.getElementById('huntingTips');
	var tickers = document.getElementsByClassName('ticker');
	var tickerlist = document.createElement("ul");
	if ((huntingTips != undefined) && tickers.length != 0) //if there are Larry around then he will announce it for us ^_^ or if there are something  to announce
	{
		huntingTips = huntingTips.getElementsByClassName('content')[0];
		var newHuntingNode = null;
		newHuntingNode = document.createElement("p");
		newHuntingNode.innerHTML = "_______________________________________________________<br>ANNOUNCEMENT:";
		huntingTips.appendChild(newHuntingNode);
		for (i = 0;i < tickers.length;++i)
		{
			newHuntingNode = document.createElement("li");
			newHuntingNode.innerHTML = tickers[i].innerHTML;
			tickerlist.appendChild(newHuntingNode);
		}
		tickerlist.style.listStyleType = "disc";
		tickerlist.style.marginLeft = "20px";
		huntingTips.appendChild(tickerlist);
	}
	
	//remove some others elements
	tmp = document.getElementById('hgbar');
	UOP_removeObject(document.getElementById('appRow'),tmp);//remove the appRow (Inbox,play,Free gift...)
	UOP_removeObject(document.getElementById('newsRowHolder'),tmp);//remove the News
	
	//==========Change the container (main page) of mousehunt==============
	var container = document.getElementsByClassName('container')[0];
	UOP_removeObject(container.getElementsByClassName('clear')[0],container);//remove the like button in the bottom of the pages
	
	//=======gameinfo changes=======
	//add Golden shield expires day (more obvious)
	if (UOP_global.UOP_user.user.has_shield)
		document.getElementsByClassName('gameinfo')[0].firstChild.lastChild.innerHTML = "<span style='font-weight: bold;'>LGS:</span> <span style='color: #3B5998; font-weight: bold;'>" + document.getElementsByClassName('gamelogo')[0].title.substr(37) + "</span>";
	else
		document.getElementsByClassName('gameinfo')[0].firstChild.lastChild.innerHTML = "<span style='font-weight: bold;'>No LGS</span>";
	
	//=======NAVIGATOR changes======
	//move camp and marketplace button
	var campbtn = document.getElementsByClassName('campbutton')[0];
	var donationarea = document.getElementsByClassName('donatebuttonarea')[0];
	campbtn.parentNode.removeChild(campbtn);//move the camp button to donation area for moving easier
	donationarea.insertBefore(campbtn,donationarea.firstChild);
	
	document.getElementsByClassName('marketplace_button')[0].style.margin = "49px 0px 0px -514px"; //move Marketplace
	document.getElementById('hornArea').style.marginLeft = "101px";
	
	//on the last version, we can't make button friend go a bit far because of list limited but
	//on this version, we will change the travel button into campbutton, so it look like the camp button moved back to it place
	//and camp button (on the right side) to friend button and have the toggle animation so it look like the old friend button
	//and so we just hide the friend button
	////change camp => friend
	campbtn = document.getElementById('campButton');
	campbtn.style.margin = "70px 0px 0px 20px";
	campbtn.id = "btn-friend";
	campbtn.parentNode.setAttribute('onmouseover',"javascript:toggleNavCategory('nav1.friends', 'visible');");
	campbtn.parentNode.setAttribute('onmouseout',"javascript:toggleNavCategory('nav1.friends', 'hidden');");
	campbtn.style.background = "url('images/ui/buttons/navbuttons.en.gif?v=4') no-repeat -313px -38px";
	campbtn.style.width = "74px";
	campbtn.style.height = "26px";
	////change travel => camp
	var travelbtn = document.getElementById('btn-travel');
	travelbtn.className = "navitem";
	travelbtn.style.height = "26px";
	travelbtn.style.width = "69px";
	travelbtn.style.background = "url('images/ui/buttons/navbuttons.en.gif?v=5') no-repeat 0px 0px";
	travelbtn.style.backgroundSize = "600%";
	travelbtn.id = "campButton";
	////change their href
	travelbtn.href = campbtn.href;
	campbtn.href = document.getElementById('btn-friends').href;
	
	
	//combining friend & team
	var teamnav = document.getElementById('nav1.teams');
	var teamnavarr = teamnav.childNodes;
	var friendnav = document.getElementById('nav1.friends');
	var friendnavarr = friendnav.childNodes;
	for (i = 0;i < friendnavarr.length;++i)
		if (friendnavarr[i].firstChild.textContent == "Invite Friends")//remove invite friend
		{
			UOP_removeObject(friendnavarr[i],friendnav);
			--i;
		}
	for (i = 0;i < teamnavarr.length;++i)
	{
		if (teamnavarr[i].firstChild.textContent == "View Team")
		{
			friendnav.insertBefore(teamnavarr[i],friendnav.firstChild);
			--i;
		}
		else if (teamnavarr[i].firstChild.textContent == "Tournaments")
		{
			friendnav.appendChild(teamnavarr[i]);
			--i;
		}
	}
	
	//add Mice to inventory
	var inventory = document.getElementById('nav1.inventory');
	var micepage = inventory.lastChild.cloneNode(true);
	inventory.appendChild(micepage);
	micepage = micepage.firstChild;
	micepage.href = document.getElementsByClassName('navitem micebutton')[0].href;
	micepage.innerHTML = "Mice";
	
	//remove the following button, it will be replaced on a different place: Donate, travel, mice, lore, forum, friend
	UOP_removeObject(document.getElementsByClassName('donatebutton')[0],donationarea);
	var mainnav = document.getElementsByClassName('navitem lorebutton')[0].parentNode.parentNode;
	document.getElementById('btn-friends').style.display = "none";	//mainnav.removeChild(document.getElementsByClassName('navitem travelbutton')[0].parentNode);
	UOP_removeObject(document.getElementsByClassName('navitem micebutton')[0].parentNode,mainnav);
	UOP_removeObject(document.getElementsByClassName('navitem lorebutton')[0].parentNode,mainnav);
	UOP_removeObject(document.getElementsByClassName('navitem newsbutton')[0].parentNode,mainnav);
	UOP_removeObject(document.getElementsByClassName('navitem forumsbutton')[0].parentNode,mainnav);
	//fix the dropdown
	document.getElementById('nav1.shops').style.left = "308px";
	document.getElementById('nav1.inventory').style.left = "213px";
	document.getElementById('nav1.friends').style.left = "645px";
	
	//======HUD change======
	var hud_base_parent = document.getElementById('hud_base').parentNode.parentNode.parentNode;
	UOP_removeObject(hud_base_parent,null);//remove the base. It does not necessary because the content showed that

	var hud_bait = document.getElementById('hud_baitName').parentNode;
	var hud_gold_list = hud_bait.parentNode;
	UOP_removeObject(hud_bait,hud_gold_list); //remove the bait
	
	var hud_team = document.getElementById('hud_team');
	if (hud_team != undefined)
	{
		hud_team = hud_team.parentNode;
		UOP_removeObject(hud_team,null); //and remove the old team list
		hud_gold_list.appendChild(hud_team); //move the "Team" information to the place of the bait we had just removed
	}
	
	UOP_travelToTabBar();
	UOP_shopToTabBar();
	UOP_potToTabBar();
	UOP_craftToTabBar();
	
	//precious title advancing
	UOP_titleBar = document.getElementById('hud_titlebar');
	UOP_titlePercentage = document.getElementById('hud_titlePercentage');
	
	//detailed timer
	UOP_huntTimer = document.getElementById('huntTimer').cloneNode(true);
	document.getElementById('hornArea').appendChild(UOP_huntTimer);
	document.getElementById('huntTimer').style.display = "none";
	UOP_huntTimer.id = "UOP_huntTimerParent";
	UOP_huntTimer.innerHTML = "<span class='timerlabel'>Next Hunt:</span> <span id='UOP_huntTimer'></span>";
	UOP_huntTimer = document.getElementById('UOP_huntTimer');
	if (UOP_global.UOP_objects.UOP_hornbutton == undefined)
	{
		var hornbutton = document.getElementsByClassName('hornbutton')[0].firstChild;
		hornbutton.setAttribute("onclick",hornbutton.getAttribute("onclick").replace("return false;","UOP_global.UOP_callbackFunctions.UOP_sound(); return false;"));
		UOP_global.UOP_objects.UOP_hornbutton = hornbutton;
	}
	//location timer
	var headsup = document.getElementById('hud_statList1').parentNode;
	var headsuparr = headsup.getElementsByClassName('hudstatlist');
	UOP_locationTimerParent = document.createElement('div');
	UOP_locationTimerParent.className = 'hudstatlist';
	headsup.insertBefore(UOP_locationTimerParent,headsuparr[1].nextSibling);
	UOP_locationTimerParent.appendChild(document.createElement('ul'));
	UOP_locationTimerParent = UOP_locationTimerParent.firstChild;
	UOP_locationTimerParent.id = "UOP_locationTimerParent";
	
	var locationTimerObject;
	UOP_global.UOP_objects.locationTimer = new Array;
	for (var i = 0;i < 3;++i)
	{
		locationTimerObject = document.createElement('li');
		UOP_locationTimerParent.appendChild(locationTimerObject);
		locationTimerObject.innerHTML = "<span class='hudstatlabel'>" + UOP_C_LOCATION_TIMES[i].name + ":</span> <span id='" + UOP_C_LOCATION_TIMES[i].id + "'></span>";
		UOP_global.UOP_objects.locationTimer[i] = locationTimerObject.lastChild;
	}
	
	document.getElementsByClassName('gameinfo')[0].firstChild.firstChild.innerHTML = "<span style='font-weight: bold;'>" + UOP_C_LOCATION_TIMES[3].name + ":</span> <span id='" + UOP_C_LOCATION_TIMES[3].id + "'></span>";
	UOP_global.UOP_objects.locationTimer[3] = locationTimerObject.lastChild;
	
	//New bait number location
	var UOP_baitnum = document.getElementById('hud_baitIcon').parentNode;
	UOP_baitnum.insertBefore(document.createElement('div'),UOP_baitnum.firstChild);
	UOP_baitnum = UOP_baitnum.firstChild;
	UOP_baitnum.id = "UOP_baitnum";
	UOP_baitnum.setAttribute('style','position: absolute;right: 44px;z-index: 10;text-align: center;cursor: pointer;padding: 3px 5px;-moz-border-radius: 5px;border-radius: 5px;border: 0 none;color: #fff;background-color: #549906;background-image: -webkit-gradient(linear, center bottom, center top, from(#549906), to(#92c315));background-image: -moz-linear-gradient(90deg, #549906, #92c315);font-weight: bold;');
	UOP_baitnum.innerText = UOP_global.UOP_user.user.bait_quantity;
	UOP_global.UOP_objects.UOP_baitnum = UOP_baitnum;
	
	//mouse autozoom
	UOP_addEvent("mousemove");
	UOP_addEvent("mousewheel");
	UOP_global.UOP_imageBox = document.createElement("div");
	UOP_global.UOP_imageBox.id = "UOP__global.UOP_imagePhotoZoomBox";
	UOP_global.UOP_imageBox.setAttribute("style","display:none;padding-top: 5px;padding-right: 5px;padding-bottom: 5px;padding-left: 5px;-webkit-transition-duration: 0s;-moz-transition: opacity 0s ease-in-out;-webkit-transition: opacity 0s ease-in-out;transition: opacity 0s ease-in-out;position: absolute;overflow: hidden;font-size: 0;-moz-box-shadow: 0px 0px 10px rgba(0,0,0,1);-webkit-box-shadow: 0px 0px 10px rgba(0,0,0,1);box-shadow: 0px 0px 10px rgba(0,0,0,1);min-height: 50px;min-width: 50px;pointer-events: none;background: white url(data:image/gif;base64,R0lGODlhEAALALMMAOXp8a2503CHtOrt9L3G2+Dl7vL0+J6sy4yew1Jvp/T2+e/y9v///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCwAMACwAAAAAEAALAAAEK5DJSau91KxlpObepinKIi2kyaAlq7pnCq9p3NZ0aW/47H4dBjAEwhiPlAgAIfkECQsADAAsAAAAAAQACwAABA9QpCQRmhbflPnu4HdJVAQAIfkECQsADAAsAAAAABAACwAABDKQySlSEnOGc4JMCJJk0kEQxxeOpImqIsm4KQPG7VnfbEbDvcnPtpINebJNByiTVS6yCAAh+QQJCwAMACwAAAAAEAALAAAEPpDJSaVISVQWzglSgiAJUBSAdBDEEY5JMQyFyrqMSMq03b67WY2x+uVgvGERp4sJfUyYCQUFJjadj3WzuWQiACH5BAkLAAwALAAAAAAQAAsAAAQ9kMlJq73hnGDWMhJQFIB0EMSxKMoiFcNQmKjKugws0+navrEZ49S7AXfDmg+nExIPnU9oVEqmLpXMBouNAAAh+QQFCwAMACwAAAAAEAALAAAEM5DJSau91KxlpOYSUBTAoiiLZKJSMQzFmjJy+8bnXDMuvO89HIuWs8E+HQYyNAJgntBKBAAh+QQFFAAMACwMAAIABAAHAAAEDNCsJZWaFt+V+ZVUBAA7) no-repeat center center;z-index: 99999;");
	UOP_global.UOP_imageBox.innerHTML = "<img id=\"UOP__global.UOP_imagePhotoZoomPhoto\" style=\"position: relative; z-index: 2; width: auto; height: auto;\">";
	UOP_global.UOP_imagePhoto = UOP_global.UOP_imageBox.firstChild;
	document.body.appendChild(UOP_global.UOP_imageBox);
	UOP_updateJounal();
	
	//start the timers
	UOP_secondTimerTasks();
	UOP_shortTimerTasks();
	UOP_minuteTimerTasks();
}
/*******************AUTO AREA********************/
function UOP_initStandardAuto() {
	var hgRow = document.getElementById('hgRow');
	var separator_left = hgRow.getElementsByClassName('hgSeparator left')[0];
	var autopanel = UOP_global.UOP_objects.UOP_leftPanelTemplate.cloneNode(true);
	autopanel.id = "UOP_appAutoPanel";
	autopanel.setAttribute('onclick','UOP_global.UOP_callbackFunctions.UOP_autoChangeState();return false;');
	autopanel.style.cssFloat = "left";

	UOP_cleanObject(autopanel.firstChild);

	var strtmp;
	strtmp = '<div class="UOPplaying">'; 
	strtmp += '<a class="UOPautoplayimg" style="text-decoration: none;"><img class="picture" style="width: 29px; height: 29px; position: relative; top: 3px; left: 0px; padding-left: 5px;" src="data:image/png;base64,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">&nbsp;</a>';
	strtmp += '<a class="UOPautopauseimg" style="text-decoration: none;"><img class="picture" style="width: 29px; height: 29px; position: relative; top: 3px; left: 0px; padding-left: 5px;" src="data:image/png;base64,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">&nbsp;</a>';
	strtmp += '</div>';
	autopanel.firstChild.innerHTML = strtmp;
	UOP_global.UOP_objects.UOPplaying = autopanel.firstChild.firstChild;

	UOP_cleanObject(autopanel.lastChild);
	autopanel.lastChild.innerHTML = "<label id='UOPautoPauseCounter' style='cursor: pointer;display:none;color: #FBB117;'>Paused</label><label id='UOPautoSounding' style='cursor: pointer;display:none;color: Skyblue;'></label><div style='cursor: pointer;display:inline;'><label id='UOPautoMainCounter' style='cursor: pointer;color: Red;'></label><label style='cursor: pointer;'> + </label><label id='UOPautoDelayCounter' style='cursor: pointer;color: Green;'></label></div>";
	UOP_global.UOP_objects.UOPautoPanel = autopanel.lastChild;
	UOP_global.UOP_objects.UOPautoPauseCounter = autopanel.lastChild.firstChild;
	UOP_global.UOP_objects.UOPautoSounding = autopanel.lastChild.firstChild.nextSibling;
	UOP_global.UOP_objects.UOPautoCounter = autopanel.lastChild.lastChild;
	UOP_global.UOP_objects.UOPautoMainCounter = UOP_global.UOP_objects.UOPautoCounter.firstChild;
	UOP_global.UOP_objects.UOPautoDelayCounter = UOP_global.UOP_objects.UOPautoCounter.lastChild;

	
	hgRow.appendChild(autopanel);
	hgRow.appendChild(separator_left.cloneNode(true));
	
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".UOPplaying .UOPautopauseimg {display:none;} .UOPpausing .UOPautoplayimg {display:none;}";
	document.head.appendChild(css);
	
	if (UOP_global.UOP_objects.UOP_hornbutton == undefined)
	{
		var hornbutton = document.getElementsByClassName('hornbutton')[0].firstChild;
		hornbutton.setAttribute("onclick",hornbutton.getAttribute("onclick").replace("return false;","UOP_global.UOP_callbackFunctions.UOP_sound(); return false;"));
		UOP_global.UOP_objects.UOP_hornbutton = hornbutton;
	}
	UOP_genDelayTime();
	UOP_autoCoreInit();
}
function UOP_autoCoreInit() {
	UOP_global.UOP_autoVar.UOP_soundingCounter = 0;
	UOP_global.UOP_autoVar.UOP_soundedCounter = 0;
	UOP_global.UOP_autoVar.UOP_hornRetryCounter = 0;
	UOP_global.UOP_autoVar.UOP_autoPaused = 0;
	UOP_autoKRInit();
	UOP_autoCoreAction();
}
function UOP_autoCoreDecide(nextTurnSeconds,nextDelaySeconds) {
	//0 = PAUSE; 1 = KR; 2 = MAIN COUNT; 3 = DELAY COUNT; 4 = HORN; 5 = TIME OUT BUT HORN IS NOT READY
	if (UOP_global.UOP_autoVar.UOP_autoPaused == 1) return 0; //paused
	if ((location.pathname != "/index.php") && (location.pathname != "/")) return 0; //not on camp
	if (UOP_global.UOP_user.user.bait_quantity == 0) return 0; //no bait
	if (UOP_global.UOP_user.user.has_puzzle == true) return 1; //KR
	if (nextTurnSeconds > 0) return 2; //still counting
	if (nextDelaySeconds > 0) return 3; //count is done, delaying
	if (UOP_mode == 1)
	{
		if (UOP_global.UOP_objects.UOP_hornbutton.parentNode.style.display == "none") return 5;
	}
	else
	{
		if (UOP_global.UOP_objects.UOP_hornheader.className.indexOf('hornready') == -1) return 5; //error: everything is done, but horn is not displayed
	}
	return 4;
}
function UOP_autoCoreAction() {
	var curTime = new Date().getTime();
	var nextTurnSeconds = Math.ceil((UOP_global.UOP_nextTurnTimestamp - curTime) / 1000);
	var nextDelaySeconds;
	nextDelaySeconds = (nextTurnSeconds > 0) ? (UOP_global.UOP_autoVar.UOP_delayTime) : Math.ceil((UOP_global.UOP_autoVar.UOP_delayTimestamp - curTime) / 1000);
	var autoState = UOP_autoCoreDecide(nextTurnSeconds,nextDelaySeconds);
	var delayTimeText,hornTimeText;
	
	if (autoState == 0) //if PAUSE then display pause message
	{
		UOP_global.UOP_objects.UOPautoPauseCounter.style.display = "block";
		UOP_global.UOP_objects.UOPautoCounter.style.display = "none";
		UOP_global.UOP_objects.UOPautoSounding.style.display = "none";
		document.title = "Paused";
		if (UOP_global.UOP_user.user.bait_quantity == 0) UOP_alarm(null,null); //no bait //~~~~ remove on schedule implement
		return;
	}
	else if (autoState == 1) //if APPROACHING KR then call puzzleReaction core
	{
		UOP_puzzleStandardReaction();
		return;
	}
	else if (autoState == 2) //if (UPDATE MAIN COUNT) UPDATE MAIN COUNT
	{
		hornTimeText = UOP_formatTime(nextTurnSeconds);
		delayTimeText = UOP_formatTime(nextDelaySeconds);
		UOP_global.UOP_objects.UOPautoMainCounter.innerText = hornTimeText;
		UOP_global.UOP_objects.UOPautoDelayCounter.innerText = delayTimeText;
		UOP_huntTimer.textContent = hornTimeText;
		document.title = hornTimeText + " + " + delayTimeText;
	}
	else if (autoState == 3) //if (UPDATE DELAYER) UPDATE DELAYER
	{
		hornTimeText = "0:00";
		delayTimeText = UOP_formatTime(nextDelaySeconds);
		UOP_global.UOP_objects.UOPautoMainCounter.innerText = hornTimeText;
		UOP_global.UOP_objects.UOPautoDelayCounter.innerText = delayTimeText;
		UOP_huntTimer.textContent = hornTimeText;
		document.title = delayTimeText;
	}
	else if (autoState == 4) //if HORN => HORN
	{
		UOP_global.UOP_objects.UOP_hornbutton.click();
		return;
	}
	else if (autoState == 5) //TIME OUT BUT NOT READY
	{
		if (((UOP_global.settings.UOP_aggressive == 2) && (UOP_global.UOP_user.user.viewing_atts.hasOwnProperty('tournament')) && (UOP_global.UOP_user.user.viewing_atts.tournament.status == "active")) || //if: aggressive in tour AND joined tour AND tour is active
		(UOP_global.settings.UOP_aggressive == 0))
		{
			if (UOP_mode == 1)
			{
				UOP_global.UOP_objects.UOP_hornbutton.parentNode.style.display = "block";
			}
			else
			{
				UOP_global.UOP_objects.UOP_hornheader.className = "header hornready";
			}
			UOP_global.UOP_objects.UOP_hornbutton.click();
		} else
			UOP_global.UOP_callbackFunctions.UOP_syncUser(true,UOP_autoCoreCallback);
		return;
	}
	setTimeout(function () { (UOP_autoCoreAction)() }, UOP_global.UOP_autoVar.UOP_S_AutoTimer * 1000);
}
function UOP_autoCoreCallback() {
	if (UOP_global.UOP_user.user.next_activeturn_seconds == 0)
	{
		if (UOP_mode == 1)
		{
			UOP_global.UOP_objects.UOP_hornbutton.parentNode.style.display = "block";
		}
		else
		{
			UOP_global.UOP_objects.UOP_hornheader.className = "header hornready";
		}
		UOP_global.UOP_objects.UOP_hornbutton.click();
		return;
	}
	else
	{
		UOP_global.UOP_nextTurnTimestamp = UOP_global.UOP_user.user.next_activeturn_seconds * 1000 + new Date().getTime();
		UOP_genDelayTime();
		setTimeout(function () { (UOP_autoCoreAction)() }, UOP_global.UOP_autoVar.UOP_S_AutoTimer * 1000);
	}
}
function UOP_autosounding() {
	++UOP_global.UOP_autoVar.UOP_soundingCounter;
	if (UOP_global.UOP_autoVar.UOP_soundingCounter == 1) //first time
	{
		UOP_global.UOP_objects.UOPautoPauseCounter.style.display = "none";
		UOP_global.UOP_objects.UOPautoSounding.style.display = "block";
		UOP_global.UOP_objects.UOPautoCounter.style.display = "none";
		UOP_global.UOP_objects.UOPautoSounding.innerText = "Sounding...";
	}
	else if (UOP_global.UOP_autoVar.UOP_soundingCounter > 120)
	{
		UOP_global.UOP_objects.UOPautoSounding.innerText = "Too long. Refreshing !";
		location.reload();
	}
	else if (UOP_global.UOP_autoVar.UOP_soundingCounter > 30)
	{
		UOP_global.UOP_objects.UOPautoSounding.innerText = "Longer than expected...";
	}
}
function UOP_autosounded() {
	++UOP_global.UOP_autoVar.UOP_soundedCounter;
	if (UOP_global.UOP_autoVar.UOP_soundedCounter == 1) //first time
	{
		UOP_global.UOP_objects.UOPautoSounding.innerText = "Completed !";
	}
	else if (UOP_global.UOP_autoVar.UOP_soundedCounter > 50)
	{
		UOP_global.UOP_objects.UOPautoSounding.innerText = "New message !";
		UOP_global.UOP_callbackFunctions.UOP_syncUser(false,null);
		if (UOP_global.UOP_user.user.has_puzzle == true) UOP_puzzleStandardReaction();
	}
	
}
function UOP_autohornwaiting() {
	if (UOP_global.UOP_user.user.has_puzzle == true) UOP_puzzleStandardReaction();
	if (UOP_global.UOP_user.user.next_activeturn_seconds == 0)
	{
		++UOP_global.UOP_autoVar.UOP_hornRetryCounter;
		if (UOP_global.UOP_autoVar.UOP_hornRetryCounter > 1) location.reload();
		UOP_global.UOP_objects.UOP_hornbutton.click();
		return;
	}
	UOP_global.UOP_objects.UOPautoPauseCounter.style.display = "none";
	UOP_global.UOP_objects.UOPautoSounding.style.display = "none";
	UOP_global.UOP_objects.UOPautoCounter.style.display = "block";
	UOP_genDelayTime();
	UOP_autoCoreInit();
}
function UOP_genDelayTime() {
	var delaymin = UOP_global.settings.UOP_delaymin;
	var delaymax = UOP_global.settings.UOP_delaymax;
	if (((UOP_global.settings.UOP_aggressive == 2) && (UOP_global.UOP_user.user.viewing_atts.hasOwnProperty('tournament')) && (UOP_global.UOP_user.user.viewing_atts.tournament.status == "active")) || //if: aggressive in tour AND joined tour AND tour is active
		(UOP_global.settings.UOP_aggressive == 0))
		delaymin = delaymax = 0;
	if (UOP_global.UOP_user.user.next_activeturn_seconds == 0)
		delaymin = delaymax = 3;
	if (delaymax > delaymin) UOP_global.UOP_autoVar.UOP_delayTime = Math.floor((Math.random()*(delaymax - delaymin))+delaymin);
	else UOP_global.UOP_autoVar.UOP_delayTime = delaymin;
	UOP_global.UOP_autoVar.UOP_delayTimestamp = UOP_global.UOP_nextTurnTimestamp + UOP_global.UOP_autoVar.UOP_delayTime * 1000;
}
function UOP_autoChangeState() {
	if (UOP_global.UOP_autoVar.UOP_autoPaused == 0)
	{
		UOP_global.UOP_autoVar.UOP_autoPaused = 1;
		UOP_global.UOP_objects.UOPplaying.className = "UOPpausing";
	}
	else
	{
		UOP_global.UOP_autoVar.UOP_autoPaused = 0;
		UOP_global.UOP_objects.UOPplaying.className = "UOPplaying";
		UOP_global.UOP_objects.UOPautoSounding.style.display = "none";
		UOP_global.UOP_objects.UOPautoPauseCounter.style.display = "none";
		UOP_global.UOP_objects.UOPautoCounter.style.display = "block";
		UOP_autoCoreInit();
	}
}
function UOP_puzzleCoreReaction() {
	var KRstr = "";
	if (UOP_global.settings.UOP_KRsolve == 1) window.localStorage.UOP_puzzleTrySolve = 1;
	if (window.localStorage.UOP_puzzleTrySolve == 0) // bot try only 1 time //~~~~serious bug: conflict with INIT
	{
		KRstr = UOP_KRSolver();
		window.localStorage.UOP_puzzleTrySolve = 1;
		if (KRstr != "")
		{
			UOP_global.UOP_objects.UOP_puzzleAnswer.value = KRstr;
			UOP_global.UOP_objects.UOP_puzzleSubmit.click();
			setTimeout(function () { location.reload(); }, 60000);
			return;
		}
	}
	if (window.localStorage.UOP_puzzleTrySolve == 1)
	{
		UOP_alarm(UOP_global.UOP_objects.UOP_puzzleAlarm.parentNode,UOP_global.UOP_objects.UOP_puzzleAlarm);
		UOP_global.UOP_objects.UOP_puzzleAnswer.focus();
	}
}
function UOP_puzzleStandardReaction() {
	UOP_global.UOP_objects.UOPautoPauseCounter.style.display = "none";
	UOP_global.UOP_objects.UOPautoSounding.style.display = "block";
	UOP_global.UOP_objects.UOPautoCounter.style.display = "none";
	UOP_global.UOP_objects.UOPautoSounding.innerText = "King's Reward";
	document.title = "King's Reward";
	
	if (document.getElementsByClassName('puzzle').length == 0)
	{
		if (window.localStorage.UOP_puzzleReloaded == 0)
		{
			window.localStorage.UOP_puzzleReloaded = 1;
			location.reload();
		}
	}
	UOP_global.UOP_objects.UOP_puzzleAnswer = document.getElementById('puzzle_answer');
	UOP_global.UOP_objects.UOP_puzzleSubmit = document.getElementById('puzzle_submit');
	UOP_global.UOP_objects.UOP_puzzleAlarm = document.getElementById('puzzle_form');
	
	UOP_puzzleCoreReaction();
		
	UOP_global.UOP_objects.UOPautoCounter.style.display = "none";
	UOP_global.UOP_objects.UOPautoPauseCounter.style.display = "block";
	UOP_global.UOP_objects.UOPautoSounding.style.display = "none";
	UOP_global.UOP_autoVar.UOP_puzzleTimeout = new Date().getTime();
	UOP_global.UOP_objects.UOP_puzzleContainer = document.getElementById('puzzleContainer');
	UOP_puzzleCounter();
}
function UOP_KRSolver() {
	var KRstr = "";
	//~~~~server implement goes here
	{
		//if submitted query => get result or wait
		//else {submit query;waiting}
	}
	//else if server is down
	{
		//Method 1: try solve KR
		//else 
		if (window.localStorage.UOP_cacheKRstr != "")
		{
			KRstr = window.localStorage.UOP_cacheKRstr;
			window.localStorage.UOP_cacheKRstr = "";
		}
	}
	return KRstr;
}
function UOP_puzzleCounter() {
	var nextTimeoutSeconds = Math.ceil((new Date().getTime() - UOP_global.UOP_autoVar.UOP_puzzleTimeout) / 1000);
	var hour,min,sec,timeText;
	if ((UOP_global.settings.UOP_alarmStop == 0) && (nextTimeoutSeconds > UOP_global.settings.UOP_alarmStoptime))
	{
		if (typeof window.home == 'function') window.home(); else window.location.href = "about:home";
	}
	hour = Math.floor(nextTimeoutSeconds / 3600);
	min = Math.floor(nextTimeoutSeconds / 60) % 60;
	sec = nextTimeoutSeconds % 60;
	timeText = hour + ":" + ((min > 9) ? min : ("0" + min)) + ":" + ((sec > 9) ? sec : ("0" + sec));
	UOP_global.UOP_objects.UOPautoPauseCounter.innerText = timeText;

	var linkElementList = UOP_global.UOP_objects.UOP_puzzleContainer.getElementsByTagName('img');
	if (linkElementList.length > 0)
	{
		var i;
		for (i = 0; i < linkElementList.length; ++i)
		{
			// check if it is a resume button
			if (linkElementList[i].getAttribute('src').indexOf("resume_hunting_blue.gif") != -1)
			{
				// click the resume button
				var resumeElement = linkElementList[i].parentNode;
				resumeElement.click();
				
				// reload url if click fail
				setTimeout(function () { location.reload(); }, 6000);
			}
		}
	}
	
	setTimeout(function() {UOP_puzzleCounter()},UOP_global.UOP_autoVar.UOP_S_AutoTimer * 1000);
}
function UOP_autoKRInit() {
	//var curTime = new Date().getTime();
	//var lastTime = (window.localStorage.UOP_cacheKRtimestamp == undefined) ? 0 : parseInt(window.localStorage.UOP_cacheKRtimestamp);
	//var durTime = Math.ceil((curTime - lastTime) / 1000);
	//resubmitToserver after duration
	
	window.localStorage.UOP_puzzleTrySolve = 0;
	window.localStorage.UOP_puzzleReloaded = 0;
}
function UOP_loadSettingKRimage() {
	var imageLoadStr = 'puzzleimage.php?t=' + new Date().getTime() + '&snuid=' + UOP_global.UOP_user.user.sn_user_id + '&hash='+UOP_global.UOP_user.user.unique_hash;
	document.getElementById('UOP_loadKRimage').src = imageLoadStr;
	
	var len = UOP_global.UOP_settinggrouplength[0] = 461;
	UOP_global.UOP_objects.UOPsettinggroup[0].style.height = len + "px";
}
function UOP_alarm(parent,insertPoint) {
	if (UOP_global.settings.UOP_KRsound == 1)
	{
		var audioDiv = document.createElement('div');
		audioDiv.innerHTML = "<audio controls autoplay loop><source src='" + window.localStorage.UOP_KRsoundsrc + "'>Upgrade your browser please....this is HTML5</audio>";
		if ((parent == null) && (insertPoint == null)) UOP_global.UOP_objects.UOP_hornbutton.parentNode.parentNode.insertBefore(audioDiv,UOP_global.UOP_objects.UOP_hornbutton.parentNode);
		else parent.insertBefore(audioDiv,insertPoint);
	}
	else if (UOP_global.settings.UOP_KRsound == 2)
	{
		window.open(window.localStorage.UOP_KRsoundsrc);
	}
	
	if (UOP_global.settings.UOP_alarmStop == 0) //~~~~remove on schedule implement
	{
		setTimeout(function() {if (typeof window.home == 'function') window.home(); else window.location.href = "about:home";},UOP_global.settings.UOP_alarmStoptime * 1000);
	}
}
function UOP_alarmTest() {
	var str = window.localStorage.UOP_KRsoundsrc;
	var num = UOP_global.settings.UOP_KRsound;
	window.localStorage.UOP_KRsoundsrc = document.getElementById("UOP_KRsoundsrc").value;
	UOP_global.settings.UOP_KRsound = document.getElementById("UOP_KRsound").getElementsByClassName("tick")[0].value;
	UOP_alarm(null,null);
	window.localStorage.UOP_KRsoundsrc = str;
	UOP_global.settings.UOP_KRsound = num;
}
