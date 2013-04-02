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
// @include     http://apps.facebook.com/mousehunt/*
// @include     https://apps.facebook.com/mousehunt/*
// ==/UserScript==

// The public prefix for this script is UOP_ . All of the outside variable and function will have this prefix.
/**************INIT THE SCRIPT****************
 * Attach the init function to DOMContentLoaded
 * And check if the page fail to load in 15 sec.
 */
var documentLoadCounter = 0;
checkDocumentState();
window.addEventListener('DOMContentLoaded',initialization,false);
function checkDocumentState()
{
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

//Object Variables
var O_titleBar,O_titlePercentage;
var O_huntTimer;
var O_locationTimerParent;
var O_mode;
//Variables
var user;

/*******************INITIALIZATION********************/
function initialization()
{
	//==========CHECK THE BROWSER LOCATIONS. Ex: facebook, login, turn, https, mobile, loaded with error,...==========
	if (window.location.hostname.indexOf('facebook') != -1) {
		return;
	}
	else if (window.location.pathname.indexOf('/login.php') != -1) //at login.php
	{
		if (document.getElementsByClassName('login').length == 0) // && logged in
			location.href = "/";
		return;
	}
	else if (window.location.pathname.indexOf('/turn.php') != -1) //at turn.php
	{
		location.href = "/";
		return;
	}
	else if (getCookie("switch_to") == "mobile") //mobile mode
	{
		return;
	}
	else if ((location.pathname == "/index.php")|| (location.pathname == "/")) //at camp
	{
		if ((location.protocol == "https:") && (S_ForceNonHTTPS == 1)) //HTTPS
		{
			location.replace("http"+location.href.substr(5)); //force NON-HTTPS
			return;
		}
		if (document.getElementById('campButton') == null) // no camp button aka error
		{
			setTimeout(function () {location.reload();},10000);
			return;
		}
	}
	
	//==========LOAD SETTINGS==========
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
	
	//==========INIT VARIABLES==========
	
	//==========CALL THE MAIN FUNCTION==========
	main();
}
/*******************MAIN********************/
function main()
{
	
}

/*******************TOOLS********************/
function getCookie(c_name)
{
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

function syncUser(callbackFunction)
{
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
