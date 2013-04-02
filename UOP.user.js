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
// init the script
var documentLoadCounter = 0;
checkDocumentState();
window.addEventListener('DOMContentLoaded',main,false);
function checkDocumentState()
{
	if (document.readyState == "loading")
	{
		if (documentLoadCounter > 15) location.reload();
		++documentLoadCounter;
		setTimeout(checkDocumentState,1000);
	}
}

// Global Setting Variable
var version = "2.1";
var S_ForceHTTPS = 1;
var S_SecondInterval = 1;
var S_MinuteInterval = 60;
var S_ShortInterval = 5;
var S_ModerateInterval= 30;
var S_autoInterval = 1;
// Global Constant Variable
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
// Global Control Variable
var O_titleBar,O_titlePercentage;
var O_huntTimer;
var O_locationTimerParent;
var O_mode;
// Global Variable


// Global MAIN
function main()
{
	priorityFunctions();
}
function priorityFunctions()
{
	// if loaded but error: reload
	// if not login: terminate script
	// load the saved settings
	// init the things
}

