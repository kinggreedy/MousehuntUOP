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
var C_versionCompatibleCode = "2";
var C_ForceNonHTTPS = 1;
var C_SecondInterval = 1;
var C_MinuteInterval = 60;
var C_autoInterval = 1;
var C_solveStage = 2; //maximum stages of process, offline = 2, server = 4
var C_cpcontent,C_cpprefix,C_cpsuffix,C_cpstyle,C_cpmessage,C_tabNum,C_groupNum,C_autopanel;
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
var C_cssArr, C_jsArr, C_cssCustomArr, C_cssjsSetArr;
//CallbackFunctions

//==========Variables==========
//Setting Variables
var S_skin,S_simple,S_auto,S_schedule,S_solve,S_server;
var S_ads,S_aggressive,S_delaymin,S_delaymax,S_alarm,S_alarmSrc,S_alarmStop,S_alarmStopTime,S_trapCheck,S_trapCheckTime,S_numScript;
var S_cacheKRstr,S_serverUrl;
var S_settingGroupsLength = [415,0];

//Object Variables
var O_titleBar,O_hornHeader,O_hornButton,O_hgRow,O_baitNum,O_titlePercentage;
var O_huntTimer,O_LGSTimer,O_locationTimer,O_simpleHud,O_imageBox,O_imagePhoto;
var O_mode;
var O_sendMessage,O_receiveMessage,O_settingGroup,O_travelTab,O_travelContent,O_shopContent,O_potContent,O_craftContent;
var O_playing, O_autoPanel, O_autoPauseCounter, O_autoSounding, O_autoCounter, O_autoMainCounter, O_autoDelayCounter;

//Auto Variables
var A_soundingCounter, A_soundedCounter, A_hornRetryCounter = 0, A_autoPaused, A_delayTime, A_delayTimestamp, A_solveStage, A_puzzleTimeout;

//Variables
var data;
var template = new Object;
var registerSoundHornSounding = new Array;
var registerSoundHornSounded = new Array;
var registerSoundHornWaiting = new Array;
var nextTurnTimestamp;
var cssArr, jsArr, cssCustomArr, cssjsSetArr;
var initHud = 0;

/*******************INITIALIZATION********************/
function initialization() {
	//==========CHECK THE BROWSER LOCATIONS. Ex: login, turn, https, mobile, loaded with error,...==========
	if (checkBrowser() == 1) return;
	
	//==========LOAD SETTINGS==========
	loadSettings();
	
	//==========INIT VARIABLES & TEMPLATE==========
	runTimeCreateConstant();
	manageCSSJSAdder(0);
	createTemplate();
	initVariables();
	addControlPanel();
	
	//==========CALL THE MAIN FUNCTION==========
	main();
}
function initVariables() {
	O_hornHeader = document.getElementById('header');
	O_hgRow = document.getElementById('hgRow');
	O_hornButton = document.getElementsByClassName('hornbutton')[0].firstChild;
	O_hornButton.addEventListener('click',soundHorn,false);
	
	O_receiveMessage = document.createElement('a');
	O_receiveMessage.id = "UOP_toScriptMessage";
	document.body.appendChild(O_receiveMessage);
	O_receiveMessage.addEventListener('click',receiveMessage,false);
	O_sendMessage = document.createElement('a');
	O_sendMessage.id = "UOP_toWindowMessage";
	document.body.appendChild(O_sendMessage);
	O_sendMessage.setAttribute('onclick','UOP_receiveMessage();');
	var scriptstr = windowScript.toString().replace("function windowScript() {","");
	scriptstr = scriptstr.substring(0,scriptstr.length - 1);
	scriptstr += sendMessage.toString().replace("function sendMessage","function UOP_sendMessage");
	scriptstr += UOP_receiveMessage.toString();
	var script = document.createElement('script');
	script.setAttribute("type", "text/javascript");
	script.innerHTML = scriptstr;
	document.head.appendChild(script);
	
	registerSoundHornWaiting.push(updateTimeStamp);
	if ((S_auto != 0) && (S_skin != 0)) registerSoundHornWaiting.push(skinSecondTimer);
}
function runTimeCreateConstant() {
	C_tabNum = new Object;
	C_tabNum["UOP_buttonGeneral"] = 0;
	C_tabNum["UOP_buttonBot"] = 1;
	C_tabNum["UOP_buttonSchedule"] = 2;
	C_groupNum = new Object;
	C_groupNum["UOP_auto"] = 0;
	C_groupNum["UOP_schedule"] = 1;
	C_autopanel = '\
	<div class="UOP_playing">\
	<a class="UOP_autoplayimg"><div class="picture"></div></a>\
	<a class="UOP_autopauseimg"><div class="picture"></div></a>\
	</div>';
	cssArr = [1];
	jsArr = [1];
	cssCustomArr = [1];
	cssjsSetArr = [1,1,1,1,1,1];
	C_cssjsSetArr = [[[],[],[0]], [[0],[0],[1]], [[1],[1,2,3],[2]], [[2,3],[4,5,6,7],[3]], [[],[],[4]],[[],[],[5]]];
	C_cssArr = ["css/views/en/ItemPurchaseView.css","css/views/en/InventoryItemView.css","css/views/en/CraftingView.css","platform/css/views/en/FlexibleDialogBoxView.css"];
	C_jsArr = ["js/views/en/ItemPurchaseView.js","js/views/en/InventoryItemView.js","platform/js/jquery/en/jquery.tmpl.min.js","platform/js/classes/en/radioSelector.js","js/views/en/RecipeView.js", "js/views/en/CraftingView.js","platform/js/views/en/FlexibleDialogBoxView.js","platform/js/jquery/en/jquery.scrollTo-min.js"];
	C_cssCustomArr = [
	'.UOP_hgMenu {padding: 0px 8px 0px 0px;cursor: pointer;height: 35px;}\
	 .UOP_hgMenu .userPic {float: left; width :40px; position: relative;}\
	 .UOP_hgMenu .picture {width: 29px; height: 29px; position: relative; top: 3px; left: 0px; margin-left: 5px}\
	 .UOP_hgMenu .userText {float: right; padding-top: 10px; font-size: 12px; color: #64696D; font-family: "lucida grande",tahoma,verdana,arial,sans-serif; font-weight: bold;}\
	 .UOP_hgMenu a {text-decoration: none;}\
	 #UOP_appControlPanel {float: left; padding-right: 4px;}\
	 #UOP_appControlPanel .picture {background: url("data:image/png;base64,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");}\
	 #UOP_toScriptMessage, #UOP_toWindowMessage {display:none;}\
	 #UOP_cpdiv {width: 646px;}\
	 #UOP_cpdiv, #UOP_settingdiv, .UOP_drawertaskbar {font-family: "Segoe UI";font-size: 12px;color: #323232;text-shadow: none;}\
	 .UOP_drawertaskbar {background-color: #3c454f;height: 60px;position: relative;text-align: center;color: #fff;}\
	 .UOP_button {background-color: transparent;border: 0;width: 85px;height: 60px;font-size: 9px;color: #fff;cursor: pointer;text-decoration: none;display:inline-block;}\
	 .UOP_buttonseparator {background-color: transparent;border: 0;width: 85px;display: inline-block;}\
	 .UOP_button:hover {background-color: #505861;}\
	 .UOP_buttonicon {padding-top: 2px;position: relative;overflow: hidden;width: 32px;height: 32px;margin: 0 auto;padding: 4px 0 0;}\
	 .UOP_buttontext {text-align: center;text-transform: uppercase;line-height: 1em;word-wrap: break-word;padding: 0 2px;}\
	 .UOP_section h2 {border: 0;float: left;margin-bottom: 0;padding-bottom: 5px;font-size: 20px;border-bottom: 2px solid #88b9e3;margin: 10px 0 22px 0;font-family: "Segoe UI Light";font-weight: normal;min-width: 100%;}\
	 .UOP_settinggroup {transition: all 0.7s ease-in-out;-moz-transition: all 0.7s ease-in-out;-webkit-transition: all 0.7s ease-in-out;-o-transition: all 0.7s ease-in-out;opacity: 1;overflow: hidden;}\
	 .UOP_setting >label {display: block;padding-top: 10px;font-size: 11px;font-family: "Segoe UI Semibold";text-transform: uppercase;float: left;width: 158px;word-wrap: break-word;}\
	 .UOP_setting ul {list-style-type: none;}\
	 .UOP_setting {position: relative;border-bottom: 1px solid #d8d8d8;padding-bottom: 18px;margin-top: 18px;min-height: 37px;display: block;clear: both;display: block;}\
	 .UOP_settingvalue {display: inline-block;}\
	 .UOP_settingvalue ul {display: block;float: left;margin-top: 0px;margin-bottom: 0px;padding-left: 0px;}\
	 .UOP_settingvalue li {float:left;border:2px solid #ccc;margin-right:-2px}\
	 .UOP_settingvalue li:hover {background-color:#ddd}\
	 .UOP_settingvalue li[aria-checked="true"] {position:relative;background-color:#4f9dd7;border-color:#434343;color:#fff}\
	 .UOP_settingvalue.editted li[aria-checked="true"] {background-color:#c84fd7}\
	 .UOP_settingvalue li {min-width:46px;line-height:20px;padding:5px;text-align:center;text-transform:uppercase;color:#535353;cursor:default}\
	 .UOP_settingvalue input[type="text"] {vertical-align: bottom;width: 36px;}\
	 #UOP_serverUrl {width:128px;}\
	 #UOP_cacheKRstr {width:56px;}\
	 #UOP_alarmSrc {width:108px;}\
	 #UOP_update_available, #UOP_is_uptodate, #UOP_cannot_update {display:none;}\
	 #UOP_update_available div, #UOP_is_uptodate div, #UOP_cannot_update div {display:inline-block; width: 17px; height: 17px; top: 3px;position: relative;}\
	 #UOP_update_available div {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACQklEQVR4XqWRu2sUURSHv3vnkdndbB4bgxIDUVZUhFRW2in+AWIhFoKgpU0K6zQGLERQsYogCNYKWsfOQggYCxEECRgUVUKy67CbzOMes4fLTrCxcODHucw58/HdM0ZE+N/HPFtohsZwfbxh7k83bS2JACMgIA6teh7EiT9rpdPt3505v7QYJjGtKODO0emgdnjKEAfVh67IcXmOscFeYsQ5DzYK6kbFrZkzV16FSWiiJKY53YRaCM6pCFlR0Mkn2Q1nCXd/0pQfJLHVPiI6MxpjJOsesdaI7KUM7H5lId3qEp28SfvaG8bPPWJzM6XMRfuuBFcIlACEVhyq6LQKGhGKDGxjFoCRiTn6PSHbdaAzDqcVELDDxZVAKVql9AOuAKDMdwZHNfEzVaWCqI54GxwoTAxoW/xVQQ00VCb+xdAAXy1Q7GwBkPe2KHNA+/gZb40QVlStw+3X6yN01pb5/PU9nS8fsBJhjZpoqEwIRbxeaYd0J2BtRLn5ie31AcDQmkiwuia9Gsj+nTg81SkAJ5p0O2Xk9ALzS10OXXxI1u8P94W3xv0Nqe6pkCIDqR/EJE2CVps0hSIXkAqgs4KxWa9HWbrAGwyMVLlWj+mvLrP+9CobLxZxLtT+8O94GCJj5vvH1413jy89OTHWuTyegAj4JlkffncgK6AxupcEEI0CggPHfrVurNwzImK+rb08lb598GgqSudDa6xCAFy1RPBwBCkLY5LWzuiF2yvx3NnnA0gETAJt4DjQ4N+P9U4bwOofNUe978m0puEAAAAASUVORK5CYII=");}\
	 #UOP_is_uptodate div {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAC2klEQVR4XqWQTWhcVRTHf/e+9+bDmaRmkklDasdYq0A0FaiCGFqFUQzuROjGXd24dCVdFRGkQqlUW2xB7Eq3FQoBCn6ViJW2SCyWtNAPtYVgbJPpy8vMvJl3z3F4F0J2Al74cQ5wz+H/O0ZV+b/PvHdsLDSGg5WqPT5Us+WoCAZQBVFFN8FXBFFQB3G8cbS558PD5v2T9fEgNEsTjbA2OmEJQjYHBvhF+L7b6ZEmIUExo1CytFotffeVWy/bMCIqlhgarhnCAmA0R1FEBdCcOF5nWGd5Y+ZranY/yXpKoWxMmq1PWWPQAW4AoLTbG6S9NFdwThER4ocxpf40c8+dYPfkazRGmtxf6dDPHBgNraDkqBCvZVSzWVw8wUbSBaN0Oiku2c7rez5lZGiK+2vX+WHxFN1uiIgCEKooKLQ7G4yX9jE38yVx+x7fXH6bTvoX2ivSfOYIjfGX6KcJ53/9gDsrSzSmHtm8nfUNgKHTWwWEHfW9NJ89SpY8yvONQ8w0DoAoF6+fZuG3s9TGClS3gfhZrKjgxBFGRVZ7i4OPn4HA7okmb77wFXt3HcSoZXn1MuevnEKjjNF6gL8ZXkdEEQGXOSrVMleXz/DU5Bw7x17kifp+RPu00xXmL33E8tptdu4qEUYgIojDJ1EV8jROADDFh1z4/WOc65NlXVQyFq59zsLVc16jonlyJ4ofUayoIsoAJXOOqBCynPzELzdO4yTlz5Wf+XbxBKUhy0jdICgiivq5rTrez4mCWqJqysXbn3Dj3o/c/fsacbvF9sdCgkDIcgV/Uac+vG13Epxzgajknm6ADUIoP+Bma57E/MH4joBimVxZZAsOBB02S3e+r3wx/9aZbZOtA6UqPqqAACKguom/gYLi+3r18X/e2XfhmFFVs3jz3PSlW8dPhtX1GRtYq94ZD1uq4BeoKUfD3Venj3zXGJ09a1Q1AkaAJ4GngQr//SygwF3gyr8kYdUGNVTZGQAAAABJRU5ErkJggg==");}\
	 #UOP_cannot_update div {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACKElEQVR4XqWTu2tUQRTGv3Mf+8jdh3E3KyYGBNEiEGwsI1H8A8TGxkYCVhZWNhECqUWwsLewFMw/YFDQQjSFSiSKoIWlRTZr9pXcmfHMOXDHFUHBgY+Znbnnd858e4acc/jfQau3rydEWMmmKvebzXq1VEoAB3i4ddYv/Lr47eTMwhqH3o/e3aXly2u0fudGJ46jnbnZ9tF26wh4rUEArLGAwhRibYAxZHev666trC0nSRKnnL3eqGfgdfGhStYFIEB0LpcSOhiPTkZEcERkQKRlWpWxRmX+oFxnyyJwbk/U4CDAZ1M5zR7OdU+qMXqGxFqGiKzQe70exuODCQAcGGAEQESoVqsAQb73gytRKmPQ7e5iYfECzp67BILEKggshsAZfPzwCs+fbmCqVlOPPCRcw2E0HKHdmUealjA5xuIDIUbn+Dz2+wNQEiMm6YUAyfND1BtNvHj2GJ92XqsfJoexOc9aLRHh65fP3B991Bo1GGfgECDeaangcLCP7XcvMeSq1EBM/M1EEdqtaaRxLN7BQY1VWSmZmwbtmWMCZbj65c8VAkCBvFd4EhXX+a0XfvVKQSprRJpUoKBoOBz4oFhhEvzvMsb3WCO5eWt979HDexuD/uCqsykDQpNJueHRhbb3MhatmdnvlUpWJt6k7fdvFt5ubT4op1gkfoEeAgkKLxhQ73iCMTmVq9no/MUrm3MnTj/xkBTANOsU6wwrw99HJFTgG2vrJ5n2SP74Fl6MAAAAAElFTkSuQmCC");}\
	 #UOP_is_uptodate div, #UOP_cannot_update div {top: 3px;position: relative;}\
	 #UOP_buttonGeneral .UOP_buttonicon {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTBENTVBOTA4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTBENTVBOTE4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMEQ1NUE4RThEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMEQ1NUE4RjhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlEc8wYAAAHGSURBVHja7JbNSsNAFIWbpnWhKBRcdlGLVXwFdSsqCBURcefGhUtxLT6C+AC+QMGlUKg7se7V1IUt1J+df1RREWs7nsFbGa6TNIkpXZgLH+k9mc4ckjt3YgghIt2MaKTLERoIDcQ02hDLqx40z2FotmGd5XEHzQBma66gnoBXrakx+CcDbuMVXIK838dvZ+DcpbYFdsELGAQp5d47uAMNPzWQYXmZaXLnXNEi8vcCWAcTypgS2AF7oOboQBpgvDF02hiQ5jdAU3xHDTzStRU5ENOs8YNO5MG1IoiCOdAg7QDMgkm6FpTxK0EbGCftmPJDkGBzJEiXcQ1MLwZKDFUraIxmbSbPKmOG7QzodsG8g6b7eLi3KS9VT4KK2214wvJeRZPdro+aj6A8DYqaedJ0/QS3XnZBuxpIkXZEuQVGlPdsUm7R/WrQRbhGi8yAD8XEKliiq6WMvwEZLwaqDK7tgwHSt8GDcA7ZJ07pqfxaT9cJ45rTUdUM0gR1wmmwSe+8h9pvmc6KKeV/Z2ARXLRrxX7PlCTxTGdHP8gxE3Lx0XZFGCQJ1hWf3NRAJ0zkqX6W3dRAJ8Kkeqm7OY7Dz/LQwP8y8CXAAOQNDNLkrjsHAAAAAElFTkSuQmCC");}\
	 #UOP_buttonBot .UOP_buttonicon {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM5QUQ3MDg4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM5QUQ3MDk4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QzlBRDcwNjhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QzlBRDcwNzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrRjG84AAAIBSURBVHja7JdPKMNhGMc3k79z0Ka5KJMTB1xIK5KLrK3c/D2gleIwV8WRpLg4jbubxEEOigPCRaspZXESzTAutPj5vvUsj7ff/H77bSy1pz71e9/3eZ/32/s+7/NuZkVRTNm0PFOWLesC8tOYawdxEGN9XlAArsEleNKMInIgRUpABwiAeWCn/lbly0KgV088IzvQBQLARu1ycAjGmE8dYfqNHRhX9NkG7U4hcGZyB8IqfS8gCqyUG8LcYBbcgQawRnwzs846UEaBRYLNgR7qfwN7YIeEOYALtINqKUYENIIbI0cwCjbBLtviOJgGRSr+XnClciwDsq9eAUGVYKsac7wkMmFnoNmoANliwKFj3gGb06Tmo7cSiuS5YO0QJZeW7bNvSzqluJ/ueTSRvEn8PMDJk5x9L1OlTKsOhGk770GpNOYGj5Ssieo4CD6k4zOUA1bgkwL5JZ8pNhZgIpaYiAejArpVEvEWeCS/RfDORNiYCHEtF4wK6ExSbiNgArhAJfmKRaI0vgJq2LWsNSpAsA6ewSnBTeTEMPmJ6nrOxvp+ipuKAPGgTIJ64kR6fttAHuXGK/VvgapMCZCZoUVElWwBFhKosMUrtOKkI8DPFhftoVQXN/ocJ2wbHIFjahdToRKv3Qi9fppmzvDPch8IMlF/LiD3vyAnICfg/wn4FGAAfkF8N/5zo2sAAAAASUVORK5CYII=");}\
	 #UOP_buttonSchedule .UOP_buttonicon {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTA1MjM3MzU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTA1MjM3MzY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDUyMzczMzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDUyMzczNDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsYb0WAAAADcSURBVHja7JdNCsIwEIWbqivFa7QrceH9T6D79hqiK39iAhEiTvMKb7AWZiCb+dLhkXmZUOe9r6aMupo4TMBSyDVhbYT8JaxegX+EE0z4lDamwrUChwJiwgkF3nmWwxbE2IPWsbx4Asek9mtvWAcFDgW0A7cj9rZT4FDAHdwalkMPLEDbWP7/g+gEvmH5KBOuhb3XzGQMH2XCTijQZiZjuE3CeUzCrVDgnJmM4VDArfCcrhT4PEy4A95hefEE+vRySWO7UeBQgBt4UB7ZMTIcCrD/AhNgAn4aLwEGAMI5iydTaCarAAAAAElFTkSuQmCC");}\
	 #UOP_buttonSave .UOP_buttonicon {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTVEOEJDRkU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTVEOEJDRkY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTU0REIyNDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NUQ4QkNGRDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr3Wrw0AAAEQSURBVHjaYvz//z/DQAImhgEGow4YcAewEKkuCogDybRjMRBvwikLygUEcBQQP/1PPrgPxDq4zGckIhs+BWIpKBvkk/VA/IWAHgkgdgViPyj/IBA7YFNIjAOQFegB8WUig14XiC8h20UNBzCSGP8E9Q65bMhCbbNJdQCxWZEDiLOIUUhqGrgHxFeA+BcBPbxAbATEotROhJSA4ZEIB6wuQAbHgXgWntKQB4jTgNiSuJKCcF2ADgKJ0BOIRR/ZdQG6Ak4g/kFENvxOTCIkxwEwg1YjiYWSoI9kB1yEVkLoBhEq55HlQZWSPrm5YBIVEvskSnLBKiD+iEU8lIA+ZPmdlBTFo63iUQeMOmB4OwAgwAA4DRkrSEfzrgAAAABJRU5ErkJggg==");}\
	 #UOP_buttonReset .UOP_buttonicon {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTU1NERCMUU4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTU1NERCMUY4REE4MTFFMjg4RTJGQzU5QTU3MUY1MEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NTU0REIxQzhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NTU0REIxRDhEQTgxMUUyODhFMkZDNTlBNTcxRjUwQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgDrifwAAAGwSURBVHja7NY9SwMxAAbgtvhNq2JLaScVdNDqoCBWnIqDOugguvkbnPwBLg7FLuLSSRShgovgIKhYENTZRVFUKujaKoJUUDnfwCuEox+XM+VQGnhIm8sl79EmF7dhGC4ni8flcPnzAYIQcCqAmHwDupwI8DP5JNT9JkCNjXv6Ic7JRRmCeriDjOpgbsVlOAprMCC1PUEesnAPp5C0PKIIoCBtlC9Z2IGglTFVA8zBuWnCZZiHFchI7fsQ0h1AiMCuNNEw270QhaR0bb0SAYR2SHCSmOmaH7Z47RMGKxFA8MEC9BW4FoYcQ8R1BOikVlO7WEUNRe7ZZoCLUmNb3YhSNGteRPBe5J5r1r06NqIo67TCnvHFulbHVnzD2qsQoIP1o44Ae6xnoNlCfx9M8/OZjp2wh0tKlCUL/RPSXhDTtQxXOeALQzQW6NMEi5Bn3yPwlBpX5WUU4E8xAh9wAgd8C4oSggkY439FvBnH4Vbnyyhi2mrf4IGepfZDbstlx3TbOBX7+ZRT1ML2V7iCTTgu++Q2zwNyCUM3tPF7jmeCy0oeSKrH8mqAaoD/F+BbgAEAp4jNfsnaJiYAAAAASUVORK5CYII=");}\
	 ',
	'.itempurchase .purchasecontrol {width: 200px;}\
	 #UOP_tabbarControls_page {padding-left: 0px;}\
	 #UOP_tabbarControls_page>ul {padding-top: 3px;}\
	 .UOP_shopControl {width: auto!important; padding-left: 5px!important; padding-right: 5px!important;}',
	'.inventoryitemview .potion .rightcol {margin-left: 98px;}\
	 .inventoryitemview .potion .leftcol {margin-left: 0px;}\
	 .inventoryitemview .potion .rightcol .radioContainer .radioItem {width:auto;}',
	'.recipeitemdetails {height: auto;padding: auto;width: auto;}\
	 #recipeClippingMask, #recipeContentContainer {width:auto;}\
	 #recipeClippingMask .classification {width: 350px;}\
	 #recipeContainer .scrollUp, #recipeContainer .scrollDown {right: 10px;}\
	 #recipeClassifications {margin-left: 10px;}\
	 #recipeContentContainer {margin-left: 0px;}',
	'#userGreeting .userText {padding-right: 8px;}\
	 #UOP_appTabSuperBrie {float: right;}\
	 #UOP_appTabSuperBrie .picture{background-size: 100%;background-image: url(images/items/bait/d3bb758c09c44c926736bbdaf22ee219.gif);}\
	 #appInboxTab {margin-left: 0px; cursor: pointer;}\
	 #appInboxTab span {color: #4DA55A; background-image: url(images/ui/hgbar/hgrow_middle_blue.png); cursor: pointer;}\
	 #appInboxTab .alerts {background-image: url(images/ui/hgbar/alert_badge.png); position: relative; right: -33px; top: -23px; z-index: 10; width: 22px; height: 20px; padding-top: 2px; color: white; text-align: center; font-weight: bold; margin: 0; cursor: pointer;}\
	 #UOP_freeSB .userPic {width: 54px;background-size: 100%;background-image: url(images/ui/buttons/free_sb_offers_btn.gif);}\
	 .marketplace_button {margin: 49px 0px 0px -514px!important;}\
	 #btn-friend {margin: 70px 0px 0px 20px; background: url("images/ui/buttons/navbuttons.en.gif?v=4") no-repeat -313px -38px;width: 74px; height: 26px;}\
	 #campButton {height: 26px; width: 69px; background: url("images/ui/buttons/navbuttons.en.gif?v=5") no-repeat 0px 0px; background-size: 600%}\
	 #hud_baitQuantity {position: absolute;right: 44px;z-index: 10;text-align: center;cursor: pointer;padding: 3px 5px;-moz-border-radius: 5px;border-radius: 5px;border: 0 none;color: #fff;background-color: #549906;background-image: -webkit-gradient(linear, center bottom, center top, from(#549906), to(#92c315));background-image: -moz-linear-gradient(90deg, #549906, #92c315);font-weight: bold;}\
	 #UOP_imagePhotoZoomBox {opacity: 0;padding-top: 5px;padding-right: 5px;padding-bottom: 5px;padding-left: 5px;-webkit-transition-duration: 0s;-moz-transition: opacity 0s ease-in-out;-webkit-transition: opacity 0s ease-in-out;transition: opacity 0s ease-in-out;position: absolute;overflow: hidden;font-size: 0;-moz-box-shadow: 0px 0px 10px rgba(0,0,0,1);-webkit-box-shadow: 0px 0px 10px rgba(0,0,0,1);box-shadow: 0px 0px 10px rgba(0,0,0,1);min-height: 50px;min-width: 50px;pointer-events: none;background: white url("data:image/gif;base64,R0lGODlhEAALALMMAOXp8a2503CHtOrt9L3G2+Dl7vL0+J6sy4yew1Jvp/T2+e/y9v///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCwAMACwAAAAAEAALAAAEK5DJSau91KxlpObepinKIi2kyaAlq7pnCq9p3NZ0aW/47H4dBjAEwhiPlAgAIfkECQsADAAsAAAAAAQACwAABA9QpCQRmhbflPnu4HdJVAQAIfkECQsADAAsAAAAABAACwAABDKQySlSEnOGc4JMCJJk0kEQxxeOpImqIsm4KQPG7VnfbEbDvcnPtpINebJNByiTVS6yCAAh+QQJCwAMACwAAAAAEAALAAAEPpDJSaVISVQWzglSgiAJUBSAdBDEEY5JMQyFyrqMSMq03b67WY2x+uVgvGERp4sJfUyYCQUFJjadj3WzuWQiACH5BAkLAAwALAAAAAAQAAsAAAQ9kMlJq73hnGDWMhJQFIB0EMSxKMoiFcNQmKjKugws0+navrEZ49S7AXfDmg+nExIPnU9oVEqmLpXMBouNAAAh+QQFCwAMACwAAAAAEAALAAAEM5DJSau91KxlpOYSUBTAoiiLZKJSMQzFmjJy+8bnXDMuvO89HIuWs8E+HQYyNAJgntBKBAAh+QQFFAAMACwMAAIABAAHAAAEDNCsJZWaFt+V+ZVUBAA7") no-repeat center center;z-index: 99999;}\
	 #UOP_imagePhotoZoomPhoto {position: relative; z-index: 2; width: auto; height: auto;}\
	 #hgDropDownCommunity {right: 91px;}\
	 #hgDropDownSupport {right: 5px;}\
	 #UOP_simpleSkin {float: left;}\
	 #UOP_simpleSkin .picture {background: url("data:image/png;base64,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")}\
	 #UOP_campTravel {background: transparent url("images/ui/camp/trap/head_larry.png") no-repeat scroll left top;}\
	 #UOP_campTravel>.header {height: 50px; margin-bottom: 4px; padding: 25px 0 8px 90px;}\
	 #UOP_campTravel .environment {font-size: 16px; font-weight: bold;}\
	 #UOP_campTravel .byline {padding: 1px 0 2px;}\
	 #UOP_campTravel>.footer {margin-top: 0px; background: transparent url("images/ui/camp/trap/content_foot.png") 0 0 no-repeat;}\
	 #UOP_travelcontentChild {background: transparent url("images/ui/camp/trap/content_body.png") 0 0 repeat-y; padding: 1px 15px 2px;}\
	 .UOP_waitingTab {background: url(images/ui/loaders/mouse_loading_large.gif) center center no-repeat;height: 300px;}',
	'#UOP_appAutoPanel {float:left;}\
	 #UOP_appAutoPanel label {cursor: pointer;}\
	 .UOP_playing .UOP_autopauseimg {display:none;}\
	 .UOP_pausing .UOP_autoplayimg {display:none;}\
	 .UOP_autoplayimg {text-decoration: none;}\
	 .UOP_autoplayimg .picture {background-size: 100%;background-image: url("data:image/png;base64,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");}\
	 .UOP_autopauseimg {text-decoration: none;}\
	 .UOP_autopauseimg .picture {background-size: 100%;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACl5JREFUeNqkl1tsXOd1hb//3G8zZ2Z4ESlKoi2SIilREC3aonORWjtWmwB1msJ+8kMDN0CBAn0onCIN0AJ9a1GkQFq0iFsYBooGRdzaTRoDsqLaauSLbEW1HdGSmNiiLFMaipwhOfc5c86Zc87fB8oOiqCNmu7H/fKvvf+FtdcSUkp+UW1trMv3frLCpUuXqFbW0VHQRUgYhiBUXCdP3/ZwHZ8DswdZWFhgz5AruIsSvwjAM09/S1arVXTHZ35+nqnJ/RhCxVAicrkcUZzQqLepp9BqBrz940usrKywcGia3/zSbzA4WBK/FIDvv/Cc/OCDD7j33nFmZ2c5tNeFuEbSXCMIArabDWq1Go6bw/dLeI6LaeTRvGEascGrP77BW29e5L6Fozz++OMYphB3DeAv/+bv5bADhw8fZnp6ikajQbB+lbhRxtUjCoUChmMD0E8ypFRoN1u0mhHCHsAfnSLz9hCFCW+8eZ5yucwf/8nX7g7AN775V3K05PGFTz/AwG6Dm++eQm3doCQi7CEHbBXabehJQAdFgyTZ6TsObPcob4SoQxOMzn2KoJfj5fNXWVrd4Mtf+V3GxwrifwTwzb/9O1nwPb746w8xYAgu/vB5BvyAiZIEEcH6Cr3KLbIsI7OLqIpJGMYAGGkPy7LQhsahcA/1rsr7myHj9y4yOvUAzz7/IqtrGzz1R1+lYCJ+DsC/fu+7stls8oXPHmLUl3z49uuM2DWc/AZs1UiaLeinaKoBmaTfi0nCCMuyEKpJkvRpBRGpYpAvDWEWi2B4lKsazq5DlA6e4B++8yLrYZ+vf/0PEeyAUACuXbsul5eXmZubY3RsjNfPncN1XZxSiXBlhV61SqfTodVqUdvept1okGUZtuOQpilBu02v10PXdTRNo9lsUq9UCBoN9oyPc/PmTej3WVxcpN1uc+bM2U+2rgH84KUzHJmZ4Mi4Tvmd73J4qE7BL9O+9D453afbC9ke/QyqYdPuhdi2Tf7mWfRUQVVsYjUm2v9rdAOFMAHXdXFXf0SvG5F0LjG/a5jr515g9rNf5KH7DvIfr5xi/v6DcmRgVGi3yxXZ6XSYnHyAdruNlBLbtmndvoauacRxjOM4TMzPg5uHoAeKQmfrLcJOF1XVKJVKKLOzYJRAqpCm9Dsr3F6/RRRFNCsVBncdo7K6ytzcHD+8eJGrV68ycmIU7fKVKziuy9RYnsb1JQazdczOLdi8hmlZbLcFinqEJLeITA3aWYBjOaT1Z0g7KomhYmk2bfUImZInEQZCF0h5llZjmbyIiFp9hgtVNjeqTE5Psm94jAsXrvC5E4+gXLt2jQMHDpBlGa1WC1VVaVarmKaJzDJs28Z1XeI4ptFo0Gq1iKId8tm2jeM4GLaNlJJWq0Wj0SBJkp1vyuexbZtcLke33cZxHMJ6naNHj7K8vEy5Upfa5naVX/3cZ0g7a5jhJobeIA4a4OnIOCJuNXFKdbaaXeJQJwoVpOjjdyLaG+u0+xHqyAhbEy02g5huluL7PoXq+8S3rzI6kscwTXpRg91752mWlzg29wiGpnPj+odoH08TBAG6rkMY4nke/aCGoiiYpgmaRrfbJQxU+nFGGIZ4m5tUymUMVaBpGtVqlc0gJpAZSZIg63X6jQabaoSUEuwCSvoRFRvum9cYGhpibW0NLZZ9dAOaN8qM2Sry9jZCd+hnPRzNwkRCu06/1aPbDMgEOI5Du7lG2NtgePcuTL2LIhvoAnKaRcFSca0iqpFRUjYJwxChbNMsr7LNFNQfIYubVLdvomVZhuM4XKtUmJhw6AYBjiWwLAsUjVZrG5EJhBAYhoHp2AwMDCB1Hcdx0DQNVVUxTRPftNDsPIVCAdU0ibMMwzAwDIMYBdew6G314M7Gd3TAyhGFCUW/QNisYcsU0Q0Rnk58ex3xUQOVPqOfz7HhRcSaijrsEhlgmia2bmCqGvlSEV0vEKEj3BwDqsemN0w85NGtVsk7JkYYUnBHIfNRNQPiDE3TtE+mazaa7Boags01ardukXR6EEXkHBXDMNiVLxBrO9NimnSlJMsyYEd8FN1FFwau6yKlJE1T0jTFdV2yNCaXy1HQC5CmaJq2o5ymqrC91WZsYA9J/QYEKeGt9ymlTVrNhEAx6KqDhEqM0HJIVSNBoGhFdDPAcEpolodRdElQQVVwCgaxq+A4Cp66BnmVjBxbYRFrbD9xZtJJMrzBYRTf9ymXy3ieR6/Xo7a+TqPRACEwDEiSBFVVGR4eZnhomMHSICWvhKqqKIqClBIpJaZp7nDENNEVnSRJdsTetkHTUPJ5ms0me/bsYX19nXa7zb59+1BmJqa5vrpGbAxRC1Q2GgmF3CBs9rEkqGRs6gm+GMbsGFgtKEoB/Qaq2sPJZdheii98SoZDybJxEKReD2uoA3YbzCZdaVHzx7GnTnDm0mU0y2BsfC/KkSNHWFtbQ0rJ+Pg4tVoNTdN20Ec7XkMIgWJo2I7A83SE2OkJIYjj+M5hF1i2jaEaZNzRgo+9xp0LOTk5CVLy7rvvMjMzw+TIiNDGdw+KiYkJ+dbVj/iV2eNoV5d47/YlDnkR7XabsB+Rjz6Ea6/B2Bh60odOB0UEKHYf4SX0jQBz6wIkHoaaQaeDLZZQCgapVSRNU1oDR/EmP8+pix8SC4sTxxZ/do4fffRR/uJPv8aD+5/gwRMnePWZ10lzO0wtFm3WNjZ44+mn6SkK7aSP7/tMhlscmNiD6+lUq1XKZ86w3mnQV1JyuRxDcZXZ3YOoGvR6PXbv3Y1lWbzyyovs3buXmZmZ/+6Inv2n78h+v89vP3KMraU3efsH32NCrTHdXqYXdojUjMTI6AvI5RxyxfyOCOUMkDGx6JEICbaB6Tqodg50j1vpPfTsaSaPPcFff+sF3lla4amnnuLo/bM/c0QAjz32GJVKhdOnT7PvwQdZWFjY+YIwpN9P0DSNQqFAsZjHMAxUVUW1LAhDME2MUglncBDH91EdB7KMqNXC930OzM5y6tQprly5wsmTJz95/OdM6cpmS3772WcZ9ws8+cRv0Vl+m9e+/TSl7jqWssWA0aZg7wSSxLQJ4gh/ZIA07qLaQC5HnKqs9kwoTZKfvJ9dB47z3L+9wXPfv8Dx48f56u//jvhfbflPVzfkv//L8xQdwePH5rAHLbLT/8zld07jpFUG73BDyfm4xQK9uIvtGqBEBEFA5JXITSygjd8HhXt45h/PcP6928x/6kv8we99Wdx1MvrGn/+ZDIKAicMnWFxcZMr32fzJEjcvX6DbLtMN16jX6wzsGsb1cwwNzzAyMYe//yC1WPDCj85z9uxZjI0NHn74YZ588knxf86G5155Wb50bol+v89Bv8BDRw8xeWAMRAvkFngeICEOIbBYrbR4+T8v89rST9l2DMbHx/nKyZMsLCyIXzqcArx6/iV5/o2LVDa20FUD2U/I4gjTNGl1O+iWRwx0Oh0MS2VmdopPHzvM9P5JBoenxP8rHX9c3bAuN9Y3qW3V2a5UqVUrhGFInCaohoNbLDIyMsLY3hGm7526q2gO8F8DACxNvMzu4VHbAAAAAElFTkSuQmCC")}\
	 #UOP_autoPauseCounter {display:none;color: #FBB117;}\
	 #UOP_autoSounding {display:none;color: Skyblue;}\
	 #UOP_autoMainCounter {color: Red;}\
	 #UOP_autoDelayCounter {color: Green;}'
	];
	C_cpstyle = '\
<style>\
	#overlayPopup .jsDialogContainer .suffix, #overlayPopup .jsDialogContainer .prefix {background-color: #3c454f;}\
</style>';
	C_cpcontent = '\
<div id="UOP_cpdiv">\
	<div id="UOP_settting_general" class="UOP_settingtab">\
		<div class="UOP_section"><h2>General</h2></div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Skin</label>\
			<div class="UOP_settingvalue">\
				<ul id="UOP_skin" role="radiogroup" aria-labelledby="">\
					<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">NONE</li>\
					<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">DEFAULT</li>\
				</ul>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Advertisement</label>\
			<div class="UOP_settingvalue">\
				<ul id="UOP_ads" role="radiogroup" aria-labelledby="">\
					<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
					<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">REMOVE</li>\
					<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">REPLACE</li>\
				</ul>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Server</label>\
			<div class="UOP_settingvalue">\
				<div class="UOP_settingvalue">\
					<ul id="UOP_server" role="radiogroup" aria-labelledby="">\
						<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
						<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
					</ul>\
				</div>\
				<div>\
					<label>Server url: </label>\
					<input id="UOP_serverUrl" type="text">\
				</div>\
			</div>\
		</div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Version</label>\
			<div class="UOP_settingvalue">\
				<label>Version </label>\
				<span id="UOP_version"></span>\
				<br>\
				<div id="UOP_update_available"><div></div> New update available !</div>\
				<div id="UOP_is_uptodate"><div></div> Mousehunt Assistant is up to date.</div>\
				<div id="UOP_cannot_update"><div></div> Fail to check for new update</div>\
			</div>\
		</div>\
	</div>\
	<div id="UOP_settting_bot" class="UOP_settingtab" style="display:none;">\
		<div class="UOP_section"><h2>Bot Settings</h2></div>\
		<div class="UOP_setting">\
			<label class="UOP_label">BOT</label>\
			<div class="UOP_settingvalue">\
				<ul id="UOP_auto" role="radiogroup" aria-labelledby="">\
					<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
					<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
				</ul>\
			</div>\
		</div>\
		<div class="UOP_settinggroup">\
			<div class="UOP_setting">\
				<label class="UOP_label">Aggressive Mode</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_aggressive" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
							<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">TOUR</li>\
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
			<div class="UOP_setting">\
				<label class="UOP_label">Solve King Reward</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_solve" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
						</ul>\
					</div>\
					<div>\
						<label>Saved KR: </label>\
						<input id="UOP_cacheKRstr" type="text">\
						<button id="UOP_buttonLoadKR">Load</button>\
					</div>\
					<div>\
						<img id="UOP_loadKRimage">\
					</div>\
				</div>\
			</div>\
			<div class="UOP_setting">\
				<label class="UOP_label">Alarm</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_alarm" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">OFF</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">HTML5</li>\
							<li class="UOP_settingli" value="2" tabindex="-1" aria-checked="false">POPUP</li>\
						</ul>\
					</div>\
					<div>\
						<label>Data/URL: </label>\
						<input id="UOP_alarmSrc" type="text">\
						<button id="UOP_buttonAlarmTest">Test</button>\
					</div>\
				</div>\
			</div>\
			<div class="UOP_setting">\
				<label class="UOP_label">Stop Alarm</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_alarmStop" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
						</ul>\
					</div>\
					<div>\
						<label>Stop after </label>\
						<input id="UOP_alarmStopTime" type="text">\
						<label> seconds</label>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
	<div id="UOP_settting_shedule" class="UOP_settingtab" style="display:none;">\
		<div class="UOP_section"><h2>Schedule Settings</h2></div>\
		<div class="UOP_setting">\
			<label class="UOP_label">Schedules</label>\
			<div class="UOP_settingvalue">\
				<ul id="UOP_schedule" role="radiogroup" aria-labelledby="">\
					<li class="UOP_settingli" tabindex="0" aria-checked="false">ON</li>\
					<li class="UOP_settingli" tabindex="-1" aria-checked="false">OFF</li>\
				</ul>\
			</div>\
		</div>\
		<div class="UOP_settinggroup">\
			<div class="UOP_setting">\
				<label class="UOP_label">Refresh Interval</label>\
				<div class="UOP_settingvalue">\
					<div class="UOP_settingvalue">\
						<ul id="UOP_trapCheck" role="radiogroup" aria-labelledby="">\
							<li class="UOP_settingli" value="0" tabindex="0" aria-checked="false">ON</li>\
							<li class="UOP_settingli" value="1" tabindex="-1" aria-checked="false">OFF</li>\
						</ul>\
					</div>\
					<div>\
						<label>each </label>\
						<input id="UOP_trapCheckTime" type="text">\
						<label> seconds</label>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>\
';
	C_cpprefix = '\
<div class="UOP_drawertaskbar">\
	<div class="UOP_button" id="UOP_buttonGeneral">\
		<div class="UOP_buttonicon"></div>\
		<div class="UOP_buttontext">General</div>\
	</div>\
	<div class="UOP_button" id="UOP_buttonBot">\
		<div class="UOP_buttonicon"></div>\
		<div class="UOP_buttontext">Bot</div>\
	</div>\
 	<div class="UOP_button" id="UOP_buttonSchedule">\
		<div class="UOP_buttonicon"></div>\
		<div class="UOP_buttontext">Schedule</div>\
	</div>\
</div>\
';
	C_cpsuffix = '\
<div class="UOP_drawertaskbar">\
	<div class="UOP_button" id="UOP_buttonSave">\
		<div class="UOP_buttonicon"></div>\
		<div class="UOP_buttontext">Save</div>\
	</div>\
	<div class="UOP_button" id="UOP_buttonReset">\
		<div class="UOP_buttonicon"></div>\
		<div class="UOP_buttontext">Reset</div>\
	</div>\
</div>\
';
	C_cpmessage = "\
	var popup = new jsDialog();\
	popup.setTemplate('ajax');\
	popup.addToken('{*prefix*}','"+ C_cpstyle.toString() + C_cpprefix.toString() + "');\
	popup.addToken('{*content*}','" + C_cpcontent.toString() + "');\
	popup.addToken('{*suffix*}','" + C_cpsuffix.toString() + "');\
	popup.show();\
	delete popup;";
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
		if ((location.protocol == "https:") && (C_ForceNonHTTPS == 1)) //NON-HTTPS
		{
			location.replace("http"+location.href.substr(5)); //force HTTPS
			return 1;
		}
		if (document.getElementById('campButton') == null) // no camp button aka error
		{
			setTimeout(function () {location.reload();},10000);
			return 1;
		}
	}
}
function createTemplate() {
	var tmp;
	tmp = document.getElementById('userGreeting').cloneNode(true);
	tmp.className = "hgMenu UOP_hgMenu";
	tmp.firstChild.firstChild.removeAttribute('href');
	tmp.firstChild.firstChild.removeAttribute('onclick');
	tmp.firstChild.firstChild.removeChild(tmp.firstChild.firstChild.firstChild);
	tmp.firstChild.firstChild.firstChild.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	tmp.firstChild.firstChild.removeChild(tmp.firstChild.firstChild.lastChild);
	template.hgMenu = tmp;
	
	tmp = document.createElement('div');
	tmp.className = "hgSeparator left";
	template.hgLeft = tmp;
	
	tmp = document.createElement('div');
	tmp.className = "hgSeparator right";
	template.hgRight = tmp;
}
/*******************MAIN********************/
function main() {
	
	switch (S_skin)
	{
		case 1: defaultSkin();break;
		default: break;
	}
	
	if ((S_ads == 0) && (S_simple == 2)) S_ads = 1;
	switch (S_ads)
	{
		case 1: removeAds();break;
		case 2: removeAds();break;
		default: break;
	}
	
	if (S_auto == 0) initAuto();
	
	syncUser(soundHornWaiting);
}
/*******************CONTROL PANEL & SETTINGS*****************/
function loadSettings() {
	if ((!window.localStorage.UOP_versionCompatibleCode) || (window.localStorage.UOP_versionCompatibleCode != C_versionCompatibleCode))
	{
		window.localStorage.UOP_versionCompatibleCode = C_versionCompatibleCode;
		window.localStorage.UOP_skin = 1;
		window.localStorage.UOP_auto = 0;
		window.localStorage.UOP_ads = 1;
		window.localStorage.UOP_schedule = 1;
		window.localStorage.UOP_solve = 0;
		window.localStorage.UOP_server = 1;
		
		window.localStorage.UOP_simple = 0;
		window.localStorage.UOP_pause = 0;
		window.localStorage.UOP_aggressive = 2;
		window.localStorage.UOP_delaymin = 5;
		window.localStorage.UOP_delaymax = 60;
		window.localStorage.UOP_alarm = 0;
		window.localStorage.UOP_alarmSrc = "";
		window.localStorage.UOP_alarmStop = 1;
		window.localStorage.UOP_alarmStopTime = 600;
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
	S_ads = Number(window.localStorage.UOP_ads);
	S_solve = Number(window.localStorage.UOP_solve);
	S_server = Number(window.localStorage.UOP_server);
	
	S_simple = Number(window.localStorage.UOP_simple);
	S_aggressive = Number(window.localStorage.UOP_aggressive);
	S_delaymin = Number(window.localStorage.UOP_delaymin);
	S_delaymax = Number(window.localStorage.UOP_delaymax);
	S_alarm = Number(window.localStorage.UOP_alarm);
	S_alarmSrc = window.localStorage.UOP_alarmSrc;
	S_alarmStop = Number(window.localStorage.UOP_alarmStop);
	S_alarmStopTime = Number(window.localStorage.UOP_alarmStopTime);
	S_trapCheck = Number(window.localStorage.UOP_trapCheck);
	S_trapCheckTime = Number(window.localStorage.UOP_trapCheckTime);
	S_script = window.localStorage.UOP_script;
	
	S_cacheKRstr = window.localStorage.UOP_cacheKRstr;
	S_serverUrl = window.localStorage.UOP_serverUrl;
}
function addControlPanel() {
	var controlpanel = template.hgMenu.cloneNode(true);
	controlpanel.id = "UOP_appControlPanel";
	controlpanel.addEventListener('click',loadControlPanel,false);
	controlpanel.removeChild(controlpanel.lastChild);

	O_hgRow.appendChild(template.hgLeft.cloneNode(true));
	O_hgRow.appendChild(controlpanel);
	O_hgRow.appendChild(template.hgLeft.cloneNode(true));
}
function clearSettings() {
	delete window.localStorage.UOP_settings;
	
	location.reload();
}
function saveSettings() {
	S_skin = document.getElementById("UOP_skin").getElementsByClassName("tick")[0].value;
	S_auto = document.getElementById("UOP_auto").getElementsByClassName("tick")[0].value;
	S_schedule = document.getElementById("UOP_schedule").getElementsByClassName("tick")[0].value;
	S_ads = document.getElementById("UOP_ads").getElementsByClassName("tick")[0].value;
	S_solve = document.getElementById("UOP_solve").getElementsByClassName("tick")[0].value;
	S_server = document.getElementById("UOP_server").getElementsByClassName("tick")[0].value;
	S_aggressive = document.getElementById("UOP_aggressive").getElementsByClassName("tick")[0].value;
	S_alarm = document.getElementById("UOP_alarm").getElementsByClassName("tick")[0].value;
	S_alarmStop = document.getElementById("UOP_alarmStop").getElementsByClassName("tick")[0].value;
	S_trapCheck = document.getElementById("UOP_trapCheck").getElementsByClassName("tick")[0].value;
	S_delaymin = document.getElementById("UOP_delaymin").value;
	S_delaymax = document.getElementById("UOP_delaymax").value;
	S_alarmSrc = document.getElementById("UOP_alarmSrc").value;
	S_alarmStopTime = document.getElementById("UOP_alarmStopTime").value;
	S_trapCheckTime = document.getElementById("UOP_trapCheckTime").value;
	S_cacheKRstr = document.getElementById("UOP_cacheKRstr").value;
	S_serverUrl = document.getElementById("UOP_serverUrl").value;
	
	window.localStorage.UOP_skin = S_skin;
	window.localStorage.UOP_auto = S_auto;
	window.localStorage.UOP_schedule = S_schedule;
	window.localStorage.UOP_ads = S_ads;
	window.localStorage.UOP_solve = S_solve;
	window.localStorage.UOP_server = S_server;
	
	window.localStorage.UOP_aggressive = S_aggressive;
	window.localStorage.UOP_delaymin = S_delaymin;
	window.localStorage.UOP_delaymax = S_delaymax;
	window.localStorage.UOP_alarm = S_alarm;
	window.localStorage.UOP_alarmSrc = S_alarmSrc;
	window.localStorage.UOP_alarmStop = S_alarmStop;
	window.localStorage.UOP_alarmStopTime = S_alarmStopTime;
	window.localStorage.UOP_trapCheck = S_trapCheck;
	window.localStorage.UOP_trapCheckTime = S_trapCheckTime;
	window.localStorage.UOP_script = S_script;
	
	window.localStorage.UOP_cacheKRstr = S_cacheKRstr;
	window.localStorage.UOP_serverUrl = S_serverUrl;

	location.reload();
}
function tabSettings(e) {
	var target = e.target;
	while (target.className != "UOP_button") target = target.parentNode;
	var tab = Number(C_tabNum[target.id]);
	var x = document.getElementsByClassName('UOP_settingtab');
	for (var i = 0;i < x.length;++i) x[i].style.display = "none";
	x[tab].style.display = "block";
}
function initControlPanel() {
	allLi = document.getElementsByClassName("UOP_settingli");
	for (var i = 0;i < allLi.length;++i) allLi[i].addEventListener("click",checkLi,false);
	document.getElementById('UOP_auto').addEventListener('click',toggleGroup,false);
	document.getElementById('UOP_schedule').addEventListener('click',toggleGroup,false);
	document.getElementById('UOP_buttonLoadKR').addEventListener('click',loadSettingKRimage,false);
	document.getElementById('UOP_buttonAlarmTest').addEventListener('click',alarmTest,false);
	document.getElementById('UOP_buttonSave').addEventListener('click',saveSettings,false);
	document.getElementById('UOP_buttonReset').addEventListener('click',clearSettings,false);
	document.getElementById('UOP_buttonGeneral').addEventListener('click',tabSettings,false);
	document.getElementById('UOP_buttonBot').addEventListener('click',tabSettings,false);
	document.getElementById('UOP_buttonSchedule').addEventListener('click',tabSettings,false);
	
	tmp = document.getElementById("UOP_skin").getElementsByTagName('li')[S_skin];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_auto").getElementsByTagName('li')[S_auto];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_schedule").getElementsByTagName('li')[S_schedule];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_ads").getElementsByTagName('li')[S_ads];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_aggressive").getElementsByTagName('li')[S_aggressive];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_trapCheck").getElementsByTagName('li')[S_trapCheck];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_solve").getElementsByTagName('li')[S_solve];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_alarm").getElementsByTagName('li')[S_alarm];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_alarmStop").getElementsByTagName('li')[S_alarmStop];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	tmp = document.getElementById("UOP_server").getElementsByTagName('li')[S_server];tmp.setAttribute("aria-checked","true");tmp.setAttribute("origin","true");tmp.className="tick";
	document.getElementById("UOP_cacheKRstr").value = S_cacheKRstr;
	document.getElementById("UOP_alarmSrc").value = S_alarmSrc;
	document.getElementById("UOP_serverUrl").value = S_serverUrl;
	document.getElementById("UOP_delaymin").value = S_delaymin;
	document.getElementById("UOP_delaymax").value = S_delaymax;
	document.getElementById("UOP_trapCheckTime").value = S_trapCheckTime;
	document.getElementById("UOP_alarmStopTime").value = S_alarmStopTime;
	
	document.getElementById("UOP_version").innerHTML = C_version;
	//if ((C_version == window.localStorage.UOP_newversion) || (C_version == "Limited Edition") || (C_version == "Platinum Edition")) document.getElementById("UOP_is_uptodate").style.display = "block";
	//else if (window.localStorage.UOP_newversion == "error") document.getElementById("UOP_cannot_update").style.display = "block";
	//else document.getElementById("UOP_update_available").style.display = "block";
	document.getElementById("UOP_is_uptodate").style.display = "block";
	
	var len;
	tmp = document.getElementsByClassName('UOP_settinggroup');
	O_settingGroup = tmp;
	i = 0;
	len = S_settingGroupsLength[i];
	if (S_auto == 1) len = 0;
	tmp[i].style.height = len + "px";
	i = 1;
	len = S_settingGroupsLength[i];
	if (S_schedule == 1) len = 0;
	tmp[i].style.height = len + "px";
}
function checkLi(e) {
	var obj = e.target;
	var parent = obj.parentNode;
	var parentArr = parent.getElementsByTagName('li');
	for (var i = 0;i < parentArr.length;++i)
	{
		parentArr[i].setAttribute("aria-checked","false");
		parentArr[i].className = "";
	}
	obj.setAttribute("aria-checked","true");
	obj.className = "tick";
	if (obj.getAttribute("origin") == "true")
	{
		parent.parentNode.className = "UOP_settingvalue";
	}
	else
	{
		parent.parentNode.className = "UOP_settingvalue editted";
	}
}
function toggleGroup(e) {
	var state = e.target.value;
	var num = C_groupNum[e.target.parentNode.id];
	if (state == 1) //1 = OFF
	{
		O_settingGroup[num].style.height = "0px";
		O_settingGroup[num].style.opacity = "0";
	}
	else
	{
		O_settingGroup[num].style.height = S_settingGroupsLength[num] + "px";
		O_settingGroup[num].style.opacity = "1";
	}
}
function loadControlPanel() {
	sendMessage(C_cpmessage,"UOP_eval");
	initControlPanel();
}
function alarmTest() {
	var str = window.localStorage.UOP_alarmSrc;
	var num = S_alarm;
	window.localStorage.UOP_alarmSrc = document.getElementById("UOP_alarmSrc").value;
	S_alarm = document.getElementById("UOP_alarm").getElementsByClassName("tick")[0].value;
	alarm(null,null);
	window.localStorage.UOP_alarmSrc = str;
	S_alarm = num;
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
function formatWeek(sec) {
	sec = Math.floor(sec / 60);
	var min = sec % 60;sec = Math.floor(sec / 60);
	var hour = sec % 24;sec = Math.floor(sec / 24);
	var day = sec % 7;
	var week = Math.floor(sec / 7);
	
	var textTime = "";
	if (week != 0) textTime += week + "w ";
	if (day != 0) textTime += day + "d ";
	textTime += (hour<10?"0"+hour:hour) + ":" + (min<10?"0"+min:min);
	return textTime;
}
function callArrayFunction(element, index, array) {
	element();
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
				data = JSON.parse(request.responseText);
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
		setTimeout(soundHorn, 100);
		registerSoundHornSounding.forEach(callArrayFunction);
		return;
	}
	else if (O_hornHeader.className.indexOf('hornsounded') != -1)
	{
		setTimeout(soundHorn, 100);
		registerSoundHornSounded.forEach(callArrayFunction);
		return;
	}

	syncUser(soundHornWaiting);
}
function soundHornWaiting() {
	registerSoundHornWaiting.forEach(callArrayFunction);
}
function updateTimeStamp() {
	nextTurnTimestamp = data.user.next_activeturn_seconds * 1000 + new Date().getTime();
}
/*******************SYSTEM AREA********************/
function cssAdder(num) {
	if (cssArr[num] == 0) return;
	
	var css = document.createElement('link');
	css.rel = 'stylesheet';
	css.href = C_cssArr[num];
	document.head.appendChild(css);
	
	cssArr[num] = 1;
}
function jsAdder(num) {
	if (jsArr[num] == 0) return;
	
	var js = document.createElement('script');
	js.type = 'text/javascript'; 
	js.src = C_jsArr[num];
	document.head.appendChild(js);
	
	jsArr[num] = 1;
}
function cssCustomAdder(num) {
	if (cssCustomArr[num] == 0) return;
	
	css = document.createElement('style');
	css.rel = 'text/css';
	css.innerHTML = C_cssCustomArr[num];//.replace(/;/g,'!important;');
	document.head.appendChild(css);
	
	cssCustomArr[num] = 1;
}
function manageCSSJSAdder(num) {
	if (cssjsSetArr[num] == 0) return;
	
	var i;
	for (i = 0;i < C_cssjsSetArr[num][0].length;++i) cssAdder(C_cssjsSetArr[num][0][i]);
	for (i = 0;i < C_cssjsSetArr[num][1].length;++i) jsAdder(C_cssjsSetArr[num][1][i]);
	for (i = 0;i < C_cssjsSetArr[num][2].length;++i) cssCustomAdder(C_cssjsSetArr[num][2][i]);
	
	cssjsSetArr[num] = 0;
}
function sendMessage(str,callfunc) {
	O_sendMessage.className = callfunc;
	O_sendMessage.innerText = str;
	O_sendMessage.click();
}
function receiveMessage() {
	switch (O_receiveMessage.className)
	{
		default: break;
	}
}
function UOP_receiveMessage() {
	switch (O_receiveMessage.className)
	{
		case "UOP_userHash": UOP_updateUserHash();break;
		case "UOP_eval": UOP_eval();break;
		default: break;
	}
}
function windowScript() {
	var O_sendMessage = document.getElementById('UOP_toScriptMessage'),O_receiveMessage = document.getElementById('UOP_toWindowMessage');
	function UOP_updateUserHash () { user.unique_hash = O_receiveMessage.innerText;}
	function UOP_eval() {eval(O_receiveMessage.innerText);}
}
/*******************SKIN AREA********************/
//TOOLS
function skinSecondTimer() {
	//update sound timer
	if (data.user.has_puzzle)
	{
		document.title = "King's Reward";
		return;
	}
	else
	{
		nextTurnSeconds = Math.ceil((nextTurnTimestamp - new Date().getTime()) / 1000);
		if (nextTurnSeconds > 0)
		{
			var textTime = formatMinute(nextTurnSeconds);
			O_huntTimer.textContent = textTime;
			document.title = textTime;
		}
		else
		{
			O_huntTimer.textContent = "Ready";
			document.title = "Ready";
			return;
		}
	}

	//set the second time interval
	setTimeout(function () { (skinSecondTimer)() }, C_SecondInterval * 1000);
}
function travelcontentLoad() {
	var request = new XMLHttpRequest();
	var freeTravel,freeTravelMeadow;
	var contentDiv = O_travelContent;
	request.open("GET", "travel.php?quick=1", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				contentDiv.innerHTML = request.responseText.substring(request.responseText.indexOf("<h2 style='margin-bottom:12px;'>Select a location to travel to</h2>"),request.responseText.indexOf("</div></div><div class='inactive' id='tabbarContent_page_1'>")).replace(/&amp;quick=1/g,'').replace(/travel.php\?env=/g,'managers/ajax/users/changeenvironment.php?destination=');
				if (request.responseText.indexOf("travel.php?freeTravel=true") != -1)
				{
					appendbefore = contentDiv.firstChild.nextSibling;
					freeTravel = appendbefore.cloneNode(true);
					freeTravel.textContent = "Free Travel";
					freeTravelMeadow = appendbefore.nextSibling.cloneNode(true);
					freeTravelMeadow.innerHTML = "<a href='" + request.responseText.substring(request.responseText.indexOf("travel.php?freeTravel=true"),request.responseText.indexOf("'>Follow Larry back to the Meadow")) + "'>Follow Larry to Meadow</a> (0 gold)";
					contentDiv.insertBefore(freeTravel,appendbefore);
					contentDiv.insertBefore(freeTravelMeadow,appendbefore);
					contentDiv.insertBefore(document.createElement("br"),appendbefore);
				}
				var travelcontentChildArr = contentDiv.childNodes;
				for (var i = 0;i < travelcontentChildArr.length;++i)
					if (travelcontentChildArr[i].nodeName == "DIV")
					{
						travelcontentChildArr[i].firstChild.target = "_blank";
						travelcontentChildArr[i].firstChild.addEventListener('click',travel,false);
					}
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function shopcontentLoad() {
	manageCSSJSAdder(1);
	var request = new XMLHttpRequest();
	var contentDiv = O_shopContent;
	request.open("GET", "shops.php", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var HTMLText = request.responseText.substring(request.responseText.indexOf("<div class='pagetabbartop'>"),request.responseText.indexOf("</div></div><a href='#' name='hudbottom'></a>"));
				HTMLText += request.responseText.substring(request.responseText.indexOf("<div class='contentcontainer'>"),request.responseText.indexOf("<div class='footer'>"));
				var JSText = request.responseText.substring(request.responseText.indexOf("app.views.ItemPurchaseView"),request.responseText.indexOf("user = {"));
				
				sendMessage(JSText,"UOP_eval");
				HTMLText = HTMLText.replace(/app\.views\.TabBarView\.page\.show\(.\);/g,'');
				HTMLText = HTMLText.replace(/tabbarContent_page/g,'UOP_tabbarContents_page');
				HTMLText = HTMLText.replace(/tabbarControls_page/g,'UOP_tabbarControls_page');
				
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				
				var tmp = HTMLdiv.getElementsByClassName('deets');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('flexibleDialog');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('subtabheading');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('tradable');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('anchorLink');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('journalContainer');while(tmp.length > 0) tmp[0].parentNode.removeChild(tmp[0]);
				tmp = HTMLdiv.getElementsByClassName('control');tmp[tmp.length - 1].parentNode.style.display = "inline-block";
				tmp[0].firstChild.innerText = "Cheese";tmp[4].firstChild.innerText = "Charm";
				for (var i = 0;i < tmp.length;++i)
				{
					tmp[i].firstChild.addEventListener('click',simulateTabBar,false);
					tmp[i].setAttribute('UOP_tabValue',i);
					tmp[i].className += " UOP_shopControl";
				}
				
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function potcontentLoad() {
	manageCSSJSAdder(2);
	var request = new XMLHttpRequest();
	var contentDiv = O_potContent;
	request.open("GET", "/inventory.php?tab=3", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var HTMLText = request.responseText.substring(request.responseText.indexOf("<div id='tabbarContent_page'"),request.responseText.indexOf("</script></div></div>"));
				var JSText = "inventoryItemView1 = new ViewInventoryItem(1);" + request.responseText.substring(request.responseText.indexOf("inventoryItemView1.setValidItemClassifications"),request.responseText.indexOf("inventoryItemView1.render();") + 28);

				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
				
				sendMessage(JSText,"UOP_eval");
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function craftcontentLoad() {
	manageCSSJSAdder(3);
	var request = new XMLHttpRequest();
	var contentDiv = O_craftContent;
	request.open("GET", "/inventory.php?tab=2", true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var HTMLText = '<div id="recipeContainer" class="craftingContainer"><div class="top"><div class="loading"></div></div></div><div id="craftingContainer" class="craftingContainer" style="display:none;"><div class="top"><div class="loading"></div></div></div>';
				var JSUnknownStringStart = request.responseText.indexOf("app.views.RecipeView.");
				var JSUnknownStringEnd = request.responseText.indexOf(" =",JSUnknownStringStart);
				var JSUnknownString = request.responseText.substring(JSUnknownStringStart,JSUnknownStringEnd);
				var JSUnknownRenderString = JSUnknownString + ".render();";
				var JSText = "app.views.CraftingView.CraftingInstance = new hg.views.CraftingView(); " + JSUnknownString + " = new hg.views.RecipeView();";
				JSText += request.responseText.substring(request.responseText.indexOf(JSUnknownString + ".addRecipe"),request.responseText.indexOf(JSUnknownRenderString) + JSUnknownRenderString.length);
				JSText += request.responseText.substring(request.responseText.indexOf("app.views.CraftingView.CraftingInstance.init"),request.responseText.indexOf("app.views.CraftingView.CraftingInstance.render();"));
				JSText += JSUnknownString + ".clippingMaskWidth = 350;";
				var HTMLdiv = document.createElement('div');
				HTMLdiv.innerHTML = HTMLText;
				contentDiv.innerHTML = "";
				contentDiv.appendChild(HTMLdiv);
				
				sendMessage(JSText,"UOP_eval");
				var tmp = HTMLdiv.getElementsByClassName('recipeitemnamediv');
				for (var i = tmp.length - 1;i >= 0;--i)
				{
					tmp[i].parentNode.removeChild(tmp[i]);
				}
				tmp = HTMLdiv.getElementsByClassName('craftingTabs')[0].getElementsByTagName('li')[4].getElementsByTagName('a')[0];
				tmp.innerText = "Item";
			}
			else
			{
				contentDiv.innerHTML = "Cannot load the page, please refresh";
			}
		}
	};
	request.send(null);
	return false;
}
function travelToTabBar() {
	//travel => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if (tabbar.length > 0)
	{
		tabbar = tabbar[0].firstChild;
		
		var travelbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
		travelbar.className = "inactive";
		var travelbarChild = travelbar.firstChild.firstChild;

		var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
		travelbarChild.setAttribute('onclick',travelbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
		travelbarChild.addEventListener('click',travelcontentLoad,false);
		
		travelbarChild = travelbarChild.childNodes[1];
		travelbarChild.id = "UOP_travelCampTab";
		travelbarChild.textContent = "Travel";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(travelbar);
		
		var travelcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		travelcontent.appendChild(document.getElementById('huntingTips').cloneNode(true));
		travelcontent.id = travelcontent.id.substring(0,travelcontent.id.length - 1) + numOfTabbar;
		var travelcontentChild = travelcontent.lastChild;
		O_travelTab = travelcontentChild.getElementsByClassName('content')[0];
		travelcontentChild.id = "UOP_campTravel";
		travelcontentChild.firstChild.firstChild.innerHTML = '<a href="travel.php">Travel</a> to Location';
		travelcontentChild.firstChild.lastChild.innerHTML = 'Traveling Service by <a href="profile.php?snuid=larry">Larry</a>';
		travelcontentChild = travelcontentChild.firstChild.nextSibling;
		travelcontentChild.id = "UOP_travelcontentChild";
		O_travelContent = travelcontentChild;
		travelcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
		tabbar.getElementsByClassName('tabbody')[0].appendChild(travelcontent);
	}
}
function shopToTabBar() {
	//shop => tabbar
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if (tabbar.length > 0)
	{
		tabbar = tabbar[0].firstChild;
		
		var addbar = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive')[1].cloneNode(true);
		addbar.className = "inactive";
		addbar.style.display = "inline-block";
		var addbarChild = addbar.firstChild.firstChild;
		
		var numOfTabbar = tabbar.getElementsByClassName('bar')[0].getElementsByClassName('inactive').length + 1;
		addbarChild.setAttribute('onclick',addbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
		addbarChild.addEventListener('click',shopcontentLoad,false)
		
		addbarChild = addbarChild.childNodes[1];
		addbarChild.id = "UOP_shopCampTab";
		addbarChild.textContent = "Shop";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(addbar);
		
		var addcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		addcontent.appendChild(document.createElement("div"));
		addcontent.id = addcontent.id.substring(0,addcontent.id.length - 1) + numOfTabbar;
		var addcontentChild = addcontent.lastChild;
		addcontentChild.id = "UOP_shopcontentChild";
		O_shopContent = addcontentChild;
		addcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
		tabbar.getElementsByClassName('tabbody')[0].appendChild(addcontent);
	}
}
function potToTabBar() {
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

		potbarChild.setAttribute('onclick',potbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
		potbarChild.addEventListener('click',potcontentLoad,false);
		
		potbarChild = potbarChild.childNodes[1];
		potbarChild.id = "UOP_potCampTab";
		potbarChild.textContent = "Pot";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(potbar);
		
		var potcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		potcontent.appendChild(document.createElement("div"));
		potcontent.id = potcontent.id.substring(0,potcontent.id.length - 1) + numOfTabbar;
		var potcontentChild = potcontent.lastChild;
		potcontentChild.id = "UOP_potcontentChild";
		O_potContent = potcontentChild;
		potcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
		tabbar.getElementsByClassName('tabbody')[0].appendChild(potcontent);
	}
}
function craftToTabBar() {
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

		craftbarChild.setAttribute('onclick',craftbarChild.getAttribute('onclick').replace("showFriendsOnline(); ","").replace("show(2)","show(" + numOfTabbar + ")"));
		craftbarChild.addEventListener('click',craftcontentLoad,false);
		
		craftbarChild = craftbarChild.childNodes[1];
		craftbarChild.id = "UOP_craftCampTab";
		craftbarChild.textContent = "Craft";
		tabbar.getElementsByClassName('bar')[0].firstChild.appendChild(craftbar);
		
		var craftcontent = tabbar.getElementsByClassName('tabbody')[0].lastChild.cloneNode(false);
		craftcontent.appendChild(document.createElement("div"));
		craftcontent.id = craftcontent.id.substring(0,craftcontent.id.length - 1) + numOfTabbar;
		var craftcontentChild = craftcontent.lastChild;
		craftcontentChild.id = "UOP_craftcontentChild";
		O_craftContent = craftcontentChild;
		craftcontentChild.innerHTML = '<div class="UOP_waitingTab"></div>';
		tabbar.getElementsByClassName('tabbody')[0].appendChild(craftcontent);
	}
}
function travel(e) {
	var url = e.target.href;
	O_travelTab.innerHTML = "Travelling...";
	var request = new XMLHttpRequest();
	var htmlstr;
	request.open("GET", url, true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			O_shopContent.innerHTML = '<div class="UOP_waitingTab"></div>';
			if (request.status == 200)
			{
				var tmpRespondJSON = JSON.parse(request.responseText);
				if (tmpRespondJSON.success == 1) htmlstr = "Success ! "; else htmlstr = "Not success ! ";
				htmlstr += tmpRespondJSON.result;
				htmlstr += "<br>Refreshing....";
				htmlstr += '<div class="UOP_waitingTab"></div>';
				O_travelTab.innerHTML = htmlstr;
				travelcontentLoad();
				if (url.indexOf('freeTravel=true') != -1) syncUser(updateUserHash);
			}
			else
			{
				O_travelTab.innerHTML = "Network error, refreshing...";
				O_travelTab.innerHTML += '<div class="UOP_waitingTab"></div>';
				O_shopContent.innerHTML = '<div class="UOP_waitingTab"></div>';
				travelcontentLoad();
			}
		}
	};
	request.send(null);
}
function simulateTabBar(e) {
	var x = e.target.parentNode.getAttribute('UOP_tabValue');
	var main_div = document.getElementById('UOP_tabbarContents_page');
	var main_tab = document.getElementById('UOP_tabbarControls_page').getElementsByTagName('li');
	
	for (i = 0;i < main_div.childElementCount;++i) main_div.childNodes[i].className = "inactive";
	for (i = 0;i < main_tab.length;++i) main_tab[i].className = "inactive";
	main_div.childNodes[x].className = "active";
	main_tab[x].className = "active";
}
function updateUserHash() {
	sendMessage(data.user.unique_hash,'UOP_userHash');
}
function toggleSkin() {
	window.localStorage.UOP_simple = 1 - S_simple;
	location.reload();
}
//DEFAULT skin
function defaultSkin() {
	manageCSSJSAdder(4);
	if (S_simple == 0) defaultFullSkin(); else defaultSimpleSkin();
}
//Simple
function defaultSimpleSkin() {
	if ((location.pathname != "/index.php") && (location.pathname != "/")) return;
	//=======================add things============================
	//add mobile button
	var simpleSkinButton = document.getElementById('UOP_appControlPanel').cloneNode(true);
	simpleSkinButton.id = "UOP_simpleSkin";
	simpleSkinButton.className = "hgMenu UOP_hgMenu";
	simpleSkinButton.removeAttribute('onclick');
	simpleSkinButton.addEventListener('click',toggleSkin,false);
	O_hgRow.appendChild(simpleSkinButton);
	O_hgRow.appendChild(template.hgLeft.cloneNode(true));
	
	var inbox = document.getElementById('communityMenu').cloneNode(true);
	var oldinbox = document.getElementById('appInboxTab');
	var inboxnotification = document.getElementById('appInboxTab').getElementsByClassName('alerts')[0].cloneNode(true);
	oldinbox.id = "appoldInbox";
	inbox.id = "appInboxTab";
	inbox.removeChild(inbox.lastChild);
	inbox.appendChild(inboxnotification);
	inbox.setAttribute('onclick',oldinbox.firstChild.getAttribute('onclick'));
	inbox.firstChild.textContent = "INBOX";
	O_hgRow.insertBefore(inbox,document.getElementById('communityMenu'));
	
	//add hud
	O_simpleHud = document.createElement('div');
	O_simpleHud.id = "UOP_simpleHud";
	var tmp = document.getElementById('tabbarContent_page');
	tmp.parentNode.insertBefore(O_simpleHud,tmp);
	
	//add journal
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft');
	if (tabbar.length > 0)
	{
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
		
		//add tab bars
		travelToTabBar();
		shopToTabBar();
		potToTabBar();
		craftToTabBar();
		
		//hide them
		tmp = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive');
		tmp[0].style.display = "none";
		tmp[1].style.display = "none";
		tmp[2].click();
	}
	
	//clean up king reward
	var tmp2;
	tmp2 = document.getElementsByClassName('puzzle');
	if (tmp2.length > 0)
	{
		tmp2 = tmp2[0];
		tmp = document.getElementsByClassName('puzzleImageContainer')[0].nextSibling;
		tmp.removeChild(tmp.firstChild);
		tmp.removeChild(tmp.firstChild);
		tmp.insertBefore(tmp2,tmp.firstChild);
		tmp2 = document.createElement("div");
		tmp2.id = "pagemessage";
		tmp.insertBefore(tmp2,tmp.firstChild);
		tmp = document.getElementsByClassName('puzzleImageContainer')[0];
		tmp.parentNode.removeChild(tmp);
	}
	tmp = document.getElementById('pagemessage');
	if (tmp != null) tmp.style.width = "375px";
	
	//cleanup heading
	tmp = document.getElementById('hgbar');
	tmp.removeChild(document.getElementById('appRow'));
	tmp.removeChild(document.getElementById('newsRowHolder'));
	
	//cleanup hud
	tmp = document.getElementsByClassName('gameinfo')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('gamelogo')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('donatebuttonarea')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('campbutton')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('dropdownmenu')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('marblesplash')[0];if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementsByClassName('switch')[0];if(tmp != null) {tmp=tmp.parentNode;tmp.parentNode.removeChild(tmp);}
	tmp = document.getElementById('trapSpecialBar');if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementById('questBar');if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementById('huntingTips');if(tmp != null) tmp.parentNode.removeChild(tmp);
	tmp = document.getElementById('journalContainer');if(tmp != null) tmp.parentNode.removeChild(tmp.nextSibling);
	tmp = document.getElementById('overlayContainer');if(tmp != null) 
	for (i=0;i < 3;)
	{
		if ((tmp.lastChild.tagName != null) && (tmp.lastChild.tagName.toUpperCase() == "A")) ++i;
		tmp.removeChild(tmp.lastChild);
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
	
	//cleanup hgRow
	var rightbanner = O_hgRow.getElementsByClassName('rightBanners')[0];//remove rightbanner (levylight....) and change it to rightedge
	rightbanner.innerHTML = "";
	rightbanner.setAttribute('class','rightEdge');
	
	O_hgRow.removeChild(document.getElementById('appLogo'));
	O_hgRow.removeChild(document.getElementById('communityMenu')); 
	O_hgRow.removeChild(document.getElementById('supportMenu'));
	var userGreeting = document.getElementById('userGreeting');
	userGreeting.removeChild(userGreeting.getElementsByClassName('userText')[0]); 
	
	//cleanup journal
	tmpArr = document.getElementsByClassName('journalimage');
	for (i = 0;i < tmpArr.length;++i)
	{
		tmp = tmpArr[i].getElementsByTagName('img')[0];
		if (tmp != null)
		{
			tmpArr[i].removeChild(tmpArr[i].firstChild);
			tmpArr[i].appendChild(tmp);
		}
	}
	
	//detailed timer
	O_huntTimer = document.getElementById('huntTimer').cloneNode(true);
	document.getElementById('huntTimer').style.display = "none";
	O_huntTimer.id = "UOP_huntTimerParent";
	O_huntTimer.innerHTML = "<span class='timerlabel'>Next Hunt: </span><span id='UOP_huntTimer'></span>";
	document.getElementById('hornArea').appendChild(O_huntTimer);
	O_huntTimer = O_huntTimer.lastChild;

	//register hudupdater
	registerSoundHornWaiting.push(updateSimpleHud);
	journalbarChild.parentNode.click();
}
function updateSimpleHud() {
	O_simpleHud.innerHTML = "";
	
	//=================add hud=====================
	//gold point
	var userObj = data.user;
	O_simpleHud.innerHTML += "<span class='hudstatlabel'>Gold:</span> " + userObj.gold + " ";
	//timer
	var locationTimerObject,states,hour,min,timetmp;
	var currentTime = Math.floor(new Date().getTime() / 1000);
	for (var i = 0;i < C_LOCATION_TIMES.length;++i)
	{
		timetmp = (currentTime - C_LOCATION_TIMES[i].base) % C_LOCATION_TIMES[i].totaltime;
		for (j = 0;j < C_LOCATION_TIMES[i].length.length;++j)
		{
			timetmp -= C_LOCATION_TIMES[i].length[j];
			if (timetmp < 0) break;
			else if (timetmp == 0)
			{
				j = (j + 1) % C_LOCATION_TIMES[i].length.length;
				timetmp = -C_LOCATION_TIMES[i].length[j];
				break;
			}
		}
		timetmp = -timetmp;
		hour = Math.floor(timetmp / 3600);
		min = Math.floor((timetmp % 3600) / 60);
		
		O_simpleHud.innerHTML += "<span style='color: " + C_LOCATION_TIMES[i].color[j] + "; font-weight: bold;'>" + C_LOCATION_TIMES[i].shortstate[j]+ "</span>" + " - " + hour + ":" + (min < 10 ? "0"+min : min) + " ";
	}
	O_simpleHud.innerHTML += "<br>";
	
	//add tour
	if(userObj.viewing_atts.hasOwnProperty('tournament')){
		var secleft,minleft,hourleft;
		var timeleft = userObj.viewing_atts.tournament.seconds_remaining;
		var huntsleft = Math.floor((timeleft - userObj.next_activeturn_seconds)/900)+1;
		hourleft = Math.floor(timeleft / 3600);
		minleft = Math.floor(timeleft / 60) % 60;
		secleft = timeleft % 60;
		var textTime = hourleft +":"+(minleft < 10 ? '0'+minleft : minleft)+":"+(secleft < 10 ? '0'+secleft : secleft);
		O_simpleHud.innerHTML += "<a href=\"tournament.php?tid=" + userObj.viewing_atts.tournament.tournament_id + "\" data-ajax=\"false\" target=\"_blank\" style='font-weight: bold;'>Tournament</a>" + " : " + userObj.viewing_atts.tournament.status[0].toUpperCase() + userObj.viewing_atts.tournament.status.slice(1) + " - " + textTime + " <span class='hudstatlabel'>Rank:</span> " + userObj.viewing_atts.tournament.rank + " <span class='hudstatlabel'>Score:</span> " + userObj.viewing_atts.tournament.score + "<br>";
		O_simpleHud.innerHTML += '<a href=\"team.php\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Team</a> online:' + userObj.viewing_atts.tournament.team_members_online + ' <a href=\"team.php?tab=2\" data-ajax=\"false\" target=\"_blank\" style="font-weight: bold;">Journals</a>' + " - Hunts left: " + huntsleft + ' <a href=\"team.php?invite=true\" data-ajax=\"false\" target=\"_blank\"  style="font-weight: bold;">Invite</a><br>'; 
	}
	//SG: Amplifier
	if (userObj.environment_id == 31){
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Amplifier:</span> " + userObj.viewing_atts.zzt_amplifier + "<br>";
	}
	
	//ZT: piece
	if (userObj.environment_id == 32){
		var piece = ['None','Pawn1','Pawn2','Pawn3','Pawn4','Pawn5','Pawn6','Pawn7','Pawn8','Kight1','Kight2','Bishop1','Bishop2','Rook1','Rook2','Queen','King']; 
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Amplifier: </span>" + userObj.viewing_atts.zzt_amplifier + " - <span class='hudstatlabel'>Tech:</span> " + piece[userObj.viewing_atts.zzt_tech_progress] + " - <span class='hudstatlabel'>Mystic:</span> " + piece[userObj.viewing_atts.zzt_mage_progress] + "<br>";
	}
	
	//Iceberg: Phase, ft
	if (userObj.environment_id == 40){
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Phase:</span> " + userObj.quests.QuestIceberg.current_phase + " - " + userObj.quests.QuestIceberg.user_progress + " ft - " + userObj.quests.QuestIceberg.turns_taken + " hunts<br>";
	}
	
	//FW
	if (userObj.environment_id == 33){
		var fwObj = userObj.viewing_atts.desert_warpath;
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Victories:</span> " + fwObj.victories + " - <span class='hudstatlabel'>Friends:</span> " + fwObj.friends_in_area + " - <span class='hudstatlabel'>Wave " + fwObj.wave + ":</span><br>";
		
		for (var wp in fwObj.wave_population)
		O_simpleHud.innerHTML += "<p style=\"text-align:right;\">" + fwObj.wave_population[wp].name + " - <b style=\"color:blue;\">" + fwObj.wave_population[wp].population + "</b> [" + fwObj.wave_population[wp].status + "]<br>";
		
		for (var wp in fwObj.common_population)
		O_simpleHud.innerHTML += fwObj.common_population[wp].name + " [" + fwObj.common_population[wp].status + "]<br>";
		
		O_simpleHud.innerHTML += "<span class='hudstatlabel'>Streak:</span> - " + fwObj.streak.mouse_type + " - <b style=\"color:green;\">" + fwObj.streak.quantity + "</b><br>";
		
		O_simpleHud.innerHTML += JSON.stringify(userObj.viewing_atts.desert_warpath.streak,null,'\t') ;
	}
	
	//LG
	if ((userObj.environment_id == 35)||(userObj.environment_id == 41)||(userObj.environment_id == 42)){
		for (var key in userObj.quests){
			if (userObj.quests[key].hasOwnProperty('essences')) {
				O_simpleHud.innerHTML += '<em style=\"font-size:1.1em;color:limegreen;\" >Petals : ' + userObj.quests[key].loot_drops.dewthief_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.dreamfluff_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.duskshade_petal_crafting_item.quantity + ']-' + userObj.quests[key].loot_drops.graveblossom_petal_crafting_item.quantity + '-[' + userObj.quests[key].loot_drops.plumepearl_herbs_crafting_item.quantity + '-' + userObj.quests[key].loot_drops.lunaria_petal_crafting_item.quantity + ']</em><br>';
				i=8;
				while (userObj.quests[key].essences[i].quantity==0) i--;
				var sum=0;
				for (var j=0; j<9; j++){// j<=i
					if (j<=i) O_simpleHud.innerHTML += '<em style=\"color:dodgerblue;\" >['+String.fromCharCode(j+65) + ':'+userObj.quests[key].essences[j].quantity + ']&emsp;</em>';
					if (j<7) sum = sum/3 + userObj.quests[key].essences[j].quantity;//Gur
				}
				O_simpleHud.innerHTML += '<br>= ' + sum + '&emsp;<em style=\"color:dodgerblue;\" >' +  userObj.quests[key].essences[6].name + '<br></em>';//Gur
				O_simpleHud.innerHTML += '<em style=\"font-size:0.8em;color:grey;\">' + JSON.stringify(userObj.quests[key].minigame ,null,'\t') + '</em><br>';
			} 
			break;
		}
		
		//Living Garden
		if (userObj.environment_id == 35){
			var smallObj = userObj.quests.QuestLivingGarden;
			if (smallObj.is_normal){
				if (smallObj.minigame.bucket_state == "filling"){
					if (smallObj.minigame.estimate == 35){
						O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
						alarm(null,null);
						}else{// <35
						if (userObj.trinket_item_id != 1020){//sponge id
							O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****20 charms only****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							alarm(null,null);
						}
					}
				}
				}else{
				if (smallObj.minigame.vials_state == "filling"){
					if (smallObj.minigame.estimate == 35){
						O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"/?switch_to=standard\" data-ajax=\"false\" >Pour now - Full site</a></div>";
						alarm(null,null);
						}else{// <35
						if ((userObj.trinket_item_id != 1017) && (userObj.trinket_item_id != 1022)){
							O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\">****10 charms each****<br><br><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
							alarm(null,null);
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
					O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
					alarm(null,null);
				}
				}else{
				if (smallObj.minigame.is_cursed && !((smallObj.minigame.curses[0].active && smallObj.minigame.curses[0].charm.equipped) || (smallObj.minigame.curses[1].active && smallObj.minigame.curses[1].charm.equipped) || (smallObj.minigame.curses[2].active && smallObj.minigame.curses[2].charm.equipped) )){
					O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
					alarm(null,null);
				}
			}
		}
		//Sand Dunes
		if (userObj.environment_id == 42){
			var smallObj = userObj.quests.QuestSandDunes;
			if (smallObj.is_normal){
				if (smallObj.minigame.has_stampede && (userObj.trinket_item_id != 1016)){
					O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
					alarm(null,null);
				}
				}else{
				var salt = window.localStorage.getItem("KGSalt");
				if (salt == undefined || salt == null){
					window.localStorage.setItem("KGSalt", 20);
					salt = 20;
				}
				O_simpleHud.innerHTML += 'min Salt to alert : <input type="number" id="SaltInput" name="Salt" value="' + salt.toString() + '"/>';
				O_simpleHud.innerHTML += '&emsp;&emsp;&emsp;&emsp;<input type="button" value="Save" onclick="window.localStorage.setItem(\'KGSalt\', document.getElementById(\'SaltInput\').value);window.location.href=\'/\';"/><br>';
				O_simpleHud.innerHTML += "<div style=\"text-align:center;font-size:1.2em;padding:0.5em;\"><a href=\"shops.php?tab=4\" data-ajax=\"false\" >&emsp;&emsp;Charm Shop&emsp;&emsp;</a><br><a href=\"inventory.php?tab=1&subtab=2\" data-ajax=\"false\">&emsp;&emsp;Charms&emsp;&emsp;</a></div>";
				if ((smallObj.minigame.salt_charms_used >= salt)&&(userObj.trinket_item_id != 1015)) alarm(null,null);
				if ((smallObj.minigame.salt_charms_used == 0)&&(userObj.trinket_item_id == 1015)) alarm(null,null);
			}
		}
	}
}
//Full
function hideImageBox() {
	O_imageBox.style.opacity = 0;
}
function showImageBox(e) {
	O_imagePhoto.src = e.target.parentNode.href;
	O_imageBox.style.opacity = 1;
	moveImageBox(e);
}
function moveImageBox(e) {
	var vW, vH, uH, oW, oH, cX, cY;
	var oHd2,state = 0;
	cX = e.clientX; cY = e.clientY;
	
	vW = window.innerWidth + window.pageXOffset;
	uH = window.pageYOffset;
	vH = window.innerHeight + uH;
	oW = O_imageBox.offsetWidth;
	oH = O_imageBox.offsetHeight;
	oHd2 = Math.floor(oH/2);
	cY += uH;
	
	O_imageBox.style.left = (((cX+10+oW)>vW) ? (cX-10-oW) : (cX+10)) + "px";
	if ((cY-oHd2) < uH) state += 1;
	if ((cY+oHd2+10) > vH) state -= 1;
	O_imageBox.style.top = ((state == 0) ? (cY-oHd2+10) : ((state == 1) ? (uH+10) : (vH-oH-10))) + "px";
}
function updateJournalImageBox() {
	var journalimages = document.getElementsByClassName('journalimage');
	for (var i = 0;i < journalimages.length;++i)
	{
		if ((journalimages[i].firstChild == null) || (journalimages[i].firstChild.tagName.toUpperCase() == "IMG")) continue;
		if (journalimages[i].firstChild.getAttribute('UOP_updatedIB') == null)
		{
			journalimages[i].firstChild.addEventListener('mousemove',moveImageBox,false);
			journalimages[i].firstChild.addEventListener('mouseover',showImageBox,false);
			journalimages[i].firstChild.addEventListener('mouseout',hideImageBox,false);
			journalimages[i].firstChild.setAttribute('UOP_updatedIB','updated')
		}
		else break;
	}
}
function updateMinuteTimer() {
	//update location timer
	var locationTimerObject,states,timetmp,t1,t2;
	var currentDate = new Date();
	var currentTime = Math.floor(currentDate.getTime() / 1000);
	var i,j;
	for (i = 0;i < C_LOCATION_TIMES.length;++i)
	{
		timetmp = (currentTime - C_LOCATION_TIMES[i].base) % C_LOCATION_TIMES[i].totaltime;
		for (j = 0;j < C_LOCATION_TIMES[i].length.length;++j)
		{
			timetmp -= C_LOCATION_TIMES[i].length[j];
			if (timetmp < 0) break;
			else if (timetmp == 0)
			{
				j = (j + 1) % C_LOCATION_TIMES[i].length.length;
				timetmp = -C_LOCATION_TIMES[i].length[j];
				break;
			}
		}
		timetmp = formatMinute(Math.floor(-timetmp / 60));
		
		locationTimerObject = document.getElementById(C_LOCATION_TIMES[i].id);
		locationTimerObject.innerHTML = "<span style='color: " + C_LOCATION_TIMES[i].color[j] + "; font-weight: bold;'>" + C_LOCATION_TIMES[i].state[j]+ "</span>" + " - " + timetmp;
	}
	if (data.user.has_shield == false) O_LGSTimer.innerHTML = "Expired";
	else
	{
		timetmp = Math.floor((new Date(data.user.shield_expiry + "UTC+0000") - currentDate) / 1000);
		timetmp = formatWeek(timetmp);
		O_LGSTimer.innerText = timetmp;
	}
	
	//set the minute time interval
	setTimeout(function () { (updateMinuteTimer)() }, C_MinuteInterval * 1000);
}
function updateHud() {
	O_titlePercentage.textContent = data.user.title_percentage.toString();
	O_baitNum.innerText = data.user.bait_quantity;
	
	if (initHud == 0) {
		initHud = 1;
		updateMinuteTimer();
	}
}
function defaultFullSkin() {
	//===========Change the top row of mousehunt=================
	var tmp = O_hgRow.getElementsByClassName('rightBanners')[0];//remove rightbanner (levylight....) and change it to rightedge
	tmp.innerHTML = "";
	tmp.setAttribute('class','rightEdge');
	O_hgRow.insertBefore(template.hgRight.cloneNode(true),document.getElementById('supportMenu'));//end of remove rightbanner
	O_hgRow.removeChild(document.getElementById('appLogo')); //remove leftbanner (mousehunt)
	
	//add SB+ and Inbox and mobile
	var sbplus = template.hgMenu.cloneNode(true);
	sbplus.id = "UOP_appTabSuperBrie";
	sbplus.setAttribute('onclick','showCheckout("donatebutton"); return false;');
	sbplus.lastChild.firstChild.removeAttribute('href');
	sbplus.lastChild.firstChild.textContent = document.getElementById('appTabSuperBrie').getElementsByClassName('appTabMiddle')[0].childNodes[1].textContent;		
	
	var inbox = document.getElementById('communityMenu').cloneNode(true);
	var oldinbox = document.getElementById('appInboxTab');
	var inboxnotification = document.getElementById('appInboxTab').getElementsByClassName('alerts')[0].cloneNode(true);
	oldinbox.id = "appoldInbox";
	inbox.id = "appInboxTab";
	inbox.removeChild(inbox.lastChild);
	inbox.appendChild(inboxnotification);
	inbox.setAttribute('onclick',oldinbox.firstChild.getAttribute('onclick'));
	inbox.firstChild.textContent = "INBOX";
	
	var simpleSkinButton = document.getElementById('UOP_appControlPanel').cloneNode(true);
	simpleSkinButton.id = "UOP_simpleSkin";
	simpleSkinButton.className = "hgMenu UOP_hgMenu";
	simpleSkinButton.removeAttribute('onclick');
	simpleSkinButton.addEventListener('click',toggleSkin,false);
	
	var freeSB = null;
	tmp = document.getElementsByClassName('freeoffers_button');
	if (tmp.length > 0)
	{
		tmp = tmp[0];
		freeSB = document.getElementById('UOP_appControlPanel').cloneNode(true);
		freeSB.id = "UOP_freeSB";
		freeSB.className = "hgMenu";
		freeSB.setAttribute('onclick',tmp.getAttribute('onclick'));
		tmp.parentNode.removeChild(tmp);
	}
	
	var appendbefore = document.getElementById('communityMenu').nextSibling.nextSibling;
	O_hgRow.insertBefore(inbox,appendbefore);
	O_hgRow.insertBefore(template.hgRight.cloneNode(true),appendbefore);
	O_hgRow.insertBefore(sbplus,appendbefore);
	O_hgRow.insertBefore(template.hgRight.cloneNode(true),appendbefore);
	O_hgRow.appendChild(simpleSkinButton);
	O_hgRow.appendChild(template.hgLeft.cloneNode(true));
	if (freeSB != null)
	{
		O_hgRow.appendChild(freeSB);
		O_hgRow.appendChild(template.hgLeft.cloneNode(true));
	}

	//support: remove: all support from support;livedevchat,chatroom,forum,news => support; 
	//community: remove: Store, add 2 guide, wiki
	var community = document.getElementById('hgDropDownCommunity').getElementsByClassName('hgDropdownMiddle')[0];
	var support = document.getElementById('hgDropDownSupport').getElementsByClassName('hgDropdownMiddle')[0];
	
	var arr = support.getElementsByClassName('hgDropDownItem');
	arr[0].firstChild.href = "/chat.php";
	arr[0].firstChild.firstChild.src = "images/ui/hgbar/icon_forums.png"
	arr[0].firstChild.firstChild.nextSibling.textContent = "Chat room";
	arr[0].firstChild.lastChild.innerHTML = "Join the Mousehunt<br>Chat room";
	
	arr[1].firstChild.href = "/forum/index.php?hgref=hgbar";
	arr[1].firstChild.firstChild.src = "images/ui/hgbar/icon_forums.png"
	arr[1].firstChild.firstChild.nextSibling.textContent = "Forum";
	arr[1].firstChild.lastChild.innerHTML = "Take part in discussions<br>with your fellow players.";
	
	arr[2].firstChild.href = "/news.php";
	arr[2].firstChild.firstChild.src = "images/ui/hgbar/icon_offense_appeals.png"
	arr[2].firstChild.firstChild.nextSibling.textContent = "News";
	arr[2].firstChild.lastChild.innerHTML = "News and updates<br>from ALL the TIME !";
	
	arr[3].firstChild.href = "/support.php";
	arr[3].firstChild.firstChild.src = "images/ui/hgbar/icon_technical_support.png"
	arr[3].firstChild.firstChild.nextSibling.textContent = "Support";
	arr[3].firstChild.lastChild.innerHTML = "Support from devs<br>for FREE !";
	
	hgdropdownitem = support.firstChild.cloneNode(true);
	hgdropdownitem.className = "hgDropDownItem first";
	hgdropdownitem.firstChild.href = "/livefeed.php";
	hgdropdownitem.firstChild.firstChild.src = "images/ui/hgbar/icon_forums.png"
	hgdropdownitem.firstChild.firstChild.nextSibling.textContent = "Live Dev Chat";
	hgdropdownitem.firstChild.lastChild.innerHTML = "Chat with the devs<br>on each friday.";
	support.firstChild.className = "hgDropDownItem";
	support.insertBefore(hgdropdownitem,support.firstChild);
	
	var arr = community.getElementsByClassName('hgDropDownItem');
	arr[0].firstChild.href = "http://www.mousehuntguide.com/mh-index.php";
	arr[0].firstChild.firstChild.src = "images/ui/hgbar/icon_game_rules.png"
	arr[0].firstChild.firstChild.nextSibling.textContent = "Spheniscine's Guide";
	arr[0].firstChild.lastChild.innerHTML = "Spheniscine<br>MouseHunt Walkthrough";
	
	arr[1].firstChild.href = "http://amhuguide.com/";
	arr[1].firstChild.firstChild.src = "images/ui/hgbar/icon_fan_page.png"
	arr[1].firstChild.firstChild.nextSibling.textContent = "AsiaMHU's Guide";
	arr[1].firstChild.lastChild.innerHTML = "AsiaMH Union<br>MouseHunt Guide";
	
	arr[2].firstChild.href = "http://mhwiki.hitgrab.com/wiki/";
	arr[2].firstChild.firstChild.src = "images/ui/hgbar/icon_hitgrab_store.png"
	arr[2].firstChild.firstChild.nextSibling.textContent = "Hunter's Wiki";
	arr[2].firstChild.lastChild.innerHTML = "This is<br>Mousehuntpedia";
	
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
	tmp.removeChild(document.getElementById('appRow'));//remove the appRow (Inbox,play,Free gift...)
	tmp.removeChild(document.getElementById('newsRowHolder'));//remove the News
	
	//==========Change the container (main page) of mousehunt==============
	var container = document.getElementsByClassName('container')[0];
	container.removeChild(container.getElementsByClassName('clear')[0]);//remove the like button in the bottom of the pages
	
	//=======gameinfo changes=======
	//add Golden shield expires day (more obvious)
	document.getElementsByClassName('gameinfo')[0].firstChild.lastChild.innerHTML = "<span style='font-weight: bold;'>LGS:</span> <span id='UOP_LGSTimer' style='color: #3B5998; font-weight: bold;'></span>";
	O_LGSTimer = document.getElementById('UOP_LGSTimer');
	
	//=======NAVIGATOR changes======
	//move camp and marketplace button
	var campbtn = document.getElementsByClassName('campbutton')[0];
	var donationarea = document.getElementsByClassName('donatebuttonarea')[0];
	campbtn.parentNode.removeChild(campbtn);//move the camp button to donation area for moving easier
	donationarea.insertBefore(campbtn,donationarea.firstChild);
	
	document.getElementById('hornArea').style.marginLeft = "101px";
	
	//on the last version, we can't make button friend go a bit far because of the limit of list but
	//on this version, we will change the travel button into campbutton, so it look like the camp button moved back to it place
	//and camp button (on the right side) to friend button and have the toggle animation so it look like the old friend button
	//and so we just hide the friend button
	////change camp => friend
	campbtn = document.getElementById('campButton');
	campbtn.id = "btn-friend";
	campbtn.parentNode.setAttribute('onmouseover',"toggleNavCategory('nav1.friends', 'visible');");
	campbtn.parentNode.setAttribute('onmouseout',"toggleNavCategory('nav1.friends', 'hidden');");

	////change travel => camp
	var travelbtn = document.getElementById('btn-travel');
	travelbtn.className = "navitem";
	travelbtn.id = "campButton";
	////change their href
	travelbtn.href = campbtn.href;
	friendbtn = document.getElementById('btn-friends');
	campbtn.href = friendbtn.href;
	
	//combining friend & team & add scoreboard from lore
	var teamnav = document.getElementById('nav1.teams');
	var teamnavarr = teamnav.childNodes;
	var friendnav = document.getElementById('nav1.friends');
	var friendnavarr = friendnav.childNodes;
	var lorenav = document.getElementById('nav1.lore');
	var lorenavarr = lorenav.childNodes;
	for (i = 0;i < friendnavarr.length;++i)
		if (friendnavarr[i].firstChild.textContent == "Invite Friends")//remove invite friend
		{
			friendnav.removeChild(friendnavarr[i]);
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
	friendnav.appendChild(lorenavarr[0]); //add scoreboard from lore
	
	//add Mice to inventory
	var inventory = document.getElementById('nav1.inventory');
	var micepage = inventory.lastChild.cloneNode(true);
	inventory.appendChild(micepage);
	micepage = micepage.firstChild;
	micepage.href = document.getElementsByClassName('navitem micebutton')[0].href;
	micepage.innerHTML = "Mice";
	
	//remove the following button, it will be replaced on a different place: Donate, travel, mice, lore, forum, friend
	donationarea.removeChild(document.getElementsByClassName('donatebutton')[0]);
	var mainnav = document.getElementsByClassName('navitem lorebutton')[0].parentNode.parentNode;
	friendbtn.style.display = "none";	//mainnav.removeChild(document.getElementsByClassName('navitem travelbutton')[0].parentNode);
	mainnav.removeChild(document.getElementsByClassName('navitem micebutton')[0].parentNode);
	mainnav.removeChild(document.getElementsByClassName('navitem lorebutton')[0].parentNode);
	mainnav.removeChild(document.getElementsByClassName('navitem newsbutton')[0].parentNode);
	mainnav.removeChild(document.getElementsByClassName('navitem forumsbutton')[0].parentNode);
	//fix the dropdown
	document.getElementById('nav1.shops').style.left = "308px";
	document.getElementById('nav1.inventory').style.left = "213px";
	document.getElementById('nav1.friends').style.left = "645px";
	
	//======HUD change======
	var hud_base_parent = document.getElementById('hud_base').parentNode.parentNode.parentNode;
	hud_base_parent.parentNode.removeChild(hud_base_parent);//remove the base. It does not necessary because the content showed that

	var hud_bait = document.getElementById('hud_baitName').parentNode;
	var hud_gold_list = hud_bait.parentNode;
	//hud_gold_list.removeChild(hud_bait); //remove the bait
	hud_bait.style.display = "none";
	hud_bait.removeChild(hud_bait.lastChild);
	
	var hud_team = document.getElementById('hud_team');
	if (hud_team != undefined)
	{
		hud_team = hud_team.parentNode;
		hud_team.parentNode.removeChild(hud_team); //and remove the old team list
		hud_gold_list.appendChild(hud_team); //move the "Team" information to the place of the bait we had just removed
	}
	
	travelToTabBar();
	shopToTabBar();
	potToTabBar();
	craftToTabBar();
	
	//hide daily & friends
	var tabbar = document.getElementById('tabbarContent_page').getElementsByClassName('campLeft')[0];
	tmp = tabbar.getElementsByClassName('bar')[0].firstChild.getElementsByClassName('inactive');
	tmp[0].style.display = "none";
	
	//precious title advancing
	O_titleBar = document.getElementById('hud_titlebar');
	O_titlePercentage = document.getElementById('hud_titlePercentage');
	
	//detailed timer
	O_huntTimer = document.getElementById('huntTimer').cloneNode(true);
	document.getElementById('huntTimer').style.display = "none";
	O_huntTimer.id = "UOP_huntTimerParent";
	O_huntTimer.innerHTML = "<span class='timerlabel'>Next Hunt: </span><span id='UOP_huntTimer'></span>";
	document.getElementById('hornArea').appendChild(O_huntTimer);
	O_huntTimer = O_huntTimer.lastChild;
	
	//location timer
	var headsup = document.getElementById('hud_statList1').parentNode;
	var headsuparr = headsup.getElementsByClassName('hudstatlist');
	var locationTimerParent = document.createElement('div');
	locationTimerParent.className = 'hudstatlist';
	headsup.insertBefore(locationTimerParent,headsuparr[1].nextSibling);
	locationTimerParent.appendChild(document.createElement('ul'));
	locationTimerParent = locationTimerParent.firstChild;
	locationTimerParent.id = "UOP_locationTimerParent";
	
	var locationTimerObject;
	O_locationTimer = new Array;
	for (var i = 0;i < 3;++i)
	{
		locationTimerObject = document.createElement('li');
		locationTimerParent.appendChild(locationTimerObject);
		locationTimerObject.innerHTML = "<span class='hudstatlabel'>" + C_LOCATION_TIMES[i].name + ": </span><span id='" + C_LOCATION_TIMES[i].id + "'></span>";
		O_locationTimer[i] = locationTimerObject.lastChild;
	}
	document.getElementsByClassName('gameinfo')[0].firstChild.firstChild.innerHTML = "<span style='font-weight: bold;'>" + C_LOCATION_TIMES[3].name + ": </span><span id='" + C_LOCATION_TIMES[3].id + "'></span>";
	O_locationTimer[3] = locationTimerObject.lastChild;
	
	//New bait number location
	var baitnum = document.getElementById('hud_baitIcon').parentNode;
	baitnum.insertBefore(document.createElement('div'),baitnum.firstChild);
	O_baitNum = baitnum.firstChild;
	O_baitNum.id = "hud_baitQuantity";
	
	//mouse autozoom
	O_imageBox = document.createElement("div");
	O_imageBox.id = "UOP_imagePhotoZoomBox";
	O_imageBox.innerHTML = '<img id="UOP_imagePhotoZoomPhoto">';
	O_imagePhoto = O_imageBox.firstChild;
	document.body.appendChild(O_imageBox);
	
	//register callbacks
	registerSoundHornWaiting.push(updateJournalImageBox);
	registerSoundHornWaiting.push(updateHud);
}
//ADS replace
function removeAds() {
	//remove mousehunt ads
	var rightCol = document.getElementById('hgSideBar'); //mousehunt ads
	if (rightCol != null)
	{
		while (rightCol.childElementCount > 1)
			rightCol.removeChild(rightCol.lastChild);//rightCol.style.display = "none";
	}
}
/*******************AUTO AREA********************/
function initAuto() {
	manageCSSJSAdder(5);
	var autopanel = template.hgMenu.cloneNode(true);
	autopanel.id = "UOP_appAutoPanel";
	autopanel.addEventListener('click',autoChangeState,false);

	autopanel.firstChild.innerHTML = C_autopanel;
	O_playing = autopanel.getElementsByClassName('UOP_playing')[0];

	autopanel.lastChild.innerHTML = "<label id='UOP_autoPauseCounter'>Paused</label><label id='UOP_autoSounding'></label><div style='display:inline;'><label id='UOP_autoMainCounter'></label><label> + </label><label id='UOP_autoDelayCounter'></label></div>";
	O_autoPanel = autopanel.lastChild;
	O_autoPauseCounter = autopanel.lastChild.firstChild;
	O_autoSounding = autopanel.lastChild.firstChild.nextSibling;
	O_autoCounter = autopanel.lastChild.lastChild;
	O_autoMainCounter = O_autoCounter.firstChild;
	O_autoDelayCounter = O_autoCounter.lastChild;

	O_hgRow.appendChild(autopanel);
	O_hgRow.appendChild(template.hgLeft.cloneNode(true));
	
	registerSoundHornSounding.push(autoSounding);
	registerSoundHornSounded.push(autoSounded);
	registerSoundHornWaiting.push(autoHornWaiting);
}
function autoCoreInit() {
	A_soundingCounter = 0;
	A_soundedCounter = 0;
	A_autoPaused = Number(window.localStorage.UOP_pause);
	
	if (data.user.has_puzzle == false)
	{
		if (S_solve == 1) A_solveStage = 0; else A_solveStage = C_solveStage;
		window.localStorage.UOP_solveStage = A_solveStage;
	}
	else A_solveStage = Number(window.localStorage.UOP_solveStage);
	window.localStorage.UOP_puzzleReloaded = 0;
	
	genDelayTime();
	autoCoreAction();
}
function autoCoreDecide(nextTurnSeconds,nextDelaySeconds) {
	//0 = PAUSE; 1 = KR; 2 = MAIN COUNT; 3 = DELAY COUNT; 4 = HORN; 5 = TIME OUT BUT HORN IS NOT READY
	if (A_autoPaused == 1) return 0; //paused
	if ((location.pathname != "/index.php") && (location.pathname != "/")) return 0; //not on camp
	if (data.user.bait_quantity == 0) return 0; //no bait
	if (data.user.has_puzzle == true) return 1; //KR
	if (nextTurnSeconds > 0) return 2; //still counting
	if (nextDelaySeconds > 0) return 3; //count is done, delaying
	if (O_hornButton.parentNode.style.display == "none") return 5;
	return 4;
}
function autoCoreAction() {
	var curTime = new Date().getTime();
	var nextTurnSeconds = Math.ceil((nextTurnTimestamp - curTime) / 1000);
	var nextDelaySeconds;
	nextDelaySeconds = (nextTurnSeconds > 0) ? (A_delayTime) : Math.ceil((A_delayTimestamp - curTime) / 1000);
	var autoState = autoCoreDecide(nextTurnSeconds,nextDelaySeconds);
	var delayTimeText,hornTimeText;
	
	if (autoState == 0) //if PAUSE then display pause message
	{
		O_autoPauseCounter.style.display = "block";
		O_autoCounter.style.display = "none";
		O_autoSounding.style.display = "none";
		document.title = "Paused";
		return;
	}
	else if (autoState == 1) //if APPROACHING KR then call puzzleReaction core
	{
		puzzleStandardReaction();
		return;
	}
	else if (autoState == 2) //if (UPDATE MAIN COUNT) UPDATE MAIN COUNT
	{
		hornTimeText = formatMinute(nextTurnSeconds);
		delayTimeText = formatMinute(nextDelaySeconds);
		O_autoMainCounter.innerText = hornTimeText;
		O_autoDelayCounter.innerText = delayTimeText;
		if (O_huntTimer != null) O_huntTimer.textContent = hornTimeText;
		document.title = hornTimeText + " + " + delayTimeText;
	}
	else if (autoState == 3) //if (UPDATE DELAYER) UPDATE DELAYER
	{
		hornTimeText = "0:00";
		delayTimeText = formatMinute(nextDelaySeconds);
		O_autoMainCounter.innerText = hornTimeText;
		O_autoDelayCounter.innerText = delayTimeText;
		if (O_huntTimer != null) O_huntTimer.textContent = hornTimeText;
		document.title = delayTimeText;
	}
	else if (autoState == 4) //if HORN => HORN
	{
		O_hornButton.click();
		return;
	}
	else if (autoState == 5) //TIME OUT BUT NOT READY
	{
		if (((S_aggressive == 2) && (data.user.viewing_atts.hasOwnProperty('tournament')) && (data.user.viewing_atts.tournament.status == "active")) || //if: aggressive in tour AND joined tour AND tour is active
		(S_aggressive == 0))
		{
			O_hornButton.parentNode.style.display = "block";
			O_hornButton.click();
		} else
			syncUser(autoCoreCallback);
		return;
	}
	setTimeout(function () { (autoCoreAction)() }, C_autoInterval * 1000);
}
function autoCoreCallback() {
	if (data.user.next_activeturn_seconds == 0)
	{
		O_hornButton.parentNode.style.display = "block";
		O_hornButton.click();
		return;
	}
	else
	{
		updateTimeStamp();
		genDelayTime();
		setTimeout(function () { (autoCoreAction)() }, C_autoInterval * 1000);
	}
}
function autoSounding() {
	++A_soundingCounter;
	if (A_soundingCounter == 1) //first time
	{
		O_autoPauseCounter.style.display = "none";
		O_autoSounding.style.display = "block";
		O_autoCounter.style.display = "none";
		O_autoSounding.innerText = "Sounding...";
	}
	else if (A_soundingCounter > 120)
	{
		O_autoSounding.innerText = "Too long. Refreshing !";
		location.reload();
	}
	else if (A_soundingCounter > 30)
	{
		O_autoSounding.innerText = "Longer than expected...";
	}
}
function autoSounded() {
	++A_soundedCounter;
	if (A_soundedCounter == 1) //first time
	{
		O_autoSounding.innerText = "Completed !";
	}
	else if (A_soundedCounter > 50)
	{
		O_autoSounding.innerText = "New message !";
		if (data.user.has_puzzle == true) puzzleStandardReaction();
	}
}
function autoHornWaiting() {
	if (data.user.next_activeturn_seconds == 0)
	{
		++A_hornRetryCounter;
		if (A_hornRetryCounter > 1)
		{
			O_autoSounding.innerText = "Error, refreshing...";
			location.reload();
			return;
		}
	}
	else A_hornRetryCounter = 0;
	O_autoPauseCounter.style.display = "none";
	O_autoSounding.style.display = "none";
	O_autoCounter.style.display = "block";
	autoCoreInit();
}
function genDelayTime() {
	var delaymin = S_delaymin;
	var delaymax = S_delaymax;
	if (((S_aggressive == 2) && (data.user.viewing_atts.hasOwnProperty('tournament')) && (data.user.viewing_atts.tournament.status == "active")) || //if: aggressive in tour AND joined tour AND tour is active
		(S_aggressive == 0))
		delaymin = delaymax = 0;
	if (data.user.next_activeturn_seconds == 0)
		delaymin = delaymax = 3;
	if (delaymax > delaymin) A_delayTime = Math.floor((Math.random()*(delaymax - delaymin))+delaymin);
	else A_delayTime = delaymin;
	A_delayTimestamp = nextTurnTimestamp + A_delayTime * 1000;
}
function autoChangeState() {
	if (A_autoPaused == 0)
	{
		window.localStorage.UOP_pause = A_autoPaused = 1;
		O_playing.className = "UOP_pausing";
	}
	else
	{
		window.localStorage.UOP_pause = A_autoPaused = 0;
		O_playing.className = "UOP_playing";
		O_autoSounding.style.display = "none";
		O_autoPauseCounter.style.display = "none";
		O_autoCounter.style.display = "block";
		autoCoreAction();
	}
}
function loadSettingKRimage() {
	var imageLoadStr = 'puzzleimage.php?t=' + new Date().getTime() + '&snuid=' + data.user.sn_user_id + '&hash='+data.user.unique_hash;
	document.getElementById('UOP_loadKRimage').src = imageLoadStr;
	
	var len = S_settingGroupsLength[0] = 461;
	O_settingGroup[0].style.height = len + "px";
}
function alarm(parent,insertPoint) {
	if (S_alarm == 1)
	{
		var audioDiv = document.createElement('div');
		audioDiv.innerHTML = "<audio controls autoplay loop><source src='" + window.localStorage.UOP_alarmSrc + "'>Upgrade your browser please....this is HTML5</audio>";
		if ((parent == null) && (insertPoint == null)) O_hornButton.parentNode.parentNode.insertBefore(audioDiv,O_hornButton.parentNode);
		else parent.insertBefore(audioDiv,insertPoint);
	}
	else if (S_alarm == 2)
	{
		window.open(window.localStorage.UOP_alarmSrc);
	}
	
	if (S_alarmStop == 0)
	{
		setTimeout(function() {if (typeof window.home == 'function') window.home(); else window.location.href = "about:home";},S_alarmStopTime * 1000);
	}
	
	if (window.webkitNotifications)
	{
		var havePermission = window.webkitNotifications.checkPermission();
		if (havePermission == 0) { // 0 is PERMISSION_ALLOWED
			var notification = window.webkitNotifications.createNotification('http://www.mousehuntgame.com/images/items/stats/272be17ea6205e914d207e1ccac5bbc3.gif','Toe toe toe!','Có King\'s Reward kìa em ey');
			notification.onclick = function () {
				notification.close();
			}
			notification.show();
		} else window.webkitNotifications.requestPermission();
	}
}
function KRSolverCache() {
	if (S_cacheKRstr != "")
	{
		submitPuzzle(S_cacheKRstr);
		window.localStorage.UOP_cacheKRstr = S_cacheKRstr = "";
	}
	--A_solveStage;
	window.localStorage.UOP_solveStage = A_solveStage;
}
function submitPuzzle(str) {
	var url = "managers/ajax/users/solvePuzzle.php?puzzle_answer=" + str + "&uh=" + data.user.unique_hash;
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.onreadystatechange = function()
	{
		if (request.readyState === 4)
		{
			if (request.status == 200)
			{
				var tmpRespondJSON = JSON.parse(request.responseText);
				document.getElementById('pagemessage').innerText = tmpRespondJSON.result;
				location.reload();
			}
			else
			{
				document.getElementById('pagemessage').innerText = "Network error"; //~~~~
				location.reload();
			}
		}
	};
	request.send(null);
}
function puzzleCoreReaction() {
	switch (A_solveStage)
	{
		case 2:KRSolverCache();break;
		default:var puzzleAlarm = document.getElementById('puzzle_form');alarm(puzzleAlarm.parentNode,puzzleAlarm);document.getElementById('puzzle_answer').focus();
	}
}
function puzzleStandardReaction() {
	O_autoPauseCounter.style.display = "none";
	O_autoSounding.style.display = "block";
	O_autoCounter.style.display = "none";
	O_autoSounding.innerText = "King's Reward";
	document.title = "King's Reward";
	
	if (document.getElementsByClassName('puzzle').length == 0)
	{
		if (window.localStorage.UOP_puzzleReloaded == 0)
		{
			window.localStorage.UOP_puzzleReloaded = 1;
			location.reload();
		}
	}
	document.getElementById('puzzle_submit').addEventListener('click',puzzleUserSubmit,false);
	
	puzzleCoreReaction();
		
	O_autoCounter.style.display = "none";
	O_autoPauseCounter.style.display = "block";
	O_autoSounding.style.display = "none";
	A_puzzleTimeout = new Date().getTime();
	puzzleCounter();
}
function puzzleCounter() {
	var nextTimeoutSeconds = Math.ceil((new Date().getTime() - A_puzzleTimeout) / 1000);
	var timeText;
	if ((S_alarmStop == 0) && (nextTimeoutSeconds > S_alarmStopTime))
	{
		if (typeof window.home == 'function') window.home(); else window.location.href = "about:home";
	}
		
	timeText = formatHour(nextTimeoutSeconds);
	O_autoPauseCounter.innerText = timeText;

	setTimeout(function() {puzzleCounter()},C_autoInterval * 1000);
}
function puzzleUserSubmit() {
	var linkElementList = document.getElementById('puzzleContainer').getElementsByTagName('img');
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
}